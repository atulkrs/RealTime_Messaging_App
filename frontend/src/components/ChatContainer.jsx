import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageInput from "./MessageInput";
 import { MessageCircle } from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return <MessageSkeleton />;
  }

  return (
    <div className="flex flex-col flex-1 relative h-full bg-gradient-to-br from-purple-300 via-purple-400 to-purple-100">
     {!selectedUser ? (
  <div className="flex-1 flex items-center justify-center bg-blue">
 

<h2 className="flex items-center justify-center gap-3 text-2xl font-poppins font-semibold text-purple-700 max-w-md mx-auto text-center select-none">
  <MessageCircle size={100} className="text-purple-500" />
  Choose a conversation from the list to start chatting with your friends.
</h2>

  </div>
) : (
  <>

          <div
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100"
            style={{ paddingBottom: "110px" }} // Space for input box
          >
            {messages.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-purple-300 text-lg italic select-none">
                No messages yet
              </div>
            ) : (
              <>
                {messages.map((message) => {
                  const isSender = message.senderId === authUser._id;
                  return (
                    <div
                      key={message._id}
                      className={`flex items-end ${
                        isSender ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isSender && (
                        <img
                          src={selectedUser.profilePic || "/avatar.png"}
                          alt={selectedUser.fullName}
                          className="w-12 h-12 rounded-full mr-4 ring-2 ring-purple-300"
                          title={selectedUser.fullName}
                        />
                      )}
                      <div>
                        <div
                          className={`max-w-[75vw] p-4 rounded-lg break-words shadow-lg transform transition duration-150 ease-in-out
                            ${
                              isSender
                                ? "bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-br-none hover:brightness-110"
                                : "bg-white text-gray-900 rounded-bl-none hover:bg-purple-50"
                            }`}
                        >
                          {message.image && (
                            <img
                              src={message.image}
                              alt="attachment"
                              className="mb-3 rounded-md max-w-full h-auto border border-purple-200"
                            />
                          )}
                          {message.text && (
                            <p className="whitespace-pre-wrap leading-relaxed">
                              {message.text}
                            </p>
                          )}
                        </div>
                        <time
                          className={`block mt-1 text-xs ${
                            isSender
                              ? "text-purple-200 text-right"
                              : "text-purple-500 text-left"
                          } font-mono select-none`}
                          title={new Date(message.createdAt).toLocaleString()}
                        >
                          {formatMessageTime(message.createdAt)}
                        </time>
                      </div>
                      {isSender && (
                        <img
                          src={authUser.profilePic || "/avatar.png"}
                          alt="You"
                          className="w-12 h-12 rounded-full ml-4 ring-2 ring-purple-600"
                          title="You"
                        />
                      )}
                      {message._id === messages[messages.length - 1]._id && (
                        <div ref={messageEndRef} />
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default ChatContainer;
