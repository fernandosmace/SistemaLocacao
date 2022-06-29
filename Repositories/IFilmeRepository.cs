using SistemaLocacao.DTO.Input;
using SistemaLocacao.Models;

namespace SistemaLocacao.Repositories
{
    public interface IFilmeRepository
    {
        public Task<Filme> Get(int idFilme);
        public Task<List<Filme>> GetAll();
        public Task<Filme> Create(FilmeInput filmeInput);
        public Task<Filme> Update(FilmeInput filmeInput);
        public Task<int> Delete(int idFilme);
    }
}