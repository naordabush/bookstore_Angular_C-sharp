import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { BookListComponent } from './components/book-list/book-list.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, BookListComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
