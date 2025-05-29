import React from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const TicketCard = ({ ticket, onDetails }) => {
  const handleClick = () => {
    if (ticket.locationUrl) {
      window.open(ticket.locationUrl, '_blank');
    } else if (onDetails) {
      onDetails(ticket);
    }
  };

  const handlePurchase = async () => {
    try {
      await addDoc(collection(db, 'purchases'), {
        ticketId: ticket.id,
        ticketName: ticket.name,
        price: ticket.price,
        timestamp: serverTimestamp(),
      });
      alert('Purchase saved successfully!');
    } catch (error) {
      console.error('Error saving purchase:', error);
      alert('Failed to save purchase.');
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
        <h3 className="text-xl font-semibold mb-1">{ticket.name}</h3>
        <p className="text-gray-600 mb-2">{ticket.description}</p>
        <p className="text-green-600 font-bold">${ticket.price}</p>
      </div>
      <button
        onClick={e => {
          e.stopPropagation(); // prevent card click
          handlePurchase();
        }}
        className="mt-3 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
      >
        Purchase
      </button>
    </motion.div>
  );
};

export default TicketCard;