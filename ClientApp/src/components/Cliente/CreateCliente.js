import { Typography, Button, DatePicker, Form, Input, Alert } from "antd";
import { createCliente } from "../../services/ClienteService";
import swal from "sweetalert";
import { MaskedInput } from "antd-mask-input";
const { Title } = Typography;

export const CreateCliente = () => {
  const [CreateClienteForm] = Form.useForm();

  const ResetForm = () => {
    CreateClienteForm.resetFields();
  };

  const onFinish = async (values) => {
    var cliente = {
      nome: values.nome,
      cpf: values.cpf.replace(/\D/g, ""),
      dataNascimento: values.dataNascimento,
    };

    createCliente(cliente).then((response) => {
      if (response.status !== 200) {
        let getError = response.text();

        getError.then((value) => {
          swal("Ocorreu um erro ao cadastrar o cliente.", value, "error");
        });
      } else {
        swal("Cliente cadastrado com sucesso!", "", "success");
        ResetForm();
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    <Alert
      message={`Erro ao cadastrar o cliente! Erro:${errorInfo}`}
      type="error"
    />;
  };

  return (
    <div>
      <Typography>
        <Title>Cadastro de Cliente</Title>
      </Typography>
      <Form
        form={CreateClienteForm}
        name="CreateClienteForm"
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
          label="Nome"
          name="nome"
          rules={[
            {
              required: true,
              message: "Informe o nome do Cliente.",
            },
            {
              pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ]+$/,
              //pattern: /^[a-zA-Z0-9 ]+$/,
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
            format={"DD/MM/YYYY"}
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

export default CreateCliente;
