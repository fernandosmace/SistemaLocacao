import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Space, Table, Button } from "antd";
import {
  getAllClientes,
  deleteCliente,
} from "../../../services/ClienteService";
import swal from "sweetalert";
import moment from "moment";

export const DisplayBoard = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    getAllClientes().then((clientesResponse) => {
      clientesResponse.map((item) => {
        item.key = item.id;
        item.cpf = item.cpf.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          "$1.$2.$3-$4"
        );
        item.dataNascimento = moment(item.dataNascimento).format("DD/MM/YYYY");
        return item;
      });
      setClientes(clientesResponse);
    });
  });

  const deleteClienteHandler = (idCliente) => {
    swal("Tem certeza que deseja excluir este cliente?", {
      buttons: {
        cancel: "Não",
        confirm: {
          text: "Sim",
          value: 1,
        },
      },
    }).then((value) => {
      switch (value) {
        case 1:
          deleteCliente(idCliente).then((response) => {
            if (response.status !== 200) {
              let getError = response.text();

              getError.then((value) => {
                console.log("teste3");
                swal("Ocorreu um erro ao excluir o cliente.", value, "error");
              });
            } else {
              swal("Cliente excluído com sucesso!", "", "success");
            }
          });
          break;

        default:
          break;
      }
    });
  };

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
          <Button
            type="primary"
            danger
            onClick={() => deleteClienteHandler(record.id)}
          >
            Excluir
          </Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={clientes} />;
};

export default DisplayBoard;
