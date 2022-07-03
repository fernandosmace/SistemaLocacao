using SistemaLocacao.DTO.Output;
using SistemaLocacao.Models;

namespace SistemaLocacao.Repositories
{
    public interface IRelatoriosRepository
    {
        public Task<List<LocacaoAtrasadaOutput>> GetLocacoesAtrasadas();
        public Task<List<FilmeOutput>> GetFilmesNuncaAlugados();
        public Task<List<FilmeAlugadosOutput>> GetFilmesMaisAlugadosAno();
        public Task<List<FilmeAlugadosOutput>> GetFilmesMenosAlugadosSemana();
        public Task<ClienteLocadorOutput> GetSegundoMaiorCliente();
    }
}