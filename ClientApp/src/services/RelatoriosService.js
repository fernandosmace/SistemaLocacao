export async function getLocacoesAtrasadas() {
  const response = await fetch(
    "https://localhost:7273/api/v1/Relatorios/GetLocacoesAtrasadas"
  );
  return await response;
}

export async function getFilmesNuncaAlugados() {
  const response = await fetch(
    "https://localhost:7273/api/v1/Relatorios/GetFilmesNuncaAlugados"
  );
  return await response;
}

export async function getFilmesMaisAlugadosAno() {
  const response = await fetch(
    "https://localhost:7273/api/v1/Relatorios/GetFilmesMaisAlugadosAno"
  );
  return await response;
}

export async function getFilmesMenosAlugadosSemana() {
  const response = await fetch(
    "https://localhost:7273/api/v1/Relatorios/GetFilmesMenosAlugadosSemana"
  );
  return await response;
}

export async function getSegundoMaiorCliente() {
  const response = await fetch(
    "https://localhost:7273/api/v1/Relatorios/GetSegundoMaiorCliente"
  );
  return await response;
}
