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


        /// <summary>
        [HttpGet("/api/v1/[controller]/GetLocacoesAtrasadas")]
        public async Task<IActionResult> GetLocacoesAtrasadas()
        {
            var locacoesAtrasadas = await _relatoriosRepository.GetLocacoesAtrasadas();

            return Ok(locacoesAtrasadas);
        }

        /// <summary>
        /// Retorna relatório de todos os filmes que nunca foram alugados
        /// </summary>
        /// <response code="200">Retorna todos os filmes que nunca foram alugados</response>
        /// <response code="500">Erro interno</response>
        [HttpGet("/api/v1/[controller]/GetFilmesNuncaAlugados")]
        public async Task<IActionResult> GetFilmesNuncaAlugados()
        {
            var filmesNuncaAlugados = await _relatoriosRepository.GetFilmesNuncaAlugados();

            return Ok(filmesNuncaAlugados);
        }

        /// <summary>
        /// Retorna relatório dos cinco filmes mais alugados no último ano
        /// </summary>
        /// <response code="200">Retorna os cinco filmes mais alugados no último ano</response>
        /// <response code="500">Erro interno</response>
        [HttpGet("/api/v1/[controller]/GetFilmesMaisAlugadosAno")]
        public async Task<IActionResult> GetFilmesMaisAlugadosAno()
        {
            var filmesMaisAlugados = await _relatoriosRepository.GetFilmesMaisAlugadosAno();

            return Ok(filmesMaisAlugados);
        }

        /// <summary>
        /// Retorna relatório dos três filmes menos alugados na última semana
        /// </summary>
        /// <response code="200">Retorna os três filmes menos alugados na última semana</response>
        /// <response code="500">Erro interno</response>
        [HttpGet("/api/v1/[controller]/GetFilmesMenosAlugadosSemana")]
        public async Task<IActionResult> GetFilmesMenosAlugadosSemana()
        {
            var filmesMenosAlugados = await _relatoriosRepository.GetFilmesMenosAlugadosSemana();

            return Ok(filmesMenosAlugados);
        }

        /// <summary>
        /// Retorna relatório o cliente que mais alugou filmes
        /// </summary>
        /// <response code="200">Retorna o cliente que mais alugou filmes</response>
        /// <response code="500">Erro interno</response>
        [HttpGet("/api/v1/[controller]/GetSegundoMaiorCliente")]
        public async Task<IActionResult> GetSegundoMaiorCliente()
        {
            var segundoMelhorCliente = await _relatoriosRepository.GetSegundoMaiorCliente();

            return Ok(segundoMelhorCliente);
        }
    }
}
