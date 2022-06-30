using SistemaLocacao.DTO.Input;
using SistemaLocacao.DTO.Output;
using Microsoft.AspNetCore.Mvc;
using SistemaLocacao.Repositories;

namespace SistemaLocacao.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class FilmeController : Controller
    {
        private readonly IFilmeRepository _filmeRepository;

        public FilmeController(IFilmeRepository filmeRepository)
        {
            _filmeRepository = filmeRepository;
        }

        /// <summary>
        /// Busca um Filme através do Id
        /// </summary>
        /// <param name="idFilme"></param>
        /// <response code="200">Retorna o Filme</response>
        /// <response code="400">Requisição inválida</response>
        /// <response code="404">Filme não encontrado</response>
        /// <response code="500">Erro interno</response>
        [HttpGet("{idFilme}")]
        public async Task<IActionResult> Get([FromRoute] int idFilme)
        {
            var filme = await _filmeRepository.Get(idFilme);

            if (filme == null)
                return NotFound("Filme não encontrado");

            var filmeOutput = new FilmeOutput
            {
                Id = filme.Id,
                Titulo = filme.Titulo,
                ClassificacaoIndicativa = filme.ClassificacaoIndicativa,
                Lancamento = filme.Lancamento
            };

            return Ok(filme);
        }
    }
}