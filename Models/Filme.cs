namespace SistemaLocacao.Models
{
    public class Filme
    {
        public IList<Locacao> Locacoes { get; set; }
        public int Id { get; set; }
        public string? Titulo { get; set; }
        public int ClassificacaoIndicativa { get; set; }
        public byte Lancamento { get; set; }



        public Filme()
            => Locacoes = new List<Locacao>();
    }
}