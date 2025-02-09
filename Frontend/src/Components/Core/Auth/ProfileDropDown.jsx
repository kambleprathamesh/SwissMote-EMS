import { useRef, useState, useEffect } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfileDropdown() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const [user, setUser] = useState(null);
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get user object from localStorage
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          console.error("User not found in localStorage");
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        const token = parsedUser?.token; // Extract token from user object

        if (!token) {
          console.error("No auth token found in user object");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/getUser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          const fetchedUser = response.data.profile;
          setUser(fetchedUser);

          console.log("fetchedUser ", fetchedUser.name);
          // Extract initials from full name
          if (fetchedUser.name) {
            const nameParts = fetchedUser.name.split(" ");
            const extractedInitials =
              nameParts.length >= 2
                ? `${nameParts[0][0]}${nameParts[1][0]}`
                : nameParts[0][0];

            setInitials(extractedInitials.toUpperCase());
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    console.log("Clicked logout button");
    localStorage.removeItem("user"); // Remove user data
    setUser(null); // Update state to trigger re-render
    navigate("/signin"); // Redirect to signin page
    setOpen(false);
    window.location.reload();
  };
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <button className="relative" onClick={() => setOpen((prev) => !prev)}>
      <div className="flex items-center gap-x-1 cursor-pointer">
        {user?.image ? (
          <img
            src={user.image}
            alt={`profile-${user.name}`}
            className="aspect-square w-[40px] rounded-full object-cover"
          />
        ) : (
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {initials || "NA"}
            </span>
          </div>
        )}
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[150%] right-0 z-[1000] divide-y-[1px] divide-[#2C333F] overflow-hidden rounded-md border-[1px] border-[#2C333F] bg-[#161D29]"
          ref={ref}
        >
          <Link to="dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-[#AFB2BF] hover:bg-[#2C333F] hover:text-[#DBDDEA]">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={handleLogout}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-[#AFB2BF] hover:bg-[#2C333F] hover:text-[#DBDDEA] cursor-pointer"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}
