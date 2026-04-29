"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase"; 
import MediaUploader from "../../MediaUploader";

export default function AdminPage() {
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
    logoUrl: "",
    heroMediaUrl: "",
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("loading");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "site_content", "main");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent((prev) => ({ ...prev, ...docSnap.data() }));
        }
        setStatus("success");
      } catch (error) {
        console.error("Error fetching content:", error);
        setStatus("error");
      }
    };
    
    fetchContent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    try {
      await setDoc(doc(db, "site_content", "main"), content, { merge: true });
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      console.error("Error saving content:", error);
      setSaveStatus("error");
    }
  };

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center text-slate-600">Loading admin dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-slate-900">Content Management Dashboard</h1>

        {saveStatus === "success" && (
          <div className="bg-green-50 text-green-800 px-6 py-4 rounded-lg mb-6 border border-green-200 font-medium shadow-sm">
            Website content updated successfully!
          </div>
        )}
        {saveStatus === "error" && (
          <div className="bg-red-50 text-red-800 px-6 py-4 rounded-lg mb-6 border border-red-200 font-medium shadow-sm">
            Error saving content. Please check the console for details.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-10 bg-white p-8 md:p-10 rounded-xl shadow-sm border border-slate-200">
          
          {/* General Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-100 pb-2">General Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
                <textarea
                  name="tagline"
                  value={content.tagline}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-900 focus:border-blue-900 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-100 pb-2">Media & Branding</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <label className="block text-sm font-medium text-slate-700 mb-3">Company Logo</label>
                {content.logoUrl && <img src={content.logoUrl} alt="Logo" className="h-20 mb-4 rounded shadow-sm bg-white" />}
                <MediaUploader
                  folder="branding"
                  onUploadSuccess={(url) => setContent((prev) => ({ ...prev, logoUrl: url }))}
                />
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <label className="block text-sm font-medium text-slate-700 mb-3">Hero Media (Image or Video)</label>
                {content.heroMediaUrl && (
                  <div className="mb-4 text-xs text-blue-600 break-all p-2 bg-blue-50 rounded border border-blue-100">
                    {content.heroMediaUrl}
                  </div>
                )}
                <MediaUploader
                  folder="branding"
                  onUploadSuccess={(url) => setContent((prev) => ({ ...prev, heroMediaUrl: url }))}
                />
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-100 pb-2">Services Descriptions</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Real Estate</label>
                <textarea name="service1Desc" value={content.service1Desc} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-900 focus:border-blue-900 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Notary & Live Scan</label>
                <textarea name="service2Desc" value={content.service2Desc} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-900 focus:border-blue-900 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tax Preparation</label>
                <textarea name="service3Desc" value={content.service3Desc} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-900 focus:border-blue-900 outline-none" />
              </div>
            </div>
          </div>

          {/* Contact & Socials */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-100 pb-2">Contact & Socials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700 mb-1">Address 1 (Downtown)</label><textarea name="address1" value={content.address1} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-900 focus:border-blue-900 outline-none" /></div>
              <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700 mb-1">Address 2 (Westside)</label><textarea name="address2" value={content.address2} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-900 focus:border-blue-900 outline-none" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Facebook URL</label><input type="text" name="facebook" value={content.facebook} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-900 focus:border-blue-900 outline-none" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Instagram URL</label><input type="text" name="instagram" value={content.instagram} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-900 focus:border-blue-900 outline-none" /></div>
              <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn URL</label><input type="text" name="linkedin" value={content.linkedin} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-900 focus:border-blue-900 outline-none" /></div>
            </div>
          </div>

          <div className="pt-8 flex justify-end">
            <button
              type="submit"
              disabled={saveStatus === "saving"}
              className="bg-blue-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saveStatus === "saving" ? "Saving Changes..." : "Publish Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}