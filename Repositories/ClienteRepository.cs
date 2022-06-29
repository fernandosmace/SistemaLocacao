using Microsoft.EntityFrameworkCore;
using SistemaLocacao.Data;
using SistemaLocacao.DTO.Input;
using SistemaLocacao.Models;

namespace SistemaLocacao.Repositories
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly SistemaLocacaoDbContext _contexto;

        public ClienteRepository(SistemaLocacaoDbContext contexto)
        {
            _contexto = contexto;
        }

        public async Task<Cliente> Get(int idCliente)
        {
            return await Task.FromResult(await _contexto
                                        .Clientes
                                        .FirstOrDefaultAsync(x => x.Id == idCliente));
        }

        public async Task<Cliente> Get(string CPF)
        {
            return await Task.FromResult(await _contexto
                                        .Clientes
                                        .FirstOrDefaultAsync(x => x.CPF.Equals(CPF)));
        }

        public async Task<List<Cliente>> Get()
        {
            return await Task.FromResult(await _contexto
                                        .Clientes
                                        .AsNoTracking()
                                        .ToListAsync());
        }

        public async Task<Cliente> Create(Cliente cliente)
        {
            await _contexto.Clientes.AddAsync(cliente);
            _contexto.SaveChanges();
            return await Task.FromResult(cliente);
        }

        public Task<Cliente> Update(Cliente cliente)
        {
            throw new NotImplementedException();
        }

        public Task<int> Delete(int idCliente)
        {
            throw new NotImplementedException();
        }
    }
}