import { useState, useRef } from "react";
import { Book, Library } from "./library.ts";
import { books } from "./data.js";
import "./App.css";

function App() {
  return <LibraryComponent />;
}

function LibraryComponent() {
  const [library, setLibrary] = useState(() => initialLibrary());

  function onDelete(key: string) {
    return () => {
      setLibrary(library.delete(key));
    };
  }

  // https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom
  const dialog = useRef<HTMLDialogElement>(null);

  function onSubmit() {}

  return (
    <>
      <dialog ref={dialog}>
        <form className="add-book">
          <button
            className="close-modal"
            onClick={() => dialog.current?.close()}
          >
            ×
          </button>
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" />
          <label htmlFor="author">Author:</label>
          <input type="text" name="author" />
          <label htmlFor="pages">Pages: </label>
          <input type="number" name="pages" />
          <div className="labeled-checkbox">
            <label htmlFor="read">Read: </label>
            <input type="checkbox" name="read" />
          </div>
          <button onClick={onSubmit}>Submit</button>
        </form>
      </dialog>
      <div className="library">
        <h1>My Library</h1>
        <div className="grid">
          {library.map((key, book) => (
            <BookComponent key={key} {...book} onDelete={onDelete(key)} />
          ))}
        </div>
        <button
          type="button"
          name="add-book"
          onClick={() => dialog.current?.showModal()}
        >
          Add Book
        </button>
      </div>
    </>
  );
}

function initialLibrary() {
  let lib = new Library();
  for (const book of books) {
    lib = lib.add(book);
  }
  return lib;
}

interface BookComponentProps extends Book {
  onDelete: () => void;
}

function BookComponent({
  title,
  author,
  pageCount,
  hasBeenRead,
  onDelete,
}: BookComponentProps) {
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

export default App;
