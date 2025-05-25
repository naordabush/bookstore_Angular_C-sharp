namespace BookstoreApi.DataModels
{
    public class Book
    {
        public string ISBN { get; set; }
        public string Category { get; set; }
        public string Title { get; set; }
        public string Language { get; set; }
        public List<string> Authors { get; set; } = new List<string>();
        public int Year { get; set; }
        public decimal Price { get; set; }
    }

}
