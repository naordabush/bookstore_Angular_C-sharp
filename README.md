# Book Management App
This is a simple Angular standalone component project that allows users to manage a list of books.
It supports listing, adding, editing, and deleting books, and uses Angular Material for styling.

## Features
- Display a table of books
- Add a new book
- Edit existing books
- Delete books
- Form validation
- Angular Material UI components
- Responsive and compact layout

## Tech Stack
- Angular
- Angular Material
- RxJS
- ASP.NET Core (C#) backend API

## Installation
1. Clone the repository
2. Install dependencies
 npm install
3. Run the application
 ng serve

 The app will be available at http://localhost:4200/

## Backend Integration
Make sure your ASP.NET Core backend has the following endpoints:
- GET /books
- POST /books
- PUT /books/{isbn}
- DELETE /books/{isbn}


## Testing
To run unit tests:
 ng test
 
## License
This project is licensed under the MIT License.
