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

        /// <summary>
        /// Inserir um novo Filme
        /// </summary>
        /// <param name="filmeInput"></param>
        /// <response code="200">Filme inserido com sucesso</response>
        /// <response code="202">Filme já cadastrado</response>
        /// <response code="400">Requisição inválida</response>
        /// <response code="500">Erro interno</response>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] FilmeInput filmeInput)
        {
            try
            {
                var filmeCreated = await _filmeRepository.Create(new Models.Filme
                {
                    Titulo = filmeInput.Titulo,
                    ClassificacaoIndicativa = filmeInput.ClassificacaoIndicativa,
                    Lancamento = filmeInput.Lancamento
                });

                var filmeOutput = new FilmeOutput
                {
                    Id = filmeCreated.Id,
                    Titulo = filmeCreated.Titulo,
                    ClassificacaoIndicativa = filmeCreated.ClassificacaoIndicativa,
                    Lancamento = filmeCreated.Lancamento
                };

                return Ok(filmeOutput);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        /// <summary>
        /// Atualizar um Filme
        /// </summary>
        /// <param name="filmeInput"></param>
        /// <response code="200">Filme atualizado com sucesso</response>
        /// <response code="400">Requisição inválida</response>
        /// <response code="404">Filme não encontrado</response>
        /// <response code="500">Erro interno</response>
        [HttpPatch]
        public async Task<IActionResult> Update([FromBody] FilmeUpdateInput filmeInput)
        {
            try
            {
                var filme = await _filmeRepository.Get(filmeInput.Id);
                if (filme == null)
                    return NotFound("Filme não encontrado");

                filme.Titulo = filmeInput.Titulo;
                filme.ClassificacaoIndicativa = filmeInput.ClassificacaoIndicativa;
                filme.Lancamento = filmeInput.Lancamento;

                _filmeRepository.Update(filme);

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