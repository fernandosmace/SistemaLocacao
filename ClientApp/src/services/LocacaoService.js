export async function getLocacao(idLocacao) {
  const response = await fetch(
    `https://localhost:7273/api/v1/Locacao/${idLocacao}`
  );
  return await response;
}

export async function getAllLocacoes() {
  const response = await fetch("https://localhost:7273/api/v1/Locacao");
  return await response;
}

export async function createLocacao(data) {
  const response = await fetch("https://localhost:7273/api/v1/Locacao", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response;
}

export async function updateLocacao(data) {
  const response = await fetch("https://localhost:7273/api/v1/Locacao", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response;
}

export async function deleteLocacao(idLocacao) {
  const response = await fetch(
    `https://localhost:7273/api/v1/Locacao/${idLocacao}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );
  return await response;
}
