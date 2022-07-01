import React from "react";
import "antd/dist/antd.css";
import "./Header.css";
import { PageHeader, Button, Anchor } from "antd";

const { Link } = Anchor;

const Header = () => (
  <PageHeader
    className="site-page-header"
    title="Sistema Locação"
    subTitle="Gestão de locações de filmes"
    extra={[
      <Button key="4">
        <a href="/Counter">Filmes</a>
      </Button>,
      <Button key="3">
        <a href="/Counter">Clientes</a>
      </Button>,
      <Button key="2">
        <a href="/Counter">Relatórios</a>
      </Button>,
      <Button key="1" type="primary">
        <a href="/Counter">Locações</a>
      </Button>,
    ]}
  />
);

export default Header;
