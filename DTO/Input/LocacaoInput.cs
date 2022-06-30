using System.ComponentModel.DataAnnotations;

namespace SistemaLocacao.DTO.Input
{
    public class LocacaoInput
    {
        [Required]
        public int ClienteId { get; set; }
        [Required]
        public int FilmeId { get; set; }
    }
}