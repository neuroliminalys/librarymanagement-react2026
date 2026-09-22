import type { Book } from "./book";

export class BookService {
  private books: Book[] = [
    {
      id: 1,
      title: "1984",
      author: "George Orwell",
      availableCopies: 5,
      totalCopies: 5,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      availableCopies: 3,
      totalCopies: 3,
    },
    {
      id: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      availableCopies: 0,
      totalCopies: 2,
    },
  ];

  getBooks(): Book[] {
    return this.books;
  }

  getBookById(id: number): Book | undefined {
    const found = this.books.find((book) => book.id === id);
    if (found) {
      return found;
    }
  }

  addBook(book: Book): boolean {
    if (book && book.title && book.totalCopies > 0) {
      this.books.push(book);
      return true;
    }
    return false;
  }

  borrowBook(id: number): boolean {
    const book = this.books.find((book) => book.id === id);
    if (book && book.availableCopies > 0) {
      book.availableCopies--;
      return true;
    }
    return false;
  }

  returnBook(id: number): boolean {
    const book = this.books.find((book) => book.id === id);
    if (book) {
      book.availableCopies++;
      return true;
    }
    return false;
  }

  deleteBook(id: number): boolean {
    if (id && this.getBookById(id)) {
      this.books = this.books.filter((book) => book.id !== id);
      return true;
    }
    return false;
  }

  updateBook(updatedBook: Book): boolean {
    if (updatedBook) {
      const index = this.books.findIndex((book) => book.id === updatedBook.id);
      this.books[index] = updatedBook;
      return true;
    }
    return false;
  }
}

export const bookService = new BookService();
