/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { useUserStore } from "../store/user.store";
import { RoleAccessService } from "../services/role-access.service";
import { useQuery } from "@tanstack/react-query";
import { useSidebarContex } from "../contexts/sidebar-context";

const useGetRoleAccess = () => {
    const { user, role, setRole } = useUserStore();
    const { sidebarOpen, setSidebarOpen, isHovering, setIsHovering } = useSidebarContex()


    const handleMouseEnter = () => {
        
      if (!sidebarOpen) {
        setIsHovering(true)
        setSidebarOpen(true)
      }
    }
    
    const handleMouseLeave = () => {
      if (isHovering) {
        setIsHovering(false)
        setSidebarOpen(false)
      }
    }
  
  const dataMenu = [
      {
          id: 1,
          name: "Dammy",
          url: "/dummy",
          icon: "",
          parentId: 0,
          subMenu: []
      },
    ];

    return {
        // dataRoleAccess,
      // loadingRoleAccess, 
        dataMenu,
        handleMouseEnter,
        handleMouseLeave,
        sidebarOpen, 
        setSidebarOpen
        
    }

    
}

export default useGetRoleAccess;