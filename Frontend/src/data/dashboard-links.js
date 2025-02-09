// import { ACCOUNT_TYPE } from "../Utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "Feed",
    path: "/dashboard/feed" || "dashboard/event/${event.id}",
    icon: "VscFeedback",
  },
  {
    id: 2,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 3,
    name: "My Events",
    path: "/dashboard/my-Events",

    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Events",
    path: "/dashboard/add-event",

    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Registered Events",
    path: "/dashboard/enrolled-courses",

    icon: "VscMortarBoard",
  },
];
