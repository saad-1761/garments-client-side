// import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
// import UpdateProductForm from "../Form/UpdateProductForm";

// const UpdateProductModal = ({ setIsEditModalOpen, isOpen }) => {
//   return (
//     <Dialog
//       open={isOpen}
//       as="div"
//       className="relative z-10 focus:outline-none "
//       onClose={() => setIsEditModalOpen(false)}
//     >
//       <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//         <div className="flex min-h-full items-center justify-center p-4">
//           <DialogPanel
//             transition
//             className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
//           >
//             <div className="flex justify-end">
//               <button
//                 onClick={() => setIsEditModalOpen(false)}
//                 className="bg-red-100 px-3 py-1 rounded-md text-red-500 cursor-pointer"
//               >
//                 X
//               </button>
//             </div>
//             <DialogTitle
//               as="h3"
//               className="text-lg font-medium text-center leading-6 text-gray-900"
//             >
//               Update Product Info
//             </DialogTitle>
//             <div className="mt-2 w-full">
//               <UpdateProductForm />
//             </div>
//           </DialogPanel>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// export default UpdateProductModal;
///////////////////////////////////////////////
import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateProductModal = ({ isOpen, closeModal, product, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const dialogRef = useRef(null);

  const initial = useMemo(
    () => ({
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price ?? "",
      category: product?.category || "",
      image: product?.image || "",
      quantity: product?.quantity ?? "",
      minimumOrder: product?.minimumOrder ?? "",
      demoVideo: product?.demoVideo || "",
      paymentOptions: product?.paymentOptions || "",
    }),
    [product]
  );

  const [form, setForm] = useState(initial);

  useEffect(() => setForm(initial), [initial]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const updateMutation = useMutation({
    mutationFn: async () => {
      // ✅ Backend recommendation:
      // PATCH /products/:id  (admin)
      return axiosSecure.patch(`/products/${product?._id}`, form);
    },
    onSuccess: async () => {
      await refetch();
      closeModal();
    },
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  return (
    <dialog ref={dialogRef} className="modal" onClose={closeModal}>
      <div className="modal-box w-11/12 max-w-3xl bg-base-100 text-base-content">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">Update Product</h3>
            <p className="text-sm text-base-content/70">
              Edit product info (name, description, price, category, images,
              demo video, payment options).
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateMutation.mutate();
          }}
          className="space-y-4"
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
              <input
                className="input input-bordered"
                name="category"
                value={form.category}
                onChange={onChange}
                required
              />
            </label>

            <label className="form-control">
              <span className="label-text">Price</span>
              <input
                className="input input-bordered"
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={onChange}
                required
              />
            </label>

            <label className="form-control">
              <span className="label-text">Image URL</span>
              <input
                className="input input-bordered"
                name="image"
                value={form.image}
                onChange={onChange}
                required
              />
            </label>

            <label className="form-control">
              <span className="label-text">Quantity</span>
              <input
                className="input input-bordered"
                name="quantity"
                type="number"
                min="0"
                value={form.quantity}
                onChange={onChange}
              />
            </label>

            <label className="form-control">
              <span className="label-text">Minimum Order</span>
              <input
                className="input input-bordered"
                name="minimumOrder"
                type="number"
                min="0"
                value={form.minimumOrder}
                onChange={onChange}
              />
            </label>

            <label className="form-control md:col-span-2">
              <span className="label-text">Description</span>
              <textarea
                className="textarea textarea-bordered min-h-24"
                name="description"
                value={form.description}
                onChange={onChange}
              />
            </label>

            <label className="form-control md:col-span-2">
              <span className="label-text">Demo Video URL</span>
              <input
                className="input input-bordered"
                name="demoVideo"
                value={form.demoVideo}
                onChange={onChange}
                placeholder="https://youtube.com/..."
              />
            </label>

            <label className="form-control md:col-span-2">
              <span className="label-text">Payment Options</span>
              <input
                className="input input-bordered"
                name="paymentOptions"
                value={form.paymentOptions}
                onChange={onChange}
                placeholder="COD, Stripe, SSLCommerz..."
              />
            </label>
          </div>

          {updateMutation.isError && (
            <div className="alert alert-error">
              <span>Update failed. Please try again.</span>
            </div>
          )}

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

      {/* backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button aria-label="Close" onClick={closeModal}>
          close
        </button>
      </form>
    </dialog>
  );
};

export default UpdateProductModal;
