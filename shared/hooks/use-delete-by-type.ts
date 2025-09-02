
import useDeleteDummy from "@/app/(features)/(root)/dummy/hooks/use-delete-dummy";

export function useDeleteByMenuType(type: string) {
  const deleteDummy = useDeleteDummy();
  
  switch (type) {
    case "dummy":
      return deleteDummy.mutateDeleteDummy;
    default:
      return undefined;
  }
}
