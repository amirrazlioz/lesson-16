import React from "react";
import SmartHouse from "./SmartHouse";  // Import your SmartHouse component

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col">
      {/* SmartHouse component at the top of every page */}
      <SmartHouse />
      {/* Page content will go here */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
