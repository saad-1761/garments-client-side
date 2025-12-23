import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, ratings, user_photoURL, date, review: reviewText } = review;

  return (
    <div className="h-full bg-base-200/60 backdrop-blur rounded-xl p-6 border border-base-300 shadow-sm hover:shadow-md transition">
      {/* User Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user_photoURL}
          alt={userName}
          className="w-12 h-12 rounded-full object-cover border border-base-300"
        />
        <div>
          <h4 className="font-semibold text-base">{userName}</h4>
          <p className="text-sm text-base-content/60">
            {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-sm text-base-content/80 mb-3 italic">"{reviewText}"</p>

      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar
            key={i}
            className={`text-sm ${
              i < Math.round(ratings) ? "text-primary" : "text-base-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-base-content/70">
          {ratings.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
