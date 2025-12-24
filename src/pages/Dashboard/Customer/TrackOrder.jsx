import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { FaMapMarkerAlt } from "react-icons/fa";

const TrackOrder = () => {
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: updates = [], isLoading } = useQuery({
    queryKey: ["order-tracking", orderId],
    enabled: !!orderId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tracking/${orderId}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="w-full">
      <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-base-content mb-6">
          Order Tracking
        </h1>

        {!updates.length ? (
          <div className="alert alert-info">
            Tracking has not started yet for this order.
          </div>
        ) : (
          <div className="relative  border-primary/30 pl-6 space-y-6">
            {updates.map((step, idx) => {
              const isLatest = idx === updates.length - 1;

              return (
                <div key={idx} className="relative">
                  <span
                    className={`absolute -left-[20px] top-8 w-3 h-3 rounded-full ${
                      isLatest
                        ? "bg-primary ring-3 ring-primary/30"
                        : "bg-base-300"
                    }`}
                  />

                  <div className="card bg-base-100 border border-base-200 shadow-sm">
                    <div className="card-body">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-base-content">
                          {step.status}
                        </h3>
                        <span className="text-xs text-base-content/60">
                          {new Date(step.at).toLocaleString()}
                        </span>
                      </div>

                      {step.location && (
                        <p className="mt-1 text-sm text-base-content/70 flex items-center gap-1">
                          <FaMapMarkerAlt />
                          {step.location}
                        </p>
                      )}

                      {step.note && (
                        <p className="mt-2 text-sm text-base-content/80">
                          {step.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrackOrder;
