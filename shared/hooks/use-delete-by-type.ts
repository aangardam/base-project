import useDeleteRole from "@/app/(features)/(root)/access-control/role/hooks/use-delete-role";

export function useDeleteByMenuType(type: string) {
  const deleteRole = useDeleteRole();
  
  switch (type) {
    case "role":
      return deleteRole.mutateDeleteRole;
    default:
      return undefined;
  }
}
