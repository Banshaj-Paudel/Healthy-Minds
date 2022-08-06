import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HttpService from "../services/http";

const AddPatientData = () => {
  interface IFormData {
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumber: string;
    file: any;
  }

  const navigate = useNavigate();

  const [formEl, setFormEl] = useState<IFormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    file: null,
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const patient = {
      name: formEl.firstName + " " + formEl.middleName + " " + formEl.lastName,
      phoneNumber: formEl.phoneNumber,
      image: "HELLO",
      //file: formEl.file,
    };

    const service = new HttpService();


    await service.post("/patient", patient);

    navigate("/");
  };

  const handleFormElChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormEl({ ...formEl, [name]: value });
  };

  return (
    <div className="ui container two column centered grid add-patient">
      <form
        className="ui form add-patient-form column"
        onSubmit={handleFormSubmit}
      >
        <div className="fields">
          <div className="field">
            <label>First name</label>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleFormElChange}
            />
          </div>
          <div className="field">
            <label>Middle name</label>
            <input
              type="text"
              placeholder="Middle Name"
              name="middleName"
              onChange={handleFormElChange}
            />
          </div>
          <div className="field">
            <label>Last name</label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleFormElChange}
            />
          </div>
        </div>
        <div className="field">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            onChange={handleFormElChange}
          />
        </div>
        <div className="field">
          <label>Upload</label>
          <input
            type="file"
            placeholder="Upload"
            name="file"
            onChange={handleFormElChange}
          />
        </div>
        <button className="ui button" type="submit">
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatientData;
