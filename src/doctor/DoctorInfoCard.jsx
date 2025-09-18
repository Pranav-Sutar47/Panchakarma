import { Card, CardContent } from "@/components/ui/card";

export default function DoctorInfoCard({ className }) {
   const doctor = {
    name: "Dr. Rohan Teli",
    specialization: "Ayurvedic Specialist",
    experience: "12 years",
    degree: "BAMS, MD (Ayurveda)",
    hospital: "Pune Ayurvedic Clinic",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  };

  return (
    <Card className={`w-full h-full shadow-md rounded-2xl overflow-hidden ${className}`}>
      <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
        {/* Left - Image */}
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-green-500 flex-shrink-0">
          <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
        </div>
        {/* Right - Info */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h2 className="text-2xl font-bold">{doctor.name}</h2>
          <p className="text-green-400 font-medium">{doctor.specialization}</p>
          <p><span className="font-semibold">Experience:</span> {doctor.experience}</p>
          <p><span className="font-semibold">Degree:</span> {doctor.degree}</p>
          <p><span className="font-semibold">Hospital:</span> {doctor.hospital}</p>
        </div>
      </CardContent>
    </Card>
  );
}




 