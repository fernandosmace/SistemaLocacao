using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SistemaLocacao.Models;

namespace SistemaLocacao.Data.Mapping
{
    public class LocacaoMap : IEntityTypeConfiguration<Locacao>
    {
        public void Configure(EntityTypeBuilder<Locacao> builder)
        {
            builder.ToTable("Locacoes");
            builder.HasKey(x => x.Id);

            builder.Property(x => x.DataLocacao)
                .IsRequired()
                .HasColumnName("DataLocacao")
                .HasColumnType("DATETIME");

            builder.Property(x => x.DataDevolucao)
                .HasColumnName("DataDevolucao")
                .HasColumnType("DATETIME");


            builder.HasIndex(x => x.Id, "Locacao_PRIMARY");

            builder.HasIndex(x => x.ClienteId, "FK_Cliente_idx")
                .IsUnique();

            builder.HasIndex(x => x.FilmeId, "FK_Filme_idx")
                .IsUnique();
        }
    }
}