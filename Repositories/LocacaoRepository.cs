using Microsoft.EntityFrameworkCore;
using SistemaLocacao.Data;
using SistemaLocacao.Models;

namespace SistemaLocacao.Repositories
{
    public class LocacaoRepository : ILocacaoRepository
    {
        private readonly SistemaLocacaoDbContext _contexto;

        public LocacaoRepository(SistemaLocacaoDbContext contexto)
        {
            _contexto = contexto;
        }

        public async Task<Locacao> Get(int idLocacao)
        {
            return await Task.FromResult(await _contexto
                                        .Locacoes
                                        .Include("Clientes")
                                        .Include("Filmes")
                                        .FirstOrDefaultAsync(x => x.Id == idLocacao));
        }

        public async Task<List<Locacao>> GetAll()
        {
            return await Task.FromResult(await _contexto
                                        .Locacoes
                                        .Include("Clientes")
                                        .Include("Filmes")
                                        .AsNoTracking()
                                        .ToListAsync());
        }

        public async Task<Locacao> Create(Locacao locacao)
        {
            await _contexto.Locacoes.AddAsync(locacao);
            await _contexto.SaveChangesAsync();
            return await Task.FromResult(locacao);
        }

        public async Task Update(Locacao locacao)
        {
            var locacaoExists = _contexto.Locacoes.SingleOrDefault(x => x.Id == locacao.Id);
            _contexto.Locacoes.Update(locacaoExists);
            await _contexto.SaveChangesAsync();
        }

        public async Task Delete(Locacao locacao)
        {
            var locacaoExists = _contexto.Locacoes.Find(locacao.Id);
            _contexto.Locacoes.Remove(locacaoExists);
            await _contexto.SaveChangesAsync();
        }
    }
}