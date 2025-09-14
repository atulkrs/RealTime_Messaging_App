import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  chats: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getChatUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ users: res.data, chats: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to load chat users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getAllUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;

    try {
      let imageUrl = null;

      if (messageData.image) {
        const formData = new FormData();

        // Convert base64 image preview to Blob
        const base64Response = await fetch(messageData.image);
        const blob = await base64Response.blob();

        formData.append("image", blob, "upload.jpg");

        
        const uploadRes = await axiosInstance.post("/messages/upload/image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageUrl = uploadRes.data.url;
      }

      const payload = {
        text: messageData.text,
        image: imageUrl,
      };

     
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        payload
      );

      
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.error("Error in sendMessage:", error);
      toast.error(error?.response?.data?.error || "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket || !socket.connected) {
      console.warn("Socket not connected");
      return;
    }

    socket.off("newMessage");
    socket.on("newMessage", (newMessage) => {
      const isRelevant =
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id;

      if (!isRelevant) return;

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
