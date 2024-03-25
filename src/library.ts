export interface Book {
  title: string;
  author: string;
  pageCount: number;
  hasBeenRead: boolean;
}

export class Library {
  collection: Map<string, Book>;

  constructor() {
    this.collection = new Map();
  }

  add(book: Book) {
    const key = crypto.randomUUID();
    this.collection.set(key, { ...book });
    console.log(
      `library.add(): added '${book.title}' to collection (key=${key})`
    );
    return key;
  }

  get(key: string) {
    const book = this.collection.get(key);
    if (book === undefined) {
      console.log(`library.get(): no book found (key=${key})`);
    }
    return book;
  }

  update(key: string, fieldsToUpdate: Partial<Book>) {
    const book = this.collection.get(key);
    if (book === undefined) {
      console.log(`library.update(): no book to update (key=${key})`);
      return;
    }
    this.collection.set(key, { ...book, ...fieldsToUpdate });
  }

  delete(key: string) {
    if (!this.collection.delete(key)) {
      console.log(`library.delete(): no book to delete (key=${key})`);
    } else {
      console.log(`library.delete(): deleted ${key}`);
    }
  }

  toArray() {
    return [...this.collection.entries()].map(([key, book]) => {
      return { key, ...book };
    });
  }
}
