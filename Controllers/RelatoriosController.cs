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
        /// Retorna relatório de todos as locações que constam com atraso na devolução
        /// </summary>
        /// <response code="200">Retorna todos as locações atrasadas</response>
        /// <response code="500">Erro interno</response>
        [HttpGet]
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
        [HttpGet]
        public async Task<IActionResult> GetFilmesNuncaAlugados()
        {
            var filmesNuncaAlugados = await _relatoriosRepository.GetFilmesNuncaAlugados();

            return Ok(filmesNuncaAlugados);
        }
    }
}
