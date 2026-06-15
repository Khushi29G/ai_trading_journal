"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initialBalance, setInitialBalance] =
    useState("10000");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    localStorage.setItem(
      "initialBalance",
      initialBalance
    );

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">
            AI Trading Journal
          </h1>

          <p className="text-slate-400 mt-2">
            Track, Analyze & Improve Your Trading
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-5"
        >
          <h2 className="text-3xl font-bold text-white">
            Welcome Back 👋
          </h2>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white"
            required
          />

          <input
            type="number"
            placeholder="Initial Account Balance"
            value={initialBalance}
            onChange={(e) =>
              setInitialBalance(
                e.target.value
              )
            }
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold p-3 rounded-xl"
          >
            Login
          </button>

          <p className="text-slate-400 text-center">
            New user?{" "}
            <a
              href="/signup"
              className="text-emerald-400"
            >
              Create Account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}