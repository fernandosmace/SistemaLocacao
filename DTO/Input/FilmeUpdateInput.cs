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
        public int ClassificacaoIndicativa { get; set; }

        [Required]
        public byte Lancamento { get; set; }
    }
}