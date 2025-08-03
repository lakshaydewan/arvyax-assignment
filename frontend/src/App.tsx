import { Routes, Route } from "react-router-dom"
import Login from "./pages/logIn"
import SignUp from "./pages/signUp"
import Dashboard from "./pages/dashboard"
import Sessions from "./pages/sessions"

function App() {
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/sessions" element={<Sessions />} />
    </Routes>
  )
}

export default App
