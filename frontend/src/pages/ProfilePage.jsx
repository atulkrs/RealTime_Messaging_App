import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-50 pt-20 px-4 pb-8 flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-purple-200">
       
        <button
          onClick={goBack}
          aria-label="Go Back"
          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

    
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="mt-2 text-gray-600">
            Manage your personal information and account settings.
          </p>
        </div>

        
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 rounded-full border-4 border-purple-300 overflow-hidden shadow-lg">
            <img
              src={selectedImg || authUser.profilePic || "/avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 p-2 rounded-full cursor-pointer transition transform ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
              title="Update profile picture"
            >
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            {isUpdatingProfile
              ? "Uploading..."
              : "Click the camera icon to update your profile picture."}
          </p>
        </div>

      
        <section className="flex flex-wrap gap-6">
         
          <div className="flex flex-col flex-1 min-w-[250px]">
            <label className="flex items-center gap-2 text-sm text-gray-600 font-semibold mb-2">
              <User className="w-5 h-5" />
              Full Name
            </label>
            <input
              type="text"
              value={authUser?.fullName || ""}
              readOnly
              className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-gray-50 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          
          <div className="flex flex-col flex-1 min-w-[250px]">
            <label className="flex items-center gap-2 text-sm text-gray-600 font-semibold mb-2">
              <Mail className="w-5 h-5" />
              Email Address
            </label>
            <input
              type="email"
              value={authUser?.email || ""}
              readOnly
              className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-gray-50 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </section>

       
        <div className="mt-6 bg-purple-50 rounded-xl p-6 border border-purple-200">
          <h2 className="text-xl font-bold mb-4 text-purple-700 border-b border-purple-200 pb-2">
            Account Information
          </h2>
          <div className="space-y-4 text-gray-700 text-sm">
            <div className="flex items-center justify-between border-b border-purple-200 pb-2">
              <span>Member Since</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span>Account Status</span>
              <span className="text-green-600 font-semibold">Active</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
