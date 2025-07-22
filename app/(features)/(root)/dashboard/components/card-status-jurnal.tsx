import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
  

// const COLORS = ["#1D4ED8", "#93C5FD", "#B91C1C"];
interface PropTypes {
    data:{
        name: string;
        value: number;
        color?:string
    }[];
}

const CardStatusJurnal = (props:PropTypes) => {
    const { data } = props;
    return (
        <Card className="bg-white w-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-md text-center font-medium text-gray-700">Status Posting Jurnal</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {/* {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="#333" />
                        ))} */}
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="#333" />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
            </ResponsiveContainer>

            <div className="flex justify-around mt-4 text-center text-sm font-medium gap-3">
                {data.map(item => (
                    <div key={item.name}>
                        <div
                            className={`inline-block px-2 py-1 rounded ${
                                item.name === "Posted"
                                ? "bg-blue-800 text-white"
                                : item.name === "Unposted"
                                ? "bg-blue-200 text-blue-800"
                                : "bg-red-700 text-white"
                            }`}
                        >
                            {item.name}
                        </div>

                        <div
                            className={`mt-1 text-lg font-bold ${
                                item.name === "Failed"
                                ? "text-red-700"
                                : item.name === "Posted"
                                ? "text-blue-800"
                                : "text-blue-400"
                            }`}
                        >
                            {item.value}%
                        </div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
    )
}

export default CardStatusJurnal