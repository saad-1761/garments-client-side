import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddProductForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload) => axiosSecure.post("/products", payload),
    onSuccess: () => {
      toast.success("Product added successfully");
      reset();
    },
    onError: () => {
      toast.error("Failed to add product");
    },
  });

  const onSubmit = async (data) => {
    const imageUrl = await imageUpload(data.image[0]);

    const payload = {
      image: imageUrl,
      name: data.name,
      description: data.description,
      category: data.category,
      quantity: Number(data.quantity),
      price: Number(data.price),
      minimumOrder: Number(data.minimumOrder),
      seller: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };

    await mutateAsync(payload);
  };

  return (
    <div className="min-h-screen px-4 py-10 flex justify-center items-center bg-gradient-to-br from-sky-50 to-cyan-100 dark:from-slate-900 dark:to-slate-950">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-sky-200/30 dark:border-sky-500/20 shadow-xl p-6 sm:p-8"
      >
        <h2 className="text-2xl font-semibold text-sky-700 dark:text-sky-400 mb-6">
          Add New Product
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <Field label="Product Name" error={errors.name}>
            <input
              {...register("name", { required: "Required" })}
              className="input"
              placeholder="Premium Cotton Shirt"
            />
          </Field>

          {/* Category */}
          <Field label="Category" error={errors.category}>
            <select
              {...register("category", { required: true })}
              className="input"
            >
              <option value="">Select</option>
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Jacket">Jacket</option>
              <option value="Accessories">Accessories</option>
            </select>
          </Field>

          {/* Price */}
          <Field label="Unit Price ($)" error={errors.price}>
            <input
              type="number"
              {...register("price", { required: true, min: 1 })}
              className="input"
            />
          </Field>

          {/* Quantity */}
          <Field label="Total Quantity" error={errors.quantity}>
            <input
              type="number"
              {...register("quantity", { required: true, min: 1 })}
              className="input"
            />
          </Field>

          {/* Minimum Order */}
          <Field label="Minimum Order Quantity" error={errors.minimumOrder}>
            <input
              type="number"
              {...register("minimumOrder", {
                required: "Required",
                min: { value: 1, message: "Must be at least 1" },
              })}
              className="input"
            />
          </Field>

          {/* Image */}
          <Field label="Product Image" error={errors.image}>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              className="file-input"
            />
          </Field>
        </div>

        {/* Description */}
        <div className="mt-6">
          <Field label="Description" error={errors.description}>
            <textarea
              {...register("description", { required: true })}
              rows={4}
              className="input resize-none"
            />
          </Field>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white py-3 font-medium hover:opacity-90 transition"
        >
          {isPending ? (
            <TbFidgetSpinner className="animate-spin mx-auto" />
          ) : (
            "Save Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;

const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-slate-600 dark:text-slate-300">
      {label}
    </label>
    {children}
    {error && <span className="text-xs text-red-500">{error.message}</span>}
  </div>
);
