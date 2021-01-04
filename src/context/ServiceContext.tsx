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
    setShowAlert(alert);
  };
  const toggleAddServicePrompt = (val: boolean) => {
    setAddServiceAlert(val);
  };
  const toggleDeleteServicePrompt = (val: boolean) => {
    setDeleteServiceAlert(val);
  };

  const hideAlert = () => {
    setTimeout(() => {
      setShowAlert({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);
  };

  const addService = (service: Service) => {
    axios
      .post("/services", service, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
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
