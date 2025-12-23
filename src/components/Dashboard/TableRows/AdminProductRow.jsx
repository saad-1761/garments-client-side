/* eslint-disable no-unused-vars */

import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import UpdateProductModal from "../../Modal/UpdateProductModal";
import ConfirmModal from "../../Modal/ConfirmModal";

const formatMoney = (n) => {
  const num = Number(n || 0);
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
};

const formatDateTime = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d);
};

const AdminProductRow = ({ product, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const createdBy = useMemo(() => {
    const name = product?.seller?.name || "Unknown";
    const email = product?.seller?.email || "";
    return email ? `${name} (${email})` : name;
  }, [product]);

  // Toggle: Show on Home + bump date to NOW when enabling
  const toggleMutation = useMutation({
    mutationFn: async (checked) => {
      // ✅ Backend recommendation:
      // PATCH /products/:id/show-home { showOnHome: checked, bumpDate: checked }
      // If you don't have it yet, implement similarly to your verifyJWT/verifyADMIN.
      const payload = {
        showOnHome: checked,
        bumpDate: checked, // when true => update date = new Date()
      };
      return axiosSecure.patch(`/products/${product?._id}/show-home`, payload);
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      // ✅ Backend recommendation:
      // DELETE /products/:id
      return axiosSecure.delete(`/products/${product?._id}`);
    },
    onSuccess: async () => {
      setIsDeleteOpen(false);
      await refetch();
    },
  });

  const isToggling = toggleMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  return (
    <>
      <tr className="align-middle">
        {/* Image */}
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 h-12 rounded-lg ring-1 ring-base-300 bg-base-200 overflow-hidden">
                <img
                  src={product?.image}
                  alt={product?.name || "Product"}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </td>

        {/* Product */}
        <td>
          <div className="flex flex-col">
            <span className="font-semibold text-base-content line-clamp-1">
              {product?.name || "—"}
            </span>
            <span className="text-xs text-base-content/70 line-clamp-1">
              Created: {formatDateTime(product?.date)}
            </span>
          </div>
        </td>

        {/* Price */}
        <td className="font-medium">{formatMoney(product?.price)}</td>

        {/* Category */}
        <td>
          <span className="badge badge-outline">
            {product?.category || "—"}
          </span>
        </td>

        {/* Created By */}
        <td className="max-w-[260px]">
          <div className="flex flex-col">
            <span className="text-sm text-base-content line-clamp-1">
              {product?.seller?.name || "Unknown"}
            </span>
            <span className="text-xs text-base-content/70 line-clamp-1">
              {product?.seller?.email || ""}
            </span>
          </div>
        </td>

        {/* Show on Home */}
        <td>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={!!product?.showOnHome}
              disabled={isToggling}
              onChange={(e) => toggleMutation.mutate(e.target.checked)}
            />
            <span className="text-sm text-base-content/80">
              {product?.showOnHome ? "On" : "Off"}
            </span>
          </div>
          {toggleMutation.isError && (
            <p className="text-xs text-error mt-1">
              Failed to update. Try again.
            </p>
          )}
          {product?.showOnHome && (
            <p className="text-xs text-base-content/60 mt-1">
              Tip: toggling ON bumps date → latest
            </p>
          )}
        </td>

        {/* Actions */}
        <td className="text-right">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => setIsEditOpen(true)}
            >
              Update
            </button>

            <button
              type="button"
              className="btn btn-sm btn-error btn-outline"
              onClick={() => setIsDeleteOpen(true)}
              disabled={isDeleting}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {/* Update Modal */}
      <UpdateProductModal
        isOpen={isEditOpen}
        closeModal={() => setIsEditOpen(false)}
        product={product}
        refetch={refetch}
      />

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        closeModal={() => setIsDeleteOpen(false)}
        title="Delete product?"
        description={`This will permanently delete "${product?.name}". This action cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Yes, Delete"}
        confirmVariant="error"
        onConfirm={() => deleteMutation.mutate()}
        disabled={isDeleting}
      />
    </>
  );
};

export default AdminProductRow;
