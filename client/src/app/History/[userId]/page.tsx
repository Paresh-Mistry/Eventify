"use client";

import { Booking } from "@component/types/event";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BookingHistoryPage({
  params,
}: {
  params: { userId: string };
}) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/history/${params?.userId}`,
        );
        const data = await res.data;
        setBookings(Array.isArray(data) ? data : [data]); // Handle single or list
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Booking History</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="text-red-500">No bookings found.</p>
      ) : (
        <div className="gap-2 grid grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-xl font-semibold">
                {booking.event?.title || "Event not available"}
              </h2>
              <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
              <p className="text-sm text-gray-600">
                Status: <span className="font-medium">{booking.status}</span>
              </p>
              <p className="text-sm text-gray-600">
                Booking Date: {new Date(booking.booking_date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
