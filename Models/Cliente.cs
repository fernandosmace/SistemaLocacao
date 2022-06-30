namespace SistemaLocacao.Models
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string CPF { get; set; }
        public DateTime DataNascimento { get; set; }

        public IList<Locacao> Locacoes { get; set; }

        public Cliente()
            => Locacoes = new List<Locacao>();
    }
}