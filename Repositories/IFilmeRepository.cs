using SistemaLocacao.DTO.Input;
using SistemaLocacao.Models;

namespace SistemaLocacao.Repositories
{
    public interface IFilmeRepository
    {
        public Task<Filme> Get(int idFilme);
        public Task<List<Filme>> GetAll();
        public Task<Filme> Create(Filme filme);
        public Task Update(Filme filme);
        public Task Delete(Filme filme);
    }
}