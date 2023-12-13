"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { login } from "@/lib/actions";

export default function Login() {
  const { pending } = useFormStatus();

  return (
    <div
      key="1"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6"
    >
      <nav className="absolute top-0 p-5 w-full flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">shems</h1>
        <div className="flex items-center">
          <p className="text-sm text-gray-400 mr-2">Dark mode</p>
          <div className="w-12 h-6 flex items-center bg-gray-700 rounded-full p-1">
            <div className="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out" />
          </div>
        </div>
      </nav>
      <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold text-white mb-2">Welcome back</h2>
        <p className="text-gray-400 mb-8">Sign in to your account</p>
        <div className="space-y-4">
          <Link href="http://localhost:3000/login/github" passHref={true}>
            <Button className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 px-4 rounded">
              <GithubIcon className="text-white" />
              Continue with GitHub
            </Button>
          </Link>
        </div>
        <div className="my-6 flex items-center justify-between">
          <hr className="w-full bg-gray-700" />
          <p className="text-gray-400 px-3">or</p>
          <hr className="w-full bg-gray-700" />
        </div>
        <form className="space-y-6" action={login}>
          <div className="flex flex-col">
            <input
              className="w-full bg-gray-700 text-white py-3 px-4 rounded"
              id="username"
              name="username"
              placeholder="Username"
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <input
              className="w-full bg-gray-700 text-white py-3 px-4 rounded"
              id="password"
              name="password"
              placeholder="Password"
              type="password"
            />
            <Link
              className="text-sm text-gray-400 hover:text-gray-300 mt-2"
              href="#"
            >
              Forgot Password?
            </Link>
          </div>
          <Button
            className="w-full bg-black py-3 px-4 rounded text-white"
            type="submit"
            aria-disabled={pending}
          >
            Sign In
          </Button>
        </form>
        <p className="text-gray-400 text-center mt-6">
          Don't have an account?
          <Link className="text-gray-400 hover:text-gray-300" href="/signup">
            {" "}
            <u>Sign Up Now</u>
          </Link>
        </p>
      </div>
    </div>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
