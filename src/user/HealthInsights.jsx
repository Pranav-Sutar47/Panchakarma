import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { 
  IconTrendingUp, 
  IconTrendingDown, 
  IconActivity, 
  IconHeart,
  IconBrain,
  IconMoodSmile,
  IconCalendar,
  IconTarget,
  IconChevronDown
} from '@tabler/icons-react';

// Utility function
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Health data
const healthMetrics = [
  { date: 'Week 1', stress: 85, energy: 20, sleep: 4, mood: 30, pain: 80 },
  { date: 'Week 2', stress: 75, energy: 35, sleep: 5, mood: 45, pain: 65 },
  { date: 'Week 3', stress: 60, energy: 50, sleep: 6, mood: 60, pain: 50 },
  { date: 'Week 4', stress: 45, energy: 65, sleep: 7, mood: 75, pain: 35 },
  { date: 'Week 5', stress: 30, energy: 80, sleep: 8, mood: 85, pain: 20 },
  { date: 'Week 6', stress: 25, energy: 85, sleep: 8, mood: 90, pain: 15 }
];

const treatmentOutcomes = [
  { name: 'Stress Relief', before: 85, after: 25, improvement: 71 },
  { name: 'Energy Levels', before: 20, after: 85, improvement: 325 },
  { name: 'Sleep Quality', before: 4, after: 8, improvement: 100 },
  { name: 'Mood Balance', before: 30, after: 90, improvement: 200 },
  { name: 'Pain Reduction', before: 80, after: 15, improvement: 81 }
];

const vitalStats = [
  { name: 'Blood Pressure', value: '120/80', status: 'normal', change: -5, color: '#10b981' },
  { name: 'Heart Rate', value: '72 bpm', status: 'excellent', change: -8, color: '#10b981' },
  { name: 'BMI', value: '23.5', status: 'healthy', change: -2.3, color: '#10b981' },
  { name: 'Stress Index', value: '25/100', status: 'low', change: -60, color: '#10b981' }
];

const symptomsData = [
  { name: 'Headaches', value: 15, color: '#ef4444' },
  { name: 'Joint Pain', value: 10, color: '#f97316' },
  { name: 'Fatigue', value: 20, color: '#eab308' },
  { name: 'Anxiety', value: 25, color: '#8b5cf6' },
  { name: 'Sleep Issues', value: 30, color: '#06b6d4' }
];

// Metric Card Component
const MetricCard = ({ title, value, status, change, icon: Icon, color }) => (
  <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg`} style={{ backgroundColor: `${color}20` }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <div>
          <h3 className="font-medium text-neutral-800 dark:text-neutral-200">{title}</h3>
          <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">{value}</p>
        </div>
      </div>
    </div>
    
    <div className="flex items-center justify-between">
      <span className={cn(
        "px-2 py-1 rounded-full text-xs font-medium capitalize",
        status === 'excellent' || status === 'normal' || status === 'healthy' || status === 'low'
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      )}>
        {status}
      </span>
      
      <div className="flex items-center gap-1">
        {change > 0 ? (
          <IconTrendingUp className="h-4 w-4 text-green-500" />
        ) : (
          <IconTrendingDown className="h-4 w-4 text-green-500" />
        )}
        <span className="text-sm font-medium text-green-600">
          {Math.abs(change)}{title === 'BMI' ? '' : change > 0 ? '+' : '-'}
        </span>
      </div>
    </div>
  </div>
);

// Progress Chart Component
const ProgressChart = () => (
  <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
          Treatment Progress Over Time
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          6-week Panchakarma journey results
        </p>
      </div>
      <select className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-sm">
        <option>Last 6 weeks</option>
        <option>Last 3 months</option>
        <option>Last 6 months</option>
      </select>
    </div>

    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={healthMetrics}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
        <YAxis stroke="#6b7280" fontSize={12} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1f2937', 
            border: 'none', 
            borderRadius: '8px',
            color: '#fff'
          }}
        />
        <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={3} name="Stress Level" />
        <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={3} name="Energy Level" />
        <Line type="monotone" dataKey="mood" stroke="#8b5cf6" strokeWidth={3} name="Mood Score" />
        <Line type="monotone" dataKey="pain" stroke="#f97316" strokeWidth={3} name="Pain Level" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// Before/After Comparison
const BeforeAfterChart = () => (
  <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
      Before vs After Treatment
    </h3>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={treatmentOutcomes} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis 
          dataKey="name" 
          stroke="#6b7280" 
          fontSize={12}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis stroke="#6b7280" fontSize={12} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1f2937', 
            border: 'none', 
            borderRadius: '8px',
            color: '#fff'
          }}
        />
        <Bar dataKey="before" fill="#ef4444" name="Before Treatment" radius={[4, 4, 0, 0]} />
        <Bar dataKey="after" fill="#10b981" name="After Treatment" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>

    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
      {treatmentOutcomes.map((outcome, idx) => (
        <div key={idx} className="text-center">
          <div className="text-lg font-bold text-green-600">
            +{outcome.improvement}%
          </div>
          <div className="text-xs text-neutral-600 dark:text-neutral-400">
            {outcome.name}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Symptoms Breakdown
const SymptomsChart = () => (
  <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
      Symptom Reduction Analysis
    </h3>

    <div className="flex items-center justify-between">
      <ResponsiveContainer width="60%" height={200}>
        <PieChart>
          <Pie
            data={symptomsData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {symptomsData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="w-36 space-y-3">
        {symptomsData.map((symptom, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: symptom.color }}
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {symptom.name}
              </span>
            </div>
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              -{symptom.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Health Score Card
const HealthScoreCard = () => {
  const overallScore = 87;
  
  return (
    <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-xl text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">Overall Health Score</h3>
          <div className="flex items-center gap-2">
            <div className="text-4xl font-bold">{overallScore}</div>
            <div className="text-green-100">
              <div className="text-sm">Excellent</div>
              <div className="text-xs opacity-90">+32 from start</div>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <IconTarget className="h-12 w-12 text-green-200 mb-2" />
          <div className="text-sm text-green-100">Target: 90</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-green-400/30">
        <div className="text-sm text-green-100">
          🎉 You've achieved 87% of optimal health! Keep going!
        </div>
      </div>
    </div>
  );
};

// Main Health Insights Component
export default function HealthInsights() {
  const [selectedPeriod, setSelectedPeriod] = useState('6weeks');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            Health Insights
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Track your wellness journey and health improvements
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <IconCalendar className="h-5 w-5 text-neutral-500" />
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500"
          >
            <option value="6weeks">Last 6 Weeks</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
          </select>
        </div>
      </div>

      {/* Health Score */}
      <HealthScoreCard />

      {/* Vital Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {vitalStats.map((stat, idx) => (
          <MetricCard
            key={idx}
            title={stat.name}
            value={stat.value}
            status={stat.status}
            change={stat.change}
            icon={idx === 0 ? IconHeart : idx === 1 ? IconActivity : idx === 2 ? IconTrendingUp : IconBrain}
            color={stat.color}
          />
        ))}
      </div>

      {/* Progress Chart */}
      <ProgressChart />

      {/* Before/After & Symptoms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BeforeAfterChart />
        <SymptomsChart />
      </div>

      {/* Key Achievements */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
          Key Achievements 🎯
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <IconMoodSmile className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-green-600">71%</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Stress Reduction</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <IconActivity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-blue-600">325%</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Energy Increase</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <IconHeart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-purple-600">8/10</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Sleep Quality</div>
          </div>
        </div>
      </div>
    </div>
  );
}