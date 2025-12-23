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
  } = product || {};

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

  if (isLoading) return <ProductDetailsSkeleton />;

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-6">
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
        </div>
      </motion.div>
    </Container>
  );
};

export default ProductDetails;
