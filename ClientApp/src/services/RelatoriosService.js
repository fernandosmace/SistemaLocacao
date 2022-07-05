var baseURL = "";

if (window.location.hostname === "localhost") {
  baseURL = "https://localhost:7273";
} else {
  baseURL = "https://sistemalocacao.azurewebsites.net";
}

export async function getLocacoesAtrasadas() {
  const response = await fetch(
    `${baseURL}/api/v1/Relatorios/GetLocacoesAtrasadas`
  );
  return await response;
}

export async function getFilmesNuncaAlugados() {
  const response = await fetch(
    `${baseURL}/api/v1/Relatorios/GetFilmesNuncaAlugados`
  );
  return await response;
}

export async function getFilmesMaisAlugadosAno() {
  const response = await fetch(
    `${baseURL}/api/v1/Relatorios/GetFilmesMaisAlugadosAno`
  );
  return await response;
}

export async function getFilmesMenosAlugadosSemana() {
  const response = await fetch(
    `${baseURL}/api/v1/Relatorios/GetFilmesMenosAlugadosSemana`
  );
  return await response;
}

export async function getSegundoMaiorCliente() {
  const response = await fetch(
    `${baseURL}/api/v1/Relatorios/GetSegundoMaiorCliente`
  );
  return await response;
}
