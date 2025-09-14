
import React from "react";
import Navbar from "../components/Navbar";

const DashboardPage = () => {
 
  const recentActivities = [
    { id: 1, user: "Alice", action: "sent a message", time: "2 mins ago" },
    { id: 2, user: "Bob", action: "joined a chat", time: "10 mins ago" },
    { id: 3, user: "Charlie", action: "updated profile", time: "30 mins ago" },
    { id: 4, user: "Dana", action: "started a new chat", time: "1 hour ago" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-800 via-purple-600 to-purple-400 text-white">
      <Navbar />

     
      <main
        className="flex-1 overflow-y-auto container mx-auto px-6 py-20 mt-16 scrollbar-hide"
        style={{ height: `calc(100vh - 64px)` }} // 64px for Navbar height
      >
        <h1 className="text-5xl font-extrabold mb-6 text-center drop-shadow-lg">
          Welcome to Messaging_App Dashboard
        </h1>

        <p className="text-lg max-w-3xl mx-auto text-center mb-10 drop-shadow-md">
          Messaging_App is a modern and secure chat platform designed to help you
          connect with friends, family, and colleagues seamlessly. Manage your
          conversations, view analytics, and customize your chat experience all in
          one place.
        </p>

      
        <div className="flex justify-center gap-8 mb-12 flex-wrap">
          {[
            { label: "Total Users", value: "1,234" },
            { label: "Active Chats", value: "56" },
            { label: "Messages Sent Today", value: "8,912" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-purple-900 bg-opacity-60 rounded-lg shadow-lg px-8 py-6 text-center w-40"
            >
              <p className="text-4xl font-bold">{value}</p>
              <p className="mt-2 text-sm opacity-80">{label}</p>
            </div>
          ))}
        </div>

      
        <section className="bg-purple-900 bg-opacity-50 rounded-lg p-8 shadow-lg max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-purple-200">
            <li>Real-time messaging with typing indicators</li>
            <li>Online/offline status for your contacts</li>
            <li>Secure authentication and user profiles</li>
            <li>Responsive design for mobile and desktop</li>
            <li>Customizable themes and notification settings</li>
          </ul>
        </section>

        
        <section className="max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex gap-4 flex-wrap justify-center">
            <button className="btn-primary px-6 py-3 rounded-md bg-pink-500 hover:bg-pink-600 transition shadow-lg">
              New Chat
            </button>
            <button className="btn-primary px-6 py-3 rounded-md bg-purple-700 hover:bg-purple-800 transition shadow-lg">
              View Analytics
            </button>
            <button className="btn-primary px-6 py-3 rounded-md bg-indigo-700 hover:bg-indigo-800 transition shadow-lg">
              Manage Contacts
            </button>
          </div>
        </section>

        
        <section className="max-w-xl mx-auto bg-purple-900 bg-opacity-50 rounded-lg p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-6">Recent Activity</h2>
          <ul className="space-y-4 text-purple-200">
            {recentActivities.map(({ id, user, action, time }) => (
              <li key={id} className="flex justify-between border-b border-purple-700 pb-3">
                <span>
                  <strong className="text-white">{user}</strong> {action}
                </span>
                <span className="text-sm opacity-70">{time}</span>
              </li>
            ))}
          </ul>
        </section>

     
        <footer className="text-center text-purple-300 text-sm mb-8 opacity-70">
          &copy; {new Date().getFullYear()} Messaging_App. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default DashboardPage;
