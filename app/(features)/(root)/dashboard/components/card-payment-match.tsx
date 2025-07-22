
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
        name: string;
        value: number;
        fill?:string
    }[];
}

const CardPaymentMatchUnMatch = (props:PropTypes) => {
    const { data } = props;
   
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-md font-medium text-gray-700 text-center">Payment Match Vs Unmatch</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart
                        layout="vertical"
                        data={data}
                        margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                    >
                    <XAxis type="number" />
                    <YAxis className='text-sm' type="category" dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="value">
                        {data?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill || "#60A5FA"} />
                        ))}
                        <LabelList dataKey="value" position="right" />
                    </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export default CardPaymentMatchUnMatch