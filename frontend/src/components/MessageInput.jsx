import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      removeImage(); // clear preview and file input
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className="
        absolute bottom-0 left-0 right-0
        p-4
        border-t border-purple-300/40
        bg-white/30
        backdrop-blur-md
        rounded-t-lg
        shadow-lg
        flex flex-col
        z-50
      "
      style={{
        boxShadow: "0 8px 32px 0 rgba(131, 58, 180, 0.15)",
        borderRadius: "20px 20px 0 0", 
      }}
    >
      <AnimatePresence>
        {imagePreview && (
          <motion.div
            key="imagePreview"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 left-4 flex items-center gap-2 bg-white bg-opacity-80 rounded-lg p-1 shadow-lg"
            style={{ zIndex: 10 }}
          >
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-purple-400 shadow-sm"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-shadow shadow-lg"
                aria-label="Remove image"
                type="button"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="
            flex-1 rounded-full
            border border-purple-300
            bg-white/70
            px-5 py-2
            text-purple-900
            placeholder-purple-400
            focus:outline-none focus:ring-2 focus:ring-purple-500
            transition
          "
          maxLength={500}
          autoComplete="off"
        />
        <label
          htmlFor="image-upload"
          className="
            p-2
            rounded-md
            cursor-pointer
            hover:bg-purple-200/40
            transition
            text-purple-600
            flex items-center justify-center
          "
          aria-label="Upload image"
        >
          <Image size={22} />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
        </label>
        <motion.button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          aria-disabled={!text.trim() && !imagePreview}
          whileTap={{ scale: 0.9 }}
          className="
            bg-purple-600
            disabled:bg-purple-300
            disabled:cursor-not-allowed
            text-white
            rounded-full
            p-2
            flex items-center justify-center
            shadow-md
            hover:bg-purple-700
            transition
          "
          aria-label="Send message"
        >
          <Send size={22} />
        </motion.button>
      </form>
    </motion.div>
  );
};

export default MessageInput;
