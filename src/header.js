import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./header.css";
import { Layout } from "antd";

const { Header } = Layout;

function navBar() {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo">
          <img src="logo.png" style={{ height: 50 }} />
        </div>
      </Header>
    </Layout>
  );
}
export default navBar;
