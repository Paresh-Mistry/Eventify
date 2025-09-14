"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "../lib/api";
import { useUser } from "@component/hooks/useUser";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function me() {
    try {
      const res = fetch("https://localhost:8000/me")
      const resbody = (await res).json()
      console.log(resbody)
    }
    catch (error) {
      console.log("Error is ", error)
    }
  }

  me()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isSignup) {
        // 🔹 Register
        await registerUser({ name, email, password, role });
        alert("Account created! Please sign in.");
        setIsSignup(false);
      } else {
        // 🔹 Login
        const res = await loginUser({ email, password });

        console.log(res.data)

        // store token (localStorage for demo)
        localStorage.setItem("token", res.data.access_token);

        router.push("/dashboard");
      }
    } catch (err: any) {
      alert(err.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center flex-col justify-center md:py-18 py-8">
      <div className="mb-5">
        <Link href="/" className="text-sm text-blue-600">
          Return Home <ArrowUpRight size={20} className="inline-flex" />
        </Link>
      </div>

      <div className="w-full max-w-full md:max-w-sm shadow-sm bg-white/10 backdrop-blur-lg rounded p-8">
        <h2 className="text-3xl font-thin text-center mb-2">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-sm text-center mb-6">
          {isSignup
            ? "Join as a participant or host an event"
            : "Sign in to your account"}
        </p>

        {/* Role Selector */}
        <div className="space-x-4 mb-6 w-full text-center">
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`rounded-full text-sm px-2 py-1 border transition ${role === "user"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-transparent border-gray-500 text-gray-500 hover:border-blue-400"
              }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setRole("owner")}
            className={`rounded-full border text-sm px-2 py-1 transition ${role === "owner"
              ? "bg-green-600 text-white border-green-600"
              : "bg-transparent border-gray-500 text-gray-500 hover:border-green-400"
              }`}
          >
            Owner
          </button>
        </div>

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

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white shadow-lg hover:opacity-90 transition"
          >
            {isSignup ? "Sign Up" : "Sign In"} as {role}
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
    // <p>User</p>
  );
};

export default AuthPage;
