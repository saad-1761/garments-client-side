import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { saveOrUpdateUser } from "../../utils";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const passwordRules = {
  required: "Password is required",
  minLength: { value: 6, message: "At least 6 characters required" },
  validate: {
    hasUpper: (v) =>
      /[A-Z]/.test(v) || "Must contain at least 1 uppercase letter",
    hasLower: (v) =>
      /[a-z]/.test(v) || "Must contain at least 1 lowercase letter",
    hasNumber: (v) => /\d/.test(v) || "Must contain at least 1 number",
  },
};

const Login = () => {
  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace />;

  const onSubmit = async ({ email, password }) => {
    try {
      const { user } = await signIn(email.trim(), password);

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      toast.success("Login Successful");
      reset();
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Invalid credentials");
      reset({ email: "", password: "" });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google login failed");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-base-200 p-6 shadow-lg sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-base-content">Log In</h1>
          <p className="mt-2 text-sm text-neutral">
            Sign in to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm">Email address</label>
            <input
              type="email"
              className={`input input-bordered w-full ${
                errors.email ? "input-error" : ""
              }`}
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-error">{errors.email.message}</p>
            )}
          </div>

          {/* Password with show/hide */}
          <div>
            <label className="block mb-2 text-sm">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-bordered w-full pr-10 ${
                  errors.password ? "input-error" : ""
                }`}
                placeholder="••••••••"
                {...register("password", passwordRules)}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-2 text-neutral hover:text-primary"
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-error">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full"
          >
            {isSubmitting ? (
              <TbFidgetSpinner className="animate-spin mx-auto" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        <div className="flex items-center gap-2 py-4">
          <div className="flex-1 h-px bg-neutral opacity-30" />
          <span className="text-xs text-neutral">Or continue with</span>
          <div className="flex-1 h-px bg-neutral opacity-30" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-neutral">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
