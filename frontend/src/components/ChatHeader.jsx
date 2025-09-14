import React from "react";
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <header className="flex items-center h-12 justify-between p-4 bg-gray-800 border-b border-yellow-200 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-md ring-2 ring-purple-800">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            className="object-cover w-full h-full"
          />
          {isOnline && (
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full ring-2 ring-white animate-pulse" />
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">{selectedUser.fullName}</h2>
          <p className={`text-sm ${isOnline ? "text-green-600" : "text-gray-400"}`}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button
        aria-label="Close chat"
        onClick={() => setSelectedUser(null)}
        className="p-2 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
      >
        <X size={24} className="text-red-600" />
      </button>
    </header>
  );
};

export default ChatHeader;
