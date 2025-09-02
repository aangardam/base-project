import { useQuery } from "@tanstack/react-query";

import { usePagination } from "@/shared/hooks/use-pagination";
import { useSorting } from "@/shared/hooks/use-sorting";
import { useEffect, useMemo, useState } from "react";
import { buildQueryBody } from "@/shared/lib/build-query-body";
import { DummyService } from "../services/dummy.service";

const useListDummy = () =>{

    // Get List
    const { limit, onPaginationChange, skip, pagination } = usePagination();
    const { sorting, onSortingChange} = useSorting();
    const [search, setSearch] = useState('');
    const handleFilter = setSearch;

    const body = useMemo(() => buildQueryBody({ sorting, search, skip, limit }), [sorting, search, skip, limit]);
    console.log('skip', skip)
    console.log('limit', limit)
    useEffect(() => {
        onPaginationChange({
            pageIndex: 0,
            pageSize: limit,
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorting, search]);

   
    const getListDataDummy = async() => {
        const dummyService = new DummyService();
        const res = await dummyService.getDataDummyList(body);
        return res;
    }

    const {
        data:ListData,
        isPending
    } = useQuery({
        queryKey: ['dummy', body],
        queryFn: () => getListDataDummy(),
        enabled: true,
    });

    return {
        ListData,
        isPending,
        onPaginationChange,
        onSortingChange,
        handleFilter,
        pagination,
        sorting,
    }
}

export default useListDummy;