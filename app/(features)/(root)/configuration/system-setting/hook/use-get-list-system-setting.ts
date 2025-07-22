import { usePagination } from "@/shared/hooks/use-pagination";
import { useSorting } from "@/shared/hooks/use-sorting";
import { useEffect, useMemo, useState } from "react";
import {  SystemSettingService } from "../service/system-setting.service";
import { useQuery } from "@tanstack/react-query";
import { buildQueryBody } from "@/shared/lib/build-query-body";

const useGetListSystemSetting = () => {
    const { limit, onPaginationChange, skip, pagination } = usePagination();
    const { sorting, onSortingChange} = useSorting();
    const [search, setSearch] = useState('');

    const handleFilter = setSearch;

    const body = useMemo(() => buildQueryBody({ sorting, search, skip, limit }), [sorting, search, skip, limit]);
    useEffect(() => {
        onPaginationChange({
            pageIndex: 0,
            pageSize: limit,
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorting, search]);

   
    const getListDataMenu = async() => {
        const systemSettingService = new SystemSettingService();
        const res = await systemSettingService.getList(body);
        return res;
    }

    const {
        data:ListMenu,
        isPending
    } = useQuery({
        queryKey: ['menu', body],
        queryFn: () => getListDataMenu(),
        enabled: true,
    });

    return {
        ListMenu,
        isPending,
        onPaginationChange,
        onSortingChange,
        handleFilter,
        pagination,
        sorting,
    }
}
export default useGetListSystemSetting