import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import banner1 from "../../assets/images/Banner-1.jpg";
import banner2 from "../../assets/images/Banner-2.jpg";
import banner3 from "../../assets/images/Banner-3.jpg";
import banner4 from "../../assets/images/Banner-4.jpg";
import { NavLink } from "react-router-dom";

const slides = [
  {
    image: banner1,
    title: "Smart Garment Production",
    subtitle: "Digitally managing every step from cutting to shipment.",
  },
  {
    image: banner2,
    title: "Built for Factory Performance",
    subtitle: "Optimized workflows for efficiency, quality, and scale.",
  },
  {
    image: banner3,
    title: "Precision in Every Stitch",
    subtitle: "Data-driven control for quality, compliance, and consistency.",
  },
  {
    image: banner4,
    title: "Future-Ready Apparel Systems",
    subtitle: "Designed to adapt with modern garment manufacturing needs.",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const Banner = () => {
  return (
    <section className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] my-8">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full w-full bg-cover bg-center rounded-2xl"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Ocean Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#003B5C]/85 via-[#0077B6]/65 to-[#00B4D8]/45 rounded-2xl" />

              {/* Content Wrapper */}
              <div className="relative z-10 flex h-full items-center justify-center md:justify-start">
                <div className="w-full max-w-7xl px-4 sm:px-6 md:px-12">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="
                      mx-auto md:mx-0
                      max-w-sm sm:max-w-md md:max-w-lg
                      backdrop-blur-lg bg-white/10
                      border border-white/20
                      rounded-2xl
                      p-5 sm:p-7 md:p-10
                      text-center md:text-left
                    "
                  >
                    <motion.h1
                      variants={itemVariants}
                      className="
                        text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                        font-bold text-white
                        leading-snug
                      "
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      variants={itemVariants}
                      className="
                        mt-3 sm:mt-4
                        text-sm sm:text-base md:text-lg
                        text-sky-100
                      "
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.div
                      variants={itemVariants}
                      className="mt-5 sm:mt-6"
                    >
                      <NavLink
                        to="/all-products"
                        className="
                          w-full sm:w-auto
                          px-6 py-3
                          rounded-xl
                          bg-sky-500/90 hover:bg-sky-400
                          text-white font-medium
                          transition
                          backdrop-blur
                        "
                      >
                        View Products
                      </NavLink>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
