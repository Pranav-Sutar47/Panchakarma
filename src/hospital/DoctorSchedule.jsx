"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DoctorScheduleCard from "./DoctorScheduleCard";

export default function DoctorSchedule({ doctor, onBack }) {
  const [schedule, setSchedule] = useState({
    day: "Monday",
    start: "09:00",
    end: "17:00",
  });

  const handleChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  const saveSchedule = () =>{
    onBack();
  }

  return (
    <div className="space-y-6">
      <Button onClick={onBack} variant="outline">
        ← Back to Doctors
      </Button>
        <DoctorScheduleCard doctor={doctor} back = {onBack}/>
    </div>
  );
}
