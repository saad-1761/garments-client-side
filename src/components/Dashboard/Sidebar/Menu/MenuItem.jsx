// /* eslint-disable no-unused-vars */
// import { NavLink } from "react-router";

// const MenuItem = ({ label, address, icon: Icon, onClick }) => {
//   return (
//     <NavLink
//       to={address}
//       onClick={onClick}
//       className={({ isActive }) =>
//         `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
//           isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
//         }`
//       }
//     >
//       <Icon className="w-5 h-5" />

//       <span className="mx-4 font-medium">{label}</span>
//     </NavLink>
//   );
// };

// export default MenuItem;

////////

import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon, onClick }) => {
  return (
    <NavLink to={address} onClick={onClick}>
      {({ isActive }) => (
        <div
          className={[
            "flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer",
            "transition-all duration-200 ease-out",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
            isActive
              ? "bg-primary text-primary-content shadow-sm"
              : "text-base-content/80 hover:bg-base-200 hover:text-base-content",
          ].join(" ")}
        >
          <span
            className={[
              "grid place-items-center w-9 h-9 rounded-lg",
              "transition-all duration-200",
              isActive
                ? "bg-primary-content/15 border border-primary-content/20"
                : "bg-base-100/60 border border-base-300",
            ].join(" ")}
          >
            <Icon className="w-5 h-5" />
          </span>

          <span className="font-medium">{label}</span>

          <span
            className={[
              "ml-auto h-2 w-2 rounded-full",
              isActive ? "opacity-100" : "opacity-0",
              "bg-current transition-opacity duration-200",
            ].join(" ")}
          />
        </div>
      )}
    </NavLink>
  );
};

export default MenuItem;
