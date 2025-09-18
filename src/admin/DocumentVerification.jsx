import React, { useState } from 'react';
import { 
  IconEye, 
  IconCheck, 
  IconX, 
  IconDownload, 
  IconFilter, 
  IconSearch,
  IconAlertTriangle,
  IconClock,
  IconFileText,
  IconShield,
  IconUser,
  IconMapPin,
  IconPhone,
  IconMail,
  IconCalendar,
  IconSchool,
  IconStar
} from '@tabler/icons-react';

// Utility function
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Dummy data for doctors pending verification
const pendingDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@gmail.com",
    phone: "+1-555-0123",
    specialty: "Pediatrics",
    experience: "8 years",
    hospital: "City General Hospital",
    location: "New York, NY",
    education: "Johns Hopkins Medical School",
    graduationYear: "2015",
    licenseNumber: "NY-MD-12345",
    submittedDate: "2024-01-15",
    urgency: "high",
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    documents: [
      {
        id: 1,
        name: "Medical License",
        type: "license",
        status: "pending",
        uploadDate: "2024-01-15",
        url: "#",
        required: true,
        description: "Valid medical license from state authority"
      },
      {
        id: 2,
        name: "Board Certification",
        type: "certification",
        status: "pending",
        uploadDate: "2024-01-15",
        url: "#",
        required: true,
        description: "Board certification in specialty"
      },
      {
        id: 3,
        name: "Medical Degree",
        type: "degree",
        status: "pending",
        uploadDate: "2024-01-15",
        url: "#",
        required: true,
        description: "Medical degree from accredited institution"
      },
      {
        id: 4,
        name: "CV/Resume",
        type: "cv",
        status: "pending",
        uploadDate: "2024-01-15",
        url: "#",
        required: true,
        description: "Updated curriculum vitae"
      },
      {
        id: 5,
        name: "Malpractice Insurance",
        type: "insurance",
        status: "pending",
        uploadDate: "2024-01-15",
        url: "#",
        required: false,
        description: "Professional liability insurance"
      }
    ],
    verificationNotes: ""
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1-555-0456",
    specialty: "Cardiology",
    experience: "12 years",
    hospital: "St. Mary's Medical Center",
    location: "Los Angeles, CA",
    education: "Harvard Medical School",
    graduationYear: "2011",
    licenseNumber: "CA-MD-67890",
    submittedDate: "2024-01-20",
    urgency: "medium",
    profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    documents: [
      {
        id: 6,
        name: "Medical License",
        type: "license",
        status: "pending",
        uploadDate: "2024-01-20",
        url: "#",
        required: true,
        description: "Valid medical license from state authority"
      },
      {
        id: 7,
        name: "Board Certification",
        type: "certification",
        status: "pending",
        uploadDate: "2024-01-20",
        url: "#",
        required: true,
        description: "Board certification in Cardiology"
      },
      {
        id: 8,
        name: "Medical Degree",
        type: "degree",
        status: "pending",
        uploadDate: "2024-01-20",
        url: "#",
        required: true,
        description: "Medical degree from Harvard Medical School"
      },
      {
        id: 9,
        name: "Fellowship Certificate",
        type: "fellowship",
        status: "pending",
        uploadDate: "2024-01-20",
        url: "#",
        required: false,
        description: "Cardiology fellowship certificate"
      }
    ],
    verificationNotes: ""
  }
];

