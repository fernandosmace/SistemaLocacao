using Microsoft.AspNetCore.Mvc;
using SistemaLocacao.DTO.Input;
using SistemaLocacao.DTO.Output;
using SistemaLocacao.Models;
using SistemaLocacao.Repositories;

namespace SistemaLocacao.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ClienteController : Controller
    {
        private readonly IClienteRepository _clienteRepository;

        public ClienteController(IClienteRepository clienteRepository)
        {
            _clienteRepository = clienteRepository;
        }

        /// <summary>
        /// Busca um cliente através do Id
        /// </summary>
        /// <param name="idCliente"></param>
        /// <response code="200">Retorna o Cliente<response>
        /// <response code="204">Caso o Cliente não seja encontrado<response>
        /// <response code="500">Erro interno<response>
        [HttpGet("{idCliente}")]
        public async Task<IActionResult> Get(int idCliente)
        {
            var cliente = await _clienteRepository.Get(idCliente);

            if (cliente == null)
                return NotFound("Cliente não encontrado");


            var clienteOutput = new ClienteOutput
            {
                Id = cliente.Id,
                Nome = cliente.Nome,
                CPF = cliente.CPF,
                DataNascimento = cliente.DataNascimento
            };

            return Ok(clienteOutput);
        }

        /// <summary>
        /// Busca todos os clietes
        /// </summary>
        /// <response code="200">Retorna todos os clientes<response>
        /// <response code="500">Erro interno<response>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var clientes = await _clienteRepository.Get();

            return Ok(clientes);
        }

        /// <summary>
        /// Inserir um novo Cliente
        /// </summary>
        /// <param name="ClienteInput"></param>
        /// <response code="200">Cliente inserido com sucesso<response>
        /// <response code="202">Cliente já cadastrado<response>
        /// <response code="400">Requisição inválida<response>
        /// <response code="500">Erro interno<response>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ClienteInput clienteInput)
        {
            try
            {
                var clienteExists = await _clienteRepository.Get(clienteInput.CPF);
                if (clienteExists != null)
                    return Accepted("Cliente não cadastrado. O CPF informado já está em uso por outro Cliente");

                var clienteOutput = await _clienteRepository.Create(new Cliente
                {
                    Nome = clienteInput.Nome,
                    CPF = clienteInput.CPF,
                    DataNascimento = clienteInput.DataNascimento
                });

                return Ok(clienteOutput);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}