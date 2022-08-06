import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserContext } from "./context/UserProvider";
import { AddPatientScreen } from "./screens/AddPatientScreen";
import DashboardScreen from "./screens/DashboardScreen";
import LoginScreen from "./screens/LoginScreen";

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
          <Route path="/add" element={<AddPatientScreen />} />
          <Route path="/" element={<DashboardScreen />} />
        </Routes>
      </section>
    </>
  );
};

export default App;
