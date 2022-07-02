import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DisplayBoard } from "./DisplayBoard/DisplayBoard";
import { Button, Space } from "antd";

export class Clientes extends Component {
  render() {
    return (
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: "flex",
        }}
      >
        <div className="btnAdd">
          <Link to={"/create-cliente"}>
            <Button type="primary">Adicionar Cliente</Button>
          </Link>
        </div>
        <DisplayBoard></DisplayBoard>
      </Space>
    );
  }
}

export default Clientes;
