import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import UpdateProfileModal from "../../../components/Modal/UpdateProfileModal";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: dbUser,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["db-user-me", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/users/me");
      return res.data; // must include _id, role, name, image, email
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const name = dbUser?.name || user?.displayName || "—";
  const email = dbUser?.email || user?.email || "—";
  const image = dbUser?.image || user?.photoURL || "";
  const role = dbUser?.role || "user";
  const userId = dbUser?._id || user?.uid || "—";

  return (
    <section className="w-full">
      <div className="mx-auto max-w-3xl px-3 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-base-content">
              Profile
            </h1>
            <p className="text-sm text-base-content/70 break-all">{email}</p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-outline btn-primary"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching ? "Refreshing..." : "Refresh"}
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsOpen(true)}
            >
              Update
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="mt-5 card bg-base-100/80 backdrop-blur border border-base-200 shadow-sm transition-all duration-200">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Avatar */}
              <div className="avatar">
                <div className="w-20 h-20 rounded-full ring-1 ring-base-300 bg-base-200 overflow-hidden">
                  {image ? (
                    <img
                      src={image}
                      alt={name}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-base-content/50">
                      <span className="text-2xl font-semibold">
                        {(name?.[0] || "U").toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-lg font-semibold text-base-content line-clamp-1">
                  {name}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="badge badge-primary badge-outline uppercase">
                    {role}
                  </span>

                  <span className="badge badge-ghost">
                    User ID:{" "}
                    <span className="font-mono ml-1 break-all">{userId}</span>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                <button
                  type="button"
                  className="hidden btn btn-outline btn-primary"
                  onClick={() => setIsOpen(true)}
                >
                  Update Profile
                </button>

                <button type="button" className="btn btn-outline">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <UpdateProfileModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          dbUser={dbUser}
          onUpdated={refetch}
        />
      </div>
    </section>
  );
};

export default Profile;
