using BookstoreApi.DataModels;
using BookstoreApi.Repos.Classes;
using BookstoreApi.Repos.Interfaces;
using BookstoreApi.Services.Interfaces;

namespace BookstoreApi.Services.Classes
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _repository;

        public BookService(IBookRepository repository)
        {
            _repository = repository;
        }

        public List<Book> GetAllBooks()
        {
            return _repository.GetAllBooks();
        }

        public Book GetBookByISBN(string isbn)
        {
            return _repository.GetBookByISBN(isbn);
        }

        public void AddBook(Book book)
        {
            _repository.AddBook(book);
        }

        public void UpdateBook(string isbn, Book updatedBook)
        {
            _repository.UpdateBook(isbn, updatedBook);
        }

        public void DeleteBook(string isbn)
        {
            _repository.DeleteBook(isbn);
        }
    }

}
