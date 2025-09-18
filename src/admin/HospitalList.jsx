import React from 'react';
import { IconChevronRight, IconMapPin, IconUsers, IconClock } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

// Dummy hospital data
const dummyHospitals = [
  {
    id: 1,
    name: "City General Hospital",
    location: "Downtown, New York",
    totalDoctors: 25,
    pendingVerifications: 3,
    verified: true,
    established: "1985",
    specialties: ["Cardiology", "Neurology", "Pediatrics", "Orthopedics"],
    contactNumber: "+1-555-0123"
  },
  {
    id: 2,
    name: "St. Mary's Medical Center",
    location: "Westside, California",
    totalDoctors: 18,
    pendingVerifications: 2,
    verified: true,
    established: "1992",
    specialties: ["Dermatology", "Oncology", "Emergency Medicine"],
    contactNumber: "+1-555-0456"
  },
  {
    id: 3,
    name: "Metropolitan Health Institute",
    location: "Central District, Texas",
    totalDoctors: 32,
    pendingVerifications: 5,
    verified: false,
    established: "2001",
    specialties: ["Psychiatry", "Internal Medicine", "Surgery"],
    contactNumber: "+1-555-0789"
  },
  {
    id: 4,
    name: "Regional Medical Complex",
    location: "Eastside, Florida",
    totalDoctors: 21,
    pendingVerifications: 1,
    verified: true,
    established: "1978",
    specialties: ["Radiology", "Pathology", "Anesthesiology"],
    contactNumber: "+1-555-0321"
  },
  {
    id: 5,
    name: "Advanced Care Hospital",
    location: "North Valley, Arizona",
    totalDoctors: 28,
    pendingVerifications: 4,
    verified: false,
    established: "2010",
    specialties: ["Intensive Care", "Emergency", "General Surgery"],
    contactNumber: "+1-555-0654"
  }
];

export default function HospitalList({ onHospitalSelect }) {
  const verifiedHospitals = dummyHospitals.filter(h => h.verified);
  const pendingHospitals = dummyHospitals.filter(h => !h.verified);

  const HospitalCard = ({ hospital }) => (
    <div
      onClick={() => onHospitalSelect(hospital)}
      className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {hospital.name}
            </h3>
            <span className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              hospital.verified
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            )}>
              {hospital.verified ? "Verified" : "Pending"}
            </span>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <IconMapPin className="h-4 w-4 text-neutral-500" />
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">{hospital.location}</p>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <IconUsers className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {hospital.totalDoctors} Doctors
              </span>
            </div>
            {hospital.pendingVerifications > 0 && (
              <div className="flex items-center gap-1">
                <IconClock className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                  {hospital.pendingVerifications} Pending
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {hospital.specialties.slice(0, 3).map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs"
              >
                {specialty}
              </span>
            ))}
            {hospital.specialties.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs">
                +{hospital.specialties.length - 3} more
              </span>
            )}
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            Established: {hospital.established} • {hospital.contactNumber}
          </p>
        </div>
        
        <IconChevronRight className="text-neutral-400 h-5 w-5 group-hover:text-blue-500 transition-colors" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">

      {/* Hospital List */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">
          All Hospitals
        </h2>
        <div className="grid gap-4">
          {dummyHospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      </div>
    </div>
  );
}