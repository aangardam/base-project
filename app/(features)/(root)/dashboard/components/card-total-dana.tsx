import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { formatRupiah } from "@/shared/utils/utils"

interface PropTypes {
    data:string;
}

const CardTotalDana = (props:PropTypes) => {
    const { data } = props;
    return (
        <Card className="bg-white w-full">
          <CardHeader className="pb-3">
             <CardTitle className="text-md font-medium text-gray-700 text-center">Total Dana Masuk</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-3xl font-bold text-blue-600 align-middle mb-10 md:mb-0 -mt-2 md:mt-[7%]">Rp. {formatRupiah(data)}</div>
          </CardContent>
        </Card>
    )
}

export default CardTotalDana