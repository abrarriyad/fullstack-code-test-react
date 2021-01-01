import axios from "axios";
import React, { useEffect, useState } from "react";

const Services = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [addServiceAlert, setAddServiceAlert] = useState(false);
  const [deleteServiceAlert, setDeleteServiceAlert] = useState(false);

  const [service, setService] = useState({
    name: "",
    url: "",
  });
  const [serviceList, setServiceList] = useState([]);

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

  useEffect(() => {
    axios
      .get("/services", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const services = response.data;
        setServiceList(services);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    console.log("Updated...");
  }, [serviceList]);

  const addService = () => {
    axios
      .post("/services", service, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(...serviceList);
        setServiceList([...serviceList, response.data]);
      })
      .catch((error) => {});
  };

  const removeService = () => {
    axios
      .delete("/services", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setServiceList([]);
        console.log(response);
      })
      .catch((error) => {});
  };

  return (
    <div className="container">
      <div className="section">
        <div className="field has-addons">
          <div className="control">
            <input className="input" type="text" placeholder="Search" />
          </div>
          <div className="control">
            <a className="button is-primary is-outlined">Search</a>
          </div>
        </div>
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
                setAddServiceAlert(true);
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
                setDeleteServiceAlert(true);
              }}
              className="button is-danger is-outlined"
            >
              <span>Delete</span>
              <span className="icon is-small">
                <i className="fas fa-times"></i>
              </span>
            </button>
          </div>
          {addServiceAlert && (
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
                  <button onClick={addService} className="button is-primary">
                    Create
                  </button>
                </div>
                <div className="control">
                  <button
                    onClick={() => {
                      setAddServiceAlert(false);
                    }}
                    className="button is-link is-light"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {deleteServiceAlert && (
        <div className="notification is-danger is-light">
          Do you want to delete all
          <strong>Services</strong>?
          <button
            onClick={removeService}
            className="button is-outlined is-danger"
          >
            Yes
          </button>
          <button
            onClick={() => {
              setDeleteServiceAlert(false);
            }}
            className="button is-link is-success"
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;
