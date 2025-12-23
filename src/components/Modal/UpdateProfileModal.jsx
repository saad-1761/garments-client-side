import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../utils";

const UpdateProfileModal = ({ isOpen, closeModal, dbUser, onUpdated }) => {
  const dialogRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const { updateUserProfile } = useAuth(); // from your auth hook

  const [preview, setPreview] = useState("");

  const defaults = useMemo(
    () => ({
      name: dbUser?.name || "",
      image: null,
    }),
    [dbUser]
  );

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: defaults,
  });

  // reset when user changes or modal opens
  useEffect(() => {
    reset(defaults);
    setPreview(dbUser?.image || "");
  }, [defaults, reset, dbUser]);

  // preview local file
  const watchedFile = watch("image");
  useEffect(() => {
    const file = watchedFile?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [watchedFile]);

  // open/close dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      if (!dbUser?._id) throw new Error("User id not found");

      const name = formData?.name?.trim();
      const imageFile = formData?.image?.[0];

      let imageURL = dbUser?.image || "";

      // upload new image if selected
      if (imageFile) {
        imageURL = await imageUpload(imageFile);
      }

      // ✅ update by mongo id
      await axiosSecure.patch(`/users/${dbUser._id}`, {
        name,
        image: imageURL,
      });

      // ✅ update firebase profile for navbar/avatar consistency (optional but recommended)
      if (updateUserProfile) {
        await updateUserProfile(name, imageURL);
      }

      return { name, imageURL };
    },
    onSuccess: async () => {
      toast.success("Profile updated");
      await onUpdated?.();
      closeModal();
    },
    onError: (err) => {
      toast.error(err?.message || "Update failed");
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <dialog ref={dialogRef} className="modal" onClose={closeModal}>
      <div className="modal-box w-11/12 max-w-lg bg-base-100 text-base-content border border-base-200 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">Update Profile</h3>
            <p className="text-sm text-base-content/70">
              Update your name and upload a new photo.
            </p>
          </div>

          <button
            className="btn btn-sm btn-ghost"
            type="button"
            onClick={closeModal}
          >
            ✕
          </button>
        </div>

        <div className="divider my-3" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Preview */}
          <div className="flex items-center gap-3 p-3 rounded-2xl border border-base-200 bg-base-200/40">
            <div className="avatar">
              <div className="w-14 h-14 rounded-full ring-1 ring-base-300 bg-base-200 overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-base-content/50">
                    <span className="text-xl font-semibold">
                      {(dbUser?.name?.[0] || "U").toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="min-w-0">
              <p className="font-semibold line-clamp-1">{dbUser?.email}</p>
              <p className="text-xs text-base-content/70">
                Uploading will replace current photo.
              </p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block mb-1 text-sm text-base-content/70">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-lg bg-base-200 border border-primary/20 focus:ring-2 focus:ring-primary outline-none transition"
              {...register("name", { required: true })}
            />
          </div>

          {/* File */}
          <div>
            <label className="block mb-1 text-sm text-base-content/70">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:bg-primary/10 file:text-primary
              hover:file:bg-primary/20
              bg-base-200 border border-dashed border-primary/30
              rounded-lg cursor-pointer transition"
              {...register("image")}
            />
            <p className="mt-1 text-xs text-base-content/60">
              PNG/JPG recommended.
            </p>
          </div>

          {/* Actions */}
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

export default UpdateProfileModal;
