/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserStore } from "@/shared/store/user.store";
import { RoleService } from "../services/role.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useRoleTree = (data?: any, form?: any) => {
   const roleService = new RoleService();
   const { user } = useUserStore();
   const [hideTree, setHideTree] = useState(false);

   const userId = user?.userId;
   const roleId = user?.roles[0].id;

   const getRoleTree = async () => {
      const res = await roleService.getRoleTree(userId , roleId);
      return res;
   }
   
   const { data:dataRoleTree, isLoading } = useQuery({
      queryKey: ['role-tree'],
      queryFn: getRoleTree,
   });

   const normalizeTree = (data: any[]): any[] => {
      return data.map((item) => {
         const children = item.subMenu ? normalizeTree(item.subMenu) : [];
         return {
            ...item,
            children,
         };
      });
   };

   const transformDataTree = {
      name: '',
      children: normalizeTree(dataRoleTree?.data?.subMenu ?? []),
   };

   const extractIds = (items: any): number[] => {
      let ids: number[] = [];
      for (const item of items) {
          ids.push(item.id);
          if (item.subMenu && item.subMenu.length > 0) {
              ids = ids.concat(extractIds(item.subMenu));
          }
      }
      return ids;
   };
   const idsList = extractIds(dataRoleTree?.data?.subMenu ?? []);

   useEffect(() => {
      if (data?.menuFunctionIds?.some((item: any) => item === 1)) {
          setHideTree(true);
      }
      form.reset({
          name: data?.name ?? '',
          menuFunctionIds: data?.menuFunctionIds ?? [],
      });
  }, [data]);
   
   return { 
      dataRoleTree, 
      isLoading,
      hideTree,
      setHideTree,
      transformDataTree,
      idsList,
   };
}

export default useRoleTree;