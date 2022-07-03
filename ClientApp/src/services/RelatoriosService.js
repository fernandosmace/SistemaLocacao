export async function getLocacoesAtrasadas() {
  const response = await fetch("https://localhost:7273/api/v1/Relatorios");
  return await response;
}
