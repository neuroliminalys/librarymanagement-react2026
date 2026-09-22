import { beforeEach, describe, expect, it } from "vitest";

import type { Book } from "./book";
import { BookService } from "./book-service";

// pas besoin d'incrémenter les ids : chaque test possède une liste vide par défaut
// donc en créant un nouveau livre avec le même id que le dernier test, il n'y a pas de duplicata
describe("BookService", () => {
  let service: BookService;

  beforeEach(() => {
    service = new BookService();
  });

  it("should add a book correctly", () => {
    const book: Book = {
      id: 10,
      title: "Test Book",
      author: "Author",
      availableCopies: 1,
      totalCopies: 1,
    };

    const result = service.addBook(book);

    expect(result).toBe(true);
  });

  // Test : L'ajout d'un livre sans titre ne doit pas fonctionner
  it("should not add a book without a title", () => {
    const book = {
      id: 10,
      author: "Someone",
      availableCopies: 5,
      totalCopies: 10,
    };

    const result = service.addBook(book);

    expect(result).toBe(false);
  });

  // Test : L'ajout d'un livre ayant totalCopies à 0 ou négatif ne doit pas fonctionner
  it("should not add a book with a totalcopies < 1", () => {
    const book: Book = {
      id: 10,
      title: "Test Book",
      author: "Author",
      availableCopies: 1,
      totalCopies: 0,
    };

    const result = service.addBook(book);

    expect(result).toBe(false);
  });

  // Test : Emprunter un livre doit décrémenter availableCopies
  it("should decrement availableCopies when borrowing a book", () => {
    const book: Book = {
      id: 10,
      title: "Test Borrwing Books 1",
      author: "Author",
      availableCopies: 1,
      totalCopies: 5,
    };

    service.addBook(book);
    service.borrowBook(13);
    const result: Book | undefined = service.getBookById(10);

    expect(result?.availableCopies).toBe(book.availableCopies--);
  });

  // Test : Ne pas emprunter un livre dont availableCopies est égal à 0
  it("should not borrow a book when availableCopies <= 0", () => {
    const book: Book = {
      id: 10,
      title: "Test Borrwing Books 2",
      author: "Author",
      availableCopies: 0,
      totalCopies: 5,
    };

    service.addBook(book);
    const result = service.borrowBook(10);

    expect(result).toBe(false);
  });

  // Test : Ne pas emprunter un livre qui n'existe pas
  it("should not borrow a book that does not exist <= 0", () => {
    const book: Book = {
      id: 10,
      title: "Test Borrwing Books 3",
      author: "Author",
      availableCopies: 0,
      totalCopies: 5,
    };

    service.addBook(book);
    const result = service.borrowBook(10);

    expect(result).toBe(false);
  });

  // Test : Retourner un livre doit incrémenter availableCopies
  it("returning a book should increment availableCopies", () => {
    const book: Book = {
      id: 10,
      title: "Test Returning Books 1",
      author: "Author",
      availableCopies: 1,
      totalCopies: 5,
    };

    service.addBook(book);
    const response = service.returnBook(10);
    const result: Book | undefined = service.getBookById(10);

    expect(response).toBe(true);
    expect(result?.availableCopies).toBe(book.availableCopies++);
  });

  // Test : Ne pas retourner un livre qui n'existe pas
  it("should not return a book that does not exist", () => {
    const book: Book = {
      id: 10,
      title: "Test Borrwing Books 2",
      author: "Author",
      availableCopies: 1,
      totalCopies: 5,
    };

    service.addBook(book);
    const result = service.returnBook(42);

    expect(result).toBe(false);
  });

  // Test : Ne pas retourner un livre dont toutes les copies ont déjà été rendues
  it("returning a book should increment availableCopies", () => {
    const book: Book = {
      id: 10,
      title: "Test Returning Books 3",
      author: "Author",
      availableCopies: 1,
      totalCopies: 5,
    };

    service.addBook(book);
    const response = service.returnBook(10);
    const searched: Book | undefined = service.getBookById(10);

    expect(response).toBe(true);
    expect(searched?.availableCopies).toBe(book.availableCopies++);
  });

  // Ajoute des tests de ton choix pour les autres méthodes

  // On le teste ici pour etre juste en dessous de la consigne, sinon il faudrait le tester plus haut
  it("should not get a non existing book by id", () => {
    const searched: Book | undefined = service.getBookById(10);
    console.log(searched);

    expect(searched).toBeUndefined();
  });

  it("should get an existing book by its id", () => {
    const book: Book = {
      id: 10,
      title: "Test Getting Books 2",
      author: "Author",
      availableCopies: 1,
      totalCopies: 5,
    };

    service.addBook(book);
    const searched: Book | undefined = service.getBookById(10);
    console.log(searched);

    expect(searched).toBe(book);
  });

  it("should not delete a non existing book", () => {
    const resp = service.deleteBook(42);
    const searched: Book | undefined = service.getBookById(42);

    expect(resp).toBe(false);
    expect(searched).toBeUndefined();
  });

  it("should delete a non existing book", () => {
    const book: Book = {
      id: 10,
      title: "Test Delete Books 2",
      author: "Author",
      availableCopies: 1,
      totalCopies: 5,
    };

    service.addBook(book);
    const resp = service.deleteBook(book.id);
    const searched: Book | undefined = service.getBookById(10);

    expect(resp).toBe(true);
    expect(searched).toBeUndefined();
  });

  it("should update the title of the specified book", () => {
    const book: Book = {
      id: 10,
      title: "Test update Books",
      author: "Author",
      availableCopies: 1,
      totalCopies: 5,
    };

    service.addBook(book);
    book.title = "Test Update Books"
    const updated = service.updateBook(book)

    expect(updated).toBe(true)

    const searched: Book | undefined = service.getBookById(10);

    expect(searched).not.toBeUndefined();
    expect(searched?.title).toBe("Test Update Books");
  })
});
