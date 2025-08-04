/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState, useCallback } from "react";
import { MenuService } from "../services/menu.service";
import { useQuery } from "@tanstack/react-query";
import { TreeItems } from "dnd-kit-sortable-tree";
import { TMenuTree } from "../interfaces/menu";

const useMenuTree = () => {
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [menuItems, setMenuItems] = useState<TreeItems<TMenuTree>>([]);
    const [prevMenuItems, setPrevMenuItems] = useState<TreeItems<TMenuTree>>([]);   

    const menuTree = new MenuService();
    const { data: dataMenuTree} = useQuery({
        queryKey:['menu-tree'],
        queryFn:() => menuTree.getMenuTree()
    });

    // mapping dari subMenu ke children agar cocok dengan SortableTree
    const convertToTreeItems = useCallback((items: TMenuTree[]): TreeItems<TMenuTree> => {
        if (!items) return [];
        return items.map((item) => ({
            id: String(item.id),
            name: item.name,
            collapsed: true,
            children: convertToTreeItems(item.subMenu || []),
        }));
    }, []);

    useEffect(() => {
        const rawSubMenu = (dataMenuTree as any)?.data?.subMenu;
        if (Array.isArray(rawSubMenu)) {
            const treeItems = convertToTreeItems(rawSubMenu);
            setMenuItems(treeItems);
        }
    }, [dataMenuTree,convertToTreeItems]);

     // check kedalaman maksimum
    const hasDepthGreaterThan = (
        items: TreeItems<TMenuTree>,
        maxDepth: number,
        currentDepth = 1
    ): boolean => {
        return items.some((item) => {
        if (currentDepth > maxDepth) return true;
        if (item.children && item.children.length > 0) {
            return hasDepthGreaterThan(item.children, maxDepth, currentDepth + 1);
        }
        return false;
        });
    };

    // Fungsi bantu untuk mencari parent ID dari sebuah item berdasarkan tree
    const findParentId = (items: TreeItems<TMenuTree>, id: string | number, parentId: number | null = null): number | null => {
        for (const item of items) {
        if (item.id === id) return parentId;
        if (item.children) {
            const found = findParentId(item.children, id, Number(item.id));
            if (found !== null) return found;
        }
        }
        return null;
    };
  
    // Cek jika ada node yang berpindah parent
    const isMovingToDifferentParent = (
        oldItems: TreeItems<TMenuTree>,
        newItems: TreeItems<TMenuTree>
      ): boolean => {
        const flatten = (items: TreeItems<TMenuTree>): Record<string, { parent: number; index: number }> => {
          const result: Record<string, { parent: number; index: number }> = {};
      
          const traverse = (items: TreeItems<TMenuTree>, parentId = 0) => {
            items.forEach((item, index) => {
              result[item.id] = { parent: parentId, index };
              if (item.children?.length) {
                traverse(item.children, Number(item.id));
              }
            });
          };
      
          traverse(items);
          return result;
        };
      
        const oldFlat = flatten(oldItems);
        const newFlat = flatten(newItems);
      
        return Object.keys(oldFlat).some((id) => {
          return (
            oldFlat[id].parent !== newFlat[id]?.parent
          );
        });
    };

    return {
        dataMenuTree,
        disableSubmit,
        setDisableSubmit,
        menuItems,
        setMenuItems,
        hasDepthGreaterThan,
        isMovingToDifferentParent,
        prevMenuItems,
        setPrevMenuItems
    }
}

export default useMenuTree;