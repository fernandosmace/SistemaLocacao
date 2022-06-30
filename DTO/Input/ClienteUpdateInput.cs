using System.ComponentModel.DataAnnotations;

namespace SistemaLocacao.DTO.Input
{
    public class ClienteUpdateInput
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string CPF { get; set; }
        [Required]
        public DateTime DataNascimento { get; set; }
    }
}