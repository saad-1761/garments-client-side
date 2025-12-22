// import { useQuery } from "@tanstack/react-query";
// import UserDataRow from "../../../components/Dashboard/TableRows/UserDataRow";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

// const ManageUsers = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const {
//     data: users = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["users", user?.email],
//     queryFn: async () => {
//       const result = await axiosSecure(`/users`);
//       return result.data;
//     },
//   });
//   console.log(users);

//   if (isLoading) return <LoadingSpinner />;
//   return (
//     <>
//       <div className="container mx-auto px-4 sm:px-8">
//         <div className="py-8">
//           <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
//             <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
//               <table className="min-w-full leading-normal">
//                 <thead>
//                   <tr>
//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
//                     >
//                       Email
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
//                     >
//                       Role
//                     </th>

//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
//                     >
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((user) => (
//                     <UserDataRow
//                       refetch={refetch}
//                       key={user?._id}
//                       user={user}
//                     />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ManageUsers;

///////

import { useQuery } from "@tanstack/react-query";
import UserDataRow from "../../../components/Dashboard/TableRows/UserDataRow";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/users`);
      console.log(users);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-base-content">
              Manage Users
            </h1>
            <p className="text-sm text-base-content/70">
              Update user roles (UI only improved, logic unchanged).
            </p>
          </div>

          <button
            className="btn btn-outline btn-primary btn-sm sm:btn-md"
            onClick={refetch}
          >
            Refresh
          </button>
        </div>

        {/* Card Wrapper */}
        <div className="mt-5 rounded-2xl border border-base-200 bg-base-100/60 backdrop-blur shadow-sm overflow-hidden">
          {/* Table header strip */}
          <div className="px-4 sm:px-6 py-4 border-b border-base-200 flex items-center justify-between">
            <p className="text-sm text-base-content/70">
              Total Users: <span className="font-semibold">{users.length}</span>
            </p>
          </div>

          {/* Responsive table */}
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-base-200/50">
                <tr className="text-base-content/70">
                  <th className="text-xs sm:text-sm font-semibold uppercase tracking-wide">
                    Email
                  </th>
                  <th className="text-xs sm:text-sm font-semibold uppercase tracking-wide">
                    Role
                  </th>
                  <th className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-right">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <UserDataRow key={u?._id} user={u} refetch={refetch} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {users.length === 0 && (
            <div className="p-8 text-center text-base-content/60">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
