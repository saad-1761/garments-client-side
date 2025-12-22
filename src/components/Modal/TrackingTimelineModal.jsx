import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TrackingTimelineModal = ({ isOpen, closeModal, order }) => {
  const dialogRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
  }, [isOpen]);

  const { data: updates = [], isLoading } = useQuery({
    queryKey: ["tracking", order?._id],
    enabled: !!order?._id && isOpen,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tracking/${order._id}`);
      return res.data;
    },
  });

  if (!order) return null;

  return (
    <dialog ref={dialogRef} className="modal" onClose={closeModal}>
      <div className="modal-box bg-base-100 text-base-content border border-base-200 max-w-2xl">
        <h3 className="font-bold text-lg">Tracking Timeline</h3>
        <p className="text-sm text-base-content/70 mt-1">
          Order: <span className="font-mono text-xs">{order?._id}</span>
        </p>

        <div className="mt-4">
          {isLoading ? (
            <div className="text-sm text-base-content/60">Loading...</div>
          ) : updates.length === 0 ? (
            <div className="text-sm text-base-content/60">
              No tracking updates yet.
            </div>
          ) : (
            <ul className="steps steps-vertical w-full">
              {updates
                .slice()
                .reverse()
                .map((u, idx) => (
                  <li key={idx} className="step step-primary">
                    <div className="text-left">
                      <p className="font-semibold">{u.status}</p>
                      <p className="text-xs text-base-content/60">
                        {u.at ? new Date(u.at).toLocaleString() : ""}
                        {u.location ? ` • ${u.location}` : ""}
                      </p>
                      {u.note ? (
                        <p className="text-xs text-base-content/70 mt-1">
                          {u.note}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button aria-label="Close" onClick={closeModal}>
          close
        </button>
      </form>
    </dialog>
  );
};

export default TrackingTimelineModal;
