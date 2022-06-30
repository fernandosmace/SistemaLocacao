using System.ComponentModel.DataAnnotations;

namespace SistemaLocacao.DTO.Input
{
    public class FilmeUpdateInput
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Titulo { get; set; }

        [Required]
        [MaxLength(2)]
        public int ClassificacaoIndicativa { get; set; }

        [Required]
        [MaxLength(1)]
        public byte Lancamento { get; set; }
    }
}