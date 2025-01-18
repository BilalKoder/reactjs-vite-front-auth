import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import LoginPage from "@/pages/LoginPage.tsx";
// import HomePage from "@/pages/HomePage.tsx";
import AccountPage from "@/pages/AccountPage.tsx";
// import Navbar from "@/components/Navbar";
import PrivateRoute from "@/components/PrivateRoute.tsx";
import {AuthProvider} from "@/lib/auth-util.tsx";
import { Toaster} from 'react-hot-toast';
import "./App.css";
import ProtectedLogin from "./components/ProtectedLogin";


function App() {

  return (
    <AuthProvider>
      <Toaster/>
      <Router>
        <Routes>
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/login" element={<ProtectedLogin />} />
          <Route path="/" element={<PrivateRoute loginUrl={"/login"}/>} >
            <Route path="/dashboard" element={<AccountPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
