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
        /// <response code="200">Retorna o Cliente</response>
        /// <response code="400">Requisição inválida</response>
        /// <response code="404">Cliente não encontrado</response>
        /// <response code="500">Erro interno</response>
        [HttpGet("{idCliente}")]
        public async Task<IActionResult> Get([FromRoute] int idCliente)
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
        /// Busca todos os Clientes
        /// </summary>
        /// <response code="200">Retorna todos os clientes</response>
        /// <response code="500">Erro interno</response>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var clientes = await _clienteRepository.Get();

            return Ok(clientes);
        }

        /// <summary>
        /// Inserir um novo Cliente
        /// </summary>
        /// <param name="clienteInput"></param>
        /// <response code="200">Cliente inserido com sucesso</response>
        /// <response code="202">Cliente já cadastrado</response>
        /// <response code="400">Requisição inválida</response>
        /// <response code="500">Erro interno</response>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ClienteInput clienteInput)
        {
            try
            {
                var cliente = await _clienteRepository.Get(clienteInput.CPF);
                if (cliente != null)
                    return Accepted("Cliente não cadastrado. O CPF informado já está em uso por outro Cliente");

                var clienteCreated = await _clienteRepository.Create(new Cliente
                {
                    Nome = clienteInput.Nome,
                    CPF = clienteInput.CPF,
                    DataNascimento = clienteInput.DataNascimento
                });

                var clienteOutput = new ClienteOutput
                {
                    Id = clienteCreated.Id,
                    Nome = clienteCreated.Nome,
                    CPF = clienteCreated.CPF,
                    DataNascimento = clienteCreated.DataNascimento
                };

                return Ok(clienteOutput);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        /// <summary>
        /// Atualizar um Cliente
        /// </summary>
        /// <param name="clienteInput"></param>
        /// <response code="200">Cliente atualizado com sucesso</response>
        /// <response code="400">Requisição inválida</response>
        /// <response code="404">Cliente não encontrado</response>
        /// <response code="500">Erro interno</response>
        [HttpPatch]
        public async Task<IActionResult> Update([FromBody] ClienteUpdateInput clienteInput)
        {
            try
            {
                var cliente = await _clienteRepository.Get(clienteInput.Id);
                if (cliente == null)
                    return NotFound("Cliente não encontrado");

                cliente.Nome = clienteInput.Nome;
                cliente.CPF = clienteInput.CPF;
                cliente.DataNascimento = clienteInput.DataNascimento;

                _clienteRepository.Update(cliente);

                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        /// <summary>
        /// Excluir um Cliente
        /// </summary>
        /// <param name="idCliente"></param>
        /// <response code="200">Cliente excluído com sucesso</response>
        /// <response code="400">Requisição inválida</response>
        /// <response code="404">Cliente não encontrado</response>
        /// <response code="500">Erro interno</response>
        [HttpDelete("{idCliente}")]
        public async Task<IActionResult> Delete([FromRoute] int idCliente)
        {
            try
            {
                var cliente = await _clienteRepository.Get(idCliente);
                if (cliente == null)
                    return NotFound("Cliente não encontrado");

                _clienteRepository.Delete(cliente);
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