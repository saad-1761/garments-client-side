import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useContext, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductDetailsSkeleton from "../../components/Skeleton/ProductDetailsSceleton";
import { motion } from "framer-motion";
import { AuthContext } from "../../providers/AuthContext";
import useRole from "../../hooks/useRole";

const ProductDetails = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [role] = useRole();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  console.log("User in ProductDetails:", user);

  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      return result.data;
    },
  });

  const closeModal = () => {
    setIsOpen(false);
  };
  if (isLoading) return <ProductDetailsSkeleton />;
  const { image, name, description, category, quantity, price, seller } =
    product;
  console.log(seller.email);
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-6">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Section */}
            <div className="w-full">
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-square overflow-hidden rounded-2xl border border-sky-200/40 dark:border-sky-500/20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-md"
              >
                <img
                  className="h-full w-full object-cover"
                  src={image}
                  alt="Product image"
                />
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-6">
              <Heading title={name} subtitle={`Category: ${category}`} />

              <div className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {description}
              </div>

              {/* Seller */}
              <div className="flex items-center gap-3">
                <img
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-sky-400/30"
                  alt="Seller avatar"
                  referrerPolicy="no-referrer"
                  src={seller?.image}
                />
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200">
                  Seller: <span className="font-semibold">{seller?.name}</span>
                </p>
              </div>

              {/* Quantity */}
              <div className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                Quantity: <span className="font-semibold">{quantity}</span>{" "}
                units left
              </div>

              {/* Price & Action */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-sky-200/30 dark:border-sky-500/20">
                <p className="text-2xl sm:text-3xl font-bold text-sky-700 dark:text-sky-400">
                  ${price}
                </p>

                <div className="w-full sm:w-48">
                  <Button
                    onClick={() => setIsOpen(true)}
                    label="Order Now"
                    disabled={
                      role == "seller" || role == "admin" ? true : false
                    }
                  />
                </div>
              </div>

              <PurchaseModal
                product={product}
                closeModal={closeModal}
                isOpen={isOpen}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

export default ProductDetails;
