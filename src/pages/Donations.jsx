import React, { useState } from 'react';
import { StripeCheckoutModal } from '../components/StripeCheckoutModal';

export default function DonatePage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSuccess = () => {
    alert('Thank you! Payment successful.');
    setModalOpen(false);
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Support Our Dance Outreach</h1>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded shadow-lg transition"
      >
        Donate R50
      </button>

      <StripeCheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        amount={5000} // Amount in cents (R50)
        onSuccess={handleSuccess}
      />
    </div>
  );
}
