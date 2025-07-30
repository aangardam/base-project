/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePagination } from "@/shared/hooks/use-pagination";
import { useSorting } from "@/shared/hooks/use-sorting";
import { buildQueryBody } from "@/shared/lib/build-query-body";
import { useEffect, useMemo, useState } from "react";
import { MenuService } from "../services/menu.service";
import { useUserStore } from "@/shared/store/user.store";
import { useQuery } from "@tanstack/react-query";


const useMenu = () => {
    // get data menu
    const { limit, onPaginationChange, skip, pagination } = usePagination();
    const { sorting, onSortingChange} = useSorting();
    const [search, setSearch] = useState('');
    const { user } = useUserStore();

    const handleFilter = setSearch;

    const body = useMemo(() => buildQueryBody({ sorting, search, skip, limit }), [sorting, search, skip, limit]);
    const bodyReq = {
        ...body,
        userId: user?.userId,
        roleId: user?.roles[0].id,
    }
    useEffect(() => {
        onPaginationChange({
            pageIndex: 0,
            pageSize: limit,
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorting, search]);

   
    const getListMenu = async() => {
        const menuService = new MenuService();
        const res = await menuService.getList(bodyReq);
        return res;
    }

    const {
        data:ListMenu,
        isPending
    } = useQuery({
        queryKey: ['menu', body],
        queryFn: () => getListMenu(),
        enabled: true,
    });

    const pageCount = ListMenu && ListMenu.totalRecord ? Math.ceil(ListMenu.totalRecord / limit): 0;

    return {
        ListMenu,
        isPending,
        onPaginationChange,
        onSortingChange,
        handleFilter,
        pagination,
        sorting, 
        pageCount,
    }
}

export default useMenu