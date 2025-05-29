import React from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const DonationCard = ({ donation, onDetails }) => {
  const handleClick = () => {
    if (donation.detailsUrl) {
      window.open(donation.detailsUrl, '_blank');
    } else if (onDetails) {
      onDetails(donation);
    }
  };

  const handleDonate = async () => {
    try {
      await addDoc(collection(db, 'donations'), {
        donationId: donation.id,
        cause: donation.cause,
        suggestedAmount: donation.suggestedAmount,
        timestamp: serverTimestamp(),
      });
      alert('Donation saved successfully!');
    } catch (error) {
      console.error('Error saving donation:', error);
      alert('Failed to save donation.');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-xl shadow-md p-4 flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl font-semibold mb-1">{donation.cause}</h3>
        <p className="text-gray-600 mb-2">{donation.description}</p>
        <p className="text-purple-600 font-bold">${donation.suggestedAmount}</p>
      </div>
      <button
        onClick={e => {
          e.stopPropagation(); // prevent card click
          handleDonate();
        }}
        className="mt-3 bg-purple-600 text-white rounded px-4 py-2 hover:bg-purple-700"
      >
        Donate
      </button>
    </motion.div>
  );
};

export default DonationCard;