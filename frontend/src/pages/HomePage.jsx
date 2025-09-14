import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "../components/skeletons/SidebarSkeleton";

const HomePage = () => {
  const { isSidebarLoading } = useChatStore(); 

  return (
    <div className="h-screen flex flex-col">
      
      <Navbar />

     
      <div className="flex flex-1 overflow-hidden mt-16">
     
        <aside className="w-80 border-r border-gray-300">
         
          {isSidebarLoading ? <SidebarSkeleton /> : <Sidebar />}
        </aside>

     
        <main className="flex-1 bg-gray-50 flex flex-col">
        
          <ChatHeader />

        
          <div className="flex-1 overflow-hidden">
            <ChatContainer />
          </div>

          
        </main>
      </div>
    </div>
  );
};

export default HomePage;
