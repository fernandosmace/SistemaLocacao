namespace SistemaLocacao.DTO.Output
{
    public class FilmeMaisAlugadosAnoOutput
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public int ClassificacaoIndicativa { get; set; }
        public byte Lancamento { get; set; }
        public int QuantidadeDeLocacoes { get; set; }
    }
}