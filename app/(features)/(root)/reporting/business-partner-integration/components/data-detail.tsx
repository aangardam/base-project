import { Badge } from "@/shared/components/ui/badge"; // sesuaikan dengan path kamu
import { ScrollArea } from "@/shared/components/ui/scroll-area"; // jika pakai komponen scroll-area
// import { Card } from "@/shared/components/ui/card"; // opsional

const DataDetail = () => {
  const data = {
    requestId: "RPT-0001",
    requestTime: "2025-07-12 10:30:45",
    data: [
      {
        reportId: "RPT-0001",
        date: "2025-07-12",
        transaction: [
          {
            orderId: "ORD-20250701-001",
          },
        ],
      },
    ],
  };

  return (
    <div className="space-y-4">
      {/* Metadata section */}
      <div className="grid grid-cols-2 gap-6 text-sm">
        <div className="space-y-1">
          <p><span className="font-semibold">Report ID:</span> RPT-0001</p>
          <p><span className="font-semibold">Order ID:</span> ORD-20250701-001</p>
          <p><span className="font-semibold">Report Date:</span> 2025-07-12</p>
          <p><span className="font-semibold">Submitted at:</span> 2025-07-12 10:30:45</p>
          <p><span className="font-semibold">Error:</span> -</p>
        </div>
        <div className="space-y-2">
          <p><span className="font-semibold">Request ID:</span> REQ001</p>
          <div>
            <Badge variant="success">Success</Badge>
          </div>
        </div>
      </div>

      {/* JSON Viewer */}
      <ScrollArea className="border rounded p-4 max-h-60">
        <pre className="text-xs whitespace-pre-wrap break-words">
          {JSON.stringify(data, null, 2)}
        </pre>
      </ScrollArea>
    </div>
  );
};

export default DataDetail;
