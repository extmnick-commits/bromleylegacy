"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { HardHat } from "lucide-react";
import WebsitePreview from "./WebsitePreview";

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

  return <WebsitePreview content={content} />;
}