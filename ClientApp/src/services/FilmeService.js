var baseURL = "";

if (window.location.hostname === "localhost") {
  baseURL = "https://localhost:7273";
} else {
  baseURL = "https://sistemalocacao.azurewebsites.net";
}

export async function getFilme(idFilme) {
  const response = await fetch(`${baseURL}/api/v1/Filme/${idFilme}`);
  return await response;
}

export async function getAllFilmes() {
  const response = await fetch(`${baseURL}/api/v1/Filme`);
  return await response;
}

export async function createFilme(data) {
  const response = await fetch(`${baseURL}/api/v1/Filme`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response;
}

export async function updateFilme(data) {
  const response = await fetch(`${baseURL}/api/v1/Filme`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response;
}

export async function deleteFilme(idFilme) {
  const response = await fetch(`${baseURL}/api/v1/Filme/${idFilme}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return await response;
}
