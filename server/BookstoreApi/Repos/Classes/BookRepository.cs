using BookstoreApi.DataModels;
using BookstoreApi.Repos.Interfaces;
using System.Xml.Linq;

namespace BookstoreApi.Repos.Classes
{
    public class BookRepository : IBookRepository
    {
        private readonly string _xmlFilePath;

        public BookRepository(string xmlFilePath)
        {
            _xmlFilePath = xmlFilePath;
        }

        public List<Book> GetAllBooks()
        {
            XDocument doc = XDocument.Load(_xmlFilePath);
            return doc.Descendants("book")
                .Select(x => new Book
                {
                    ISBN = x.Element("isbn")?.Value,
                    Category = x.Attribute("category")?.Value,
                    Title = x.Element("title")?.Value,
                    Language = x.Element("title")?.Attribute("lang")?.Value,
                    Authors = x.Elements("author").Select(a => a.Value).ToList(),
                    Year = int.Parse(x.Element("year")?.Value ?? "0"),
                    Price = decimal.Parse(x.Element("price")?.Value ?? "0")
                })
                .ToList();
        }

        public Book GetBookByISBN(string isbn)
        {
            return GetAllBooks().FirstOrDefault(b => b.ISBN == isbn);
        }

        public void AddBook(Book book)
        {
            XDocument doc = XDocument.Load(_xmlFilePath);

            XElement newBook = new XElement("book",
                new XAttribute("category", book.Category),
                new XElement("isbn", book.ISBN),
                new XElement("title",
                    new XAttribute("lang", book.Language),
                    book.Title),
                book.Authors.Select(author => new XElement("author", author)),
                new XElement("year", book.Year),
                new XElement("price", book.Price)
            );
            doc.Root.Add(newBook);
            doc.Save(_xmlFilePath);
        }

        public void UpdateBook(string isbn, Book updatedBook)
        {

            XDocument doc = XDocument.Load(_xmlFilePath);

            XElement bookElement = doc.Descendants("book")
                .FirstOrDefault(x => x.Element("isbn")?.Value == isbn);

            if (bookElement != null)
            {
                bookElement.SetAttributeValue("category", updatedBook.Category);
                bookElement.Element("title")?.SetAttributeValue("lang", updatedBook.Language);
                bookElement.Element("title")?.SetValue(updatedBook.Title);
                bookElement.Elements("author").Remove();
                foreach (var author in updatedBook.Authors)
                {
                    bookElement.Add(new XElement("author", author));
                }
                bookElement.Element("year")?.SetValue(updatedBook.Year);
                bookElement.Element("price")?.SetValue(updatedBook.Price);
                doc.Save(_xmlFilePath);
            }
        }

        public void DeleteBook(string isbn)
        {

            XDocument doc = XDocument.Load(_xmlFilePath);

            XElement bookElement = doc.Descendants("book")
                .FirstOrDefault(x => x.Element("isbn")?.Value == isbn);

            if (bookElement != null)
            {
                bookElement.Remove();
                doc.Save(_xmlFilePath);
            }
        }
    }
}
