import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const PaymentSuccess = () => {
  const router = useRouter();
  const { session_id } = useParams();  // Retrieve session ID from URL
  const [sessionDetails, setSessionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        if (!session_id) return;
        const response = await fetch(`/api/payment/session/${session_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch session details");
        }
        const data = await response.json();
        setSessionDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [session_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Payment Successful!</h1>
      <h2>Order Summary</h2>
      {sessionDetails ? (
        <div>
          <p>Order ID: {sessionDetails.id}</p>
          <p>Total Amount: ${(sessionDetails.amount_total / 100).toFixed(2)}</p>
          <p>Status: {sessionDetails.payment_status}</p>
        </div>
      ) : (
        <p>No session details available.</p>
      )}
    </div>
  );
};

export default PaymentSuccess;
