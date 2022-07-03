using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SistemaLocacao.DTO.Input;
using SistemaLocacao.DTO.Output;
using SistemaLocacao.Models;
using SistemaLocacao.Repositories;

namespace SistemaLocacao.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class RelatoriosController : Controller
    {
        private readonly IRelatoriosRepository _relatoriosRepository;

        public RelatoriosController(IRelatoriosRepository relatoriosRepository)
        {
            _relatoriosRepository = relatoriosRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetLocacoesAtrasadas()
        {
            var locacoesAtrasadas = await _relatoriosRepository.GetLocacoesAtrasadas();
            var locacoesAtrasadasOutput = new List<LocacaoOutput>();

            foreach (var locacao in locacoesAtrasadas)
            {
                locacoesAtrasadasOutput.Add(new LocacaoOutput
                {
                    Id = locacao.Id,
                    DataLocacao = locacao.DataLocacao,
                    DataDevolucao = locacao.DataDevolucao,
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

            return Ok(locacoesAtrasadasOutput);
        }
    }
}
