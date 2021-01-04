import React, { useState, useContext } from "react";
import { ServiceContext } from "../context/ServiceContext";
const DeleteService: React.FC = () => {
  const {
    removeService,
    toggleDeleteServicePrompt,
    deleteServiceAlert,
  } = useContext(ServiceContext);

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
