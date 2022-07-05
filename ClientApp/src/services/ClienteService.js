var baseURL = "";

if (window.location.hostname === "localhost") {
  baseURL = "https://localhost:7273";
} else {
  baseURL = "https://sistemalocacao.azurewebsites.net";
}

export async function getCliente(idCliente) {
  const response = await fetch(`${baseURL}/api/v1/Cliente/${idCliente}`);
  return await response;
}

export async function getAllClientes() {
  const response = await fetch(`${baseURL}/api/v1/Cliente`);
  return await response;
}

export async function createCliente(data) {
  const response = await fetch(`${baseURL}/api/v1/Cliente`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response;
}

export async function updateCliente(data) {
  const response = await fetch(`${baseURL}/api/v1/Cliente`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response;
}

export async function deleteCliente(idCliente) {
  const response = await fetch(`${baseURL}/api/v1/Cliente/${idCliente}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return response;
}
