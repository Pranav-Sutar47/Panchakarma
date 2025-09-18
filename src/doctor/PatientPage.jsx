"use client";
import React, { useState } from "react";
import { patients as patientsData } from "./patients";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertCircle, Calendar, CheckCircle, FileText, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";


export default function PatientPage() {
  const [patients, setPatients] = useState(patientsData);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [procedureText, setProcedureText] = useState('');

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
    setProcedureText('');
  };

  const handleSaveProcedure = () => {
    if (!procedureText.trim()) return;
    
    const updatedPatients = patients.map(p => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          [modalType === 'pre' ? 'preProcedure' : 'postProcedure']: procedureText
        };
      }
      return p;
    });
    
    setPatients(updatedPatients);
    setSelectedPatient(prev => ({
      ...prev,
      [modalType === 'pre' ? 'preProcedure' : 'postProcedure']: procedureText
    }));
    
    setShowModal(false);
    setProcedureText('');
  };

  const handleMarkStepDone = (patientId) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId) {
          const updatedSteps = [...p.steps];
          const nextStepIndex = updatedSteps.findIndex((s) => !s.done);

          if (nextStepIndex !== -1) {
            updatedSteps[nextStepIndex] = {
              ...updatedSteps[nextStepIndex],
              done: true,
            };
          }

          return { ...p, steps: updatedSteps };
        }
        return p;
      })
    );

    if (selectedPatient?.id === patientId) {
      const updatedSteps = [...selectedPatient.steps];
      const nextStepIndex = updatedSteps.findIndex((s) => !s.done);
      if (nextStepIndex !== -1) {
        updatedSteps[nextStepIndex] = {
          ...updatedSteps[nextStepIndex],
          done: true,
        };
      }
      setSelectedPatient({ ...selectedPatient, steps: updatedSteps });
    }
  };

  if (selectedPatient) {
    const completedSteps = selectedPatient.steps.filter((s) => s.done).length;
    const totalSteps = selectedPatient.steps.length;
    const progress = Math.round((completedSteps / totalSteps) * 100);

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedPatient(null)}
              className="mb-4"
            >
              ← Back to Patient List
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Patients</span>
              <span>/</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{selectedPatient.name}</span>
            </div>
          </div>

          {/* Patient Overview Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-start gap-6">
                <img
                  src={selectedPatient.src}
                  alt={selectedPatient.name}
                  className="w-24 h-24 rounded-lg object-cover border"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{selectedPatient.name}</CardTitle>
                    <Badge variant="secondary">{selectedPatient.patientId}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{selectedPatient.age}y, {selectedPatient.gender}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>Admitted: {selectedPatient.admissionDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-gray-500" />
                      <span>{selectedPatient.condition}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{progress}% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Treatment Progress</span>
                  <span>{completedSteps}/{totalSteps} steps completed</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Treatment Timeline */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Panchakarma Treatment Timeline</CardTitle>
                  <CardDescription>Track treatment progress through each phase</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Timeline */}
                    <div className="space-y-6">
                      {selectedPatient.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-4">
                          {/* Timeline indicator */}
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium
                              ${step.done 
                                ? "bg-green-100 border-green-500 text-green-700" 
                                : "bg-gray-100 border-gray-300 text-gray-500"
                              }`}>
                              {step.done ? <CheckCircle className="w-4 h-4" /> : i + 1}
                            </div>
                            {i !== selectedPatient.steps.length - 1 && (
                              <div className={`w-0.5 h-12 mt-2 ${step.done ? "bg-green-200" : "bg-gray-200"}`}></div>
                            )}
                          </div>

                          {/* Step content */}
                          <div className="flex-1 pb-6">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{step.name}</h4>
                              {step.done && <Badge variant="secondary" className="text-xs">Completed</Badge>}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {step.done ? "Treatment phase completed successfully" : "Pending treatment phase"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      onClick={() => handleOpenModal('pre')}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Pre-Procedure Notes
                    </Button>
                    
                    <Button 
                      onClick={() => handleMarkStepDone(selectedPatient.id)}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Step Complete
                    </Button>
                    
                    <Button 
                      onClick={() => handleOpenModal('post')}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Post-Procedure Notes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Procedure Notes */}
            <div className="space-y-4">
              {selectedPatient.preProcedure && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-blue-600" />
                      Pre-Procedure Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {selectedPatient.preProcedure}
                    </p>
                  </CardContent>
                </Card>
              )}

              {selectedPatient.postProcedure && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Post-Procedure Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {selectedPatient.postProcedure}
                    </p>
                  </CardContent>
                </Card>
              )}

              {!selectedPatient.preProcedure && !selectedPatient.postProcedure && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">No procedure notes added yet</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Modal for Procedure Notes */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {modalType === 'pre' ? 'Pre-Procedure Instructions' : 'Post-Procedure Instructions'}
              </DialogTitle>
              <DialogDescription>
                Add {modalType === 'pre' ? 'preparation' : 'recovery'} instructions for {selectedPatient.name}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Patient Info */}
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedPatient.src}
                      alt={selectedPatient.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">{selectedPatient.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedPatient.patientId} • {selectedPatient.condition}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Templates */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Quick Templates:</Label>
                <div className="flex flex-wrap gap-2">
                  {modalType === 'pre' ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setProcedureText('Fast for 12 hours before the procedure. Drink plenty of water. Avoid heavy meals and alcohol.')}
                      >
                        Fasting Instructions
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setProcedureText('Take prescribed herbal medicines as directed. Apply oil massage 30 minutes before arrival. Wear comfortable clothing.')}
                      >
                        Herbal Preparation
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setProcedureText('Arrive 15 minutes early. Bring identification and insurance cards. Wear loose, comfortable clothing.')}
                      >
                        General Instructions
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setProcedureText('Rest for 2-3 hours post-procedure. Drink warm water regularly. Follow prescribed diet plan for 24 hours.')}
                      >
                        Recovery Instructions
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setProcedureText('Take prescribed medications as directed. Apply therapeutic oils twice daily. Schedule follow-up appointment in 1 week.')}
                      >
                        Medication Guidelines
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setProcedureText('Avoid cold foods and beverages for 48 hours. Practice gentle stretching exercises. Maintain regular sleep schedule.')}
                      >
                        Lifestyle Guidelines
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-2">
                <Label htmlFor="procedure-notes">
                  {modalType === 'pre' ? 'Pre-Procedure Instructions' : 'Post-Procedure Instructions'}
                </Label>
                <Textarea
                  id="procedure-notes"
                  placeholder={modalType === 'pre' 
                    ? 'Enter detailed pre-procedure instructions...' 
                    : 'Enter post-procedure care instructions...'
                  }
                  value={procedureText}
                  onChange={(e) => setProcedureText(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSaveProcedure}
                disabled={!procedureText.trim()}
              >
                Save Instructions
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Patient List View
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className=" mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Patient Management System
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Panchakarma Treatment Tracking & Management
          </p>
        </div>

        {/* Patient Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => {
            const completedSteps = patient.steps.filter((s) => s.done).length;
            const totalSteps = patient.steps.length;
            const progress = Math.round((completedSteps / totalSteps) * 100);

            return (
              <Card 
                key={patient.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedPatient(patient)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <img
                      src={patient.src}
                      alt={patient.name}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{patient.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">{patient.patientId}</Badge>
                      </div>
                      <CardDescription className="text-sm">
                        {patient.condition}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{completedSteps}/{totalSteps} steps completed</span>
                      <span>View Details →</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
