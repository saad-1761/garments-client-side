import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../utils";

const categories = ["Shirt", "Pant", "Jacket", "Accessories"];
const paymentOptions = [
  { label: "Cash on Delivery", value: "cod" },
  { label: "PayFirst", value: "payfirst" },
];

const UpdateProductModal = ({ isOpen, closeModal, product, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const dialogRef = useRef(null);

  const initial = useMemo(() => {
    const oldImages =
      Array.isArray(product?.images) && product.images.length
        ? product.images
        : product?.image
        ? [product.image]
        : [];

    return {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price ?? "",
      category: product?.category || "",
      quantity: product?.quantity ?? "",
      minimumOrder: product?.minimumOrder ?? "",
      demoVideoLink: product?.demoVideoLink || "",
      paymentOption: (product?.paymentOption || "cod").toLowerCase(),
      showOnHome: !!product?.showOnHome,
      images: oldImages, // existing URLs
    };
  }, [product]);

  const [form, setForm] = useState(initial);
  const [newFiles, setNewFiles] = useState([]); // File[]
  const [previews, setPreviews] = useState([]); // objectURL previews

  useEffect(() => setForm(initial), [initial]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // previews for new files
  useEffect(() => {
    const urls = (newFiles || []).map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [newFiles]);

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!product?._id) throw new Error("Product id missing");

      // 1) upload new images if selected
      let finalImages = form.images;

      if (newFiles.length > 0) {
        const uploaded = await Promise.all(newFiles.map((f) => imageUpload(f)));
        finalImages = uploaded; // replace images with new ones (clean UX)
      }

      // 2) build payload
      const payload = {
        name: form.name,
        description: form.description,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
        minimumOrder: Number(form.minimumOrder),
        demoVideoLink: form.demoVideoLink || "",
        paymentOption: form.paymentOption, // cod | payfirst
        showOnHome: !!form.showOnHome,
        images: finalImages,
        image: finalImages?.[0] || "", // backward compatible
      };

      // 3) manager endpoint (recommended)
      return axiosSecure.patch(`/manager/products/${product._id}`, payload);
    },
    onSuccess: async () => {
      toast.success("Product updated");
      await refetch?.();
      setNewFiles([]);
      closeModal();
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err?.message || "Update failed"
      );
    },
  });

  if (!product) return null;

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <dialog ref={dialogRef} className="modal" onClose={closeModal}>
      <div className="modal-box w-11/12 max-w-4xl bg-base-100 text-base-content border border-base-200 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">Update Product</h3>
            <p className="text-sm text-base-content/70">
              Update product details, images, payment option, demo video & home
              visibility.
            </p>
          </div>
          <button
            className="btn btn-sm btn-ghost"
            onClick={closeModal}
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="divider my-3" />

        {/* Existing Images */}
        <div className="rounded-2xl border border-base-200 bg-base-200/40 p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Current Images</p>
            <span className="text-xs text-base-content/60">
              {form.images?.length || 0} image(s)
            </span>
          </div>

          {form.images?.length ? (
            <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {form.images.map((src, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl overflow-hidden border border-base-300 bg-base-100"
                >
                  <img
                    src={src}
                    alt="current"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-base-content/60 mt-2">No images</p>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateMutation.mutate();
          }}
          className="mt-4 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="form-control">
              <span className="label-text">Product Name</span>
              <input
                className="input input-bordered"
                name="name"
                value={form.name}
                onChange={onChange}
                required
              />
            </label>

            <label className="form-control">
              <span className="label-text">Category</span>
              <select
                className="select select-bordered"
                name="category"
                value={form.category}
                onChange={onChange}
                required
              >
                <option value="">Select</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-control">
              <span className="label-text">Price</span>
              <input
                className="input input-bordered"
                name="price"
                type="number"
                min="1"
                value={form.price}
                onChange={onChange}
                required
              />
            </label>

            <label className="form-control">
              <span className="label-text">Available Quantity</span>
              <input
                className="input input-bordered"
                name="quantity"
                type="number"
                min="0"
                value={form.quantity}
                onChange={onChange}
                required
              />
            </label>

            <label className="form-control">
              <span className="label-text">Minimum Order (MOQ)</span>
              <input
                className="input input-bordered"
                name="minimumOrder"
                type="number"
                min="1"
                value={form.minimumOrder}
                onChange={onChange}
                required
              />
            </label>

            <label className="form-control">
              <span className="label-text">Payment Option</span>
              <select
                className="select select-bordered"
                name="paymentOption"
                value={form.paymentOption}
                onChange={onChange}
                required
              >
                {paymentOptions.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-control md:col-span-2">
              <span className="label-text">Demo Video Link (optional)</span>
              <input
                className="input input-bordered"
                name="demoVideoLink"
                value={form.demoVideoLink}
                onChange={onChange}
                placeholder="https://youtube.com/..."
              />
            </label>

            <label className="form-control md:col-span-2">
              <span className="label-text">Description</span>
              <textarea
                className="textarea textarea-bordered min-h-24"
                name="description"
                value={form.description}
                onChange={onChange}
                required
              />
            </label>

            {/* Upload new images */}
            <label className="form-control md:col-span-2">
              <span className="label-text">
                Replace Images (upload multiple)
                <span className="text-xs text-base-content/60 ml-2">
                  (If you upload, old images will be replaced)
                </span>
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={(e) => setNewFiles(Array.from(e.target.files || []))}
              />
            </label>
          </div>

          {/* New previews */}
          {previews.length > 0 && (
            <div className="rounded-2xl border border-base-200 bg-base-200/40 p-3">
              <p className="text-sm font-semibold">New Image Preview</p>
              <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {previews.map((src, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl overflow-hidden border border-base-300 bg-base-100"
                  >
                    <img
                      src={src}
                      alt="new preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* show on home */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              name="showOnHome"
              checked={form.showOnHome}
              onChange={onChange}
            />
            <span className="text-sm text-base-content/80">
              Show on Home Page
            </span>
          </label>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button aria-label="Close" onClick={closeModal}>
          close
        </button>
      </form>
    </dialog>
  );
};

export default UpdateProductModal;
