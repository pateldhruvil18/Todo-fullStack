import { useState } from "react";
import { toast } from "sonner";
import { verifyOtp } from "../services/auth.service";

export default function Verify() {

  const [otp, setOtp] = useState("");

  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userId");

  const submit = async () => {

    try {

      await verifyOtp({ userId, otp });

      toast.success("Account verified");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);

    } catch (error:any) {

      const message =
        error?.response?.data?.message || "Invalid OTP";

      toast.error(message);

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">

        <h1 className="text-2xl font-bold mb-4 text-center">
          Verify OTP
        </h1>

        <input
          className="border p-3 w-full mb-3 rounded"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e)=>setOtp(e.target.value)}
        />

        <button
          onClick={submit}
          className="bg-black text-white w-full py-2 rounded"
        >
          Verify
        </button>

      </div>

    </div>
  );
}