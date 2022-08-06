import { useEffect, useState } from "react";
import HttpService from "../services/http";
import AddPatientData from "./AddPatientData";

export interface IPatient {
  name: string;
  diagnostic: string;
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
      patient.diagnostic = patient.diagnostic || "Not Started";
    }

    console.log(response.data);
    setPatients(response.data);
  };

  useEffect(() => {
    loadPatientData();
  }, []);

  return (
    <>
      <AddPatientData />

      <table className="ui celled table">
        <thead>
          <tr>
            <th colSpan={4}>
              <div
                className="ui left floated small primary labeled icon button"
                onClick={showModal}
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
                  <button className="ui button">Generate Report</button>
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
