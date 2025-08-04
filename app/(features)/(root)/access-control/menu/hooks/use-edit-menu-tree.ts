/* eslint-disable @typescript-eslint/no-explicit-any */

import { getMenuPermission } from "@/shared/utils/utils";
import { MenuItemPayload, TDataMenuTree, TMenuTree, TMenuTreeRequestBody } from "../interfaces/menu";
import { formatRequestTime, generateRequestId } from "@/shared/utils/request.untils";
import { useUserStore } from "@/shared/store/user.store";
import { TreeItems } from "dnd-kit-sortable-tree";
import { MenuService } from "../services/menu.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/shared/hooks/use-toast";
import { AxiosError } from "axios";

const useEditMenuTree = (menuItems:any) => {
    const { user, menuPermission, userMenuInfo } = useUserStore();
    const menuService = new MenuService();
    const queryClient = useQueryClient();

    const permission = getMenuPermission(menuPermission, '/access-control/menu');
    const handleSubmit = () => {
        const createPayload = (
          items: TreeItems<TMenuTree>,
          parntId:number = 0
        ):TDataMenuTree[]=>{
          let result:TDataMenuTree[] = [];
          items.forEach((item:any)=>{
            result.push({
              id: Number(item.id),
              name: item.name,
              parent: parntId,
            });
            if(item.children && item.children.length > 0){
              result = result.concat(createPayload(item.children, Number(item.id)));
            }
          });
          return result;
        }
    
        const dataPayloadMenuTree = createPayload(menuItems, 0);
        const payload: MenuItemPayload = {
          requestId: generateRequestId(),
          requestTime: formatRequestTime(),
          data: {
            menu: dataPayloadMenuTree,
            userMenuInfo: {
                ...userMenuInfo,
                userId: user.userId,
                roleId: user.roles[0].id,
                menuId: permission[0].id,
                parentId: permission[0].parent,
            },
          },
        };
        // console.log(JSON.stringify(payload));
        mutateUpdateMenuTree(payload);
        
        
    };

    const updateMenuTree = async (payload: TMenuTreeRequestBody) => {
        const res = await menuService.updateMenuTree(payload);
        return res;
    }

    const { 
        mutate: mutateUpdateMenuTree ,
        isPending: isPendingMenuTree,
    } = useMutation({
        mutationFn: updateMenuTree,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['menu-tree'],
            });
            queryClient.invalidateQueries({
                queryKey: ['role-access'],
            });
            toast({
                title: 'Update Menu Success',
                description: 'Menu has been Updated successfully',
            });
           
        },
        onError: (error) => {
            const err = error as AxiosError
            const message = (err.response?.data as any)?.message || err.message;
            toast({
                title: 'Error',
                description: message,
                variant: 'destructive',
            })
        },
    });

    return {
        handleSubmit,
        isPendingMenuTree
    }
}

export default useEditMenuTree