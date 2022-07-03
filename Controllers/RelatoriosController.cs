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

            return Ok(locacoesAtrasadas);
        }
    }
}
