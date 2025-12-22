import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DeleteModal from "../../Modal/DeleteModal";
import UpdateProductModal from "../../Modal/UpdateProductModal";

const ManagerProductRow = ({ product, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const payment = useMemo(() => {
    const v = (product?.paymentOption || "cod").toLowerCase();
    return v === "payfirst" ? "PayFirst" : "Cash on Delivery";
  }, [product]);

  const del = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/manager/products/${id}`),
    onSuccess: async () => {
      toast.success("Product deleted");
      await refetch?.();
      setIsDeleteOpen(false);
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Delete failed"),
  });

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-base-300">
              <img
                src={product?.image}
                alt={product?.name}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </td>

      <td>
        <div className="min-w-0">
          <p className="font-semibold line-clamp-1">{product?.name}</p>
          <p className="text-xs text-base-content/60">{product?.category}</p>
        </div>
      </td>

      <td className="font-semibold">${product?.price}</td>

      <td>
        <span className="badge badge-outline badge-primary">{payment}</span>
      </td>

      <td className="text-right">
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-sm btn-outline btn-primary"
            onClick={() => setIsEditOpen(true)}
          >
            Update
          </button>
          <button
            className="btn btn-sm btn-outline btn-error"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete
          </button>
        </div>

        <DeleteModal
          isOpen={isDeleteOpen}
          closeModal={() => setIsDeleteOpen(false)}
          title="Delete Product?"
          message="This will permanently remove the product."
          confirmText="Yes, Delete"
          cancelText="No"
          isLoading={del.isPending}
          onConfirm={() => del.mutate(product?._id)}
        />

        <UpdateProductModal
          isOpen={isEditOpen}
          closeModal={() => setIsEditOpen(false)}
          product={product}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

export default ManagerProductRow;
