import { useState, useRef } from "react";
import { Book, Library } from "./library.ts";
import { books } from "./data.js";
import "./App.css";

function App() {
  return <LibraryComponent />;
}

function LibraryComponent() {
  const [library, setLibrary] = useState(() => initialLibrary());
  const [key, setKey] = useState("");

  function onDelete(key: string) {
    return (event: React.MouseEvent) => {
      // prevent click from propagating onto book div
      event.stopPropagation();
      setLibrary(library.delete(key));
    };
  }

  function onUpdate(targetKey: string) {
    return () => {
      const book = library.get(targetKey);
      if (book) {
        setKey(targetKey);
        setDialogState(book);
        dialog.current?.showModal();
      } else {
        // should never fail
        console.log(`onUpdate(): error (targetKey=${targetKey})`);
      }
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
    const book = library.get(key);
    if (book) {
      setLibrary(library.update(key, dialogState));
    } else {
      setLibrary(library.add(dialogState));
    }
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

  function showAddBookDialog() {
    resetDialog();
    dialog.current?.showModal();
  }

  function resetDialog() {
    setKey("");
    setDialogState(newBook());
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
          <input
            value={key}
            name="key"
            type="text"
            disabled
            style={{ visibility: "collapse" }}
          />
          <button type="submit">Submit</button>
        </form>
      </dialog>
      <div className="library">
        <h1>My Library</h1>
        <div className="grid">
          {library.map((key, book) => (
            <BookComponent
              key={key}
              {...book}
              onDelete={onDelete(key)}
              onClick={onUpdate(key)}
            />
          ))}
        </div>
        <button type="button" name="add-book" onClick={showAddBookDialog}>
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
  onDelete: React.MouseEventHandler;
  onClick: React.MouseEventHandler;
}

function BookComponent({
  title,
  author,
  pageCount,
  hasBeenRead,
  onDelete,
  onClick,
}: BookComponentProps) {
  return (
    <div className="book" onClick={onClick}>
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
