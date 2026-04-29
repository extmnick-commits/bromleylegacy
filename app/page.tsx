"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Building2, Hammer, HardHat, Phone, Mail, MapPin } from "lucide-react";

export default function Home() {
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
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "site_content", "main");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent((prev) => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center text-[#C5A059]">
        <div className="animate-pulse flex flex-col items-center">
          <HardHat className="w-12 h-12 mb-4" />
          <p className="tracking-widest uppercase text-sm">Loading Excellence...</p>
        </div>
      </div>
    );
  }

  // Helper to determine if hero media is a video based on common extensions in Firebase URL
  const isVideoUrl = (url: string) => {
    if (!url) return false;
    const lowerUrl = url.toLowerCase();
    return lowerUrl.includes(".mp4") || lowerUrl.includes(".webm") || lowerUrl.includes(".mov");
  };

  const isVideo = isVideoUrl(content.heroMediaUrl);

  return (
    <main className="flex flex-col items-center bg-[#080808] text-white min-h-screen w-full">
      {/* 1. Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Media */}
        <div className="absolute inset-0 z-0">
          {content.heroMediaUrl ? (
            isVideo ? (
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover opacity-40"
              >
                <source src={content.heroMediaUrl} />
              </video>
            ) : (
              <img 
                src={content.heroMediaUrl} 
                alt="Background" 
                className="w-full h-full object-cover opacity-40"
              />
            )
          ) : (
             <div className="w-full h-full bg-gradient-to-br from-[#111] to-[#000]"></div>
          )}
          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {content.logoUrl && (
            <img src={content.logoUrl} alt="Logo" className="w-32 md:w-56 mb-8 object-contain drop-shadow-2xl" />
          )}
          <h2 className="font-heading tracking-[0.2em] uppercase text-xl md:text-2xl text-[#E4C882] mb-4">
            {content.heroTitle}
          </h2>
          <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-tighter leading-none mb-6">
            {content.heroSubtitle}
          </h1>
          <div className="w-24 h-1 bg-[#C5A059] mt-4"></div>
        </div>
      </section>

      {/* 2. About Section */}
      <section className="w-full max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md aspect-square">
             {/* Decorative Border */}
            <div className="absolute inset-0 border-2 border-[#C5A059] translate-x-4 translate-y-4"></div>
            {content.aboutImageUrl ? (
              <img 
                src={content.aboutImageUrl} 
                alt="About" 
                className="relative z-10 w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
              />
            ) : (
              <div className="relative z-10 w-full h-full bg-[#1A1A1A] flex items-center justify-center border border-[#333]">
                <HardHat className="w-16 h-16 text-[#333]" />
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-[#E4C882] uppercase tracking-widest mb-8">
            {content.aboutHeading}
          </h2>
          <p className="font-sans font-light text-sm md:text-base text-gray-300 leading-relaxed tracking-wide whitespace-pre-wrap">
            {content.aboutText}
          </p>
        </div>
      </section>

      {/* 3. Services Section */}
      <section className="w-full bg-[#0d0d0d] py-28 px-6 flex flex-col items-center border-y border-[#1A1A1A]">
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-white uppercase tracking-widest mb-20 text-center">
          Our <span className="text-gradient-gold">Services</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* Service 1 */}
          <div className="group bg-[#111] border border-[#222] p-10 flex flex-col items-center text-center hover:border-[#C5A059] transition-colors duration-500">
            <div className="w-20 h-20 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-8 group-hover:bg-[#C5A059] transition-colors duration-500">
              <Building2 className="w-8 h-8 text-[#C5A059] group-hover:text-black transition-colors" strokeWidth={1.5} />
            </div>
            <h4 className="font-heading font-bold text-xl uppercase tracking-widest text-white mb-4">
              {content.service1Title}
            </h4>
            <p className="font-sans text-sm text-gray-400 leading-loose">
              {content.service1Desc}
            </p>
          </div>

          {/* Service 2 */}
          <div className="group bg-[#111] border border-[#222] p-10 flex flex-col items-center text-center hover:border-[#C5A059] transition-colors duration-500">
            <div className="w-20 h-20 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-8 group-hover:bg-[#C5A059] transition-colors duration-500">
              <Hammer className="w-8 h-8 text-[#C5A059] group-hover:text-black transition-colors" strokeWidth={1.5} />
            </div>
            <h4 className="font-heading font-bold text-xl uppercase tracking-widest text-white mb-4">
              {content.service2Title}
            </h4>
            <p className="font-sans text-sm text-gray-400 leading-loose">
              {content.service2Desc}
            </p>
          </div>

          {/* Service 3 */}
          <div className="group bg-[#111] border border-[#222] p-10 flex flex-col items-center text-center hover:border-[#C5A059] transition-colors duration-500">
            <div className="w-20 h-20 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-8 group-hover:bg-[#C5A059] transition-colors duration-500">
              <HardHat className="w-8 h-8 text-[#C5A059] group-hover:text-black transition-colors" strokeWidth={1.5} />
            </div>
            <h4 className="font-heading font-bold text-xl uppercase tracking-widest text-white mb-4">
              {content.service3Title}
            </h4>
            <p className="font-sans text-sm text-gray-400 leading-loose">
              {content.service3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Contact / Footer */}
      <section className="w-full max-w-4xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <h2 className="font-heading font-bold text-4xl text-[#E4C882] uppercase tracking-widest mb-16">
          Connect With Us
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-12 w-full">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
              <Phone strokeWidth={1.5} />
            </div>
            <span className="font-sans text-sm tracking-widest uppercase text-gray-300">{content.contactPhone}</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
              <Mail strokeWidth={1.5} />
            </div>
            <span className="font-sans text-sm tracking-widest uppercase text-gray-300">{content.contactEmail}</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
              <MapPin strokeWidth={1.5} />
            </div>
            <span className="font-sans text-sm tracking-widest uppercase text-gray-300 leading-relaxed whitespace-pre-wrap">{content.contactAddress}</span>
          </div>
        </div>
      </section>

      <footer className="w-full bg-[#050505] py-8 px-6 flex flex-col items-center text-center border-t border-[#111]">
        <h4 className="font-heading font-bold text-lg text-[#C5A059] uppercase tracking-widest mb-2">Bromley Legacy Builders</h4>
        <p className="font-sans text-xs text-gray-600 font-light uppercase tracking-widest">
          &copy; {new Date().getFullYear()} The Standard Is Excellence. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}