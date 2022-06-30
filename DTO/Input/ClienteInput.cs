using System.ComponentModel.DataAnnotations;

namespace SistemaLocacao.DTO.Input
{
    public class ClienteInput
    {
        [Required]
        [MaxLength(200)]
        public string Nome { get; set; }

        [Required]
        [MaxLength(11, ErrorMessage = "CPF deve conter no mmáximo 11 caracteres.")]
        public string CPF { get; set; }

        [Required]
        public DateTime DataNascimento { get; set; }
    }
}