import { signUp } from "@/actions/auth";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">
            AI Trading Journal
          </h1>

          <p className="text-slate-400 mt-2">
            Start Building Better Trading Habits
          </p>
        </div>

        <form
          action={signUp}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-5"
        >
          <h2 className="text-3xl font-bold text-white">
            Create Account 🚀
          </h2>

          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white focus:outline-none focus:border-emerald-500"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Create Password"
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white focus:outline-none focus:border-emerald-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold p-3 rounded-xl transition-all"
          >
            Create Account
          </button>

          <p className="text-slate-400 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-emerald-400 hover:text-emerald-300"
            >
              Login
            </a>
          </p>
        </form>

      </div>

    </div>
  );
}