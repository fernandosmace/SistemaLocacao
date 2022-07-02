import React, { Component } from "react";
import { Link } from "react-router-dom";
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
          <Link to={"/create-filme"}>
            <Button type="primary">Adicionar Filme</Button>
          </Link>
        </div>
        <DisplayBoard></DisplayBoard>
      </Space>
    );
  }
}

export default Filmes;
