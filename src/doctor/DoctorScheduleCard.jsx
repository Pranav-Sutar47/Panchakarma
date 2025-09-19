import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DoctorScheduleCard() {
  // Example dummy schedule
  const schedule = {
    workingHours: "9:00 AM – 5:00 PM",
    todaySlots: [
      { time: "09:30 AM", patient: "Rahul Sharma", status: "Completed" },
      { time: "11:00 AM", patient: "Priya Desai", status: "Ongoing" },
      { time: "02:00 PM", patient: "Amit Patil", status: "Upcoming" },
      { time: "04:00 PM", patient: "Sneha Kulkarni", status: "Upcoming" },
    ],
  };

  return (
    <Card className="w-full shadow-md rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Today's Schedule</CardTitle>
        <p className="text-sm text-neutral-500">
          Working Hours: {schedule.workingHours}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {schedule.todaySlots.map((slot, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b pb-2 last:border-none last:pb-0"
          >
            <div>
              <p className="font-medium">{slot.time}</p>
              <p className="text-sm text-neutral-600">{slot.patient}</p>
            </div>
            <span
              className={`px-3 py-1 text-xs rounded-full font-semibold ${
                slot.status === "Completed"
                  ? "bg-green-100 text-green-600"
                  : slot.status === "Ongoing"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {slot.status}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
