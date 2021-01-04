import React, { useState, createContext, useContext } from "react";
import { TokenContext } from "./TokenContext";
import axios from "axios";

export const ServiceContext = createContext({
  serviceList: [],
  toggleAddServicePrompt: (value) => {},
  toggleDeleteServicePrompt: (value) => {},
  addService: (service) => {},
  removeService: () => {},
  getServices: () => {},
  addServiceAlert: false,
  deleteServiceAlert: false,
  showAlert: {},
});

export const ServiceProvider = (props) => {
  const { token, setToken, isLoggedIn, changeLoginStatus } = useContext(
    TokenContext
  );

  const [serviceList, setServiceList] = useState([]);
  const [addServiceAlert, setAddServiceAlert] = useState(false);
  const [deleteServiceAlert, setDeleteServiceAlert] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const updateShowAlert = (alert) => {
    setShowAlert(alert);
  };
  const toggleAddServicePrompt = (val) => {
    setAddServiceAlert(val);
  };
  const toggleDeleteServicePrompt = (val) => {
    setDeleteServiceAlert(val);
  };

  const hideAlert = () => {
    setTimeout(() => {
      setShowAlert({
        show: false,
      });
    }, 3000);
  };

  const addService = (service) => {
    console.log("addService called");
    axios
      .post("/services", service, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(...serviceList);
        setServiceList([...serviceList, response.data]);
        setShowAlert({
          show: true,
          message: "Service Added Successfully",
          type: "success",
        });
        hideAlert();
      })
      .catch((error) => {
        setShowAlert({
          show: true,
          message: "Service Not Added. " + error.message,
          type: "danger",
        });
        hideAlert();
      });
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
        setDeleteServiceAlert(false);
        setShowAlert({
          show: true,
          message: "All Services Deleted Successfully. ",
          type: "success",
        });
        hideAlert();
      })
      .catch((error) => {});
  };

  const getServices = () => {
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
  };
  return (
    <ServiceContext.Provider
      value={{
        serviceList: serviceList,
        toggleAddServicePrompt: toggleAddServicePrompt,
        toggleDeleteServicePrompt: toggleDeleteServicePrompt,
        addService: addService,
        removeService: removeService,
        getServices: getServices,
        addServiceAlert: addServiceAlert,
        deleteServiceAlert: deleteServiceAlert,
        showAlert: showAlert,
      }}
    >
      {props.children}
    </ServiceContext.Provider>
  );
};
