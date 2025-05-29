import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './Modal';
import SuccessScreen from './SuccessScreen';
import { db } from './firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const Tickets = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const tickets = [
    { id: 1, name: 'Opening Night', price: 150 },
    { id: 2, name: 'Closing Gala', price: 200 },
    { id: 3, name: 'Matinee Showcase', price: 100 },
  ];

  const handleCardClick = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const handleBook = async (price) => {
    try {
      await addDoc(collection(db, 'tickets'), {
        event: selectedTicket.name,
        price: parseFloat(price),
        timestamp: Timestamp.now(),
      });
      setShowModal(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error booking ticket:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Book Your Tickets</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {tickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-white rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => handleCardClick(ticket)}
            >
              <h3 className="text-xl font-semibold text-gray-800">{ticket.name}</h3>
              <p className="text-gray-600 mt-2">R{ticket.price}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {showModal && (
        <Modal
          title={`Book Ticket for ${selectedTicket.name}`}
          onClose={() => setShowModal(false)}
          onSubmit={handleBook}
        />
      )}

      {showSuccess && <SuccessScreen message="Your ticket has been booked!" />}
    </div>
  );
};

export default Tickets;
