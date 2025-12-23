import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const categories = ["Shirt", "Pant", "Jacket", "Accessories"];
const paymentOptions = [
  { label: "Cash on Delivery", value: "cod" },
  { label: "PayFirst", value: "payfirst" },
];

const AddProductForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [previewUrls, setPreviewUrls] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      showOnHome: false,
      paymentOption: "cod",
    },
  });

  const imagesWatch = watch("images");
  useMemo(() => {
    if (!imagesWatch || !imagesWatch.length) return;
    const files = Array.from(imagesWatch);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviewUrls(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [imagesWatch]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload) => axiosSecure.post("/products", payload),
    onSuccess: () => {
      toast.success("Product added successfully");
      reset();
      setPreviewUrls([]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to add product");
    },
  });

  const onSubmit = async (data) => {
    try {
      const files = Array.from(data.images || []);
      if (files.length === 0) {
        toast.error("At least 1 image is required");
        return;
      }

      // upload multiple images
      const uploaded = await Promise.all(files.map((f) => imageUpload(f)));

      const payload = {
        images: uploaded,
        image: uploaded[0], // backward compatible
        name: data.name,
        description: data.description,
        category: data.category,
        quantity: Number(data.quantity),
        price: Number(data.price),
        minimumOrder: Number(data.minimumOrder),
        demoVideoLink: data.demoVideoLink || "",
        paymentOption: data.paymentOption,
        showOnHome: !!data.showOnHome,
        seller: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };

      await mutateAsync(payload);
    } catch (e) {
      toast.error(e?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] px-3 sm:px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="card bg-base-100/80 backdrop-blur border border-base-200 shadow-sm">
          <div className="card-body">
            <h2 className="text-xl sm:text-2xl font-semibold text-base-content">
              Add New Product
            </h2>
            <p className="text-sm text-base-content/70">
              Create a product with images, MOQ, payment mode and optional demo
              video.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Product Name / Title" error={errors.name}>
                  <input
                    {...register("name", { required: "Required" })}
                    className="input input-bordered w-full"
                    placeholder="Premium Cotton Shirt"
                  />
                </Field>

                <Field label="Category" error={errors.category}>
                  <select
                    {...register("category", { required: "Required" })}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Price" error={errors.price}>
                  <input
                    type="number"
                    {...register("price", { required: "Required", min: 1 })}
                    className="input input-bordered w-full"
                  />
                </Field>

                <Field label="Available Quantity" error={errors.quantity}>
                  <input
                    type="number"
                    {...register("quantity", { required: "Required", min: 1 })}
                    className="input input-bordered w-full"
                  />
                </Field>

                <Field
                  label="Minimum Order Quantity (MOQ)"
                  error={errors.minimumOrder}
                >
                  <input
                    type="number"
                    {...register("minimumOrder", {
                      required: "Required",
                      min: 1,
                    })}
                    className="input input-bordered w-full"
                  />
                </Field>

                <Field label="Payment Options" error={errors.paymentOption}>
                  <select
                    {...register("paymentOption", { required: "Required" })}
                    className="select select-bordered w-full"
                  >
                    {paymentOptions.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Demo Video Link (optional)"
                  error={errors.demoVideoLink}
                >
                  <input
                    {...register("demoVideoLink")}
                    className="input input-bordered w-full"
                    placeholder="https://youtube.com/..."
                  />
                </Field>

                <Field label="Images Upload (multiple)" error={errors.images}>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    {...register("images", {
                      required: "At least 1 image is required",
                    })}
                    className="file-input file-input-bordered w-full"
                  />
                </Field>
              </div>

              {/* image previews */}
              {previewUrls.length > 0 && (
                <div className="rounded-2xl border border-base-200 bg-base-200/40 p-3">
                  <p className="text-sm font-medium mb-2">Preview</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {previewUrls.map((src, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-xl overflow-hidden border border-base-300 bg-base-100"
                      >
                        <img
                          src={src}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* description */}
              <Field label="Product Description" error={errors.description}>
                <textarea
                  {...register("description", { required: "Required" })}
                  rows={4}
                  className="textarea textarea-bordered w-full"
                  placeholder="Detailed product information..."
                />
              </Field>

              {/* show on home */}
              {/* <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  {...register("showOnHome")}
                />
                <span className="text-sm text-base-content/80">
                  Show on Home Page (default: false)
                </span>
              </label> */}

              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary w-full"
              >
                {isPending ? (
                  <TbFidgetSpinner className="animate-spin" />
                ) : (
                  "Create Product"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;

const Field = ({ label, error, children }) => (
  <div className="space-y-1">
    <label className="text-sm text-base-content/70">{label}</label>
    {children}
    {error && <p className="text-xs text-error">{error.message}</p>}
  </div>
);
