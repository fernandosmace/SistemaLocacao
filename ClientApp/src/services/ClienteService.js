export async function getCliente(idCliente) {
  const response = await fetch(
    `https://localhost:7273/api/v1/Cliente/${idCliente}`
  );
  return await response;
}

export async function getAllClientes() {
  const response = await fetch("https://localhost:7273/api/v1/Cliente");
  return await response.json();
}

export async function createCliente(data) {
  const response = await fetch("https://localhost:7273/api/v1/Cliente", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response;
}

export async function updateCliente(data) {
  const response = await fetch("https://localhost:7273/api/v1/Cliente", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response;
}

export async function deleteCliente(idCliente) {
  const response = await fetch(
    `https://localhost:7273/api/v1/Cliente/${idCliente}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );
  return response;
}
