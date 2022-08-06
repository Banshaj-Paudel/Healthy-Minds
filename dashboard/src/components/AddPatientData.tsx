const AddPatientData = () => (
  <div className="ui tiny modal">
    <i className="close icon"></i>
    <form className="ui form add-patient-form">
      <div className="fields">
        <div className="field">
          <label>First name</label>
          <input type="text" placeholder="First Name" />
        </div>
        <div className="field">
          <label>Middle name</label>
          <input type="text" placeholder="Middle Name" />
        </div>
        <div className="field">
          <label>Last name</label>
          <input type="text" placeholder="Last Name" />
        </div>
      </div>
      <div className="field">
        <label>Last Name</label>
        <input type="text" name="last-name" placeholder="Last Name" />
      </div>
      <div className="field">
        <div className="ui checkbox">
          <input type="checkbox" tabIndex={0} className="hidden" />
          <label>I agree to the Terms and Conditions</label>
        </div>
      </div>
      <button className="ui button" type="submit">
        Add Patient
      </button>
    </form>
  </div>
);

export default AddPatientData;
