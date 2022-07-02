export async function getFilme(idFilme) {
  const response = await fetch(
    `https://localhost:7273/api/v1/Filme/${idFilme}`
  );
  return await response;
}

export async function getAllFilmes() {
  const response = await fetch("https://localhost:7273/api/v1/Filme");
  return await response.json();
}

export async function createFilme(data) {
  const response = await fetch("https://localhost:7273/api/v1/Filme", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response;
}

export async function updateFilme(data) {
  const response = await fetch("https://localhost:7273/api/v1/Filme", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response;
}

export async function deleteFilme(idFilme) {
  const response = await fetch(
    `https://localhost:7273/api/v1/Filme/${idFilme}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );
  return await response;
}
