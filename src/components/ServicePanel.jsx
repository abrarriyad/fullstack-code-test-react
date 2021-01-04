import React, { useEffect, useState } from "react";
import ServiceTable from "../components/ServiceTable";
import AddService from "./AddService";
import { ServiceProvider } from "../context/ServiceContext";
import DeleteService from "./deleteService";

const Services = () => {
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

export default Services;
