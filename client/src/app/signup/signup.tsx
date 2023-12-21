"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { register as signup, type SignupFormData } from "@/lib/actions";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Signup() {
  const { pending } = useFormStatus();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({ mode: "onChange", delayError: 1000 });

  const onSubmit = handleSubmit((data) => {
    startTransition(() => signup(data as any));
  });

  return (
    <div
      key="1"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6"
    >
      <nav className="absolute top-0 p-5 w-full flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">SHEMS</h1>
      </nav>
      <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold text-white mb-2">Welcome to SHEMS</h2>
        <p className="text-gray-400 mb-8">
          Sign Up to the Smart Home Energy Management Systems
        </p>
        <div className="space-y-4">
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL}/login/github`}
            passHref={true}
          >
            <Button className="w-full flex items-center justify-center gap-2 dark:bg-white bg-white dark:hover:bg-gray-300 hover:bg-gray-300 py-3 px-4 rounded">
              <GithubIcon className="text-black dark:text-black hover:text-white dark:hover:text-white" />
              Continue with GitHub
            </Button>
          </Link>
        </div>
        <div className="my-6 flex items-center justify-between">
          <hr className="w-full bg-gray-700" />
          <p className="text-gray-400 px-3">or</p>
          <hr className="w-full bg-gray-700" />
        </div>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="flex">
            <input
              className="w-full bg-gray-700 text-white py-3 px-4 rounded"
              id="username"
              placeholder="Username"
              type="text"
              {...register("username", {
                required: true,
                minLength: 3,
                maxLength: 31,
              })}
            />
            {errors.username && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="destructive" className="ml-2 h-8">
                      <AlertCircle className="w-3 h-3" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    Username must be between 3 and 31 characters long
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="flex">
            <input
              className="w-full bg-gray-700 text-white py-3 px-4 rounded"
              id="name"
              placeholder="Full Name"
              type="text"
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 255,
              })}
            />
            {errors.name && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="destructive" className="ml-2 h-8">
                      <AlertCircle className="w-3 h-3" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    Full Name must be between 3 and 255 characters long
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="flex">
            <input
              className="w-full bg-gray-700 text-white py-3 px-4 rounded"
              id="address"
              placeholder="Address"
              type="text"
              {...register("billingAddress", {
                required: true,
                minLength: 3,
                maxLength: 255,
              })}
            />
            {errors.billingAddress && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="destructive" className="ml-2 h-8">
                      <AlertCircle className="w-3 h-3" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    Billing Address must be between 3 and 255 characters long
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="flex">
            <input
              className="w-full bg-gray-700 text-white py-3 px-4 rounded"
              id="password"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: true,
                minLength: 5,
                maxLength: 24,
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              })}
            />
            {errors.password && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="destructive" className="ml-2 h-8">
                      <AlertCircle className="w-3 h-3" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    Password must be between 5 and 24 characters long and
                    contain at least one number and one special character
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <Button
            className="w-full bg-black py-3 px-4 rounded text-white"
            type="submit"
            aria-disabled={pending}
          >
            Sign Up
          </Button>
        </form>
        <p className="text-gray-400 text-center mt-6">
          Have an account?
          <Link className="text-gray-400 hover:text-gray-300" href="/login">
            {" "}
            <u>Sign In Now</u>
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
