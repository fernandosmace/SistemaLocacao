namespace SistemaLocacao.DTO.Output
{
    public class ClienteLocadorOutput
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string CPF { get; set; }
        public DateTime DataNascimento { get; set; }
        public int QuantidadeDeLocacoes { get; set; }
    }
}