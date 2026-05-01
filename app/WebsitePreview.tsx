import { Building2, Landmark, Users, HardHat, Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";

export interface SiteContent {
  logoUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  heroMediaUrl: string;
  aboutHeading: string;
  aboutText: string;
  aboutImageUrl: string;
  service1Title: string;
  service1Desc: string;
  service2Title: string;
  service2Desc: string;
  service3Title: string;
  service3Desc: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
}

export default function WebsitePreview({ content }: { content: SiteContent }) {
  // Helper to determine if hero media is a video based on common extensions in Firebase URL
  const isVideoUrl = (url: string) => {
    if (!url) return false;
    const urlWithoutQuery = url.split("?")[0].toLowerCase();
    return urlWithoutQuery.endsWith(".mp4") || urlWithoutQuery.endsWith(".webm") || urlWithoutQuery.endsWith(".mov");
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
              key={content.heroMediaUrl}
                autoPlay 
                loop 
                muted 
                playsInline
              className="w-full h-full object-cover opacity-100"
              >
                <source src={content.heroMediaUrl} />
              </video>
            ) : (
              <img 
              key={content.heroMediaUrl}
                src={content.heroMediaUrl} 
                alt="Background" 
              className="w-full h-full object-cover opacity-100"
              />
            )
          ) : (
             <div className="w-full h-full bg-gradient-to-br from-[#111] to-[#000]"></div>
          )}
          {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {content.logoUrl && (
            <img src={content.logoUrl} alt="Logo" className="w-32 md:w-56 mb-8 object-contain drop-shadow-2xl" />
          )}
          <h2 className="font-heading tracking-[0.2em] uppercase text-lg md:text-2xl text-[#E4C882] mb-4">
            {content.heroTitle}
          </h2>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-tighter leading-none mb-6">
            {content.heroSubtitle}
          </h1>
          <div className="flex flex-col items-center gap-8 mt-4">
            <div className="w-24 h-1 bg-[#C5A059]"></div>
            <a href="#contact-section" className="bg-[#C5A059] text-black px-8 py-4 rounded-md font-bold uppercase tracking-widest hover:bg-[#E4C882] transition-all transform hover:scale-105 active:scale-95 shadow-xl">Get Started</a>
          </div>
        </div>
      </section>

      {/* 2. About Section */}
      <section className="w-full max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-[90%] sm:w-full max-w-md aspect-square">
             {/* Decorative Border */}
            <div className="absolute inset-0 border-2 border-[#C5A059] translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4"></div>
            {content.aboutImageUrl ? (
              <img 
                src={content.aboutImageUrl} 
                alt="About" 
                className="relative z-10 w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
              />
            ) : (
              <div className="relative z-10 w-full h-full bg-[#1A1A1A] flex items-center justify-center border border-[#333]"> {/* Using HardHat directly for about image */}
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
      <section className="w-full bg-[#0d0d0d] py-16 md:py-28 px-6 flex flex-col items-center border-y border-[#1A1A1A]">
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-white uppercase tracking-widest mb-12 md:mb-20 text-center">
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
              <Landmark className="w-8 h-8 text-[#C5A059] group-hover:text-black transition-colors" strokeWidth={1.5} />
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
              <Users className="w-8 h-8 text-[#C5A059] group-hover:text-black transition-colors" strokeWidth={1.5} />
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
      <section className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#E4C882] uppercase tracking-widest mb-10 md:mb-16">
          Connect With Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-12 w-full">
          <a href={`tel:${content.contactPhone.replace(/[^0-9]/g, "")}`} className="flex flex-col items-center gap-4 group min-h-[44px]">
            <div className="w-14 h-14 rounded-full border border-[#C5A059] flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-colors">
              <Phone strokeWidth={1.5} />
            </div>
            <span className="font-sans text-sm tracking-widest uppercase text-gray-300">{content.contactPhone}</span>
          </a>
          <a href={`mailto:${content.contactEmail}`} className="flex flex-col items-center gap-4 group min-h-[44px]">
            <div className="w-14 h-14 rounded-full border border-[#C5A059] flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-colors">
              <Mail strokeWidth={1.5} />
            </div>
            <span className="font-sans text-sm tracking-widest uppercase text-gray-300">{content.contactEmail}</span>
          </a>
          <a href={`https://maps.google.com/?q=${encodeURIComponent(content.contactAddress)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group min-h-[44px]">
            <div className="w-14 h-14 rounded-full border border-[#C5A059] flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-colors"> {/* Using MapPin directly for contact address */}
              <MapPin strokeWidth={1.5} />
            </div>
            <span className="font-sans text-sm tracking-widest uppercase text-gray-300 leading-relaxed whitespace-pre-wrap">{content.contactAddress}</span>
          </a>
        </div>
      </section>

      {/* 5. Contact Form Section */}
      <section id="contact-section" className="w-full bg-[#f2f2f2] py-20 px-6 flex flex-col items-center text-black">
        <div className="max-w-4xl w-full text-center mb-12">
          <h2 className="font-heading font-bold text-4xl md:text-5xl uppercase tracking-widest mb-4">Start Your Legacy</h2>
          <p className="font-sans text-gray-600 max-w-2xl mx-auto">Ready to build your future? Send us a message and we&apos;ll get back to you to discuss your plan!</p>
        </div>
        <div className="w-full max-w-2xl">
          <ContactForm />
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