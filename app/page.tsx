"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import MediaUploader from "../../MediaUploader";

export default function AdminDashboard() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile">("desktop");
  
  const [content, setContent] = useState({
    tagline: "",
    service1Desc: "",
    service2Desc: "",
    service3Desc: "",
    address1: "",
    address2: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    heroMediaUrl: "",
    logoUrl: "",
  });

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/admin/login");
      else setLoadingAuth(false);
    });

    const unsubscribeDb = onSnapshot(doc(db, "site_content", "main"), (docSnap) => {
      if (docSnap.exists()) setContent((prev) => ({ ...prev, ...docSnap.data() }));
    });

    return () => {
      unsubscribeAuth();
      unsubscribeDb();
    };
  }, [router]);

  // Instantly send typed changes into the iframe for Live-Preview
  useEffect(() => {
    const iframe = document.getElementById("preview-iframe") as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: "preview_update", content }, "*");
    }
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "site_content", "main"), content, { merge: true });
      alert("Changes have been successfully published to the live site.");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loadingAuth) return <div className="h-screen flex items-center justify-center bg-slate-50 font-semibold text-slate-500">Authenticating Session...</div>;

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans text-slate-900">
      {/* Left Panel: Content Editor */}
      <div className="w-1/3 min-w-[360px] bg-white border-r border-slate-200 flex flex-col h-full shadow-lg z-10">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h1 className="text-xl font-bold text-blue-950">Site Editor</h1>
          <button onClick={() => signOut(auth)} className="text-sm text-red-600 hover:text-red-800 transition-colors">Logout</button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          <section>
            <h2 className="font-semibold text-lg text-slate-800 mb-4 border-b pb-2">Hero & Branding</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-600">Company Tagline</label>
                <textarea name="tagline" value={content.tagline} onChange={handleChange} className="w-full border border-slate-300 rounded p-3 text-sm h-24 outline-none focus:border-blue-900" />
              </div>
              <div className="p-4 bg-slate-50 rounded border border-slate-100">
                <label className="block text-sm font-medium mb-2 text-slate-600">Logo Image</label>
                <MediaUploader onUploadSuccess={(url) => setContent(prev => ({ ...prev, logoUrl: url }))} folder="brand" />
              </div>
              <div className="p-4 bg-slate-50 rounded border border-slate-100">
                <label className="block text-sm font-medium mb-2 text-slate-600">Hero Background (Image or Video)</label>
                <MediaUploader onUploadSuccess={(url) => setContent(prev => ({ ...prev, heroMediaUrl: url }))} folder="media" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-slate-800 mb-4 border-b pb-2">Service Descriptions</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-600">Real Estate</label>
                <textarea name="service1Desc" value={content.service1Desc} onChange={handleChange} className="w-full border border-slate-300 rounded p-3 text-sm h-20 outline-none focus:border-blue-900" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-600">Notary / Live Scan</label>
                <textarea name="service2Desc" value={content.service2Desc} onChange={handleChange} className="w-full border border-slate-300 rounded p-3 text-sm h-20 outline-none focus:border-blue-900" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-600">Tax Preparation</label>
                <textarea name="service3Desc" value={content.service3Desc} onChange={handleChange} className="w-full border border-slate-300 rounded p-3 text-sm h-20 outline-none focus:border-blue-900" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-slate-800 mb-4 border-b pb-2">Offices & Locations</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-600">Downtown Office</label>
                <textarea name="address1" value={content.address1} onChange={handleChange} className="w-full border border-slate-300 rounded p-3 text-sm h-20 outline-none focus:border-blue-900" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-600">Westside Branch</label>
                <textarea name="address2" value={content.address2} onChange={handleChange} className="w-full border border-slate-300 rounded p-3 text-sm h-20 outline-none focus:border-blue-900" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-slate-800 mb-4 border-b pb-2">Social Media Linking</h2>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1 text-slate-600">Facebook URL</label><input type="text" name="facebook" value={content.facebook} onChange={handleChange} className="w-full border border-slate-300 rounded p-3 text-sm outline-none focus:border-blue-900" /></div>
              <div><label className="block text-sm font-medium mb-1 text-slate-600">Instagram URL</label><input type="text" name="instagram" value={content.instagram} onChange={handleChange} className="w-full border border-slate-300 rounded p-3 text-sm outline-none focus:border-blue-900" /></div>
              <div><label className="block text-sm font-medium mb-1 text-slate-600">LinkedIn URL</label><input type="text" name="linkedin" value={content.linkedin} onChange={handleChange} className="w-full border border-slate-300 rounded p-3 text-sm outline-none focus:border-blue-900" /></div>
            </div>
          </section>
        </div>

        <div className="p-5 border-t border-slate-200 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button onClick={handleSave} disabled={saving} className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-800 hover:shadow-md disabled:opacity-50 transition-all">
            {saving ? "Publishing to Website..." : "Save & Publish"}
          </button>
        </div>
      </div>

      {/* Right Panel: Live-Preview Area */}
      <div className="flex-1 flex flex-col bg-slate-200/50">
        <div className="p-4 bg-white border-b border-slate-200 flex justify-center gap-4 z-0 shadow-sm">
          <button onClick={() => setDeviceView("desktop")} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${deviceView === "desktop" ? "bg-blue-900 text-white shadow" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>🖥️ Desktop</button>
          <button onClick={() => setDeviceView("mobile")} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${deviceView === "mobile" ? "bg-blue-900 text-white shadow" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>📱 Mobile View</button>
        </div>
        <div className="flex-1 p-6 flex items-center justify-center overflow-auto">
          <div className={`bg-white shadow-2xl transition-all duration-300 ease-in-out ${deviceView === "mobile" ? "w-[390px] h-[844px] rounded-[3rem] border-[12px] border-slate-800" : "w-full h-full rounded-xl border border-slate-300"}`}>
             <iframe id="preview-iframe" src="/" className={`w-full h-full ${deviceView === "mobile" ? "rounded-[2rem]" : "rounded-lg"}`} title="Live Site Preview" />
          </div>
        </div>
      </div>
    </div>
  );
}