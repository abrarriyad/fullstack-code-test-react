import React, { useState, createContext, useContext } from "react";
import { TokenContext } from "./TokenContext";
import axios from "axios";

export interface Service {
  id: string;
  name: string;
  url: string;
  status: string;
}

export interface User {
  username: string;
  password: string;
}

interface Alert {
  show: boolean;
  message: string;
  type: string;
}
export const ServiceContext = createContext({
  serviceList: Array<Service>(),
  toggleAddServicePrompt: (value: boolean) => {},
  toggleDeleteServicePrompt: (value: boolean) => {},
  addService: (service: Service) => {},
  removeService: () => {},
  getServices: () => {},
  addServiceAlert: false,
  deleteServiceAlert: false,
  showAlert: {} as Alert,
});

export const ServiceProvider: React.FC = (props) => {
  const { token, setToken, isLoggedIn } = useContext(TokenContext);

  const [serviceList, setServiceList] = useState<Array<Service>>([]);
  const [addServiceAlert, setAddServiceAlert] = useState<boolean>(false);
  const [deleteServiceAlert, setDeleteServiceAlert] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<Alert>({
    show: false,
    message: "",
    type: "",
  });

  const updateShowAlert = (alert: Alert) => {
    console.info("Shwoing Alert...");
    setShowAlert(alert);
  };
  const toggleAddServicePrompt = (val: boolean) => {
    console.info("Showing Add Service Prompt");
    setAddServiceAlert(val);
  };
  const toggleDeleteServicePrompt = (val: boolean) => {
    console.info("Showing Delete Service Prompt");
    setDeleteServiceAlert(val);
  };

  const hideAlert = () => {
    setTimeout(() => {
      console.info("Alert goes off");
      setShowAlert({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);
  };

  const addService = (service: Service) => {
    console.group("Add Service");
    console.info("Sending request to server....");
    axios
      .post("/services", service, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.info("Request Successfull");
        console.info("Response status: " + response.status);
        console.info("New Service Added Successfully");
        console.groupEnd();
        setServiceList([...serviceList, response.data]);
        setShowAlert({
          show: true,
          message: "Service Added Successfully",
          type: "success",
        });
        hideAlert();
      })
      .catch((error) => {
        console.error("Operation Failed : " + error);
        setShowAlert({
          show: true,
          message: "Service Not Added. " + error.message,
          type: "danger",
        });
        hideAlert();
      });
  };

  const removeService = () => {
    console.group("Remove All Services");
    console.info("Sending delete request to the server...");
    axios
      .delete("/services", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.info("Response status: " + response.status);
        console.info("All Services Deleted Successfully");
        console.groupEnd();
        setServiceList([]);
        setDeleteServiceAlert(false);
        setShowAlert({
          show: true,
          message: "All Services Deleted Successfully. ",
          type: "success",
        });
        hideAlert();
      })
      .catch((error) => {
        console.error("Operation Failed: " + error);
      });
  };

  const getServices = () => {
    console.group("Fetching services");
    console.info("Sending request to server...");
    axios
      .get("/services", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log("Request Successfull");
        console.info("Response status: " + response.status);
        const services = response.data;
        setServiceList(services);
        console.log("Updating service table");
        console.groupEnd();
      })
      .catch((error) => {
        console.error("Operation Failed: " + error);
      });
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
