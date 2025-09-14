
"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "../lib/api";
import { useAuth } from "@component/hooks/useAuth";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [role, setRole] = useState<"user" | "organizer">("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const router = useRouter();

  const useauth = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignup) {
      // Register user
      if (password) {
        await useauth.register({ name, email, password, phone, role });
        alert("Account created! Please sign in.");
        setIsSignup(false);
      }

    } else {
      // Login user
      const res = await useauth.login({ email, password });
      if (await res?.data?.access_token) {
        // localStorage.setItem("token", res?.data.access_token);
        alert(`Logged in as ${email}`);
        console.log("Login successful");
      }

      // router.push("/dashboard");
    }
  }

  return (
    <div className="flex items-center flex-col justify-center py-10">
      <div className="mb-5">
        <Link href="/" className="text-sm text-blue-600">
          Return Home <ArrowUpRight size={20} className="inline-flex" />
        </Link>
        <button onClick={useauth.logout}>Logout</button>
      </div>

      <div className="w-full max-w-md shadow bg-white/10 backdrop-blur-lg rounded-lg p-8">
        <h2 className="text-3xl font-thin text-center mb-2">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-sm text-center mb-6">
          {isSignup
            ? "Join as a participant or host an event"
            : "Sign in to your account"}
        </p>

        {/* Error message */}
        {useauth.error && <p className="text-red-500 text-sm mb-4">{useauth.error}</p> || "No Error"}

        {/* Role Selector */}
        {isSignup && (
          <div className="space-x-4 mb-6 text-center">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`rounded-full text-sm px-3 py-1 border transition ${role === "user"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-transparent border-gray-500 text-gray-500 hover:border-blue-400"
                }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setRole("organizer")}
              className={`rounded-full text-sm px-3 py-1 border transition ${role === "organizer"
                ? "bg-green-600 text-white border-green-600"
                : "bg-transparent border-gray-500 text-gray-500 hover:border-green-400"
                }`}
            >
              Organizer
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-2 rounded-full bg-white/10 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-full bg-white/10 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-full bg-white/10 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {isSignup && (
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="w-full px-4 py-2 rounded-full bg-white/10 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white shadow-lg hover:opacity-90 transition"
          >
            {isSignup ? `Sign Up as ${role}` : "Sign In"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-gray-400 text-sm text-center mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-400 hover:underline"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

