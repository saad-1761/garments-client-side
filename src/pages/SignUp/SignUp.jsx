import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { imageUpload, saveOrUpdateUser } from "../../utils";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];

    try {
      const imageURL = await imageUpload(imageFile);
      await createUser(email, password);
      await saveOrUpdateUser({ name, email, image: imageURL });
      await updateUserProfile(name, imageURL);

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen py-10 px-4
      bg-base-100 "
    >
      <div
        className="w-full max-w-md rounded-2xl p-8
        bg-base-100/80 backdrop-blur-xl
        border border-primary/20
        shadow-xl"
      >
        {/* Back to Home */}
        {/* <Link
          to="/"
          className="text-sm text-base-content/60
          hover:text-primary transition mb-4 inline-block"
        >
          ← Back to Home
        </Link> */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-base-content">
            Create Account
          </h1>
          <p className="text-sm text-base-content/60 mt-2">
            Join La Fabrica today
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 ng-untouched ng-pristine ng-valid"
        >
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm text-base-content/70">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-lg
              bg-base-200
              border border-primary/20
              focus:ring-2 focus:ring-primary outline-none"
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 20,
                  message: "Name cannot be too long",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 text-sm text-base-content/70">
              Profile Image
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
              rounded-lg cursor-pointer"
              {...register("image")}
            />
            <p className="mt-1 text-xs text-gray-400">
              PNG, JPG or JPEG (max 2MB)
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-base-content/70">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2.5 rounded-lg
              bg-base-200
              border border-primary/20
              focus:ring-2 focus:ring-primary outline-none"
              data-temp-mail-org="0"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address.",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 text-sm text-base-content/70">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              id="password"
              className="w-full px-4 py-2.5 rounded-lg pr-10
              bg-base-200
              border border-primary/20
              focus:ring-2 focus:ring-primary outline-none"
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-base-content/60"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold
            bg-primary text-primary-content
            hover:bg-primary/90 transition"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin mx-auto" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-base-content/20" />
          <span className="px-3 text-sm text-base-content/50">or</span>
          <div className="flex-1 h-px bg-base-content/20" />
        </div>

        {/* Google */}
        <button
          onClick={signInWithGoogle}
          className="w-full flex justify-center items-center gap-2
          py-2.5 rounded-lg border
          border-primary/20
          hover:bg-primary/10 transition"
        >
          <FcGoogle size={24} />
          <span className="text-sm text-base-content">
            Continue with Google
          </span>
        </button>

        <p className="text-sm text-center text-base-content/60 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
