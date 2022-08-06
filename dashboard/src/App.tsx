import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserContext } from "./context/UserProvider";
import DashboardScreen from "./screens/DashboardScreen";
import LoginScreen from "./screens/LoginScreen";
import PatientDetailScreen from "./screens/PatientDetailScreen";

const App = () => {
  const userContext = useContext(UserContext);

  if (userContext.username === "") {
    return <LoginScreen />;
  }

  return (
    <>
      <Navbar />
      <section className="ui container">
        <Routes>
          <Route path="/" element={<DashboardScreen />} />
          <Route path="/:patientID" element={<PatientDetailScreen />} />
        </Routes>
      </section>
    </>
  );
};

export default App;
