"use client";

import { useForm, ValidationError } from "@formspree/react";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xeenokgn");

  if (state.succeeded) {
    return (
      <div className="p-8 bg-green-50 border border-green-200 rounded-lg text-center">
        <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
        <p className="text-green-700 mb-4">Thank you for reaching out. We will get back to you shortly.</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-sm font-medium text-green-800 underline hover:text-green-900"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white p-8 md:p-12 shadow-2xl rounded-xl border border-slate-200">
      {state.errors && (
        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
          Something went wrong. Please check your inputs and try again.
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-[#C5A059] focus:border-[#C5A059] outline-none transition-colors text-slate-900 bg-slate-50"
          placeholder="Jane Doe"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-[#C5A059] focus:border-[#C5A059] outline-none transition-colors text-slate-900 bg-slate-50"
            placeholder="jane@example.com"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-[#C5A059] focus:border-[#C5A059] outline-none transition-colors text-slate-900 bg-slate-50"
            placeholder="(555) 123-4567"
          />
          <ValidationError prefix="Phone" field="phone" errors={state.errors} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-[#C5A059] focus:border-[#C5A059] outline-none transition-colors text-slate-900 resize-none bg-slate-50"
          placeholder="How can we help you?"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full bg-[#C5A059] text-black font-bold py-4 px-6 rounded-md hover:bg-[#E4C882] transition-colors disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest shadow-lg"
      >
        {state.submitting ? "Sending..." : "Submit Message"}
      </button>
    </form>
  );
}