using Microsoft.EntityFrameworkCore;
using SistemaLocacao.Data;
using SistemaLocacao.DTO.Input;
using SistemaLocacao.Models;

namespace SistemaLocacao.Repositories
{
    public class FilmeRepository : IFilmeRepository
    {
        private readonly SistemaLocacaoDbContext _contexto;

        public FilmeRepository(SistemaLocacaoDbContext contexto)
        {
            _contexto = contexto;
        }

        public async Task<Filme> Get(int idFilme)
        {
            return await Task.FromResult(await _contexto
                                        .Filmes
                                        .FirstOrDefaultAsync(x => x.Id == idFilme));
        }

        public async Task<List<Filme>> Get()
        {
            return await Task.FromResult(await _contexto
                                        .Filmes
                                        .AsNoTracking()
                                        .ToListAsync());
        }

        public async Task<Filme> Create(Filme filme)
        {
            await _contexto.Filmes.AddAsync(filme);
            _contexto.SaveChanges();
            return await Task.FromResult(filme);
        }

        public async Task Update(Filme filme)
        {
            var filmeExists = _contexto.Filmes.SingleOrDefault(x => x.Id == filme.Id);
            _contexto.Filmes.Update(filmeExists);
            _contexto.SaveChanges();
        }

        public async Task Delete(Filme filme)
        {
            var filmeExists = _contexto.Filmes.Find(filme.Id);
            _contexto.Filmes.Remove(filmeExists);
            _contexto.SaveChanges();
        }
    }
}