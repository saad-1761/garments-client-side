const Button = ({ label, onClick, disabled, outline, small, icon: Icon }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
    relative w-full
    rounded-xl
    transition-all duration-300
    disabled:opacity-60 disabled:cursor-not-allowed
    ${small ? "py-2 text-sm" : "py-3 text-base"}
    ${
      outline
        ? "border border-sky-500 text-sky-600 dark:text-sky-400 bg-transparent"
        : "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg hover:shadow-xl"
    }
    font-semibold
  `}
    >
      {Icon && (
        <Icon size={20} className="absolute left-4 top-1/2 -translate-y-1/2" />
      )}
      {label}
    </button>
  );
};

export default Button;
