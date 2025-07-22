
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';

// const data = [
//     {
//       name: "Dana Masuk",
//       value: 550,
//     },
//     {
//       name: "Data Payment",
//       value: 600,
//     },
// ];

interface PropTypes {
    data:{
        data:{
            name: string;
            value: number;
            fill?:string;
        }[];
        selisih: number;
    }
}

const CardRekonsialisasiDana = (props:PropTypes) => {
    const { data } = props;
   
    // console.log(data.length)
    let heightCard = 180
    if(data?.data.length >= 3){
        heightCard = 250
    }
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-md font-medium text-gray-700 text-center">Rekonsialisasi Dana vs Payment</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={heightCard}>
                    <BarChart
                        layout="vertical"
                        data={data?.data}
                        margin={{ top: 10, right: 50, left: 10, bottom: 5 }}
                    >
                    <XAxis type="number" />
                    <YAxis className='text-sm' type="category" dataKey="name" />
                    <Tooltip />
                    <Bar 
                        dataKey="value" 
                        // fill="#60A5FA"
                    >
                         {data?.data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill || "#60A5FA"} />
                        ))}
                        <LabelList dataKey="value" position="right" />
                    </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <p className="text-right mt-2 text-base text-gray-700">
                    Selisih : {" "}
                    <span className={`font-bold text-2xl ${data?.selisih < 0 ? "text-red-600" : "text-green-600"}`}>
                        {data?.selisih.toFixed()}%
                    </span>
                </p>
            </CardContent>
        </Card>
    )
}

export default CardRekonsialisasiDana