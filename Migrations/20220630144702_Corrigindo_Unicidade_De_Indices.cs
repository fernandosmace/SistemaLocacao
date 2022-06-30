using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaLocacao.Migrations
{
    public partial class Corrigindo_Unicidade_De_Indices : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Filme_PRIMARY",
                table: "Filmes");

            migrationBuilder.DropIndex(
                name: "idx_Lancamento",
                table: "Filmes");

            migrationBuilder.DropIndex(
                name: "idx_Titulo",
                table: "Filmes");

            migrationBuilder.DropIndex(
                name: "Cliente_PRIMARY",
                table: "Clientes");

            migrationBuilder.DropIndex(
                name: "idx_NOME",
                table: "Clientes");

            migrationBuilder.CreateIndex(
                name: "Filme_PRIMARY",
                table: "Filmes",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "idx_Lancamento",
                table: "Filmes",
                column: "Lancamento");

            migrationBuilder.CreateIndex(
                name: "idx_Titulo",
                table: "Filmes",
                column: "Titulo");

            migrationBuilder.CreateIndex(
                name: "Cliente_PRIMARY",
                table: "Clientes",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "idx_NOME",
                table: "Clientes",
                column: "Nome");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Filme_PRIMARY",
                table: "Filmes");

            migrationBuilder.DropIndex(
                name: "idx_Lancamento",
                table: "Filmes");

            migrationBuilder.DropIndex(
                name: "idx_Titulo",
                table: "Filmes");

            migrationBuilder.DropIndex(
                name: "Cliente_PRIMARY",
                table: "Clientes");

            migrationBuilder.DropIndex(
                name: "idx_NOME",
                table: "Clientes");

            migrationBuilder.CreateIndex(
                name: "Filme_PRIMARY",
                table: "Filmes",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "idx_Lancamento",
                table: "Filmes",
                column: "Lancamento",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "idx_Titulo",
                table: "Filmes",
                column: "Titulo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "Cliente_PRIMARY",
                table: "Clientes",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "idx_NOME",
                table: "Clientes",
                column: "Nome",
                unique: true);
        }
    }
}
