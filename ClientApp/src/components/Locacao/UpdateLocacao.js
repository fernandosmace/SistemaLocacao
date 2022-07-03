import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Button,
  DatePicker,
  Form,
  Input,
  Alert,
  Switch,
  InputNumber,
  Row,
  Col,
  Divider,
  Select,
} from "antd";
import { getLocacao, updateLocacao } from "../../services/LocacaoService";
import { getCliente, getAllClientes } from "../../services/ClienteService";
import { getFilme, getAllFilmes } from "../../services/FilmeService";
import swal from "sweetalert";
import { MaskedInput } from "antd-mask-input";
import moment from "moment";
const { Title } = Typography;
const { Option } = Select;

export const UpdateLocacao = () => {
  const [cliente, setCliente] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [filme, setFilme] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [filmeLancamento, setFilmeLancamento] = useState([]);

  const { id } = useParams();
  let idLocacao = id;

  useEffect(() => {
    getLocacao(idLocacao).then((response) => {
      let getText = response.text();
      if (response.status !== 200) {
        getText.then((value) => {
          swal("Ocorreu um erro ao buscar a locação.", value, "error");
        });
      } else {
        getText.then((value) => {
          const json = JSON.parse(value);
          SetLocacaoForm(json);
          setCliente(json.cliente);
          setFilme(json.filme);
        });
      }
    });

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

    getAllFilmes().then((response) => {
      if (response.status !== 200) {
        swal(
          "Ocorreu um erro ao buscar os filmes.",
          "Contate o administrador do sistema.",
          "error"
        );
      } else {
        var json = response.json();
        json.then((filmes) => {
          filmes.map((item) => {
            item.key = item.id;
            item.lancamento = item.lancamento == 1 ? "Sim" : "Não";
            return item;
          });
          setFilmes(filmes);
        });
      }
    });
  }, []);

  const handleClientSelect = (idCliente) => {
    getCliente(idCliente).then((response) => {
      let getText = response.text();
      if (response.status !== 200) {
        getText.then((value) => {
          swal("Ocorreu um erro ao buscar o cliente.", value, "error");
        });
      } else {
        getText.then((value) => {
          const json = JSON.parse(value);
          setCliente(json);
          SetClienteForm(json);
        });
      }
    });
  };

  const handleFilmeSelect = (idFilme) => {
    getFilme(idFilme).then((response) => {
      let getText = response.text();
      if (response.status !== 200) {
        getText.then((value) => {
          swal("Ocorreu um erro ao buscar o filme.", value, "error");
        });
      } else {
        getText.then((value) => {
          const json = JSON.parse(value);
          setFilme(json);
          SetFilmeForm(json);
          console.log(json);
        });
      }
    });
  };

  const [UpdateLocacaoForm] = Form.useForm();

  const SetLocacaoForm = (json) => {
    UpdateLocacaoForm.setFieldsValue({
      id: json.id,
      clienteId: json.cliente.id,
      filmeId: json.filme.id,
      dataLocacao: moment(json.dataLocacao),
    });

    if (json.dataDevolucao !== null) {
      UpdateLocacaoForm.setFieldsValue({
        dataDevolucao: moment(json.dataDevolucao),
      });
    }
    SetClienteForm(json.cliente);
    SetFilmeForm(json.filme);
  };

  const SetClienteForm = (json) => {
    let cpfFormatted = json.cpf.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
    UpdateLocacaoForm.setFieldsValue({
      nome: json.nome,
      cpf: cpfFormatted,
      dataNascimento: moment(json.dataNascimento),
    });
  };

  const SetFilmeForm = (json) => {
    UpdateLocacaoForm.setFieldsValue({
      titulo: json.titulo,
      classificacaoIndicativa: json.classificacaoIndicativa,
    });
  };

  const onFinish = async (values) => {
    if (cliente.length == 0) {
      swal("Busque um cliente para continuar.", "", "error");
      return;
    }

    if (filme.length == 0) {
      swal("Busque um filme para continuar.", "", "error");
      return;
    }

    var locacao = {
      id: values.id,
      clienteId: values.clienteId,
      filmeId: values.filmeId,
      dataLocacao: values.dataLocacao,
      dataDevolucao: values.dataDevolucao,
    };

    updateLocacao(locacao).then((response) => {
      if (response.status !== 200) {
        let getError = response.text();

        getError.then((value) => {
          swal("Ocorreu um erro ao alterar a locação.", value, "error");
        });
      } else {
        swal("Locação alterada com sucesso!", "", "success");
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    <Alert
      message={`Erro ao editar a locação! Erro:${errorInfo}`}
      type="error"
    />;
  };

  return (
    <div>
      <Typography>
        <Title>Editar Locação</Title>
      </Typography>

      <Form
        layout={"vertical"}
        form={UpdateLocacaoForm}
        name="UpdateLocacaoForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Row>
          <Col span={10} justify="start">
            <Form.Item
              label="Id"
              name="id"
              rules={[
                {
                  required: true,
                  message: "O Id da Locação é obrigatória.",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "O Id somente deve conter números.",
                },
              ]}
            >
              <Input
                style={{
                  width: "8%",
                }}
                disabled
              />
            </Form.Item>
            <Form.Item
              style={{
                width: "45%",
              }}
              label="Cliente"
              name="clienteId"
              rules={[
                {
                  required: true,
                  message: "O Id do Cliente é obrigatório.",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "O id somente deve conter números.",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                onSelect={handleClientSelect}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {clientes.map((item) => {
                  return (
                    <Option key={item.key} value={item.id}>
                      {item.nome}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              style={{
                width: "45%",
              }}
              label="Filme"
              name="filmeId"
              rules={[
                {
                  required: true,
                  message: "O Id do Filme é obrigatório.",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "O id somente deve conter números.",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                onSelect={handleFilmeSelect}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {filmes.map((item) => {
                  return (
                    <Option key={item.key} value={item.id}>
                      {item.titulo}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={10} justify="center">
            <Form.Item
              label="Data de Locação"
              name="dataLocacao"
              rules={[
                {
                  required: true,
                  message: "Informe a data da locação.",
                },
              ]}
            >
              <DatePicker
                disabledDate={(current) => {
                  let customDate = moment().format("YYYY-MM-DD");
                  return current && current > moment(customDate, "YYYY-MM-DD");
                }}
                placeholder=""
                format={"DD/MM/YYYY"}
                style={{
                  width: "25%",
                }}
              />
            </Form.Item>
            <Form.Item label="Data de Devolução" name="dataDevolucao">
              <DatePicker
                disabledDate={(current) => {
                  let customDate = moment().format("YYYY-MM-DD");
                  return current && current > moment(customDate, "YYYY-MM-DD");
                }}
                placeholder=""
                format={"DD/MM/YYYY"}
                style={{
                  width: "25%",
                }}
              />
            </Form.Item>
            <br />
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Enviar
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={10} justify="start">
            <div>
              <Typography>
                <Title level={3}>Cliente</Title>
              </Typography>
              <Form.Item
                style={{
                  width: "90%",
                }}
                label="Nome"
                name="nome"
              >
                <Input disabled />
              </Form.Item>

              <Form.Item label="CPF" name="cpf">
                <Input
                  disabled
                  style={{
                    textAlign: "center",
                    width: "35%",
                  }}
                />
              </Form.Item>

              <Form.Item label="Data de Nascimento" name="dataNascimento">
                <DatePicker
                  placeholder=""
                  disabled
                  format={"DD/MM/YYYY"}
                  style={{
                    width: "25%",
                  }}
                />
              </Form.Item>
            </div>
          </Col>
          <Col span={10} justify="center">
            <div>
              <Typography>
                <Title level={3}>Filme</Title>
              </Typography>
              <Form.Item
                style={{
                  width: "90%",
                }}
                label="Título"
                name="titulo"
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Classificação Indicativa"
                name="classificacaoIndicativa"
              >
                <InputNumber
                  disabled
                  style={{
                    width: "9%",
                  }}
                  min={1}
                  max={18}
                />
              </Form.Item>

              <Form.Item label="Lançamento" name="lancamento">
                <Switch disabled checked={filmeLancamento} />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateLocacao;
