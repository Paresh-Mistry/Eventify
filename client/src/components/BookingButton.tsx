'use client';

import { useState } from 'react';
import axios from 'axios';
import { sendMail } from '@component/utils/SendEmail';

type BookButtonProps = {
  userId: number;
  eventId: number;
  eventDate: string;
  eventTitle: string;
  userEmail: string;
  organizerEmail: string
};

export default function BookButton({
  userId,
  eventId,
  eventDate,
  eventTitle,
  userEmail,
  organizerEmail,
}: BookButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showRules, setShowRules] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const rules = [
    "Be respectful to all participants.",
    "Do not plagiarize code.",
    "Submit your project before the deadline.",
    "Work individually.",
    "Have fun and learn!"
  ];

  const handleBooking = async () => {
    try {
      setStatus('loading');
      const response = await axios.post('http://localhost:8000/booking/', {
        user_id: userId,
        event_id: eventId,
        status: 'confirmed',
      });

      if (response.status === 200 || response.status === 201) {
        setStatus('success');
        await sendMail({
          eventTitle,
          userEmail,
          organizerEmail,
          eventDate,
        });;
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setStatus('error');
    }
  };

  // When user clicks main button: show rules modal
  const handleClick = () => {
    setShowRules(true);
  };

  // When user submits acceptance of rules
  const handleSubmitRules = () => {
    if (accepted) {
      setShowRules(false);
      handleBooking();
    } else {
      alert('Please accept the rules before submitting.');
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={status === 'loading'}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition"
      >
        {status === 'loading' ? 'Booking...' : `Enroll In ${eventTitle}`}
      </button>

      {status === 'success' && <p className="text-green-600 mt-2">Booking successful!</p>}
      {status === 'error' && <p className="text-red-600 mt-2">Booking failed. Try again.</p>}

      {showRules && (
        <div className="fixed inset-3 bg-opacity-50 backdrop-blur-xs flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
            <h2 className="text-2xl mb-4 underline underline-offset-2">Rules & Regulation</h2>
            <ul className="list-decimal list-inside space-y-2 mb-4 max-h-64 overflow-auto">
              {rules.map((rule, i) => (
                <li key={i} className="text-gray-700 text-sm">{rule}</li>
              ))}
            </ul>

            <label className="inline-flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="form-checkbox"
              />
              <span>I accept the rules</span>
            </label>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowRules(false)}
                className="px-4 py-1.5 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRules}
                className="px-4 py-1.5 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
