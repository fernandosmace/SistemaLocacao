import React, { Component } from "react";
import { DisplayBoard } from "./DisplayBoard/DisplayBoard";
import { Button, Space } from "antd";

export class Filmes extends Component {
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
          <Button type="primary" href="/create-filme">
            Adicionar Filme
          </Button>
        </div>
        <DisplayBoard></DisplayBoard>
      </Space>
    );
  }
}

export default Filmes;
