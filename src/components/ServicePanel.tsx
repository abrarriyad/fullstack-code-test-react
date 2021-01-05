import React from "react";
import ServiceTable from "./ServiceTable";
import AddService from "./AddService";
import { ServiceProvider } from "../context/ServiceContext";
import DeleteService from "./deleteService";

const ServicePanel: React.FC = () => {
  return (
    <div className="container">
      <ServiceProvider>
        <ServiceTable />
        <AddService />
        <DeleteService />
      </ServiceProvider>
    </div>
  );
};

export default ServicePanel;
