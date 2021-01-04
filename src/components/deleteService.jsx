import React, { useState, useContext } from "react";
import { ServiceContext } from "../context/ServiceContext";

const DeleteService = () => {
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

  const {
    removeService,
    toggleDeleteServicePrompt,
    deleteServiceAlert,
  } = useContext(ServiceContext);
  const [service, setService] = useState({
    name: "",
    url: "",
  });
  if (deleteServiceAlert) {
    return (
      <div className="notification is-danger is-light">
        Do you want to delete all
        <strong>Services</strong>?
        <button
          onClick={() => {
            removeService();
          }}
          className="button is-outlined is-danger"
        >
          Yes
        </button>
        <button
          onClick={() => {
            toggleDeleteServicePrompt(false);
          }}
          className="button is-link is-success"
        >
          No
        </button>
      </div>
    );
  } else return null;
};
export default DeleteService;
