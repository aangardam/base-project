import { usePagination } from "@/shared/hooks/use-pagination";
import { useSorting } from "@/shared/hooks/use-sorting";
import { useEffect, useMemo, useState } from "react";
import {  ApplicationParameterService } from "../service/application-parameter.service";
import { useQuery } from "@tanstack/react-query";
import { buildQueryBody } from "@/shared/lib/build-query-body";

const useGetListApplicationParameter = () => {
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

   
    const getListDataApplicationParameter = async() => {
        const applicationParameterService = new ApplicationParameterService();
        const res = await applicationParameterService.getList(body);
        return res;
    }

    const {
        data:ListApplicationParameter,
        isPending
    } = useQuery({
        queryKey: ['menu', body],
        queryFn: () => getListDataApplicationParameter(),
        enabled: true,
    });

    return {
        ListApplicationParameter,
        isPending,
        onPaginationChange,
        onSortingChange,
        handleFilter,
        pagination,
        sorting,
    }
}
export default useGetListApplicationParameter