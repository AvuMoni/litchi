// src/Events.jsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Events = () => {
  const [events] = useState([
    {
      id: 1,
      title: "Contemporary Dance Showcase",
      date: "2025-06-15",
      description: "A captivating night of modern movement and storytelling.",
    },
    {
      id: 2,
      title: "Urban Rhythms Workshop",
      date: "2025-07-02",
      description: "Learn urban dance styles with top choreographers.",
    },
    {
      id: 3,
      title: "Global Dance Fusion",
      date: "2025-08-20",
      description: "Experience a fusion of cultures through dance performances.",
    },
  ]);

  const handleCardClick = (event) => {
    alert(`Opening details for: ${event.title}`);
    // You could route to a details page or open a modal here
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl cursor-pointer"
              onClick={() => handleCardClick(event)}
            >
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-1">{event.date}</p>
              <p className="text-gray-700">{event.description}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Events;
