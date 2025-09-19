import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { DoctorDashboard } from "./doctor/DoctorDashboard"
import { HospitalDashboard } from "./hospital/HospitalDashboard"

// import AdminDashboard from "./admin/AdminDashboard"
import AdminDashboard from "./admin/AdminDashboard.jsx"
import UserDashboard from "./user/UserDashboard.jsx"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/hospital" replace />} />
        <Route path="/hospital" element={<HospitalDashboard/>}/>
        <Route path="/doctor" element={<DoctorDashboard/>}/>
        <Route path='/patient' element={<UserDashboard/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
