import React, { Component } from "react";
import "antd/dist/antd.css";
import { Space, Table, Button } from "antd";
import {
  getAllClientes,
  createCliente,
  deleteCliente,
} from "../../../services/ClienteService";
const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nome",
    dataIndex: "nome",
    key: "id",
  },
  {
    title: "CPF",
    dataIndex: "cpf",
    key: "id",
  },
  {
    title: "Data de Nascimento",
    dataIndex: "dataNascimento",
    key: "id",
  },
  {
    title: "",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button type="default" href={`/update-cliente/${record.id}`}>
          Atualizar
        </Button>
        <Button type="primary" danger onClick={() => deleteCliente(record.id)}>
          Excluir
        </Button>
      </Space>
    ),
  },
];

export class DisplayBoard extends Component {
  state = {
    cliente: {},
    clientes: [],
    numberOfClientes: 0,
  };

  componentWillMount = () => {
    this.getAllClientes();
  };

  getAllClientes = () => {
    getAllClientes().then((clientes) => {
      clientes.map((item) => {
        item.key = item.id;
        return item;
      });
      this.setState({ clientes: clientes, numberOfClientes: clientes.length });
    });
  };

  createCliente = () => {
    createCliente(this.state.cliente).then((response) => {
      console.log(response);
      this.setState({ numberOfClientes: this.state.numberOfClientes + 1 });
    });
  };

  refreshPage() {
    window.location.reload();
  }

  deleteCliente = (idCliente) => {
    deleteCliente(idCliente);
    this.refreshPage();
  };

  render() {
    return <Table columns={columns} dataSource={this.state.clientes} />;
  }
}

export default DisplayBoard;
