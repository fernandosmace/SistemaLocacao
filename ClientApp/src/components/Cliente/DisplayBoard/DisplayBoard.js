import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Space, Table } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import {
  getAllClientes,
  deleteCliente,
} from "../../../services/ClienteService";
import swal from "sweetalert";
import moment from "moment";

export const DisplayBoard = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    getAllClientes().then((response) => {
      if (response.status !== 200) {
        swal(
          "Ocorreu um erro ao buscar os cliente.",
          "Contate o administrador do sistema.",
          "error"
        );
      } else {
        var json = response.json();
        json.then((clientes) => {
          clientes.map((item) => {
            item.key = item.id;
            item.cpf = item.cpf.replace(
              /(\d{3})(\d{3})(\d{3})(\d{2})/,
              "$1.$2.$3-$4"
            );
            item.dataNascimento = moment(item.dataNascimento).format(
              "DD/MM/YYYY"
            );
            return item;
          });
          setClientes(clientes);
        });
      }
    });
  });

  const deleteClienteHandler = (idCliente) => {
    swal("Tem certeza que deseja excluir este cliente?", {
      icon: "warning",
      dangerMode: true,
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
          <Link to={`/update-cliente/${record.id}`}>
            <EditTwoTone style={{ fontSize: "1.5em" }} />
          </Link>
          <Link to={"#"} onClick={() => deleteClienteHandler(record.id)}>
            <DeleteTwoTone
              style={{ fontSize: "1.5em" }}
              twoToneColor="#eb2f96"
            />
          </Link>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={clientes} pagination={false} />;
};

export default DisplayBoard;
