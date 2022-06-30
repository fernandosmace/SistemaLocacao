using System.ComponentModel.DataAnnotations;

namespace SistemaLocacao.DTO.Input
{
    public class FilmeInput
    {
        [Required]
        public string Titulo { get; set; }
        [Required]
        public int ClassificacaoIndicativa { get; set; }
        [Required]
        public byte Lancamento { get; set; }
    }
}