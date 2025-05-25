import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  isbn: string;
  category: string;
  title: string;
  language: string;
  authors: string[];
  year: number;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://localhost:7222/api/books';

  constructor(private http: HttpClient) {}

  // GET all
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // GET by ISBN
  getBook(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${isbn}`);
  }

  // POST
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  // PUT
  updateBook(isbn: string, book: Book): Observable<any> {
    return this.http.put(`${this.apiUrl}/${isbn}`, book);
  }

  // DELETE
  deleteBook(isbn: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${isbn}`);
  }
}
