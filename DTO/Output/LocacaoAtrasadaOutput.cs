using SistemaLocacao.Models;

namespace SistemaLocacao.DTO.Output
{
    public class LocacaoAtrasadaOutput
    {
        public int Id { get; set; }
        public DateTime DataLocacao { get; set; }
        public int DiasDeAtraso { get; set; }

        public ClienteOutput Cliente { get; set; }
        public FilmeOutput Filme { get; set; }
    }
}