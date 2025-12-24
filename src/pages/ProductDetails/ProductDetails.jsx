/* eslint-disable no-unused-vars */

import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductDetailsSkeleton from "../../components/Skeleton/ProductDetailsSceleton";
import { motion } from "framer-motion";
import { AuthContext } from "../../providers/AuthContext";
import useRole from "../../hooks/useRole";

const ProductDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role] = useRole();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const {
    data: product = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      return res.data;
    },
  });

  const {
    image,
    images,
    name,
    description,
    category,
    quantity = 0,
    price = 0,
    seller,
    minimumOrder = 1,
    paymentOption, // "cod" | "payfirst"
    demoVideoLink, // ✅ added
  } = product || {};

  // 🔥 Dynamic tab title based on product name
  useEffect(() => {
    if (!name) return;

    const previousTitle = document.title;
    document.title = `${name} | Fabrica`;

    return () => {
      document.title = previousTitle;
    };
  }, [name]);

  // ✅ Build gallery safely (supports new + old db)
  const gallery = useMemo(() => {
    const arr = Array.isArray(images) ? images.filter(Boolean) : [];
    if (image && !arr.includes(image)) arr.unshift(image);
    return arr;
  }, [images, image]);

  // ✅ Active image state
  const [activeImg, setActiveImg] = useState("");

  // ✅ Set default active image when product/gallery changes
  useEffect(() => {
    setActiveImg(gallery?.[0] || "");
  }, [gallery, id]);

  const closeModal = () => setIsOpen(false);

  const isOrderDisabled =
    quantity < minimumOrder ||
    role === "seller" ||
    role === "admin" ||
    role === "manager";

  const paymentLabel =
    (paymentOption || "").toLowerCase() === "cod"
      ? "Cash on Delivery"
      : (paymentOption || "").toLowerCase() === "payfirst"
      ? "Pay First (Online)"
      : "Online / COD";

  // ✅ Demo video helpers (render only when link exists)
  const demoUrl = useMemo(() => {
    const raw = (demoVideoLink || "").trim();
    if (!raw) return "";

    // YouTube: watch?v= -> embed/
    if (raw.includes("youtube.com/watch")) {
      const u = new URL(raw);
      const v = u.searchParams.get("v");
      return v ? `https://www.youtube.com/embed/${v}` : raw;
    }

    // YouTube short: youtu.be/ -> embed/
    if (raw.includes("youtu.be/")) {
      const id = raw.split("youtu.be/")[1]?.split(/[?&]/)[0];
      return id ? `https://www.youtube.com/embed/${id}` : raw;
    }

    // YouTube embed already
    if (raw.includes("youtube.com/embed/")) return raw;

    // Vimeo: vimeo.com/{id} -> player embed
    if (raw.includes("vimeo.com/")) {
      const id = raw.split("vimeo.com/")[1]?.split(/[?&]/)[0];
      return id ? `https://player.vimeo.com/video/${id}` : raw;
    }

    // Fallback: try using link directly in iframe (works for many providers)
    return raw;
  }, [demoVideoLink]);

  const hasDemo = !!demoUrl;

  if (isLoading) return <ProductDetailsSkeleton />;

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-6">
          {/* Main Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="w-full">
              <div className="rounded-2xl border border-base-200 bg-base-100/60 backdrop-blur shadow-sm p-3">
                {/* Main image (slightly smaller) */}
                <div className="relative w-full aspect-[4/3] lg:aspect-[5/4] overflow-hidden rounded-2xl bg-base-200">
                  {activeImg ? (
                    <img
                      className="h-full w-full object-cover"
                      src={activeImg}
                      alt={name || "Product"}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-base-content/50">
                      No Image
                    </div>
                  )}
                </div>

                {/* Thumbnails (smaller on small screens) */}
                {gallery.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    {gallery.map((src) => {
                      const isActive = src === activeImg;
                      return (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setActiveImg(src)}
                          className={`shrink-0 rounded-xl border transition ${
                            isActive
                              ? "border-primary"
                              : "border-base-200 hover:border-primary/50"
                          }`}
                        >
                          <img
                            src={src}
                            alt="preview"
                            className="object-cover rounded-xl w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6">
              <Heading title={name} subtitle={`Category: ${category}`} />

              <div className="text-base sm:text-lg text-base-content/80 leading-relaxed">
                {description}
              </div>

              {/* Seller */}
              <div className="flex items-center gap-3">
                <img
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
                  alt="Seller avatar"
                  referrerPolicy="no-referrer"
                  src={seller?.image}
                />
                <p className="text-sm sm:text-base text-base-content">
                  Seller: <span className="font-semibold">{seller?.name}</span>
                </p>
              </div>

              {/* Stock & MOQ */}
              <div className="text-sm sm:text-base text-base-content/70">
                Available Quantity:{" "}
                <span className="font-semibold">{quantity}</span>
              </div>

              <div className="text-sm sm:text-base text-base-content/70">
                Minimum Order:{" "}
                <span className="font-semibold">{minimumOrder}</span>
              </div>

              {/* Payment info */}
              <div className="text-sm sm:text-base text-base-content/70">
                Payment: <span className="font-semibold">{paymentLabel}</span>
              </div>

              {quantity < minimumOrder && (
                <p className="text-sm font-medium text-error">
                  Not enough stock to meet the minimum order quantity.
                </p>
              )}

              {/* Price + CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-base-200">
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  ${price}
                </p>

                <div className="w-full sm:w-56">
                  <Button
                    onClick={() => setIsOpen(true)}
                    label={
                      quantity < minimumOrder
                        ? `Minimum order is ${minimumOrder}`
                        : "Order Now"
                    }
                    disabled={isOrderDisabled}
                  />
                </div>
              </div>

              {/* Purchase Modal (pass refetch so quantity updates immediately after COD) */}
              <PurchaseModal
                product={product}
                closeModal={closeModal}
                isOpen={isOpen}
                refetchProduct={refetch}
                activeImage={activeImg}
              />
            </div>
          </div>

          {/* ✅ Demo Video Section (BOTTOM) */}
          {hasDemo && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
              className="mt-10"
            >
              <div className="rounded-2xl border border-base-200 bg-base-100/70 backdrop-blur shadow-sm overflow-hidden">
                <div className="p-4 sm:p-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-base-content">
                      Live Product Demo
                    </h3>
                    <p className="mt-1 text-sm text-base-content/70">
                      Get a better view of the product live before ordering.
                    </p>
                  </div>

                  {/* Responsive: column on small, 2 columns on md+ */}
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-stretch">
                    {/* Left: Video Preview */}
                    <div className="rounded-2xl border border-base-200 bg-base-200/40 overflow-hidden">
                      <div className="relative w-full aspect-video">
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={demoUrl}
                          title="Product demo preview"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>

                    {/* Right: Text + Watch Now */}
                    <div className="rounded-2xl border border-base-200 bg-base-200/40 p-5 sm:p-6 flex flex-col justify-center">
                      <p className="text-base sm:text-lg font-semibold text-base-content">
                        Watch now
                      </p>
                      <p className="mt-2 text-sm sm:text-base text-base-content/70 leading-relaxed">
                        Get a better view of the product live — check the
                        material, fit, and details before placing your order.
                      </p>

                      <div className="mt-5 flex flex-col sm:flex-row gap-3">
                        <a
                          href={demoVideoLink}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary"
                        >
                          Watch Now
                        </a>

                        <button
                          type="button"
                          className="btn btn-outline"
                          onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }
                        >
                          Back to Top
                        </button>
                      </div>

                      <p className="mt-4 text-xs text-base-content/60">
                        Tip: Open the video in a new tab for full-screen
                        playback.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </Container>
  );
};

export default ProductDetails;
