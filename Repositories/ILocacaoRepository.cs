using SistemaLocacao.DTO.Input;
using SistemaLocacao.Models;

namespace SistemaLocacao.Repositories
{
    public interface ILocacaoRepository
    {
        public Task<Locacao> Get(int idLocacao);
        public Task<List<Locacao>> Get();
        public Task<Locacao> Create(Locacao locacao);
        public Task Update(Locacao locacao);
        public Task Delete(Locacao locacao);
    }
}