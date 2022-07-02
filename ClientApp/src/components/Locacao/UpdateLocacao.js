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
} from "antd";
import { getLocacao, updateLocacao } from "../../services/LocacaoService";
import { getCliente } from "../../services/ClienteService";
import { getFilme } from "../../services/FilmeService";
import swal from "sweetalert";
import { MaskedInput } from "antd-mask-input";
import moment from "moment";
const { Title } = Typography;
const { Search } = Input;

export const UpdateLocacao = () => {
  const [cliente, setCliente] = useState([]);
  const [filme, setFilme] = useState([]);
  const [filmeLancamento, setFilmeLancamento] = useState([]);

  const [UpdateLocacaoForm] = Form.useForm();

  const SetLocacaoForm = (json) => {
    console.log(json);
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
    UpdateLocacaoForm.setFieldsValue({
      nome: json.nome,
      cpf: json.cpf,
      dataNascimento: moment(json.dataNascimento),
    });
  };

  const SetFilmeForm = (json) => {
    UpdateLocacaoForm.setFieldsValue({
      titulo: json.titulo,
      classificacaoIndicativa: json.classificacaoIndicativa,
    });

    setFilmeLancamento(json.lancamento);
  };

  const handleSwitchChange = () => {
    switch (filmeLancamento) {
      case 0:
        setFilmeLancamento(1);
        break;
      case 1:
        setFilmeLancamento(0);
        break;
      default:
        setFilmeLancamento(1);
        break;
    }
  };

  const clienteSearchHandler = (idCliente) => {
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
          console.log(cliente);
          SetClienteForm(json);
        });
      }
    });
  };

  const filmeSearchHandler = (idFilme) => {
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
        });
      }
    });
  };

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
  }, []);

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
              label="Id Cliente"
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
              <Search
                style={{
                  width: "35%",
                }}
                enterButton="Buscar Cliente"
                onSearch={clienteSearchHandler}
              />
            </Form.Item>
            <Form.Item
              label="Id Filme"
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
              <Search
                style={{
                  width: "35%",
                }}
                enterButton="Buscar Filme"
                onSearch={filmeSearchHandler}
              />
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
                <MaskedInput
                  disabled
                  style={{
                    textAlign: "center",
                    width: "25%",
                  }}
                  mask={"000.000.000-00"}
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
                <Switch
                  disabled
                  checked={filmeLancamento}
                  onChange={handleSwitchChange}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateLocacao;
