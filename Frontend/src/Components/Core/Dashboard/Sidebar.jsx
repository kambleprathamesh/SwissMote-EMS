import React, { useState, useContext } from "react";
import { VscSignOut } from "react-icons/vsc";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from "./SidebarLink";
import CommonModal from "../../ConfirmationModal";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Moved navigate above handleLogout

  const handleLogout = () => {
    console.log("Clicked logout button");
    localStorage.removeItem("user"); // Remove user data
    navigate("/signin"); // Redirect to signin page
    setOpen(false);
    window.location.reload();
  };

  return (
    <>
      <div className="flex relative min-h-screen bg-[#161D29] ">
        <div className="min-w-[222px] flex flex-col  border-r-[1px] border-[#2C333F] bg-[#161D29] py-10 px-3">
          <div className="flex flex-col space-y-8">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null;
              return (
                <SidebarLink key={link.id} link={link} iconName={link.icon} />
              );
            })}
          </div>
          <div className="mx-auto mt-8 mb-5 h-[1px] w-10/12 bg-[#2C333F]"></div>
          <div>
            <SidebarLink
              link={{ name: "Setting", path: "dashboard/settings" }}
              iconName="VscSettingsGear"
            />
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are You Sure?",
                  text2: "You will be logged out?",
                  btn1Text: "Cancel",
                  btn2Text: "Logout",
                  btn2Handler: handleLogout, // Pass logout function
                })
              }
              className="text-sm font-medium text-[#838894] ml-4 mt-10"
            >
              <div className="flex items-center gap-x-3 ">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
        {confirmationModal && (
          <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center z-50 backdrop-blur-sm ">
            <CommonModal modalData={confirmationModal} />
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
