/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePagination } from "@/shared/hooks/use-pagination";
import { useSorting } from "@/shared/hooks/use-sorting";
import { buildQueryBody } from "@/shared/lib/build-query-body";
import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "@/shared/store/user.store";
import { useQuery } from "@tanstack/react-query";
import { RoleService } from "../services/role.service";

const useRole = () => {
    const { limit, onPaginationChange, skip, pagination } = usePagination();
    const { sorting, onSortingChange} = useSorting('name');
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

    const getListRole = async() => {
        const roleService = new RoleService();
        const res = await roleService.getList(bodyReq);
        return res;
    }

    const {
        data:ListRole,
        isPending
    } = useQuery({
        queryKey: ['role', body],
        queryFn: () => getListRole(),
        enabled: true,
    });

    const pageCount = ListRole && ListRole.totalRecord ? Math.ceil(ListRole.totalRecord / limit): 0;

    return {
        ListRole,
        isPending,
        onPaginationChange,
        onSortingChange,
        handleFilter,
        pagination,
        sorting, 
        pageCount,
    }
}

export default useRole