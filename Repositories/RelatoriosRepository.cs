using Microsoft.EntityFrameworkCore;
using SistemaLocacao.Data;
using SistemaLocacao.DTO.Output;
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

        public async Task<List<LocacaoAtrasadaOutput>> GetLocacoesAtrasadas()
        {
            var locacoes = await _contexto
                                        .Locacoes
                                        .AsNoTracking()
                                        .Where(x => x.DataDevolucao == null)
                                        .Include(x => x.Cliente)
                                        .Include(x => x.Filme)
                                        .ToListAsync();

            var locacoesAtrasadas = new List<LocacaoAtrasadaOutput>();
            foreach (var locacao in locacoes)
            {
                var diasDeLocacao = (int)DateTime.Now.Subtract(locacao.DataLocacao).TotalDays;
                int diasDeAtraso = 0;

                if (locacao.Filme.Lancamento == 1)
                {
                    if (diasDeLocacao > 2)
                        diasDeAtraso = diasDeLocacao - 2;

                    if (diasDeLocacao > 3)
                        diasDeAtraso = diasDeLocacao - 3;
                }

                if (diasDeAtraso > 0)
                {
                    locacoesAtrasadas.Add(new LocacaoAtrasadaOutput
                    {
                        Id = locacao.Id,
                        DataLocacao = locacao.DataLocacao,
                        DiasDeAtraso = diasDeAtraso,
                        Cliente = new ClienteOutput
                        {
                            Id = locacao.Cliente.Id,
                            Nome = locacao.Cliente.Nome,
                            CPF = locacao.Cliente.CPF,
                            DataNascimento = locacao.Cliente.DataNascimento
                        },
                        Filme = new FilmeOutput
                        {
                            Id = locacao.Filme.Id,
                            Titulo = locacao.Filme.Titulo,
                            ClassificacaoIndicativa = locacao.Filme.ClassificacaoIndicativa,
                            Lancamento = locacao.Filme.Lancamento
                        }
                    });
                }
            }

            return await Task.FromResult(locacoesAtrasadas);
        }
    }
}