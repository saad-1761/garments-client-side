import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IoBagCheckOutline } from "react-icons/io5";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth"; // adjust path if needed
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const ranRef = useRef(false);

  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [status, setStatus] = useState("processing"); // processing | done | error

  useEffect(() => {
    if (!sessionId) return;

    // ✅ prevent double run (React strict mode)
    if (ranRef.current) return;
    ranRef.current = true;

    const run = async () => {
      try {
        setStatus("processing");

        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/payment-success`,
          { sessionId }
        );

        // ✅ Invalidate common caches
        await queryClient.invalidateQueries({ queryKey: ["products"] });

        if (user?.email) {
          await queryClient.invalidateQueries({
            queryKey: ["my-orders", user.email],
          });
        }

        // ✅ If backend returns productId, refresh that product detail too
        if (data?.productId) {
          await queryClient.invalidateQueries({
            queryKey: ["product", data.productId],
          });
        }

        toast.success("Payment confirmed. Order created.");
        setStatus("done");
      } catch (err) {
        toast.error(
          err?.response?.data?.message || "Payment confirmation failed"
        );
        setStatus("error");
      }
    };

    run();
  }, [sessionId, queryClient, user?.email]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10 bg-base-100">
      <div
        className="
          w-full max-w-md rounded-2xl
          bg-base-100/80 backdrop-blur
          border border-base-200 shadow-2xl
          p-7 text-center
          animate-[fadeInUp_.35s_ease-out]
        "
      >
        <IoBagCheckOutline className="w-16 h-16 text-success mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-base-content">
          {status === "processing"
            ? "Confirming Payment..."
            : status === "done"
            ? "Payment Successful!"
            : "Something Went Wrong"}
        </h1>

        <p className="text-sm text-base-content/70 mt-2">
          {status === "processing"
            ? "Please wait while we verify your payment and create your order."
            : status === "done"
            ? "Thanks! Your order is now being processed."
            : "We couldn’t confirm your payment. If money was deducted, contact support."}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link to="/dashboard/my-orders" className="btn btn-primary flex-1">
            Go to My Orders
          </Link>

          <Link to="/all-products" className="btn btn-outline flex-1">
            Continue Shopping
          </Link>
        </div>

        {status === "processing" && (
          <div className="mt-5">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}
      </div>

      {/* simple keyframes */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default PaymentSuccess;
