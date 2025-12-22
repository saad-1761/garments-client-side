// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { Link, useSearchParams } from 'react-router'
// import { IoBagCheckOutline } from 'react-icons/io5'
// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams()
//   const sessionId = searchParams.get('session_id')
//   useEffect(() => {
//     if (sessionId) {
//       axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
//         sessionId,
//       })
//     }
//   }, [sessionId])
//   return (
//     <div className='flex flex-col items-center justify-center'>
//       <div className='bg-white p-10 rounded-lg shadow-lg text-center'>
//         <IoBagCheckOutline className='w-16 h-16 text-green-500 mx-auto mb-4' />
//         <h1 className='text-3xl font-bold text-gray-800 mb-2'>
//           Payment Successful!
//         </h1>
//         <p className='text-gray-600 mb-6'>
//           Thank you for your purchase. Your order is being processed.
//         </p>
//         <Link
//           to='/dashboard/my-orders'
//           className='inline-block bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition duration-300'
//         >
//           Go to My Orders
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default PaymentSuccess

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
