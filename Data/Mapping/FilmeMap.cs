using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SistemaLocacao.Models;

namespace SistemaLocacao.Data.Mapping
{
    public class FilmeMap : IEntityTypeConfiguration<Filme>
    {
        public void Configure(EntityTypeBuilder<Filme> builder)
        {
            builder.ToTable("Filmes");
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd()
                .UseMySqlIdentityColumn();

            builder.Property(x => x.Titulo)
                .IsRequired()
                .HasColumnName("Titulo")
                .HasColumnType("VARCHAR")
                .HasMaxLength(100);

            builder.Property(x => x.ClassificacaoIndicativa)
                .IsRequired()
                .HasColumnName("ClassificacaoIndicativa")
                .HasColumnType("INT");

            builder.Property(x => x.Lancamento)
                .IsRequired()
                .HasColumnName("Lancamento")
                .HasColumnType("TINYINT");

            builder.HasIndex(x => x.Id, "Filme_PRIMARY")
                .IsUnique();

            builder.HasIndex(x => x.Lancamento, "idx_Lancamento");

            builder.HasIndex(x => x.Titulo, "idx_Titulo");
        }
    }
}