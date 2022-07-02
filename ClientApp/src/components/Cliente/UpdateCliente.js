import React, { useEffect } from "react";
import { Typography, Button, DatePicker, Form, Input, Alert } from "antd";
import { getCliente, updateCliente } from "../../services/ClienteService";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import moment from "moment";
import { MaskedInput } from "antd-mask-input";
const { Title } = Typography;

export const UpdateCliente = () => {
  const [UpdateClienteForm] = Form.useForm();

  const ResetForm = () => {
    UpdateClienteForm.resetFields();
  };

  const SetForm = (json) => {
    UpdateClienteForm.setFieldsValue({
      id: json.id,
      nome: json.nome,
      cpf: json.cpf,
      dataNascimento: moment(json.dataNascimento),
    });
  };

  const { id } = useParams();
  let idCliente = id;

  useEffect(() => {
    getCliente(idCliente).then((response) => {
      let getText = response.text();
      if (response.status !== 200) {
        getText.then((value) => {
          swal("Ocorreu um erro ao buscar o cliente.", value, "error");
        });
      } else {
        getText.then((value) => {
          const json = JSON.parse(value);
          SetForm(json);
        });
      }
    });
  }, []);

  const onFinish = async (values) => {
    var cliente = {
      id: values.id,
      nome: values.nome,
      cpf: values.cpf,
      dataNascimento: values.dataNascimento,
    };

    cliente.cpf = cliente.cpf.replace(/\D/g, "");

    console.log(cliente.cpf);
    updateCliente(cliente).then((response) => {
      if (response.status !== 200) {
        let getError = response.text();

        getError.then((value) => {
          swal("Ocorreu um erro ao atualizar o cliente.", value, "error");
        });
      } else {
        swal("Cliente atualizado com sucesso!", "", "success");
        ResetForm();
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    <Alert
      message={`Erro ao atualizar o cliente! Erro:${errorInfo}`}
      type="error"
    />;
  };

  return (
    <div>
      <Typography>
        <Title>Atualização de Cliente</Title>
      </Typography>
      <Form
        form={UpdateClienteForm}
        name="UpdateClienteForm"
        layout="vertical"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 20,
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          style={{
            width: "10%",
          }}
          label="Id"
          name="id"
          rules={[
            {
              required: true,
              message: "O Id é obrigatório.",
            },
            {
              pattern: /^[0-9]+$/,
              message: "O id somente deve conter números.",
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Nome"
          name="nome"
          rules={[
            {
              required: true,
              message: "Informe o nome do Cliente.",
            },
            {
              pattern: /^[a-zA-Z0-9]+$/,
              message: "O nome somente deve conter letras e números.",
            },
            {
              max: 200,
              message: "O nome deve conter até 200 caracteres.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="CPF"
          name="cpf"
          rules={[
            {
              required: true,
              message: "Informe o CPF do Cliente.",
            },
          ]}
        >
          <MaskedInput mask={"000.000.000-00"} />
        </Form.Item>

        <Form.Item
          label="Data de Nascimento"
          name="dataNascimento"
          rules={[
            {
              required: true,
              message: "Informe a data de Nascimento do Cliente.",
            },
          ]}
        >
          <DatePicker
            style={{
              width: "30%",
            }}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateCliente;
