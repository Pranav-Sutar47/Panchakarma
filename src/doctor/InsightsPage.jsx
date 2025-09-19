"use client";

import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function InsightsPage() {
  // Example data
  const satisfactionData = [
    { month: "Jan", satisfied: 85 },
    { month: "Feb", satisfied: 90 },
    { month: "Mar", satisfied: 75 },
    { month: "Apr", satisfied: 88 },
    { month: "May", satisfied: 95 },
  ];

  const improvementData = [
    { week: "Week 1", improvement: 40 },
    { week: "Week 2", improvement: 55 },
    { week: "Week 3", improvement: 70 },
    { week: "Week 4", improvement: 80 },
    { week: "Week 5", improvement: 90 },
  ];

  const avgRating = 4.3;

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
      <div className="sticky top-0 bg-white dark:bg-neutral-900 p-4 border-b border-neutral-200 dark:border-neutral-800 z-30">
        <h1 className="text-2xl font-bold text-center text-neutral-800 dark:text-neutral-100">
          Insights
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
        {/* Patient Satisfaction Graph */}
        <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-pink-800 min-h-[300px]">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Patient Satisfaction (%)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={satisfactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="satisfied" fill="#4ade80" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </WobbleCard>

        {/* Average Rating */}
        <WobbleCard containerClassName="col-span-1 min-h-[300px]">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Average Rating</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.floor(avgRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-lg font-semibold">{avgRating}/5</span>
            </CardContent>
          </Card>
        </WobbleCard>

        {/* Health Improvement Graph */}
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[300px]">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Patient Health Improvement (%)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={improvementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="improvement" stroke="#3b82f6" strokeWidth={3} dot />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </WobbleCard>
      </div>
    </div>
  );
}
