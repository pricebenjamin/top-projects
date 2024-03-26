export interface Book {
  title: string;
  author: string;
  pageCount: number;
  hasBeenRead: boolean;
}

export class Library {
  #collection: Map<string, Book>;

  constructor() {
    this.#collection = new Map();
  }

  add(book: Book) {
    const copy = Library.copy(this);
    const key = crypto.randomUUID();
    copy.#collection.set(key, { ...book });
    console.log(
      `library.add(): added '${book.title}' to collection (key=${key})`
    );
    return copy;
  }

  get(key: string) {
    const book = this.#collection.get(key);
    if (book === undefined) {
      console.log(`library.get(): no book found (key=${key})`);
    }
    return book;
  }

  update(key: string, fieldsToUpdate: Partial<Book>) {
    const copy = Library.copy(this);
    const book = copy.#collection.get(key);
    if (book === undefined) {
      console.log(`library.update(): no book to update (key=${key})`);
    } else {
      console.log(`library.update():`);
      copy.#collection.set(key, { ...book, ...fieldsToUpdate });
    }
    return copy;
  }

  delete(key: string) {
    const copy = Library.copy(this);
    if (copy.#collection.delete(key)) {
      console.log(`library.delete(): deleted ${key}`);
    } else {
      console.log(`library.delete(): no book to delete (key=${key})`);
    }
    return copy;
  }

  map<T>(fn: (key: string, book: Book) => T) {
    return [...this.#collection.entries()].map(([key, book]) =>
      fn(key, { ...book })
    );
  }

  static copy(otherLibrary: Library) {
    const lib = new Library();
    for (const [key, book] of otherLibrary.#collection.entries()) {
      lib.#collection.set(key, { ...book });
    }
    return lib;
  }
}
