import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '../components/ui/sidebar';
import TreatmentProgress from './TreatmentProgress';
import HealthInsights from './HealthInsights';
import { 
  IconHospital, 
  IconProgress, 
  IconChartLine,
  IconLogout,
  IconMapPin,
  IconUsers,
  IconStar,
  IconPhone,
  IconMail,
  IconCalendar,
  IconCreditCard,
  IconX
} from '@tabler/icons-react';

// Utility function
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Hospital data
const hospitals = [
  {
    id: 1,
    name: "Ayurveda Wellness Center",
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    totalDoctors: 12,
    specialties: ["Panchakarma", "Ayurvedic Medicine", "Yoga Therapy"],
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=300&h=200&fit=crop",
    phone: "+91-98765-43210",
    email: "info@ayurvedawellness.com",
    address: "123 Wellness Street, Andheri West, Mumbai - 400058",
    established: "2015",
    description: "Leading Panchakarma center with traditional Ayurvedic treatments and modern facilities.",
    treatments: ["Abhyanga", "Shirodhara", "Panchakarma Detox", "Herbal Steam"],
    consultationFee: "₹800"
  },
  {
    id: 2,
    name: "Shree Ayurveda Hospital",
    location: "Pune, Maharashtra", 
    rating: 4.6,
    totalDoctors: 18,
    specialties: ["Panchakarma", "Physiotherapy", "Naturopathy"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&h=200&fit=crop",
    phone: "+91-98765-43211",
    email: "contact@shreeayurveda.com", 
    address: "456 Ayurveda Road, Kothrud, Pune - 411038",
    established: "2010",
    description: "Traditional Ayurvedic hospital with expert doctors and comprehensive Panchakarma treatments.",
    treatments: ["Pizhichil", "Njavarakizhi", "Kativasti", "Netra Tarpana"],
    consultationFee: "₹600"
  },
  {
    id: 3,
    name: "Kerala Ayurveda Center",
    location: "Delhi, NCR",
    rating: 4.9,
    totalDoctors: 15,
    specialties: ["Traditional Panchakarma", "Kerala Treatments", "Meditation"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop",
    phone: "+91-98765-43212",
    email: "delhi@keralaayurveda.com",
    address: "789 Wellness Avenue, Vasant Kunj, New Delhi - 110070", 
    established: "2008",
    description: "Authentic Kerala Ayurveda treatments with experienced practitioners from Kerala.",
    treatments: ["Elakizhi", "Podikizhi", "Akshi Tarpana", "Karna Purana"],
    consultationFee: "₹1000"
  }
];

// Hospital Card Component
const HospitalCard = ({ hospital, isExpanded, onToggle, onBookAppointment }) => (
  <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden transition-all duration-200 hover:shadow-lg">
    <div className="p-6">
      <div className="flex gap-4">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                {hospital.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <IconMapPin className="h-4 w-4" />
                <span>{hospital.location}</span>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
            >
              {isExpanded ? 'Less Info' : 'More Info'}
            </button>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <IconStar className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{hospital.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <IconUsers className="h-4 w-4 text-neutral-500" />
              <span className="text-sm">{hospital.totalDoctors} Doctors</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {hospital.specialties.slice(0, 2).map((specialty, idx) => (
              <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-xs">
                {specialty}
              </span>
            ))}
          </div>

          <button
            onClick={onBookAppointment}
            className="w-200 self-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Book Appointment - {hospital.consultationFee}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700 space-y-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{hospital.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <IconPhone className="h-4 w-4 text-neutral-500" />
                <span>{hospital.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <IconMail className="h-4 w-4 text-neutral-500" />
                <span>{hospital.email}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <IconCalendar className="h-4 w-4 text-neutral-500" />
                <span>Est. {hospital.established}</span>
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">Address:</span> {hospital.address}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Available Treatments:</h4>
            <div className="flex flex-wrap gap-2">
              {hospital.treatments.map((treatment, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm">
                  {treatment}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

// Payment Dialog Component
const PaymentDialog = ({ isOpen, onClose, hospital }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          <IconX className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
            Book Appointment
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {hospital?.name} - Consultation Fee: {hospital?.consultationFee}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Preferred Date</label>
            <input
              type="date"
              className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Preferred Time</label>
            <select className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500">
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>02:00 PM</option>
              <option>03:00 PM</option>
              <option>04:00 PM</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Brief Description (Optional)</label>
            <textarea
              className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 h-20 resize-none"
              placeholder="Describe your health concerns..."
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              alert('Appointment booked successfully! You will receive confirmation shortly.');
              onClose();
            }}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <IconCreditCard className="h-4 w-4" />
            Pay & Book
          </button>
        </div>
      </div>
    </div>
  );
};

// Main User Dashboard Component
export default function UserDashboard() {
  const [currentView, setCurrentView] = useState('hospitals');
  const [expandedHospital, setExpandedHospital] = useState(null);
  const [paymentDialog, setPaymentDialog] = useState({ isOpen: false, hospital: null });
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Hospitals",
      href: "#",
      icon: <IconHospital className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => setCurrentView('hospitals')
    },
    {
      label: "My Treatment",
      href: "#",
      icon: <IconProgress className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => setCurrentView('treatment')
    },
    {
      label: "Health Insights",
      href: "#",
      icon: <IconChartLine className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => setCurrentView('insights')
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconLogout className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => {
        if (window.confirm('Are you sure you want to logout?')) {
          alert('Logout successful');
        }
      }
    }
  ];

  const renderHospitals = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
          Find Panchakarma Centers
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Discover authentic Ayurvedic hospitals and book your consultation
        </p>
      </div>

      <div className="space-y-4">
        {hospitals.map((hospital) => (
          <HospitalCard
            key={hospital.id}
            hospital={hospital}
            isExpanded={expandedHospital === hospital.id}
            onToggle={() => setExpandedHospital(expandedHospital === hospital.id ? null : hospital.id)}
            onBookAppointment={() => setPaymentDialog({ isOpen: true, hospital })}
          />
        ))}
      </div>
    </div>
  );

  const renderPlaceholder = (title, description) => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{title}</h2>
        <p className="text-neutral-600 dark:text-neutral-400">{description}</p>
      </div>
      <div className="bg-white dark:bg-neutral-800 p-12 rounded-xl text-center border border-neutral-200 dark:border-neutral-700">
        <p className="text-neutral-500 dark:text-neutral-400">Coming Soon</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'hospitals':
        return renderHospitals();
      case 'treatment':
        return <TreatmentProgress />;
      case 'insights':
        return <HealthInsights/>
      default:
        return renderHospitals();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-800 shadow-sm border-b border-neutral-200 dark:border-neutral-700">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            Panchakarma Dashboard
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Your journey to wellness begins here
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row bg-gray-50 dark:bg-neutral-900 w-full flex-1">
        <Sidebar open={open} setOpen={setOpen} animate={true}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <div key={idx} onClick={link.onClick}>
                    <SidebarLink link={link} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Patient",
                  href: "#",
                  icon: (
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="User Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        
        <div className="flex flex-1 overflow-hidden">
          <div className="p-6 flex-1 overflow-y-auto bg-white dark:bg-neutral-900">
            {renderContent()}
          </div>
        </div>
      </div>

      <PaymentDialog
        isOpen={paymentDialog.isOpen}
        onClose={() => setPaymentDialog({ isOpen: false, hospital: null })}
        hospital={paymentDialog.hospital}
      />
    </div>
  );
}