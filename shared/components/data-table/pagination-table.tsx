/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";

export default function PaginationTable({ tableLib} : any) {
    const visiblePageNumber = 3

    const getPageNumbers = () => {
        const currentPage = tableLib.getState().pagination?.pageIndex + 1;
        const pageCount = tableLib.getPageCount();
        const starPage = Math.max(1, currentPage - Math.floor(visiblePageNumber / 2));
        const endPage = Math.min(pageCount, starPage + Math.floor(visiblePageNumber - 1));

        return Array.from({ length: endPage - starPage + 1 }, (_, i) => i + starPage);
    }

    return (
        <footer className="pagination flex">
            <Button
                variant="ghost"
                size="sm"
                disabled={!tableLib.getCanPreviousPage()}
                onClick={() => tableLib.setPageIndex(0)}
            >
                {'<<'}
            </Button>
            <Button
                variant="ghost"
                size="sm"
                disabled={!tableLib.getCanPreviousPage()}
                onClick={tableLib.previousPage}
            >
                {'<'}
            </Button>
            {getPageNumbers().map((number) => (
                <Button
                    variant={'ghost'}
                    key={number}
                    onClick={() => tableLib.setPageIndex(number - 1)}
                    isActive={
                        number === tableLib.getState().pagination?.pageIndex + 1
                    }
                >
                    {number}
                </Button>
            ))}

            <Button
                variant="ghost"
                size="sm"
                disabled={!tableLib.getCanNextPage()}
                onClick={tableLib.nextPage}
            >
                {'>'}
            </Button>
            <Button
                variant="ghost"
                size="sm"
                disabled={!tableLib.getCanNextPage()}
                onClick={() =>
                    tableLib.setPageIndex(tableLib.getPageCount() - 1)
                }
            >
                {'>>'}
            </Button>
        </footer>
    )
}