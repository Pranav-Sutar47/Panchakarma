import React, { useState } from 'react';
import { IconChevronLeft, IconCheck, IconX, IconEye, IconPhone, IconMail, IconCalendar } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

// Dummy doctors data
const dummyDoctors = {
  1: [
    {
      id: 1,
      name: "Dr. John Smith",
      specialty: "Cardiology",
      experience: "10 years",
      isVerified: true,
      documents: ["Medical License", "Board Certification", "CV"],
      phone: "+1-555-1234",
      email: "john.smith@cityhospital.com",
      joinDate: "2020-03-15",
      education: "Harvard Medical School",
      rating: 4.8
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      specialty: "Pediatrics",
      experience: "8 years",
      isVerified: false,
      documents: ["Medical License", "Board Certification", "CV"],
      phone: "+1-555-5678",
      email: "sarah.johnson@cityhospital.com",
      joinDate: "2021-06-10",
      education: "Johns Hopkins University",
      rating: 4.6
    },
    {
      id: 3,
      name: "Dr. Mike Wilson",
      specialty: "Orthopedics",
      experience: "12 years",
      isVerified: true,
      documents: ["Medical License", "Board Certification", "CV", "Fellowship Certificate"],
      phone: "+1-555-9012",
      email: "mike.wilson@cityhospital.com",
      joinDate: "2019-01-20",
      education: "Stanford Medical School",
      rating: 4.9
    }
  ],
  2: [
    {
      id: 4,
      name: "Dr. Emily Davis",
      specialty: "Dermatology",
      experience: "6 years",
      isVerified: false,
      documents: ["Medical License", "Board Certification"],
      phone: "+1-555-3456",
      email: "emily.davis@stmarys.com",
      joinDate: "2022-04-05",
      education: "UCLA Medical School",
      rating: 4.5
    },
    {
      id: 5,
      name: "Dr. Robert Brown",
      specialty: "Neurology",
      experience: "15 years",
      isVerified: true,
      documents: ["Medical License", "Board Certification", "CV", "Research Publications"],
      phone: "+1-555-7890",
      email: "robert.brown@stmarys.com",
      joinDate: "2018-08-12",
      education: "Mayo Clinic School of Medicine",
      rating: 4.7
    }
  ],
  3: [
    {
      id: 6,
      name: "Dr. Lisa Anderson",
      specialty: "Oncology",
      experience: "9 years",
      isVerified: false,
      documents: ["Medical License", "CV"],
      phone: "+1-555-2468",
      email: "lisa.anderson@metrohealth.com",
      joinDate: "2021-11-30",
      education: "University of Pennsylvania",
      rating: 4.4
    }
  ],
  4: [
    {
      id: 8,
      name: "Dr. Jennifer Taylor",
      specialty: "Psychiatry",
      experience: "11 years",
      isVerified: true,
      documents: ["Medical License", "Board Certification", "CV"],
      phone: "+1-555-1357",
      email: "jennifer.taylor@regional.com",
      joinDate: "2020-02-14",
      education: "Columbia University",
      rating: 4.6
    }
  ],
  5: [
    {
      id: 9,
      name: "Dr. Michael Chang",
      specialty: "Emergency Medicine",
      experience: "7 years",
      isVerified: false,
      documents: ["Medical License", "Board Certification"],
      phone: "+1-555-9753",
      email: "michael.chang@advancedcare.com",
      joinDate: "2022-01-08",
      education: "University of California San Francisco",
      rating: 4.3
    }
  ]
};

export default function DoctorList({ hospital, onBack }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  const doctors = dummyDoctors[hospital?.id] || [];
  const verifiedCount = doctors.filter(d => d.isVerified).length;
  const pendingCount = doctors.filter(d => !d.isVerified).length;

  const handleVerifyDoctor = (doctorId) => {
    if (window.confirm('Are you sure you want to verify this doctor?')) {
      alert(`Doctor ${doctorId} verified successfully!`);
      // Here you would update the doctor's verification status
    }
  };

  const handleRejectDoctor = (doctorId) => {
    if (window.confirm('Are you sure you want to reject this doctor verification?')) {
      alert(`Doctor ${doctorId} verification rejected!`);
      // Here you would update the doctor's verification status
    }
  };

  const DoctorCard = ({ doctor }) => (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {doctor.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                {doctor.name}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{doctor.specialty}</p>
            </div>
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-medium ml-auto",
              doctor.isVerified
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            )}>
              {doctor.isVerified ? "Verified" : "Pending"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <IconCalendar className="h-4 w-4 text-neutral-500" />
                <span className="text-neutral-600 dark:text-neutral-400">
                  Experience: {doctor.experience}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <IconPhone className="h-4 w-4 text-neutral-500" />
                <span className="text-neutral-600 dark:text-neutral-400">{doctor.phone}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <IconMail className="h-4 w-4 text-neutral-500" />
                <span className="text-neutral-600 dark:text-neutral-400">{doctor.email}</span>
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Rating: ⭐ {doctor.rating}/5.0
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Documents Submitted:
            </p>
            <div className="flex flex-wrap gap-2">
              {doctor.documents.map((doc, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs"
                >
                  {doc}
                </span>
              ))}
            </div>
          </div>

          <div className="text-xs text-neutral-500 dark:text-neutral-500">
            Education: {doctor.education} • Joined: {new Date(doctor.joinDate).toLocaleDateString()}
          </div>
        </div>

        <div className="flex flex-col gap-2 ml-4">
          <button
            onClick={() => setSelectedDoctor(doctor)}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            title="View Details"
          >
            <IconEye className="h-4 w-4" />
          </button>
          {!doctor.isVerified && (
            <>
              <button
                onClick={() => handleVerifyDoctor(doctor.id)}
                className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                title="Verify Doctor"
              >
                <IconCheck className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleRejectDoctor(doctor.id)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Reject Verification"
              >
                <IconX className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <IconChevronLeft className="h-5 w-5" />
          <span>Back to Hospitals</span>
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
          Doctors - {hospital?.name}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          {hospital?.location} • {doctors.length} doctors total
        </p>
      </div>

      {/* Doctors List */}
      <div className="space-y-4">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl">
            <p className="text-neutral-500 dark:text-neutral-400">
              No doctors found for this hospital.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}