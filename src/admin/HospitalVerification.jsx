import React, { useState } from 'react';
import { 
  IconBuilding, IconMapPin, IconPhone, IconMail, IconCalendar,
  IconCheck, IconX, IconEye, IconClock, IconShield, IconUsers,
  IconSearch, IconFilter, IconAlertTriangle, IconFileText
} from '@tabler/icons-react';

// Utility function
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Dummy data
const pendingHospitals = [
  {
    id: 1,
    name: "Advanced Medical Center",
    email: "admin@advancedmed.com",
    phone: "+1-555-0123",
    address: "123 Healthcare Ave, Medical District",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    established: "2018",
    totalBeds: 150,
    totalDoctors: 45,
    licenseNumber: "NY-HOSP-2018-001",
    adminName: "Dr. Sarah Wilson",
    adminPhone: "+1-555-0124",
    specialties: ["Cardiology", "Neurology", "Emergency Medicine"],
    submittedDate: "2024-01-15",
    urgency: "high",
    website: "www.advancedmed.com",
    documents: [
      { id: 1, name: "Hospital License", type: "license", required: true },
      { id: 2, name: "Accreditation Certificate", type: "accreditation", required: true },
      { id: 3, name: "Insurance Certificate", type: "insurance", required: true },
      { id: 4, name: "Fire Safety Certificate", type: "safety", required: false }
    ],
    verificationChecks: {
      contactVerified: false,
      licenseVerified: false,
      addressVerified: false,
      accreditationVerified: false
    }
  },
  {
    id: 2,
    name: "Community Health Hospital",
    email: "info@communityhealth.org",
    phone: "+1-555-0456",
    address: "456 Community St, Downtown",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    country: "USA",
    established: "2015",
    totalBeds: 200,
    totalDoctors: 60,
    licenseNumber: "CA-HOSP-2015-002",
    adminName: "Michael Chen",
    adminPhone: "+1-555-0457",
    specialties: ["Pediatrics", "Orthopedics", "General Surgery"],
    submittedDate: "2024-01-20",
    urgency: "medium",
    website: "www.communityhealth.org",
    documents: [
      { id: 5, name: "Hospital License", type: "license", required: true },
      { id: 6, name: "Accreditation Certificate", type: "accreditation", required: true },
      { id: 7, name: "Insurance Certificate", type: "insurance", required: true }
    ],
    verificationChecks: {
      contactVerified: false,
      licenseVerified: false,
      addressVerified: false,
      accreditationVerified: false
    }
  }
];

// Compact components
const StatCard = ({ title, value, icon: Icon, gradient }) => (
  <div className={`${gradient} p-4 rounded-xl text-white`}>
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm opacity-90">{title}</h3>
        <p className="text-xl font-bold">{value}</p>
      </div>
      <Icon className="h-6 w-6 opacity-80" />
    </div>
  </div>
);

const HospitalCard = ({ hospital, onClick }) => {
  const getDaysWaiting = (date) => Math.ceil((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
  const getUrgencyColor = (urgency) => ({
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  }[urgency]);

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-neutral-800 p-5 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-md cursor-pointer transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-teal-600 rounded-xl flex items-center justify-center">
            <IconBuilding className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">{hospital.name}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{hospital.city}, {hospital.state}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("px-2 py-1 rounded text-xs font-medium", getUrgencyColor(hospital.urgency))}>
            {hospital.urgency}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs">
            {getDaysWaiting(hospital.submittedDate)}d
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
        <div className="flex items-center gap-1">
          <IconUsers className="h-4 w-4 text-neutral-500" />
          <span className="text-neutral-600 dark:text-neutral-400">{hospital.totalBeds} beds</span>
        </div>
        <div className="flex items-center gap-1">
          <IconShield className="h-4 w-4 text-neutral-500" />
          <span className="text-neutral-600 dark:text-neutral-400">{hospital.totalDoctors} doctors</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex -space-x-1">
          {hospital.specialties.slice(0, 3).map((specialty, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">
              {specialty}
            </span>
          ))}
          {hospital.specialties.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs">
              +{hospital.specialties.length - 3}
            </span>
          )}
        </div>
        <span className="text-blue-600 dark:text-blue-400 text-sm">Review →</span>
      </div>
    </div>
  );
};

