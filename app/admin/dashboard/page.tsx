"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "../../firebase"; 
import { useRouter } from "next/navigation";
import MediaUploader from "../../MediaUploader";
import WebsitePreview from "../../WebsitePreview";

export default function AdminPage() {
  const [content, setContent] = useState({
    logoUrl: "",
    heroTitle: "THE STANDARD IS",
    heroSubtitle: "BROMLEY LEGACY BUILDERS",
    heroMediaUrl: "",
    aboutHeading: "Our Legacy",
    aboutText: "We build with excellence.",
    aboutImageUrl: "",
    service1Title: "Custom Homes",
    service1Desc: "Building your dream home from the ground up.",
    service2Title: "Renovations",
    service2Desc: "Transforming existing spaces into modern masterpieces.",
    service3Title: "Commercial",
    service3Desc: "High-quality commercial construction and build-outs.",
    contactPhone: "(555) 123-4567",
    contactEmail: "info@bromleylegacy.com",
    contactAddress: "123 Builder Lane, San Diego, CA",
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("loading");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthLoading(false);
        fetchContent();
      } else {
        router.push("/admin");
      }
    });
    
    return () => unsubscribe();
  }, [router]);

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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/admin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isAuthLoading || status === "loading") {
    return <div className="min-h-screen bg-[#080808] flex items-center justify-center text-[#C5A059]">Loading admin dashboard...</div>;
  }
 
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#111] text-white font-sans overflow-hidden">
      {/* Left Side: Form */}
      <div className="w-full lg:w-1/2 h-full overflow-y-auto py-8 px-4 lg:px-10 border-r border-[#333]">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-[#C5A059]">Bromley Legacy Builders CMS</h1>
          <button onClick={handleSignOut} className="px-4 py-2 bg-[#222] text-sm text-gray-300 hover:text-white rounded border border-[#444] hover:border-[#C5A059] transition-colors">Sign Out</button>
        </div>

        {saveStatus === "success" && (
          <div className="bg-green-900/30 text-green-400 px-6 py-4 rounded-lg mb-6 border border-green-800 font-medium shadow-sm">
            Website content updated successfully!
          </div>
        )}
        {saveStatus === "error" && (
          <div className="bg-red-900/30 text-red-400 px-6 py-4 rounded-lg mb-6 border border-red-800 font-medium shadow-sm">
            Error saving content. Please check the console for details.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-10 bg-[#1A1A1A] p-5 md:p-10 rounded-xl shadow-lg border border-[#333]">
          
          {/* Hero Section */}
          <div>
            <h2 className="text-xl font-heading font-bold mb-4 text-[#C5A059] border-b border-[#333] pb-2 uppercase tracking-widest">Hero Section</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Hero Title</label>
                  <input type="text" name="heroTitle" value={content.heroTitle} onChange={handleChange} className="w-full px-4 py-2 bg-[#222] border border-[#444] rounded-md focus:ring-[#C5A059] focus:border-[#C5A059] outline-none text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Hero Subtitle</label>
                  <input type="text" name="heroSubtitle" value={content.heroSubtitle} onChange={handleChange} className="w-full px-4 py-2 bg-[#222] border border-[#444] rounded-md focus:ring-[#C5A059] focus:border-[#C5A059] outline-none text-white" />
                </div>
              </div>
              <div className="bg-[#222] p-4 rounded-lg border border-[#444]">
                <label className="block text-sm font-medium text-gray-300 mb-3">Hero Background Media (Image or Video)</label>
                {content.heroMediaUrl && (
                  <div className="mb-4 text-xs text-[#C5A059] break-all p-2 bg-[#111] rounded border border-[#333]">
                    {content.heroMediaUrl}
                  </div>
                )}
                <MediaUploader
                  folder="branding"
                  onUploadSuccess={(url) => setContent((prev) => ({ ...prev, heroMediaUrl: url }))}
                />
              </div>
              <div className="bg-[#222] p-4 rounded-lg border border-[#444]">
                <label className="block text-sm font-medium text-gray-300 mb-3">Company Logo</label>
                {content.logoUrl && <img src={content.logoUrl} alt="Logo" className="h-20 mb-4 rounded shadow-sm bg-black" />}
                <MediaUploader
                  folder="branding"
                  onUploadSuccess={(url) => setContent((prev) => ({ ...prev, logoUrl: url }))}
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h2 className="text-xl font-heading font-bold mb-4 text-[#C5A059] border-b border-[#333] pb-2 uppercase tracking-widest">About Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">About Heading</label>
                <input type="text" name="aboutHeading" value={content.aboutHeading} onChange={handleChange} className="w-full px-4 py-2 bg-[#222] border border-[#444] rounded-md focus:ring-[#C5A059] focus:border-[#C5A059] outline-none text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">About Text</label>
                <textarea name="aboutText" value={content.aboutText} onChange={handleChange} rows={4} className="w-full px-4 py-2 bg-[#222] border border-[#444] rounded-md focus:ring-[#C5A059] focus:border-[#C5A059] outline-none text-white" />
              </div>
              <div className="bg-[#222] p-4 rounded-lg border border-[#444]">
                <label className="block text-sm font-medium text-gray-300 mb-3">About Image</label>
                {content.aboutImageUrl && <img src={content.aboutImageUrl} alt="About" className="h-32 object-cover mb-4 rounded shadow-sm border border-[#333]" />}
                <MediaUploader
                  folder="branding"
                  onUploadSuccess={(url) => setContent((prev) => ({ ...prev, aboutImageUrl: url }))}
                />
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h2 className="text-xl font-heading font-bold mb-4 text-[#C5A059] border-b border-[#333] pb-2 uppercase tracking-widest">Services</h2>
            <div className="space-y-6">
              <div className="p-4 border border-[#333] rounded-lg bg-[#222]">
                <h3 className="text-[#E4C882] font-semibold mb-3">Service 1</h3>
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                  <input type="text" name="service1Title" value={content.service1Title} onChange={handleChange} className="w-full px-4 py-2 bg-[#111] border border-[#333] rounded-md focus:ring-[#C5A059] outline-none text-white" />
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <textarea name="service1Desc" value={content.service1Desc} onChange={handleChange} rows={2} className="w-full px-4 py-2 bg-[#111] border border-[#333] rounded-md focus:ring-[#C5A059] outline-none text-white" />
                </div>
              </div>
              <div className="p-4 border border-[#333] rounded-lg bg-[#222]">
                <h3 className="text-[#E4C882] font-semibold mb-3">Service 2</h3>
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                  <input type="text" name="service2Title" value={content.service2Title} onChange={handleChange} className="w-full px-4 py-2 bg-[#111] border border-[#333] rounded-md focus:ring-[#C5A059] outline-none text-white" />
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <textarea name="service2Desc" value={content.service2Desc} onChange={handleChange} rows={2} className="w-full px-4 py-2 bg-[#111] border border-[#333] rounded-md focus:ring-[#C5A059] outline-none text-white" />
                </div>
              </div>
              <div className="p-4 border border-[#333] rounded-lg bg-[#222]">
                <h3 className="text-[#E4C882] font-semibold mb-3">Service 3</h3>
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                  <input type="text" name="service3Title" value={content.service3Title} onChange={handleChange} className="w-full px-4 py-2 bg-[#111] border border-[#333] rounded-md focus:ring-[#C5A059] outline-none text-white" />
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <textarea name="service3Desc" value={content.service3Desc} onChange={handleChange} rows={2} className="w-full px-4 py-2 bg-[#111] border border-[#333] rounded-md focus:ring-[#C5A059] outline-none text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-heading font-bold mb-4 text-[#C5A059] border-b border-[#333] pb-2 uppercase tracking-widest">Contact Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                <input type="text" name="contactPhone" value={content.contactPhone} onChange={handleChange} className="w-full px-4 py-2 bg-[#222] border border-[#444] rounded-md focus:ring-[#C5A059] outline-none text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input type="text" name="contactEmail" value={content.contactEmail} onChange={handleChange} className="w-full px-4 py-2 bg-[#222] border border-[#444] rounded-md focus:ring-[#C5A059] outline-none text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                <textarea name="contactAddress" value={content.contactAddress} onChange={handleChange} rows={2} className="w-full px-4 py-2 bg-[#222] border border-[#444] rounded-md focus:ring-[#C5A059] outline-none text-white" />
              </div>
            </div>
          </div>

          <div className="pt-8 flex justify-end">
            <button
              type="submit"
              disabled={saveStatus === "saving"}
              className="w-full md:w-auto bg-[#C5A059] text-black px-8 py-3 rounded-md font-bold uppercase tracking-widest hover:bg-[#E4C882] transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saveStatus === "saving" ? "Saving Changes..." : "Publish Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Right Side: Preview */}
      <div className="w-full lg:w-1/2 h-full flex flex-col bg-[#080808]">
        <div className="flex justify-center items-center py-4 bg-[#1A1A1A] border-b border-[#333] gap-4">
          <button
            type="button"
            onClick={() => setPreviewMode("desktop")}
            className={`px-4 py-2 rounded-md font-bold uppercase tracking-widest text-sm transition-colors ${previewMode === "desktop" ? "bg-[#C5A059] text-black" : "bg-[#222] text-gray-400 hover:text-white"}`}
          >
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode("mobile")}
            className={`px-4 py-2 rounded-md font-bold uppercase tracking-widest text-sm transition-colors ${previewMode === "mobile" ? "bg-[#C5A059] text-black" : "bg-[#222] text-gray-400 hover:text-white"}`}
          >
            Mobile
          </button>
        </div>
        <div className="flex-1 overflow-y-auto flex justify-center items-start p-4 lg:p-8">
          <div className={`transition-all duration-300 bg-black overflow-hidden ${previewMode === "mobile" ? "w-full max-w-[375px] h-[812px] border-[12px] border-[#333] rounded-[2.5rem] shadow-2xl relative flex-shrink-0" : "w-full h-full border border-[#333] rounded-lg shadow-lg relative"}`}>
            <div className="w-full h-full overflow-y-auto overflow-x-hidden">
              <WebsitePreview content={content} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}