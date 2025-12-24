import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const statuses = [
  "Cutting Completed",
  "Sewing Started",
  "Finishing",
  "QC Checked",
  "Packed",
  "Shipped",
  "Out for Delivery",
];

const TrackingModal = ({ isOpen, closeModal, order, onSuccess }) => {
  const dialogRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
  }, [isOpen]);

  const mutation = useMutation({
    mutationFn: async (payload) =>
      axiosSecure.post(`/tracking/${order._id}`, payload),
    onSuccess: async () => {
      toast.success("Tracking updated");
      reset();
      closeModal();
      onSuccess?.();
    },
    onError: (e) =>
      toast.error(e?.response?.data?.message || "Tracking failed"),
  });

  if (!order) return null;

  return (
    <dialog ref={dialogRef} className="modal" onClose={closeModal}>
      <div className="modal-box bg-base-100 text-base-content border border-base-200">
        <h3 className="font-bold text-lg">Add Tracking Update</h3>
        <p className="text-sm text-base-content/70 mt-1">
          Order: <span className="font-mono text-xs">{order?._id}</span>
        </p>

        <form
          className="mt-4 space-y-3"
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
        >
          <label className="form-control w-full flex flex-col">
            <div className="label">
              <span className="label-text">Status</span>
            </div>
            <select
              className="select select-bordered"
              {...register("status", { required: true })}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control w-full flex flex-col">
            <div className="label">
              <span className="label-text">Location</span>
            </div>
            <input
              className="input input-bordered"
              {...register("location")}
              placeholder="Warehouse / Hub / City"
            />
          </label>

          <label className="form-control w-full flex flex-col">
            <div className="label">
              <span className="label-text">Note</span>
            </div>
            <textarea
              className="textarea textarea-bordered"
              {...register("note")}
              placeholder="Optional note..."
            />
          </label>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Save"}
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

export default TrackingModal;
