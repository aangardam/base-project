'use client';

import { Card, CardContent,  CardHeader } from "@/shared/components/ui/card";
// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbLink,
//     BreadcrumbList,
//     BreadcrumbPage,
//     BreadcrumbSeparator,
// } from "@/shared/components/ui/breadcrumb";
// import { Separator } from "@/shared/components/ui/separator";
import { motion } from "framer-motion";
import Heading from "../ui/heading";


interface BreadcrumbItemType {
    name: string;
    href: string;
}

interface PropTypes {
    breadcrumb?: BreadcrumbItemType[];
    children?: React.ReactNode;
    description?: string;
    title: string;
}

const FrameLayout = ({ children,  description, title }: PropTypes) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="p-2 space-y-2"
        >
            <div className="space-y-5">
                <Card>
                    <CardHeader>
                        <Heading description={description} title={title} />
                    </CardHeader>
                    <CardContent>
                        {children}
                    </CardContent>
                </Card>
            </div>
            
        </motion.div>
    );
};

export default FrameLayout;
