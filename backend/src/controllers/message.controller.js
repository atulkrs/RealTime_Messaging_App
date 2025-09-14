import { prisma } from "../lib/db.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";


export const getChatUsers = async (req, res) => {
  try {
    const myId = req.user?.id || req.user?._id;

    if (!myId) {
      return res.status(400).json({ error: "User ID missing from request" });
    }

   
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: myId },
          { receiverId: myId },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const chatMap = new Map();

    for (const msg of messages) {
      const otherUserId = msg.senderId === myId ? msg.receiverId : msg.senderId;

      if (!chatMap.has(otherUserId)) {
        const user = await prisma.user.findUnique({
          where: { id: otherUserId },
          select: {
            id: true,
            fullName: true,
            profilePic: true,
            email: true,
          },
        });

        if (user) {
          chatMap.set(otherUserId, {
            _id: user.id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            lastMessage: {
              text: msg.text,
              image: msg.image,
              createdAt: msg.createdAt,
            },
          });
        }
      }
    }

    const chatUsers = Array.from(chatMap.values());

    res.status(200).json(chatUsers);
  } catch (error) {
    console.error("Error in getChatUsers: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user?.id || req.user?._id;

    if (!loggedInUserId) {
      return res.status(400).json({ error: "User ID missing from request" });
    }

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: loggedInUserId,
        },
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        profilePic: true,
      },
    });

    const mappedUsers = users.map(u => ({
      _id: u.id,
      fullName: u.fullName,
      email: u.email,
      profilePic: u.profilePic,
    }));

    res.status(200).json(mappedUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user?.id || req.user?._id;

    if (!myId || !userToChatId) {
      return res.status(400).json({ error: "Missing user IDs" });
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const mappedMessages = messages.map(m => ({
      _id: m.id,
      senderId: m.senderId,
      receiverId: m.receiverId,
      text: m.text,
      image: m.image,
      createdAt: m.createdAt,
    }));

    res.status(200).json(mappedMessages);
  } catch (error) {
    console.error("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?.id || req.user?._id;

    if (!senderId || !receiverId) {
      return res.status(400).json({ error: "Missing sender or receiver ID" });
    }

    let imageUrl = null;
    if (image) {
     
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        text,
        image: imageUrl,
      },
    });

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
        ...newMessage,
        _id: newMessage.id,
      });
    }

    res.status(201).json({
      ...newMessage,
      _id: newMessage.id,
    });
  } catch (error) {
    console.error("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    
    const result = await cloudinary.uploader.upload_stream(
      { folder: "chat_images" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ error: "Failed to upload image" });
        }
        res.json({ url: result.secure_url });
      }
    );

    
    const stream = cloudinary.uploader.upload_stream(
      { folder: "chat_images" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ error: "Failed to upload image" });
        }
        res.json({ url: result.secure_url });
      }
    );

    stream.end(req.file.buffer);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
