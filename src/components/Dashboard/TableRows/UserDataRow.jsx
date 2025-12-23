import { useState } from "react";
import UpdateUserRoleModal from "../../Modal/UpdateUserRoleModal";

const roleBadgeClass = (role) => {
  const r = (role || "").toLowerCase();
  if (r === "admin") return "badge badge-error badge-outline";
  if (r === "seller") return "badge badge-info badge-outline";
  if (r === "manager") return "badge badge-secondary badge-outline";
  return "badge badge-ghost";
};

const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <tr className="hover:bg-base-200/30 transition">
      <td className="whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-9 h-9 rounded-full ring-1 ring-base-300 bg-base-200 overflow-hidden">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user?.email || "User"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.innerHTML = `
            <div class='w-full h-full grid place-items-center text-xs font-semibold text-base-content/70'>
              ${(user?.email?.[0] || "U").toUpperCase()}
            </div>
          `;
                  }}
                />
              ) : (
                <div className="w-full h-full grid place-items-center text-xs font-semibold text-base-content/70">
                  {(user?.email?.[0] || "U").toUpperCase()}
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0">
            <p className="font-medium text-base-content truncate max-w-[220px] sm:max-w-[420px]">
              {user?.email}
            </p>
            <p className="text-xs text-base-content/60">
              ID: <span className="font-mono">{user?._id}</span>
            </p>
          </div>
        </div>
      </td>

      <td className="whitespace-nowrap">
        <span className={roleBadgeClass(user?.role)}>
          {(user?.role || "customer").toUpperCase()}
        </span>
      </td>

      <td className="whitespace-nowrap text-right">
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-sm btn-primary"
        >
          Update Role
        </button>

        <UpdateUserRoleModal
          user={user}
          refetch={refetch}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
