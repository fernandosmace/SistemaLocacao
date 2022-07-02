import React, { Component } from "react";
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
          <Button type="primary" href="/create-cliente">
            Adicionar Cliente
          </Button>
        </div>
        <DisplayBoard></DisplayBoard>
      </Space>
    );
  }
}

export default Clientes;
