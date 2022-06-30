using System.ComponentModel.DataAnnotations;

namespace SistemaLocacao.DTO.Input
{
    public class LocacaoUpdateInput
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public DateTime DataLocacao { get; set; }

        public DateTime? DataDevolucao { get; set; }

        [Required]
        public int ClienteId { get; set; }

        [Required]
        public int FilmeId { get; set; }
    }
}