const VerificationForm = ({ hospital, onBack, onVerify, onReject }) => {
  const [formData, setFormData] = useState({
    verifiedBy: '',
    notes: '',
    checks: { ...hospital.verificationChecks }
  });

  const updateCheck = (key, value) => {
    setFormData(prev => ({
      ...prev,
      checks: { ...prev.checks, [key]: value }
    }));
  };

  const allChecked = Object.values(formData.checks).every(Boolean);
  const canVerify = allChecked && formData.verifiedBy.trim();

  const handleVerify = () => {
    if (canVerify && window.confirm(`Verify ${hospital.name}?`)) {
      onVerify(hospital.id, formData);
    }
  };

  const handleReject = () => {
    if (!formData.notes.trim()) {
      alert('Please provide rejection notes.');
      return;
    }
    if (window.confirm(`Reject ${hospital.name}?`)) {
      onReject(hospital.id, formData.notes);
    }
  };

  const CheckBox = ({ checked, onChange, label, required = false }) => (
    <label className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
      />
      <span className="flex-1 text-sm text-neutral-700 dark:text-neutral-300">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
    </label>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to List
        </button>
        <div className="flex gap-3">
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={handleVerify}
            disabled={!canVerify}
            className={cn(
              "px-4 py-2 rounded-lg transition-colors",
              canVerify ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500"
            )}
          >
            Verify Hospital
          </button>
        </div>
      </div>

      {/* Hospital Info */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-teal-600 rounded-xl flex items-center justify-center">
            <IconBuilding className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">{hospital.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <IconMapPin className="h-4 w-4 text-neutral-500" />
                  <span>{hospital.address}, {hospital.city}, {hospital.state} {hospital.zipCode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconPhone className="h-4 w-4 text-neutral-500" />
                  <span>{hospital.phone}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <IconMail className="h-4 w-4 text-neutral-500" />
                  <span>{hospital.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCalendar className="h-4 w-4 text-neutral-500" />
                  <span>Est. {hospital.established} • {hospital.totalBeds} beds</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hospital.specialties.map((specialty, idx) => (
            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm">
              {specialty}
            </span>
          ))}
        </div>

        {/* Documents */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {hospital.documents.map((doc) => (
            <div key={doc.id} className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <IconFileText className="h-4 w-4 text-green-600" />
              <span className="text-xs text-green-800 dark:text-green-200">{doc.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Verification Checklist */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <h3 className="text-lg font-semibold mb-4">Verification Checklist</h3>
        <div className="space-y-3">
          <CheckBox
            checked={formData.checks.contactVerified}
            onChange={(val) => updateCheck('contactVerified', val)}
            label="Contact information verified (phone, email)"
            required
          />
          <CheckBox
            checked={formData.checks.licenseVerified}
            onChange={(val) => updateCheck('licenseVerified', val)}
            label="Hospital license and permits verified"
            required
          />
          <CheckBox
            checked={formData.checks.addressVerified}
            onChange={(val) => updateCheck('addressVerified', val)}
            label="Physical address and location verified"
            required
          />
          <CheckBox
            checked={formData.checks.accreditationVerified}
            onChange={(val) => updateCheck('accreditationVerified', val)}
            label="Accreditation and certifications verified"
            required
          />
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Verified By *</label>
            <input
              type="text"
              value={formData.verifiedBy}
              onChange={(e) => setFormData(prev => ({ ...prev, verifiedBy: e.target.value }))}
              placeholder="Enter your name"
              className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Verification Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add verification notes or rejection reasons..."
              className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
            />
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Verification Progress</span>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {Object.values(formData.checks).filter(Boolean).length}/4 completed
            </span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(Object.values(formData.checks).filter(Boolean).length / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HospitalVerification() {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUrgency, setFilterUrgency] = useState('all');

  const filteredHospitals = pendingHospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUrgency = filterUrgency === 'all' || hospital.urgency === filterUrgency;
    return matchesSearch && matchesUrgency;
  });

  const handleVerify = (hospitalId, formData) => {
    alert(`Hospital verified successfully!`);
    setSelectedHospital(null);
    // API call: await verifyHospital(hospitalId, formData);
  };

  const handleReject = (hospitalId, notes) => {
    alert(`Hospital rejected with notes: ${notes}`);
    setSelectedHospital(null);
    // API call: await rejectHospital(hospitalId, notes);
  };

  if (selectedHospital) {
    return (
      <VerificationForm
        hospital={selectedHospital}
        onBack={() => setSelectedHospital(null)}
        onVerify={handleVerify}
        onReject={handleReject}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">Hospital Verification</h2>
        <p className="text-neutral-600 dark:text-neutral-400">Review and verify hospital registrations</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <IconFilter className="h-4 w-4 text-neutral-500" />
          <select
            value={filterUrgency}
            onChange={(e) => setFilterUrgency(e.target.value)}
            className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Hospital List */}
      <div className="grid gap-4">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map(hospital => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
              onClick={() => setSelectedHospital(hospital)}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl">
            <IconBuilding className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-500 dark:text-neutral-400">No hospitals found.</p>
          </div>
        )}
      </div>
    </div>
  );
}