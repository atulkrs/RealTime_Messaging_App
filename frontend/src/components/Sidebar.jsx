import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users, MessageSquare } from "lucide-react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
  const {
    getChatUsers,
    getAllUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  const [activeTab, setActiveTab] = useState("chat");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    if (activeTab === "chat") {
      getChatUsers();
    } else {
      getAllUsers();
    }
  }, [activeTab, getChatUsers, getAllUsers]);

  let displayedUsers = users || [];

  if (showOnlineOnly) {
    displayedUsers = displayedUsers.filter((u) => onlineUsers.includes(u._id));
  }

  const onlineCount = displayedUsers.filter((u) => onlineUsers.includes(u._id))
    .length;

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  const listVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 border-yellow-700 w-full sm:w-80 md:w-72 lg:w-80">
      <div className="flex border-b border-gray-700 -mt-1">
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex-1 py-3 flex items-center justify-center gap-2 border-b-2 ${
            activeTab === "chat"
              ? "border-green-500 text-green-400 font-semibold"
              : "border-transparent text-gray-400 hover:text-green-400"
          } transition`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="block sm:hidden">Chats</span>
          <span className="hidden sm:block">Chats</span>
        </button>

        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex-1 py-3 flex items-center justify-center gap-2  border-b-2 ${
            activeTab === "contacts"
              ? "border-green-500 text-green-400 font-semibold"
              : "border-transparent text-gray-400 hover:text-green-400"
          } transition`}
        >
          <Users className="w-5 h-5" />
          <span className="block sm:hidden">Contacts</span>
          <span className="hidden sm:block">Contacts</span>
        </button>
      </div>

      
      <div className="px-9 sm:px-5 flex items-center gap-2 my-3">
        <label className="cursor-pointer flex items-center gap-2 select-none">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="form-checkbox h-4 w-4 text-green-500 rounded transition"
          />
          <span className="text-sm font-medium text-gray-300">Show online only</span>
        </label>
        <span className="text-xs text-gray-400">({onlineCount} online)</span>
      </div>

      <div className="flex-1 overflow-y-auto p-1 px-3 sm:px-5 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <AnimatePresence mode="popLayout">
          {displayedUsers.length ? (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={listVariants}
              className="space-y-1"
            >
              {displayedUsers.map((user) => {
                const isSelected = selectedUser?._id === user._id;
                const isOnline = onlineUsers.includes(user._id);

                return (
                  <motion.button
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className={`w-full flex items-center gap-3 p-2 sm:p-3 rounded-lg text-left transition duration-200 focus:outline-none ${
                      isSelected
                        ? "bg-green-900/40 ring-1 ring-green-400 text-white"
                        : "hover:bg-gray-700 text-gray-300"
                    }`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={user.profilePic || "/avatar.png"}
                        alt={user.fullName}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full"
                      />
                      {isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full ring-2 ring-[#2a2f35] animate-pulse" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold truncate text-white text-sm sm:text-base">
                        {user.fullName}
                      </div>
                      <div
                        className={`text-xs sm:text-sm ${
                          isOnline ? "text-green-400" : "text-gray-400"
                        }`}
                      >
                        {isOnline ? "Online" : "Offline"}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 py-6 text-sm"
            >
              {activeTab === "chat" ? "No chats available" : "No contacts found"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Sidebar;
