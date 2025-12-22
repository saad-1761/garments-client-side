// import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
// import { useState } from 'react'
// import useAxiosSecure from '../../hooks/useAxiosSecure'
// import toast from 'react-hot-toast'

// const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetch }) => {
//   const [updatedRole, setUpdatedRole] = useState(user?.role)

//   const axiosSecure = useAxiosSecure()

//   const handleRoleUpdate = async () => {
//     try {
//       await axiosSecure.patch('/update-role', {
//         email: user?.email,
//         role: updatedRole,
//       })
//       toast.success('Role Updated!')
//       refetch()
//     } catch (err) {
//       console.log(err)
//       toast.error(err?.response?.data?.message)
//     } finally {
//       closeModal()
//     }
//   }

//   return (
//     <>
//       <Dialog
//         open={isOpen}
//         as='div'
//         className='relative z-10 focus:outline-none'
//         onClose={closeModal}
//       >
//         <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
//           <div className='flex min-h-full items-center justify-center p-4'>
//             <DialogPanel
//               transition
//               className='w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl'
//             >
//               <DialogTitle
//                 as='h3'
//                 className='text-base/7 font-medium text-black'
//               >
//                 Update User Role
//               </DialogTitle>
//               <form>
//                 <div>
//                   <select
//                     value={updatedRole}
//                     onChange={e => setUpdatedRole(e.target.value)}
//                     className='w-full my-3 border border-gray-200 rounded-xl px-2 py-3'
//                     name='role'
//                     id=''
//                   >
//                     <option value='customer'>Customer</option>
//                     <option value='seller'>Seller</option>
//                     <option value='admin'>Admin</option>
//                   </select>
//                 </div>
//                 <div className='flex mt-2 justify-around'>
//                   <button
//                     onClick={handleRoleUpdate}
//                     type='button'
//                     className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
//                   >
//                     Update
//                   </button>
//                   <button
//                     type='button'
//                     className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
//                     onClick={closeModal}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </DialogPanel>
//           </div>
//         </div>
//       </Dialog>
//     </>
//   )
// }
// export default UpdateUserRoleModal

////

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
