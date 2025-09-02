import { useQuery } from "@tanstack/react-query";
import { DropdownService } from "../services/dropdown.service";

const useDropdown = () => {
    const dropdownService = new DropdownService();

    // get dropdown Menu
    const { data: dataDropdownMenu, isPending:loadingDropdownMenu } = useQuery({
        queryKey:['menu', 'dropdown'],
        queryFn:() => dropdownService.getDropdownMenu(),
        select: ({ data }) => {
            // Add root menu item
            const rootMenuItem = {
                label: 'Root',
                value: 0,
            };
            const menuItems = data?.map((item) => ({
                label: item.name,
                value: item.id,
            }));

            return [rootMenuItem, ...menuItems];
        },
    });

    // get dropdown function
   const { data: dataDropdownFuntion, isPending:loadingDropdownFuntion } = useQuery({
        queryKey:['function', 'dropdown'],
        queryFn:() => dropdownService.getDropdownFunction(),
        select: ({ data }) => 
            data?.map((item) => ({
                label: item.name,
                value: item.id,
            })),
    });

   return {
       dataDropdownMenu,
       loadingDropdownMenu,

       dataDropdownFuntion,
       loadingDropdownFuntion
   }

}

export default useDropdown