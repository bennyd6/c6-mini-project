import { useState } from "react";
import "./bookModal.css";

export default function BookModal({ event, onClose, onBook }) {
  const [paymentMode, setPaymentMode] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [upi, setUpi] = useState({ id: "" });
  const [netBanking, setNetBanking] = useState({ bank: "" });

  const validateInputs = () => {
    if (paymentMode === "card") {
      const { name, number, expiry, cvv } = card;
      return (
        name &&
        /^\d{16}$/.test(number) &&
        /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) &&
        /^\d{3,4}$/.test(cvv)
      );
    }
    if (paymentMode === "upi") {
      return /^[\w.-]+@[\w]+$/.test(upi.id); // Basic UPI ID validation
    }
    if (paymentMode === "netbanking") {
      return netBanking.bank.length > 2;
    }
    return false;
  };

  const handlePayment = async () => {
    if (!validateInputs()) {
      setError("Please enter valid payment details.");
      return;
    }

    setLoading(true);
    setError(null);

    await new Promise((res) => setTimeout(res, 2000)); // Simulate payment

    try {
      await onBook(); // Actual booking logic
      onClose();
    } catch (err) {
      setError("Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!event) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Book Ticket for {event.title}</h2>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p><strong>Venue:</strong> {event.location}</p>
        <p><strong>Organizer:</strong> {event.organizerId?.name || "Unknown"}</p>
        <p><strong>Available Tickets:</strong> {event.availableTickets}</p>

        <h3>Select Payment Method</h3>
        <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
          <option value="card">Credit / Debit Card</option>
          <option value="upi">UPI</option>
          <option value="netbanking">Net Banking</option>
        </select>

        {paymentMode === "card" && (
          <>
            <input
              type="text"
              placeholder="Cardholder Name"
              value={card.name}
              onChange={(e) => setCard({ ...card, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Card Number (16 digits)"
              value={card.number}
              onChange={(e) => setCard({ ...card, number: e.target.value })}
            />
            <input
              type="text"
              placeholder="Expiry (MM/YY)"
              value={card.expiry}
              onChange={(e) => setCard({ ...card, expiry: e.target.value })}
            />
            <input
              type="text"
              placeholder="CVV"
              value={card.cvv}
              onChange={(e) => setCard({ ...card, cvv: e.target.value })}
            />
          </>
        )}

        {paymentMode === "upi" && (
          <>
            <input
              type="text"
              placeholder="UPI ID (e.g., name@upi)"
              value={upi.id}
              onChange={(e) => setUpi({ id: e.target.value })}
            />
          </>
        )}

        {paymentMode === "netbanking" && (
          <>
            <input
              type="text"
              placeholder="Bank Name (e.g., HDFC, SBI)"
              value={netBanking.bank}
              onChange={(e) => setNetBanking({ bank: e.target.value })}
            />
          </>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <p style={{ color: "#555" }}>Processing payment...</p>}

        <div className="modal-buttons">
          <button onClick={handlePayment} className="confirm-btn" disabled={loading}>
            {loading ? "Processing..." : `Pay & Book`}
          </button>
          <button onClick={onClose} className="cancel-btn" disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
