import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
    Cell,
  } from "recharts";
  
//   const data = [
//     { bulan: "JAN", dana: 7800 },
//     { bulan: "FEB", dana: 10000 },
//     { bulan: "MAR", dana: 8500 },
//     { bulan: "APR", dana: 5000 },
//   ];

interface PropTypes {
    data:{
        bulan: string;
        dana: number;
        fill?:string
    }[];
}

const CardPerbandinganDana = (props:PropTypes) => {
    const { data } = props;
    return (
        <Card className="bg-white w-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-md text-center font-medium text-gray-700">Perbandingan Dana Masuk</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart
                    data={data}
                    margin={{ top: 40, right: 0, left: 0, bottom: 5 }}
                >
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip formatter={(value) => new Intl.NumberFormat().format(Number(value))} />
                <Bar dataKey="dana">
                    {data?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill || "#60A5FA"} />
                    ))}
                    <LabelList
                        dataKey="dana"
                        position="top"
                        formatter={(value) => new Intl.NumberFormat().format(Number(value))}
                    />
                </Bar>
                </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
    )
}

export default CardPerbandinganDana