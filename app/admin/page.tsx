"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6 font-sans">
      <div className="max-w-md w-full bg-[#111] border border-[#333] p-8 md:p-10 rounded-xl shadow-2xl">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-[#C5A059] mb-8 text-center uppercase tracking-widest">
          Admin Login
        </h1>
        {error && (
          <div className="bg-red-900/30 text-red-400 p-3 rounded mb-6 text-sm text-center border border-red-800">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-[#222] border border-[#444] rounded-md focus:ring-[#C5A059] focus:border-[#C5A059] outline-none text-white transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 bg-[#222] border border-[#444] rounded-md focus:ring-[#C5A059] focus:border-[#C5A059] outline-none text-white transition-colors" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[#C5A059] text-black font-bold py-3 mt-4 rounded-md uppercase tracking-widest hover:bg-[#E4C882] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}