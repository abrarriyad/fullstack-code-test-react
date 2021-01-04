import React, { useState, useContext } from "react";
import { ServiceContext } from "../context/ServiceContext";

const AddService = () => {
  const handleServiceName = (event) => {
    const val = event.target.value;
    setService({
      name: val,
      url: service.url,
    });
  };
  const handleServiceUrl = (event) => {
    const val = event.target.value;
    setService({
      name: service.name,
      url: val,
    });
  };

  const { addService, toggleAddServicePrompt, addServiceAlert } = useContext(
    ServiceContext
  );
  const [service, setService] = useState({
    name: "",
    url: "",
  });
  if (addServiceAlert) {
    return (
      <div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Service Name"
              value={service.name}
              onChange={handleServiceName}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Url"
              value={service.url}
              onChange={handleServiceUrl}
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              onClick={() => {
                addService(service);
              }}
              className="button is-primary"
            >
              Create
            </button>
          </div>
          <div className="control">
            <button
              onClick={() => {
                toggleAddServicePrompt(false);
              }}
              className="button is-link is-light"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  } else return null;
};
export default AddService;
