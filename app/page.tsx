import ContactForm from "./ContactForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col font-sans text-slate-900 bg-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center bg-blue-900 text-white py-32 px-6 overflow-hidden">
        {/* Optional: Add a subtle background pattern or image here */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Placeholder for Headshots or Logo */}
          <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-200 rounded-full mb-8 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
            <span className="text-blue-900 text-sm font-medium px-4 text-center">Logo / Image Placeholder</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Bromley Legacy Partners
          </h1>
          <p className="text-lg md:text-2xl text-blue-100 max-w-2xl font-light leading-relaxed">
            Providing trusted expertise in Real Estate, Notary Services, and Comprehensive Tax Preparation to secure your financial future.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-950">Our Professional Services</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-16 text-lg">
            Dedicated to excellence across all pillars of our practice, ensuring you have the support you need at every step.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Service 1: Real Estate */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-950">Real Estate</h3>
              <p className="text-slate-600 text-center leading-relaxed">
                Expert guidance in residential and commercial property transactions. We simplify the buying and selling process to maximize your investment.
              </p>
            </div>

            {/* Service 2: Notary / Live Scan */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-950">Notary & Live Scan</h3>
              <p className="text-slate-600 text-center leading-relaxed">
                Certified, accurate, and confidential notary public and digital fingerprinting services for your legal and background check needs.
              </p>
            </div>

            {/* Service 3: Tax Preparation */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-950">Tax Preparation</h3>
              <p className="text-slate-600 text-center leading-relaxed">
                Comprehensive tax planning and filing services for individuals and businesses, tailored to optimize returns and ensure compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Locations Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Information & Locations */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-950">Get in Touch</h2>
            <p className="text-slate-600 mb-10 text-lg leading-relaxed">
              Whether you need to file taxes, finalize a real estate contract, or secure a notarization, our team is ready to assist you. Contact us today or visit one of our offices.
            </p>

            <div className="space-y-8">
              {/* Location 1 */}
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-slate-100 rounded-full text-blue-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-slate-900 mb-1">Downtown Office</h4>
                  <p className="text-slate-600 mb-2">123 Corporate Plaza, Suite 400<br />Metropolis, NY 10001</p>
                  <p className="text-sm font-medium text-slate-700">Phone: <a href="tel:+15551234567" className="text-blue-700 hover:underline">(555) 123-4567</a></p>
                  <p className="text-sm font-medium text-slate-700">Email: <a href="mailto:downtown@bromleylegacy.com" className="text-blue-700 hover:underline">downtown@bromleylegacy.com</a></p>
                </div>
              </div>

              {/* Location 2 */}
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-slate-100 rounded-full text-blue-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-slate-900 mb-1">Westside Branch</h4>
                  <p className="text-slate-600 mb-2">890 Regional Parkway, Bldg 2<br />Metropolis, NY 10002</p>
                  <p className="text-sm font-medium text-slate-700">Phone: <a href="tel:+15559876543" className="text-blue-700 hover:underline">(555) 987-6543</a></p>
                  <p className="text-sm font-medium text-slate-700">Email: <a href="mailto:westside@bromleylegacy.com" className="text-blue-700 hover:underline">westside@bromleylegacy.com</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 p-8 rounded-2xl shadow-inner border border-slate-200">
            <h3 className="text-2xl font-semibold mb-6 text-blue-950">Send us a message</h3>
            <ContactForm />
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 py-10 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Bromley Legacy Partners. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
