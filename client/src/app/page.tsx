import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "@/lib/useSessionHook";
import { BarChartIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Landing() {
  const session = await useSession();
  if (session && session.isTokenValid) {
    redirect("/dashboard");
  }
  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center bg-slate-900">
        <Link className="flex items-center justify-center" href="#">
          <BarChartIcon className="h-6 w-6" />
          <span className="sr-only">Smart Energy Home</span>
        </Link>
      </header>
      <main className="flex flex-1 bg-slate-900 dark:bg-slate-900">
        <div className="flex-1">
          <section className="w-full pt-12 md:pt-24 lg:pt-32">
            <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
              <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                <div>
                  <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                    shems
                  </h1>
                  <br />
                  <h3 className="text-lg text-gray-300 dark:text-gray-300 font-bold tracking-tighter sm:text-2xl md:text-3xl xl:text-[2.4rem] 2xl:text-[2.75rem]">
                    the future of energy management
                  </h3>
                </div>
                <div className="flex flex-col items-start space-y-4">
                  <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl dark:text-gray-300">
                    Unlock the potential of smart energy management in your
                    home. Experience efficiency like never before.
                  </p>
                  <div className="space-x-4">
                    <Link
                      className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-slate-600 dark:hover:text-white dark:focus-visible:ring-gray-300"
                      href="/signup"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
              <img
                alt="Hero"
                className="mx-auto overflow-hidden rounded-t-xl object-cover"
                height="500"
                src="/landing.png"
                width="1270"
              />
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className=" w-full space-y-12 px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                    Key Features
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Smart Energy Home Features
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Discover the suite of features that makes Smart Energy Home
                    a leader in the home energy management industry.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                <Card className="bg-slate-800 dark:bg-slate-800">
                  <CardHeader>
                    <h3 className="text-lg font-bold">Energy Optimization</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Our system optimizes your energy usage based on your
                      personal routines and preferences.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800 dark:bg-slate-800">
                  <CardHeader>
                    <h3 className="text-lg font-bold">Real-time Monitoring</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Get real-time updates on your energy consumption and make
                      informed decisions.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800 dark:bg-slate-800">
                  <CardHeader>
                    <h3 className="text-lg font-bold">
                      Smart Device Integration
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Integrate seamlessly with your smart devices for a fully
                      automated home energy management.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-center flex-col sm:flex-row items-start gap-4">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-slate-600 dark:hover:text-white dark:focus-visible:ring-gray-300"
                  href="/signup"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
