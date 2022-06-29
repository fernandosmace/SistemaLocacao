using SistemaLocacao.Models;

namespace SistemaLocacao.DTO.Output
{
    public class LocacaoOutput
    {
        public int Id { get; set; }
        public DateTime DataLocacao { get; set; }
        public DateTime DataDevolucao { get; set; }

        public Cliente? Cliente { get; set; }
        public Filme? Filme { get; set; }
    }
}