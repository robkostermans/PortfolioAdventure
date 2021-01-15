import React from "react";
import "./styles.css";

import { Beacon, Hotspot } from "components";

export default function App() {
  return (
    <div className="App">
      {/* <Beacon /> */}
      <div style={{ width: "100px" }}>
        <Hotspot />
      </div>
    </div>
  );
}
