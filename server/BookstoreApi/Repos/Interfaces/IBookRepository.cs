using BookstoreApi.DataModels;

namespace BookstoreApi.Repos.Interfaces
{
    public interface IBookRepository
    {
        List<Book> GetAllBooks();
        Book GetBookByISBN(string isbn);
        void AddBook(Book book);
        void UpdateBook(string isbn, Book updatedBook);
        void DeleteBook(string isbn);
    }
}