export default function DoctorDocumentVerification() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [documentStatuses, setDocumentStatuses] = useState({});
  const [verificationNotes, setVerificationNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUrgency, setFilterUrgency] = useState("all");

  // Filter doctors based on search and urgency
  const filteredDoctors = pendingDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUrgency = filterUrgency === "all" || doctor.urgency === filterUrgency;
    return matchesSearch && matchesUrgency;
  });

  const getDaysWaiting = (submittedDate) => {
    const today = new Date();
    const submitted = new Date(submittedDate);
    const diffTime = Math.abs(today - submitted);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleDocumentStatusChange = (docId, status) => {
    setDocumentStatuses(prev => ({
      ...prev,
      [docId]: status
    }));
  };

  const handleVerifyDoctor = () => {
    const doctor = selectedDoctor;
    const requiredDocs = doctor.documents.filter(doc => doc.required);
    const approvedRequiredDocs = requiredDocs.filter(doc => 
      documentStatuses[doc.id] === 'approved'
    );

    if (approvedRequiredDocs.length !== requiredDocs.length) {
      alert('All required documents must be approved before verifying the doctor.');
      return;
    }

    if (window.confirm(`Are you sure you want to verify ${doctor.name}? This action cannot be undone.`)) {
      alert(`${doctor.name} has been successfully verified!`);
      setSelectedDoctor(null);
      setDocumentStatuses({});
      setVerificationNotes("");
      // Here you would make API call to verify doctor
    }
  };

  const handleRejectDoctor = () => {
    const doctor = selectedDoctor;
    if (!verificationNotes.trim()) {
      alert('Please provide rejection notes explaining the reason for rejection.');
      return;
    }

    if (window.confirm(`Are you sure you want to reject ${doctor.name}'s application?`)) {
      alert(`${doctor.name}'s application has been rejected.`);
      setSelectedDoctor(null);
      setDocumentStatuses({});
      setVerificationNotes("");
      // Here you would make API call to reject doctor
    }
  };

  const DoctorCard = ({ doctor }) => (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow cursor-pointer"
         onClick={() => setSelectedDoctor(doctor)}>
      <div className="flex items-start gap-4">
        <img
          src={doctor.profileImage}
          alt={doctor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 truncate">
              {doctor.name}
            </h3>
            <span className={cn("px-2 py-1 rounded-full text-xs font-medium capitalize", getUrgencyColor(doctor.urgency))}>
              {doctor.urgency}
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium">
              {getDaysWaiting(doctor.submittedDate)} days
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 text-sm text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-1">
              <IconUser className="h-4 w-4" />
              <span>{doctor.specialty} • {doctor.experience}</span>
            </div>
            <div className="flex items-center gap-1">
              <IconMapPin className="h-4 w-4" />
              <span>{doctor.hospital}</span>
            </div>
            <div className="flex items-center gap-1">
              <IconSchool className="h-4 w-4" />
              <span>{doctor.education}</span>
            </div>
            <div className="flex items-center gap-1">
              <IconShield className="h-4 w-4" />
              <span>License: {doctor.licenseNumber}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconFileText className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {doctor.documents.length} documents • {doctor.documents.filter(d => d.required).length} required
              </span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
              Review Documents →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const DocumentReviewCard = ({ document, doctor }) => {
    const currentStatus = documentStatuses[document.id] || 'pending';
    
    return (
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                {document.name}
              </h4>
              {document.required && (
                <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-xs font-medium">
                  Required
                </span>
              )}
              <span className={cn(
                "px-2 py-1 rounded text-xs font-medium capitalize",
                currentStatus === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                currentStatus === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              )}>
                {currentStatus}
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              {document.description}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <button
            onClick={() => window.open(document.url, '_blank')}
            className="flex items-center gap-2 px-3 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <IconEye className="h-4 w-4" />
            <span>View</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open(document.url, '_blank')}
              className="flex items-center gap-1 px-3 py-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors"
            >
              <IconDownload className="h-4 w-4" />
              <span>Download</span>
            </button>

            <div className="flex gap-1 ml-2">
              <button
                onClick={() => handleDocumentStatusChange(document.id, 'rejected')}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  currentStatus === 'rejected'
                    ? "bg-red-600 text-white"
                    : "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                )}
                title="Reject Document"
              >
                <IconX className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDocumentStatusChange(document.id, 'approved')}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  currentStatus === 'approved'
                    ? "bg-green-600 text-white"
                    : "text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                )}
                title="Approve Document"
              >
                <IconCheck className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (selectedDoctor) {
    const doctor = selectedDoctor;
    const requiredDocs = doctor.documents.filter(doc => doc.required);
    const approvedRequiredDocs = requiredDocs.filter(doc => 
      documentStatuses[doc.id] === 'approved'
    );
    const canVerify = approvedRequiredDocs.length === requiredDocs.length;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedDoctor(null);
              setDocumentStatuses({});
              setVerificationNotes("");
            }}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <IconX className="h-5 w-5" />
            <span>Back to List</span>
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={handleRejectDoctor}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <IconX className="h-4 w-4" />
              Reject Application
            </button>
            <button
              onClick={handleVerifyDoctor}
              disabled={!canVerify}
              className={cn(
                "px-4 py-2 rounded-lg transition-colors flex items-center gap-2",
                canVerify
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              )}
            >
              <IconCheck className="h-4 w-4" />
              Verify Doctor
            </button>
          </div>
        </div>

        {/* Doctor Profile */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-start gap-6">
            <img
              src={doctor.profileImage}
              alt={doctor.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                  {doctor.name}
                </h2>
                <span className={cn("px-3 py-1 rounded-full text-sm font-medium capitalize", getUrgencyColor(doctor.urgency))}>
                  {doctor.urgency} Priority
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <IconUser className="h-4 w-4 text-neutral-500" />
                    <span className="font-medium">Specialty:</span>
                    <span className="text-neutral-600 dark:text-neutral-400">{doctor.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconClock className="h-4 w-4 text-neutral-500" />
                    <span className="font-medium">Experience:</span>
                    <span className="text-neutral-600 dark:text-neutral-400">{doctor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconMapPin className="h-4 w-4 text-neutral-500" />
                    <span className="font-medium">Hospital:</span>
                    <span className="text-neutral-600 dark:text-neutral-400">{doctor.hospital}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <IconMail className="h-4 w-4 text-neutral-500" />
                    <span className="font-medium">Email:</span>
                    <span className="text-neutral-600 dark:text-neutral-400">{doctor.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconPhone className="h-4 w-4 text-neutral-500" />
                    <span className="font-medium">Phone:</span>
                    <span className="text-neutral-600 dark:text-neutral-400">{doctor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconShield className="h-4 w-4 text-neutral-500" />
                    <span className="font-medium">License:</span>
                    <span className="text-neutral-600 dark:text-neutral-400">{doctor.licenseNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Progress */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Verification Progress
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {approvedRequiredDocs.length}/{requiredDocs.length}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-500">Required Docs</div>
            </div>
            <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(approvedRequiredDocs.length / requiredDocs.length) * 100}%` }}
              />
            </div>
            <div className={cn(
              "px-3 py-1 rounded-full text-sm font-medium",
              canVerify ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            )}>
              {canVerify ? "Ready to Verify" : "Pending Review"}
            </div>
          </div>
        </div>

        {/* Documents Review */}
        <div>
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
            Document Review ({doctor.documents.length} documents)
          </h3>
          <div className="space-y-4">
            {doctor.documents.map((document) => (
              <DocumentReviewCard key={document.id} document={document} doctor={doctor} />
            ))}
          </div>
        </div>

        {/* Verification Notes */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Verification Notes
          </h3>
          <textarea
            value={verificationNotes}
            onChange={(e) => setVerificationNotes(e.target.value)}
            placeholder="Add notes about the verification process, any concerns, or additional information..."
            className="w-full h-32 p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          Doctor Document Verification
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Review and verify doctor documents and credentials
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <IconFilter className="h-5 w-5 text-neutral-500" />
          <select
            value={filterUrgency}
            onChange={(e) => setFilterUrgency(e.target.value)}
            className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Doctor List */}
      <div className="space-y-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl">
            <IconFileText className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-500 dark:text-neutral-400">
              No doctors found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}