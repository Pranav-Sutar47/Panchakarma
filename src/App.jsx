import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { DoctorDashboard } from "./doctor/DoctorDashboard"
import { HospitalDashboard } from "./hospital/HospitalDashboard"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/hospital" replace />} />
        <Route path="/hospital" element={<HospitalDashboard/>}/>
        <Route path="/doctor" element={<DoctorDashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
