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

  function closeModal() {
    dialog.current?.close();
  }

  const newBook = () => {
    return {
      title: "",
      author: "",
      pageCount: 0,
      hasBeenRead: false,
    };
  };

  // dialogState keys _must match_ input form name
  const [dialogState, setDialogState] = useState(newBook());

  function onSubmit() {
    setLibrary(library.add(dialogState));
    setDialogState(newBook());
  }

  function onDialogInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const key = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    console.log(`onDialogInputChange(): ${key} => ${value}`);

    setDialogState({
      ...dialogState,
      [key]: value,
    });
  }

  return (
    <>
      <dialog ref={dialog}>
        <form method="dialog" className="add-book" onSubmit={onSubmit}>
          <button type="button" className="close-modal" onClick={closeModal}>
            ×
          </button>
          {/* input names must match dialogState keys */}
          <label htmlFor="title">Title: </label>
          <input
            value={dialogState["title"]}
            name="title"
            onChange={onDialogInputChange}
            type="text"
          />
          <label htmlFor="author">Author:</label>
          <input
            value={dialogState["author"]}
            name="author"
            onChange={onDialogInputChange}
            type="text"
          />
          <label htmlFor="pageCount">Pages: </label>
          <input
            value={dialogState["pageCount"]}
            name="pageCount"
            onChange={onDialogInputChange}
            type="number"
          />
          <div className="labeled-checkbox">
            <label htmlFor="hasBeenRead">Read: </label>
            <input
              checked={dialogState["hasBeenRead"]}
              name="hasBeenRead"
              onChange={onDialogInputChange}
              type="checkbox"
            />
          </div>
          <button type="submit">Submit</button>
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
