"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface PropTypes {
    children: React.ReactNode;
}

export default function Providers(props: PropTypes){
    const { children } = props;
    const [ queryClient ] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: false,
                staleTime: 60 * 1000,
            }
        }
    }));
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}