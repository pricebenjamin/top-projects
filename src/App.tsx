import { useState } from "react";
import "./App.css";
import { Book, Library } from "./library.ts";
import { books } from "./data.js";

const library = new Library();

for (const book of books) {
  library.add(book);
}

interface BookProps extends Book {
  onDelete: () => void;
}

function BookComponent({
  title,
  author,
  pageCount,
  hasBeenRead,
  onDelete,
}: BookProps) {
  return (
    <div className="book">
      <h2 className="title">{title}</h2>
      <h3 className="author">{author}</h3>
      <p>{`Pages: ${pageCount}`}</p>
      {hasBeenRead && <p>✅ Read</p>}
      <button type="button" name="delete" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}

function LibraryComponent() {
  const [keys, setKeys] = useState([...library.collection.keys()]);

  const books = keys.map((key) => {
    const book = library.get(key);
    if (book) {
      return <BookComponent key={key} {...book} onDelete={onDelete(key)} />;
    }
  });

  function onDelete(key: string) {
    return () => {
      library.delete(key);
      setKeys(keys.filter((k) => k !== key));
    };
  }

  function addBook() {
    const book: Book = {
      title: "Title",
      author: "Author",
      pageCount: 0,
      hasBeenRead: false,
    };
    const key = library.add(book);
    setKeys([...keys, key]);
  }

  return (
    <div className="library">
      <h1>My Library</h1>
      <div className="grid">{books}</div>
      <button type="button" name="add-book" onClick={addBook}>
        Add Book
      </button>
    </div>
  );
}

function App() {
  return <LibraryComponent />;
}

export default App;
