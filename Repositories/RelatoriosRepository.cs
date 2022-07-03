using Microsoft.EntityFrameworkCore;
using SistemaLocacao.Data;
using SistemaLocacao.Models;

namespace SistemaLocacao.Repositories
{
    public class RelatoriosRepository : IRelatoriosRepository
    {
        private readonly SistemaLocacaoDbContext _contexto;

        public RelatoriosRepository(SistemaLocacaoDbContext contexto)
        {
            _contexto = contexto;
        }

        public async Task<List<Locacao>> GetLocacoesAtrasadas()
        {
            var locacoes = await _contexto
                                        .Locacoes
                                        .AsNoTracking()
                                        .Where(x => x.DataDevolucao == null)
                                        .Include(x => x.Cliente)
                                        .Include(x => x.Filme)
                                        .ToListAsync();

            var clientesAtrasados = new List<Locacao>();
            foreach (var locacao in locacoes)
            {
                var diasDeLocacao = (int)DateTime.Now.Subtract(locacao.DataLocacao).TotalDays;

                if (locacao.Filme.Lancamento == 1)
                {
                    if (diasDeLocacao > 2)
                    {
                        clientesAtrasados.Add(locacao);
                    }
                }
                else
                {
                    if (diasDeLocacao > 3)
                    {
                        clientesAtrasados.Add(locacao);
                    }
                }
            }

            return await Task.FromResult(clientesAtrasados);
        }
    }
}