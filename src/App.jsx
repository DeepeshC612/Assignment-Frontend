import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyDetails from "./pages/CompanyDetails";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import UserLogin from "./pages/UserLogin";
import UserRegistration from "./pages/UserRegistration";
import { setToken } from "./utils/axiosClient";

function App() {
  const token = localStorage.getItem("token");
  setToken(token);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserRegistration />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/companyreview/:id" element={<CompanyDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
