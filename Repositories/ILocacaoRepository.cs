using SistemaLocacao.DTO.Input;
using SistemaLocacao.Models;

namespace SistemaLocacao.Repositories
{
    public interface ILocacaoRepository
    {
        public Task<Locacao> Get(int idLocacao);
        public Task<List<Locacao>> GetAll();
        public Task<Locacao> Create(LocacaoInput locacaoInput);
        public Task<Locacao> Update(LocacaoInput locacaoInput);
        public Task<int> Delete(int idLocacao);
    }
}