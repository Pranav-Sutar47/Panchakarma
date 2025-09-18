import React, { useState } from 'react';
import { 
  IconCheck, 
  IconClock, 
  IconStar, 
  IconCalendar,
  IconUser,
  IconMapPin,
  IconProgressCheck,
  IconHeart,
  IconDroplet,
  IconLeaf
} from '@tabler/icons-react';

// Utility function
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Treatment data
const currentTreatment = {
  id: 1,
  hospital: "Ayurveda Wellness Center",
  doctor: "Dr. Priya Sharma",
  location: "Mumbai, Maharashtra",
  startDate: "2024-01-15",
  duration: "21 days",
  currentDay: 12,
  totalDays: 21,
  treatmentType: "Complete Panchakarma Detox",
  nextAppointment: "2024-01-28",
  progress: 57 // percentage
};

const treatmentSteps = [
  {
    id: 1,
    name: "Consultation & Assessment",
    description: "Initial consultation and health assessment",
    date: "2024-01-15",
    status: "completed",
    rating: 5,
    icon: IconUser,
    color: "green"
  },
  {
    id: 2,
    name: "Abhyanga (Oil Massage)",
    description: "Full body oil massage therapy - Days 1-7",
    date: "2024-01-16",
    status: "completed", 
    rating: 4,
    icon: IconDroplet,
    color: "green"
  },
  {
    id: 3,
    name: "Shirodhara Therapy",
    description: "Continuous oil pouring on forehead - Days 8-14",
    date: "2024-01-23",
    status: "in-progress",
    rating: 0,
    icon: IconHeart,
    color: "blue"
  },
  {
    id: 4,
    name: "Panchakarma Detox",
    description: "Deep cleansing and detoxification - Days 15-18",
    date: "2024-01-30",
    status: "pending",
    rating: 0,
    icon: IconLeaf,
    color: "gray"
  },
  {
    id: 5,
    name: "Rejuvenation Phase",
    description: "Recovery and strengthening phase - Days 19-21",
    date: "2024-02-02",
    status: "pending",
    rating: 0,
    icon: IconProgressCheck,
    color: "gray"
  }
];

const pastTreatments = [
  {
    id: 1,
    hospital: "Kerala Ayurveda Center",
    doctor: "Dr. Raj Kumar",
    treatmentType: "Stress Relief Therapy",
    duration: "14 days",
    completedDate: "2023-12-15",
    rating: 5,
    outcome: "Excellent - Significant stress reduction"
  },
  {
    id: 2,
    hospital: "Shree Ayurveda Hospital", 
    doctor: "Dr. Meera Joshi",
    treatmentType: "Joint Pain Relief",
    duration: "10 days",
    completedDate: "2023-10-20",
    rating: 4,
    outcome: "Good - 80% pain reduction"
  }
];

// Star Rating Component
const StarRating = ({ rating, onRate, readonly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => !readonly && onRate && onRate(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          disabled={readonly}
          className={cn(
            "transition-colors",
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          )}
        >
          <IconStar
            className={cn(
              "h-5 w-5",
              (hoverRating || rating) >= star
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300 dark:text-gray-600"
            )}
          />
        </button>
      ))}
      {readonly && rating > 0 && (
        <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
          {rating}/5
        </span>
      )}
    </div>
  );
};

// Treatment Step Card
const TreatmentStepCard = ({ step, onRate }) => {
  const getStatusColor = (status) => ({
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', 
    pending: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }[status]);

  const getIconColor = (color) => ({
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    gray: 'bg-gray-400'
  }[color]);

  const Icon = step.icon;

  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
      <div className="flex items-start gap-4">
        <div className={cn("p-3 rounded-full", getIconColor(step.color))}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">
                {step.name}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {step.description}
              </p>
            </div>
            <span className={cn("px-3 py-1 rounded-full text-xs font-medium capitalize", getStatusColor(step.status))}>
              {step.status.replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <IconCalendar className="h-4 w-4" />
              <span>{new Date(step.date).toLocaleDateString()}</span>
            </div>
            
            {step.status === 'completed' && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Rate:</span>
                <StarRating rating={step.rating} readonly />
              </div>
            )}
            
            {step.status === 'in-progress' && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Rate this step:</span>
                <StarRating 
                  rating={step.rating} 
                  onRate={(rating) => {
                    onRate(step.id, rating);
                    alert(`Thank you for rating ${step.name}: ${rating} stars!`);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Past Treatment Card
const PastTreatmentCard = ({ treatment }) => (
  <div className="bg-white dark:bg-neutral-800 p-5 rounded-xl border border-neutral-200 dark:border-neutral-700">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">
          {treatment.treatmentType}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {treatment.hospital} • Dr. {treatment.doctor}
        </p>
      </div>
      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-xs">
        Completed
      </span>
    </div>
    
    <div className="flex items-center justify-between">
      <div className="text-sm text-neutral-500">
        <p>Duration: {treatment.duration}</p>
        <p>Completed: {new Date(treatment.completedDate).toLocaleDateString()}</p>
      </div>
      <div className="text-right">
        <StarRating rating={treatment.rating} readonly />
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
          {treatment.outcome}
        </p>
      </div>
    </div>
  </div>
);

// Main Treatment Progress Component
export default function TreatmentProgress() {
  const [treatmentRatings, setTreatmentRatings] = useState({});

  const handleRateStep = (stepId, rating) => {
    setTreatmentRatings(prev => ({
      ...prev,
      [stepId]: rating
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
          My Treatment Progress
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Track your Panchakarma journey and share your experience
        </p>
      </div>

      {/* Current Treatment Overview */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-xl text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">{currentTreatment.treatmentType}</h3>
            <div className="space-y-1 text-green-100">
              <div className="flex items-center gap-2">
                <IconMapPin className="h-4 w-4" />
                <span>{currentTreatment.hospital}</span>
              </div>
              <div className="flex items-center gap-2">
                <IconUser className="h-4 w-4" />
                <span>{currentTreatment.doctor}</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCalendar className="h-4 w-4" />
                <span>Next appointment: {new Date(currentTreatment.nextAppointment).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{currentTreatment.progress}%</div>
            <div className="text-sm text-green-100">Complete</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Day {currentTreatment.currentDay} of {currentTreatment.totalDays}</span>
            <span>{currentTreatment.totalDays - currentTreatment.currentDay} days remaining</span>
          </div>
          <div className="w-full bg-green-400/30 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${currentTreatment.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Treatment Steps */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
          Treatment Timeline
        </h3>
        <div className="space-y-4">
          {treatmentSteps.map((step) => (
            <TreatmentStepCard
              key={step.id}
              step={step}
              onRate={handleRateStep}
            />
          ))}
        </div>
      </div>

      {/* Past Treatments */}
      {pastTreatments.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Past Treatments ({pastTreatments.length})
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {pastTreatments.map((treatment) => (
              <PastTreatmentCard key={treatment.id} treatment={treatment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}