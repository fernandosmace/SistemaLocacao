using System.ComponentModel.DataAnnotations;

namespace SistemaLocacao.DTO.Input
{
    public class ClienteInput
    {
        [Required]
        public string Nome { get; set; }
        [Required]
        public string CPF { get; set; }
        [Required]
        public DateTime DataNascimento { get; set; }
    }
}