import React, { Component } from "react";
import { Container } from "reactstrap";
import Header from "./Header/Header";
import { Space } from "antd";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: "flex",
          }}
        >
          <Header />
          <Container>{this.props.children}</Container>
        </Space>
      </div>
    );
  }
}
