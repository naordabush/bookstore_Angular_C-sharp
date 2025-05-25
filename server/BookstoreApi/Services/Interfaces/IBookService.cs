using BookstoreApi.DataModels;

namespace BookstoreApi.Services.Interfaces
{
    public interface IBookService
    {
        List<Book> GetAllBooks();
        Book GetBookByISBN(string isbn);
        void AddBook(Book book);
        void UpdateBook(string isbn, Book updatedBook);
        void DeleteBook(string isbn);
    }
}
