import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '../components/ui/sidebar';
import { 
  IconDashboard, 
  IconHospital, 
  IconUserCheck, 
  IconLogout,
  IconBuildingHospital
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import HospitalList from './HospitalList.jsx';
import DoctorList from './DoctorList';
import DoctorVerification from './DocumentVerification'
import HospitalVerification from './HospitalVerification';

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState('hospitals');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Hospitals",
      href: "#",
      icon: <IconHospital className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => {
        setCurrentView('hospitals');
        setSelectedHospital(null);
      }
    },
    {
      label: "Hospital Verification",
      href: "#",
      icon: <IconBuildingHospital className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => setCurrentView('hospital-verification')
    },
    {
      label: "Doctor Verification",
      href: "#",
      icon: <IconUserCheck className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => setCurrentView('doctor-verification')
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconLogout className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => {
        if (window.confirm('Are you sure you want to logout?')) {
          alert('Logout functionality - redirect to login page');
        }
      }
    }
  ];

  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
    setCurrentView('doctors');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'hospitals':
        return <HospitalList onHospitalSelect={handleHospitalSelect} />;
      case 'doctors':
        return (
          <DoctorList 
            hospital={selectedHospital} 
            onBack={() => setCurrentView('hospitals')}
          />
        );
      case 'doctor-verification':
        return <DoctorVerification />;
      case 'hospital-verification':
        return <HospitalVerification />;
      default:
        return <HospitalList onHospitalSelect={handleHospitalSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-800 shadow-sm border-b border-neutral-200 dark:border-neutral-700">
        <div className="px-6 py-4 flex flex-row">
          <img className='flex w-7 flex' src='/public/homeimage.png'></img>
          <h1 className="ml-3 text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            Admin Dashboard
          </h1>
          {/* <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Manage hospitals, doctors, and verification processes
          </p> */}
        </div>
      </div>

      <div className={cn(
        "flex flex-col md:flex-row bg-gray-50 dark:bg-neutral-900 w-full flex-1 border-neutral-200 dark:border-neutral-700 overflow-hidden"
      )}>
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
                  label: "Admin User",
                  href: "#",
                  icon: (
                    <img
                      src="https://assets.aceternity.com/manu.png"
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
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
    </div>
  );
}
