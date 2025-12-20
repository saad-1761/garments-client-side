import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const PurchaseModal = ({ closeModal, isOpen, product }) => {
  const { user } = useAuth();

  const {
    _id,
    name,
    image,
    description,
    category,
    price,
    quantity: availableQuantity,
    minimumOrder = 1,
    seller,
  } = product || {};

  const [orderQty, setOrderQty] = useState(minimumOrder);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [loading, setLoading] = useState(false);

  const totalPrice = orderQty * price;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (orderQty < minimumOrder || orderQty > availableQuantity) return;

    const orderPayload = {
      productId: _id,
      productName: name,
      category,
      image: image,
      description: description,
      unitPrice: price,
      quantity: orderQty,
      totalPrice,
      paymentMethod,
      paymentStatus: paymentMethod === "online" ? "paid" : "pending",
      seller,
      customer: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
      deliveryAddress: e.target.address.value,
      contactNumber: e.target.phone.value,
      notes: e.target.notes.value,
    };

    try {
      setLoading(true);

      if (paymentMethod === "online") {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/create-checkout-session`,
          orderPayload
        );
        window.location.href = data.url;
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/orders`,
          orderPayload
        );
        closeModal();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xl">
          <DialogTitle className="text-lg font-semibold mb-4">
            Order Product
          </DialogTitle>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            {/* Read-only fields */}
            <input value={user?.email} readOnly className="input w-full" />
            <input value={name} readOnly className="input w-full" />
            <input value={`$${price}`} readOnly className="input w-full" />

            {/* Quantity */}
            <input
              type="number"
              min={minimumOrder}
              max={availableQuantity}
              value={orderQty}
              onChange={(e) => setOrderQty(Number(e.target.value))}
              className="input w-full"
              required
            />

            {/* Total */}
            <input
              value={`Total: $${totalPrice}`}
              readOnly
              className="input w-full font-semibold"
            />

            {/* Contact */}
            <input
              name="phone"
              placeholder="Contact Number"
              className="input w-full"
              required
            />

            <textarea
              name="address"
              placeholder="Delivery Address"
              className="textarea w-full"
              required
            />

            <textarea
              name="notes"
              placeholder="Additional Instructions (optional)"
              className="textarea w-full"
            />

            {/* Payment Method */}
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                Online Payment
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary flex-1"
              >
                {paymentMethod === "online"
                  ? "Proceed to Pay"
                  : "Confirm Order"}
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
