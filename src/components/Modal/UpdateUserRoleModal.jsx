import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetch }) => {
  const [updatedRole, setUpdatedRole] = useState(user?.role);
  const [saving, setSaving] = useState(false);

  const axiosSecure = useAxiosSecure();

  // ✅ keep current behavior but also sync role when opening modal
  useEffect(() => {
    if (isOpen) setUpdatedRole(user?.role);
  }, [isOpen, user?.role]);

  const handleRoleUpdate = async () => {
    try {
      setSaving(true);
      await axiosSecure.patch("/update-role", {
        email: user?.email,
        role: updatedRole,
      });

      toast.success("Role Updated!");
      refetch();
      closeModal();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to update role");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={saving ? () => {} : closeModal}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            className="
              w-full max-w-lg
              rounded-2xl
              border border-base-200
              bg-base-100 text-base-content
              shadow-2xl
              p-6
            "
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <DialogTitle as="h3" className="text-lg font-semibold">
                  Update User Role
                </DialogTitle>
                <p className="mt-1 text-sm text-base-content/70 break-all">
                  {user?.email}
                </p>
              </div>

              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={closeModal}
                disabled={saving}
              >
                ✕
              </button>
            </div>

            <div className="divider my-4" />

            <div className="space-y-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-base-content/70">
                    Select Role
                  </span>
                </div>

                <select
                  value={updatedRole}
                  onChange={(e) => setUpdatedRole(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="customer">Customer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>

                <div className="label">
                  <span className="label-text-alt text-base-content/60">
                    Tip: role changes affect dashboard permissions.
                  </span>
                </div>
              </label>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  className="btn btn-primary flex-1"
                  onClick={handleRoleUpdate}
                  disabled={saving || !updatedRole}
                >
                  {saving ? "Updating..." : "Update"}
                </button>

                <button
                  type="button"
                  className="btn btn-outline flex-1"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateUserRoleModal;
