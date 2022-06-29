using Microsoft.EntityFrameworkCore;
using SistemaLocacao.Data.Mapping;
using SistemaLocacao.Models;

namespace SistemaLocacao.Data
{
    public class SistemaLocacaoDbContext : DbContext
    {
        public DbSet<Cliente>? Clientes { get; set; }
        public DbSet<Filme>? Filmes { get; set; }
        public DbSet<Locacao>? Locacoes { get; set; }

        public SistemaLocacaoDbContext(DbContextOptions<SistemaLocacaoDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ClienteMap());
            modelBuilder.ApplyConfiguration(new FilmeMap());
            modelBuilder.ApplyConfiguration(new LocacaoMap());

            base.OnModelCreating(modelBuilder);
        }
    }
}