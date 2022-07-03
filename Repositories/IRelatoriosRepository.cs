using SistemaLocacao.Models;

namespace SistemaLocacao.Repositories
{
    public interface IRelatoriosRepository
    {
        public Task<List<Locacao>> GetLocacoesAtrasadas();
    }
}