"use client";

import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [content, setContent] = useState({
    tagline: "Providing trusted expertise in Real Estate, Notary Services, and Comprehensive Tax Preparation to secure your financial future.",
    service1Desc: "Expert guidance in residential and commercial property transactions. We simplify the buying and selling process to maximize your investment.",
    service2Desc: "Certified, accurate, and confidential notary public and digital fingerprinting services for your legal and background check needs.",
    service3Desc: "Comprehensive tax planning and filing services for individuals and businesses, tailored to optimize returns and ensure compliance.",
    address1: "123 Corporate Plaza, Suite 400\nMetropolis, NY 10001",
    address2: "890 Regional Parkway, Bldg 2\nMetropolis, NY 10002",
    facebook: "",
    instagram: "",
    linkedin: "",
    logoUrl: "",
    heroMediaUrl: "",
  });

  // Bind Firestore to app state, and listen to iframe injection commands
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "site_content", "main"), (docSnap) => {
      if (docSnap.exists()) setContent((prev) => ({ ...prev, ...docSnap.data() }));
    });

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "preview_update") setContent((prev) => ({ ...prev, ...event.data.content }));
    };
    window.addEventListener("message", handleMessage);

    return () => {
      unsubscribe();
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col font-sans text-slate-900 bg-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center bg-blue-900 text-white py-32 px-6 overflow-hidden">
        {content.heroMediaUrl ? (
          content.heroMediaUrl.includes("video") || content.heroMediaUrl.includes(".mp4") ? (
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none">
              <source src={content.heroMediaUrl} type="video/mp4" />
            </video>
          ) : (
            <img src={content.heroMediaUrl} className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none" alt="Hero Background" />
          )
        ) : (
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        )}
        
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          {content.logoUrl ? (
            <img src={content.logoUrl} alt="Logo" className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full mb-8 border-4 border-white shadow-lg bg-white" />
          ) : (
            <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-200 rounded-full mb-8 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
              <span className="text-blue-900 text-sm font-medium px-4 text-center">Logo / Image Placeholder</span>
            </div>
          )}
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Bromley Legacy Partners
          </h1>
          <p className="text-lg md:text-2xl text-blue-100 max-w-2xl font-light leading-relaxed">
            {content.tagline}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-950">Our Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Real Estate */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-950">Real Estate</h3>
              <p className="text-slate-600 text-center leading-relaxed">
                {content.service1Desc}
              </p>
            </div>

            {/* Notary */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-950">Notary & Live Scan</h3>
              <p className="text-slate-600 text-center leading-relaxed">
                {content.service2Desc}
              </p>
            </div>

            {/* Tax Preparation */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-950">Tax Preparation</h3>
              <p className="text-slate-600 text-center leading-relaxed">
                {content.service3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-950">Get In Touch</h2>
            <p className="text-lg text-slate-600 mb-10">
              Ready to secure your legacy? Contact us today to schedule a consultation with one of our expert partners.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0 mt-1 text-blue-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-slate-900 mb-1">Downtown Office</h4>
                  <p className="text-slate-600 mb-2 whitespace-pre-line">
                    {content.address1}
                  </p>
                  <p className="text-sm font-medium text-slate-700">Phone: <a href="tel:+15551234567" className="text-blue-700 hover:underline">(555) 123-4567</a></p>
                  <p className="text-sm font-medium text-slate-700">Email: <a href="mailto:downtown@bromleylegacy.com" className="text-blue-700 hover:underline">downtown@bromleylegacy.com</a></p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0 mt-1 text-blue-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-slate-900 mb-1">Westside Branch</h4>
                  <p className="text-slate-600 mb-2 whitespace-pre-line">
                    {content.address2}
                  </p>
                  <p className="text-sm font-medium text-slate-700">Phone: <a href="tel:+15559876543" className="text-blue-700 hover:underline">(555) 987-6543</a></p>
                  <p className="text-sm font-medium text-slate-700">Email: <a href="mailto:westside@bromleylegacy.com" className="text-blue-700 hover:underline">westside@bromleylegacy.com</a></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 p-1 rounded-xl">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">BLP</span>
            </div>
            <span className="font-semibold text-white tracking-wide">Bromley Legacy Partners</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            {content.facebook && (
              <a href={content.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                Facebook
              </a>
            )}
            {content.instagram && (
              <a href={content.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
                Instagram
              </a>
            )}
            {content.linkedin && (
              <a href={content.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
                LinkedIn
              </a>
            )}
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Bromley Legacy Partners. All rights reserved.
        </div>
      </footer>
    </main>
  );
}