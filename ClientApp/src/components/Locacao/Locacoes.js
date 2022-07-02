import React, { Component } from "react";
import { DisplayBoard } from "./DisplayBoard/DisplayBoard";
import { Button, Space } from "antd";

export class Locacoes extends Component {
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
          <Button type="primary" href="/create-locacao">
            Adicionar Locação
          </Button>
        </div>
        <DisplayBoard></DisplayBoard>
      </Space>
    );
  }
}

export default Locacoes;
