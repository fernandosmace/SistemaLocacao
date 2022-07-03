export async function getLocacoesAtrasadas() {
  const response = await fetch("https://localhost:7273/GetLocacoesAtrasadas");
  return await response;
}

export async function getFilmesNuncaAlugados() {
  const response = await fetch("https://localhost:7273/GetFilmesNuncaAlugados");
  return await response;
}

export async function getFilmesMaisAlugadosAno() {
  const response = await fetch(
    "https://localhost:7273/GetFilmesMaisAlugadosAno"
  );
  return await response;
}
