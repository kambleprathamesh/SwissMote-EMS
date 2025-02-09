import React from "react";
import { useLocation, NavLink, matchPath } from "react-router-dom";
import * as Icons from "react-icons/vsc";

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath(route, location.pathname);
  };

  return (
    <div className="relative">
      <NavLink
        to={link.path}
        className={`flex items-center  gap-x-2 w-full py-2 px-4 text-sm font-medium transition-all duration-200 ${
          matchRoute(link.path)
            ? "bg-[#3D2A01] text-yellow-300"
            : "text-[#838894]"
        }`}
      >
        <span
          className={`absolute left-0 top-0 h-full w-1 bg-yellow-300 ${
            matchRoute(link.path) ? "opacity-100" : "opacity-0"
          } transition-opacity duration-200`}
        ></span>
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </NavLink>
    </div>
  );
};

export default SidebarLink;
