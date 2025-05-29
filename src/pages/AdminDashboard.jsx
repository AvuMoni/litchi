import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const ticketSnapshot = await getDocs(collection(db, 'tickets'));
      const donationSnapshot = await getDocs(collection(db, 'donations'));

      setTickets(ticketSnapshot.docs.map(doc => doc.data()));
      setDonations(donationSnapshot.docs.map(doc => doc.data()));
    };

    fetchData();
  }, []);

  const totalTicketRevenue = tickets.reduce((sum, ticket) => sum + ticket.price, 0);
  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold text-center text-indigo-700">Admin Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-lg rounded-2xl p-4">
          <CardContent>
            <h3 className="text-lg font-semibold text-gray-700">Total Ticket Revenue</h3>
            <p className="text-2xl font-bold text-indigo-600">R{totalTicketRevenue}</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg rounded-2xl p-4">
          <CardContent>
            <h3 className="text-lg font-semibold text-gray-700">Total Donations</h3>
            <p className="text-2xl font-bold text-green-600">R{totalDonations}</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6">
        <h4 className="text-xl font-semibold mb-4 text-gray-800">Ticket Sales Overview</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tickets}>
            <XAxis dataKey="event" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="price" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6">
        <h4 className="text-xl font-semibold mb-4 text-gray-800">Donations Overview</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={donations}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
