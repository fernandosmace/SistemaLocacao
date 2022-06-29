using SistemaLocacao.DTO.Input;
using SistemaLocacao.Models;

namespace SistemaLocacao.Repositories
{
    public interface IClienteRepository
    {
        public Task<Cliente> Get(int idCliente);
        public Task<List<Cliente>> GetAll();
        public Task<Cliente> Create(ClienteInput clienteInput);
        public Task<Cliente> Update(ClienteInput clienteInput);
        public Task<int> Delete(int idCliente);
    }
}