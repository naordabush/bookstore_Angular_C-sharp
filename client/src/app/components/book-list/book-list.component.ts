import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Book, BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;
  authorsInput: string = '';
  isNewBook: boolean = false;
  displayedColumns = ['title', 'authors', 'category', 'year', 'price', 'isbn'];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => console.error('Error loading books:', err),
    });
  }

  selectBook(book: Book): void {
    this.isNewBook = false;
    this.selectedBook = { ...book };
    this.authorsInput = book.authors.join(', ');
  }

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

    this.selectedBook.authors = this.authorsInput
      .split(',')
      .map((a) => a.trim())
      .filter((a) => a);

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
      this.bookService.addBook(this.selectedBook).subscribe({
        next: () => {
          this.loadBooks();
          this.selectedBook = null;
        },
        error: (err) => console.error('Error adding book:', err),
      });
    } else {
      this.bookService
        .updateBook(this.selectedBook.isbn, this.selectedBook)
        .subscribe({
          next: () => {
            this.loadBooks();
            this.selectedBook = null;
          },
          error: (err) => console.error('Error updating book:', err),
        });
    }
  }

  deleteBook(): void {
    if (!this.selectedBook || this.isNewBook) return;

    if (
      confirm(`Are you sure you want to delete "${this.selectedBook.title}"?`)
    ) {
      this.bookService.deleteBook(this.selectedBook.isbn).subscribe({
        next: () => {
          this.loadBooks();
          this.selectedBook = null;
        },
        error: (err) => console.error('Error deleting book:', err),
      });
    }
  }

  cancelEdit(): void {
    this.selectedBook = null;
  }
}
