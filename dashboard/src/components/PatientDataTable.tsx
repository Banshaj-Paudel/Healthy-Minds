import { useEffect, useState } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import HttpService from "../services/http";
import AddPatientData from "./AddPatientData";

export interface IPatient {
  id: number;
  name: string;
  diagnostics: string;
  healthStatus: string;
  phoneNumber: string;
}

const PatientDataTable = () => {
  const [patients, setPatients] = useState<IPatient[]>([]);

  const showModal = () => {
    window.$(".ui.modal").modal("show");
  };

  const loadPatientData = async () => {
    const service = new HttpService();
    const response = await service.get("/patient");

    const data: IPatient[] = response.data;

    for (const patient of data) {
      patient.diagnostics = patient.diagnostics || "Not Started";
    }

    setPatients(response.data);
  };

  const router = useNavigate();
  const navigateToAddPatient = () => {
    router("/add");
  };

  useEffect(() => {
    loadPatientData();
  }, []);

  return (
    <>
      <table className="ui celled table">
        <thead>
          <tr>
            <th colSpan={4}>
              <div
                className="ui left floated small primary labeled icon button"
                onClick={navigateToAddPatient}
              >
                <i className="user icon"></i> Add Patient
              </div>
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Name</th>
            <th>Operation</th>
            <th>Health Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => {
            return (
              <tr>
                <td>{patient.name}</td>
                <td>
                  <i className="icon sync"></i>Not Started
                </td>
                <td className="positive">
                  <i className="icon check"></i>OK
                </td>
                <td>
                  <a
                    className="ui button positive"
                    href={`tel:${patient.phoneNumber}`}
                  >
                    Call
                  </a>
                  <a className="ui button" href={`http://localhost:3000/patient/${patient.id}/report`}>
                    Generate Report
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </>
  );
};
export default PatientDataTable;
