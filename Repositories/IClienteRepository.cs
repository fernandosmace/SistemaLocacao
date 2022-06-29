using SistemaLocacao.DTO.Input;
using SistemaLocacao.Models;

namespace SistemaLocacao.Repositories
{
    public interface IClienteRepository
    {

        public Task<List<Cliente>> Get();
        public Task<Cliente> Get(int idCliente);
        public Task<Cliente> Get(string CPF);
        public Task<Cliente> Create(Cliente cliente);
        public Task<Cliente> Update(Cliente cliente);
        public Task<int> Delete(int idCliente);
    }
}