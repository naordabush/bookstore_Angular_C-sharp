    using BookstoreApi.DataModels;
    using BookstoreApi.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;
namespace BookstoreApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetBooks()
        {
            return _bookService.GetAllBooks();
        }

        [HttpGet("{isbn}")]
        public ActionResult<Book> GetBook(string isbn)
        {
            var book = _bookService.GetBookByISBN(isbn);
            if (book == null)
                return NotFound();
            return book;
        }

        [HttpPost]
        public IActionResult AddBook([FromBody] Book book)
        {
            _bookService.AddBook(book);
            return CreatedAtAction(nameof(GetBook), new { isbn = book.ISBN }, book);
        }

        [HttpPut("{isbn}")]
        public IActionResult UpdateBook(string isbn, [FromBody] Book updatedBook)
        {
            var existingBook = _bookService.GetBookByISBN(isbn);
            if (existingBook == null)
                return NotFound();

            _bookService.UpdateBook(isbn, updatedBook);
            return NoContent();
        }

        [HttpDelete("{isbn}")]
        public IActionResult DeleteBook(string isbn)
        {
            var existingBook = _bookService.GetBookByISBN(isbn);
            if (existingBook == null)
                return NotFound();

            _bookService.DeleteBook(isbn);
            return NoContent();
        }
    }


}
