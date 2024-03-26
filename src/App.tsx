import { useState, useRef } from "react";
import "./App.css";
import { Book, Library } from "./library.ts";
import { books } from "./data.js";

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

function LibraryComponent() {
  const [library, setLibrary] = useState(() => {
    console.log(`LibraryComponent: useState: initializing`);
    let lib = new Library();
    for (const book of books) {
      lib = lib.add(book);
    }
    return lib;
  });

  function onDelete(key: string) {
    return () => {
      setLibrary(library.delete(key));
    };
  }

  // https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <dialog ref={dialog}>
        <p>Hello, world!</p>
        <button onClick={() => dialog.current?.close()}>Close</button>
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

function App() {
  return <LibraryComponent />;
}

export default App;
