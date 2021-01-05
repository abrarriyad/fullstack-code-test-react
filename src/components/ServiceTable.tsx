import React, { useContext, useEffect } from "react";
import { ServiceContext } from "../context/ServiceContext";
import Alert from "./Alert";
const ServiceTable: React.FC = () => {
  const {
    serviceList,
    toggleAddServicePrompt,
    toggleDeleteServicePrompt,
    getServices,
    showAlert,
  } = useContext(ServiceContext);

  useEffect(() => {
    getServices();
  }, []);
  return (
    <div>
      <div className="table-container">
        <table className="table is-bordered is-hoverable is-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Url</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {serviceList &&
              serviceList.map((service) => (
                <tr key={service.id}>
                  <td>{service.id}</td>
                  <td>{service.name}</td>
                  <td>{service.url}</td>
                  <td>{service.status}</td>
                  <td>
                    <button className="button is-primary is-outlined is-light is-small">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="buttons">
          <button
            onClick={() => {
              toggleAddServicePrompt(true);
            }}
            className="button is-primary is-outlined"
          >
            <span>Add Services</span>
            <span className="icon is-small">
              <i className="fas fa-plus"></i>
            </span>
          </button>
          <button
            onClick={() => {
              toggleDeleteServicePrompt(true);
            }}
            className="button is-danger is-outlined"
          >
            <span>Delete</span>
            <span className="icon is-small">
              <i className="fas fa-times"></i>
            </span>
          </button>
        </div>
        {showAlert.show && (
          <Alert message={showAlert.message} type={showAlert.type} />
        )}
      </div>
    </div>
  );
};

export default ServiceTable;
