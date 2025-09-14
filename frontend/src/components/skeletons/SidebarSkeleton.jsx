import { Users, MessageSquare } from "lucide-react";
import { useState } from "react";

const SidebarSkeleton = () => {
  const [activeTab, setActiveTab] = useState("chat");

  // Skeleton items for chats and contacts
  const skeletonChats = Array(6).fill(null);
  const skeletonContacts = Array(8).fill(null);

  return (
    <div
      className="h-full w-80 border-r border-gray-300
      flex flex-col transition-all duration-200 bg-white bg-opacity-80 backdrop-blur-sm"
    >
      {/* Tabs */}
      <div className="flex border-b border-gray-300 w-full">
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex-1 py-3 flex items-center justify-center gap-2 border-b-2 ${
            activeTab === "chat"
              ? "border-purple-600 text-purple-600 font-semibold"
              : "border-transparent text-gray-400"
          } transition`}
          aria-selected={activeTab === "chat"}
          role="tab"
          disabled
        >
          <MessageSquare className="w-5 h-5" />
          <span className="hidden lg:block">Chats</span>
        </button>

        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex-1 py-3 flex items-center justify-center gap-2 border-b-2 ${
            activeTab === "contacts"
              ? "border-purple-600 text-purple-600 font-semibold"
              : "border-transparent text-gray-400"
          } transition`}
          aria-selected={activeTab === "contacts"}
          role="tab"
          disabled
        >
          <Users className="w-5 h-5" />
          <span className="hidden lg:block">Contacts</span>
        </button>
      </div>

      {/* Skeleton list */}
      <div className="overflow-y-auto w-full py-3 flex-1">
        {activeTab === "chat" &&
          skeletonChats.map((_, idx) => (
            <div key={idx} className="w-full p-3 flex items-center gap-3">
              {/* Avatar skeleton */}
              <div className="relative mx-auto lg:mx-0">
                <div className="skeleton w-12 h-12 rounded-full" />
              </div>

              {/* User info skeleton - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="skeleton h-4 w-32 mb-2" />
                <div className="skeleton h-3 w-16" />
              </div>
            </div>
          ))}

        {activeTab === "contacts" &&
          skeletonContacts.map((_, idx) => (
            <div key={idx} className="w-full p-3 flex items-center gap-3">
              {/* Avatar skeleton */}
              <div className="relative mx-auto lg:mx-0">
                <div className="skeleton w-12 h-12 rounded-full" />
              </div>

              {/* User info skeleton - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="skeleton h-4 w-32 mb-2" />
                <div className="skeleton h-3 w-16" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SidebarSkeleton;
