using SistemaLocacao.DTO.Input;
using SistemaLocacao.Models;

namespace SistemaLocacao.Repositories
{
    public interface IFilmeRepository
    {
        public Task<Filme> Get(int idFilme);
        public Task<List<Filme>> GetAll();
        public Task<Filme> Create(FilmeInput filmeInput);
        public Task Update(FilmeInput filmeInput);
        public Task Delete(int idFilme);
    }
}