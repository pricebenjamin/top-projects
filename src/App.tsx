import { useState, useRef } from "react";
import { Book, Library } from "./library.ts";
import { books } from "./data.js";
import "./App.css";

function App() {
  return <LibraryComponent />;
}

function LibraryComponent() {
  const [library, setLibrary] = useState(() => initialLibrary());
  const [dialogState, setDialogState] = useState(newBook());
  const [key, setKey] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);

  function createLibrary() {
    function deleteBook(key: string) {
      return (event: React.MouseEvent) => {
        // prevent click from propagating onto book div
        event.stopPropagation();
        setLibrary(library.delete(key));
      };
    }

    function updateBook(targetKey: string) {
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

    function showAddBookDialog() {
      resetDialog();
      dialog.current?.showModal();
    }

    function resetDialog() {
      setKey("");
      setDialogState(newBook());
    }

    const bookList = library.map((key, book) => (
      <BookComponent
        key={key}
        {...book}
        deleteBook={deleteBook(key)}
        updateBook={updateBook(key)}
      />
    ));

    return (
      <div className="library">
        <h1>My Library</h1>
        <div className="grid">{bookList}</div>
        <button type="button" name="add-book" onClick={showAddBookDialog}>
          Add Book
        </button>
      </div>
    );
  }

  function createDialog() {
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

    function closeModal() {
      dialog.current?.close();
    }

    function createInputFor(name: keyof Book) {
      const displayLabels = {
        title: "Title: ",
        author: "Author: ",
        pageCount: "Pages: ",
        hasBeenRead: "Read: ",
      };

      const inputTypes = {
        title: "text",
        author: "text",
        pageCount: "number",
        hasBeenRead: "checkbox",
      };

      return name === "hasBeenRead" ? (
        <div className="labeled-checkbox">
          {/* keep label inline for checkbox */}
          <label htmlFor={name}>{displayLabels[name]}</label>
          <input
            checked={dialogState[name]}
            name={name}
            onChange={onDialogInputChange}
            type={inputTypes[name]}
          />
        </div>
      ) : (
        <>
          <label htmlFor={name}>{displayLabels[name]}</label>
          <input
            value={dialogState[name]}
            name={name}
            onChange={onDialogInputChange}
            type={inputTypes[name]}
          />
        </>
      );
    }

    function createHiddenInput() {
      return (
        <input
          value={key}
          name="key"
          type="text"
          disabled
          style={{ visibility: "collapse" }}
        />
      );
    }

    return (
      <dialog ref={dialog}>
        <form method="dialog" className="add-book" onSubmit={onSubmit}>
          <button type="button" className="close-modal" onClick={closeModal}>
            ×
          </button>
          {createInputFor("title")}
          {createInputFor("author")}
          {createInputFor("pageCount")}
          {createInputFor("hasBeenRead")}
          {createHiddenInput()}
          <button type="submit">Submit</button>
        </form>
      </dialog>
    );
  }

  return (
    <>
      {createLibrary()}
      {createDialog()}
    </>
  );
}

const newBook = (): Book => {
  return {
    title: "",
    author: "",
    pageCount: 0,
    hasBeenRead: false,
  };
};

function initialLibrary() {
  let lib = new Library();
  for (const book of books) {
    lib = lib.add(book);
  }
  return lib;
}

interface BookComponentProps extends Book {
  deleteBook: React.MouseEventHandler;
  updateBook: React.MouseEventHandler;
}

function BookComponent({
  title,
  author,
  pageCount,
  hasBeenRead,
  deleteBook,
  updateBook,
}: BookComponentProps) {
  return (
    <div className="book" onClick={updateBook}>
      <h2 className="title">{title}</h2>
      <h3 className="author">{author}</h3>
      <p>{`Pages: ${pageCount}`}</p>
      {hasBeenRead && <p>✅ Read</p>}
      <button type="button" name="delete" onClick={deleteBook}>
        Delete
      </button>
    </div>
  );
}

export default App;
