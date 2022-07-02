import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Space, Table } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import {
  getAllLocacoes,
  deleteLocacao,
} from "../../../services/LocacaoService";
import swal from "sweetalert";
import moment from "moment";

export const DisplayBoard = () => {
  const [locacoes, setLocacoes] = useState([]);

  useEffect(() => {
    getAllLocacoes().then((response) => {
      if (response.status !== 200) {
        swal(
          "Ocorreu um erro ao buscar as locações.",
          "Contate o administrador do sistema.",
          "error"
        );
      } else {
        var json = response.json();
        json.then((locacoes) => {
          locacoes.map((item) => {
            item.id = item.id;
            item.key = item.id;
            item.cliente = item.cliente.nome;
            item.filme = item.filme.titulo;
            item.dataLocacao = moment(item.dataLocacao).format("DD/MM/YYYY");
            if (item.dataDevolucao != null) {
              item.dataDevolucao = moment(item.dataDevolucao).format(
                "DD/MM/YYYY"
              );
            }
            return item;
          });
          setLocacoes(locacoes);
        });
      }
    });
  });

  const deleteLocacaoHandler = (idLocacao) => {
    swal("Tem certeza que deseja excluir esta locação?", {
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
          deleteLocacao(idLocacao).then((response) => {
            if (response.status !== 200) {
              let getError = response.text();

              getError.then((value) => {
                swal("Ocorreu um erro ao excluir a locação.", value, "error");
              });
            } else {
              swal("Locação excluída com sucesso!", "", "success");
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
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
    },
    {
      title: "Filme",
      dataIndex: "filme",
      key: "filme",
    },
    {
      title: "Data de Locação",
      dataIndex: "dataLocacao",
      key: "lancamento",
    },
    {
      title: "Data de Devolução",
      dataIndex: "dataDevolucao",
      key: "dataDevolucao",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/update-locacao/${record.id}`}>
            <EditTwoTone style={{ fontSize: "1.5em" }} />
          </Link>
          <Link to={"#"} onClick={() => deleteLocacaoHandler(record.id)}>
            <DeleteTwoTone
              style={{ fontSize: "1.5em" }}
              twoToneColor="#eb2f96"
            />
          </Link>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={locacoes} pagination={false} />;
};

export default DisplayBoard;
