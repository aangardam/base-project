/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { useUserStore } from "../store/user.store";
import { RoleAccessService } from "../services/role-access.service";
import { useQuery } from "@tanstack/react-query";
import { useSidebarContex } from "../contexts/sidebar-context";

const useGetRoleAccess = () => {
    const { user, role, setRole, setMenuPermission, setUserMenuInfo, userMenuInfo } = useUserStore();
    const { sidebarOpen, setSidebarOpen, isHovering, setIsHovering } = useSidebarContex()

    

    const handleRoleSelected = async (selectedRole:any) => {
        setRole(selectedRole);
        setUserMenuInfo({
            ...userMenuInfo,
            roleId: selectedRole,
            userId: user?.accountId,
        });
    };

    const roles = user?.roles ?? [];
    
    useEffect(() =>{
        if(roles.length > 1 && !role){
            // setOpen(true)
            handleRoleSelected(roles[0].id)
        } else if (roles.length === 1 && !role){
            handleRoleSelected(roles[0].id)
        }
    },[]);

    const roleAccessService = new RoleAccessService();
    const { data: dataRoleAccess, isFetching:loadingRoleAccess } = useQuery({
        queryKey:['role-access', role],
        queryFn:() => roleAccessService.getRoleAccess(role, user?.userId)
    });

    useEffect(() => {
      if(dataRoleAccess){
        setMenuPermission(dataRoleAccess?.data?.menus)
        // setDataSidebar(dataRoleAccess);
      }
    }, [dataRoleAccess, setMenuPermission]);

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

    return {
        dataRoleAccess,
        loadingRoleAccess, 
        handleMouseEnter,
        handleMouseLeave,
        sidebarOpen, 
        setSidebarOpen
        
    }

    
}

export default useGetRoleAccess;