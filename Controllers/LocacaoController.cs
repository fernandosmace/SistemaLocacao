using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SistemaLocacao.DTO.Output;
using SistemaLocacao.Repositories;

namespace SistemaLocacao.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LocacaoController : Controller
    {
        private readonly ILocacaoRepository _locacaoRepository;

        public LocacaoController(ILocacaoRepository locacaoRepository)
        {
            _locacaoRepository = locacaoRepository;
        }

        /// <summary>
        /// Busca uma Locação através do Id
        /// </summary>
        /// <param name="idLocacao"></param>
        /// <response code="200">Retorna o Locação</response>
        /// <response code="400">Requisição inválida</response>
        /// <response code="404">Locação não encontrado</response>
        /// <response code="500">Erro interno</response>
        [HttpGet("{idLocacao}")]
        public async Task<IActionResult> Get([FromRoute] int idLocacao)
        {
            var locacao = await _locacaoRepository.Get(idLocacao);

            if (locacao == null)
                return NotFound("Locação não encontrado");


            var locacaoOutput = new LocacaoOutput
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
            };

            return Ok(locacaoOutput);
        }

        /// <summary>
        /// Busca todos os Locacao
        /// </summary>
        /// <response code="200">Retorna todos os Locacao</response>
        /// <response code="500">Erro interno</response>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var locacaoes = await _locacaoRepository.Get();

            var locacoesOutput = new List<LocacaoOutput>();

            foreach (var locacao in locacaoes)
            {
                locacoesOutput.Add(new LocacaoOutput
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

            return Ok(locacoesOutput);
        }

        /// <summary>
        /// Excluir uma Locação
        /// </summary>
        /// <param name="idLocacao"></param>
        /// <response code="200">Locação excluída com sucesso</response>
        /// <response code="400">Requisição inválida</response>
        /// <response code="404">Locação não encontrada</response>
        /// <response code="500">Erro interno</response>
        [HttpDelete("{idLocacao}")]
        public async Task<IActionResult> Delete([FromRoute] int idLocacao)
        {
            try
            {
                var locacao = await _locacaoRepository.Get(idLocacao);
                if (locacao == null)
                    return NotFound("Locação não encontrado");

                _locacaoRepository.Delete(locacao);
                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}