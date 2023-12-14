import { Button } from "@/components/ui/button";
import { completeProfile } from "@/lib/actions";

export default function Register() {
  return (
    <div
      key="1"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6"
    >
      <nav className="absolute top-0 p-5 w-full flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">shems</h1>
      </nav>
      <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold text-white mb-8">
          Complete your Profile
        </h2>
        <form className="space-y-6" action={completeProfile}>
          <div className="flex flex-col">
            <input
              className="w-full bg-gray-700 text-white py-3 px-4 rounded"
              id="name"
              name="name"
              placeholder="Full Name"
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <input
              className="w-full bg-gray-700 text-white py-3 px-4 rounded"
              id="address"
              name="billingAddress"
              placeholder="Address"
              type="text"
            />
          </div>
          <Button
            className="w-full bg-black py-3 px-4 rounded text-white"
            type="submit"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
