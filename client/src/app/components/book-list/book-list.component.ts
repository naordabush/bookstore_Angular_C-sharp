import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book, BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;

  authorsInput: string = '';
  isNewBook: boolean = false;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        console.log(data);
        this.books = data;
      },
      error: (err) => console.error(err),
    });
  }

  selectBook(book: Book): void {
    this.isNewBook = false;
    // make a copy
    this.selectedBook = { ...book };
    // array => string
    this.authorsInput = book.authors.join(', ');
  }

  // empty field for new book
  addNewBook(): void {
    this.isNewBook = true;
    this.selectedBook = {
      isbn: '',
      title: '',
      category: '',
      language: '',
      authors: [],
      year: 0,
      price: 0,
    };
    this.authorsInput = '';
  }

  updateBook(): void {
    if (!this.selectedBook) return;

    // string -> array
    this.selectedBook.authors = this.authorsInput
      .split(',')
      .map((a) => a.trim())
      .filter((a) => a);

    // fieldd Validation ++ alert
    if (
      !this.selectedBook.isbn ||
      !this.selectedBook.title ||
      !this.selectedBook.category ||
      !this.selectedBook.language ||
      this.selectedBook.authors.length === 0 ||
      !this.selectedBook.year ||
      !this.selectedBook.price
    ) {
      alert('All fields are mandatory.');
      return;
    }

    if (this.isNewBook) {
      // Add
      this.bookService.addBook(this.selectedBook).subscribe({
        next: () => {
          this.loadBooks();
          this.selectedBook = null;
        },
        error: (err) => console.error(err),
      });
    } else {
      // Update
      this.bookService
        .updateBook(this.selectedBook.isbn, this.selectedBook)
        .subscribe({
          next: () => {
            this.loadBooks();
            this.selectedBook = null;
          },
          error: (err) => console.error(err),
        });
    }
  }

  deleteBook(): void {
    if (!this.selectedBook) return;

    // Confirm delete -aletr
    if (
      confirm(`Are you sure you want to delete "${this.selectedBook.title}"?`)
    ) {
      this.bookService.deleteBook(this.selectedBook.isbn).subscribe({
        next: () => {
          this.loadBooks();
          this.selectedBook = null;
        },
        error: (err) => console.error(err),
      });
    }
  }

  cancelEdit(): void {
    this.selectedBook = null;
  }
}
