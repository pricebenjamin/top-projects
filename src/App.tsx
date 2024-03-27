import { useState, useRef } from "react";
import { Book, Library } from "./library.ts";
import { books } from "./data.js";
import "./App.css";

export default function LibraryComponent() {
  const [library, setLibrary] = useState(() => initialLibrary());
  const [dialogState, setDialogState] = useState(emptyBook());
  const [key, setKey] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);

  function createLibrary() {
    function deleteBook(key: string) {
      return () => {
        setLibrary(library.delete(key));
      };
    }

    function updateBook(key: string) {
      return () => {
        const book = library.get(key);
        if (book) {
          setKey(key);
          setDialogState(book);
          dialog.current?.showModal();
        } else {
          console.log(
            `error: unable to update book: failed to find book by key=${key}`
          );
        }
      };
    }

    function showAddBookDialog() {
      resetDialog();
      dialog.current?.showModal();
    }

    function resetDialog() {
      setKey("");
      setDialogState(emptyBook());
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
    function submit() {
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

    function closeDialog() {
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
        {/* method="dialog" closes the dialog on form submission */}
        <form method="dialog" className="add-book" onSubmit={submit}>
          <button type="button" className="close-dialog" onClick={closeDialog}>
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

function emptyBook(): Book {
  return {
    title: "",
    author: "",
    pageCount: 0,
    hasBeenRead: false,
  };
}

function initialLibrary() {
  let lib = new Library();
  for (const book of books) {
    lib = lib.add(book);
  }
  return lib;
}

interface BookComponentProps extends Book {
  deleteBook: () => void;
  updateBook: () => void;
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
      {/* since the parent div also has an onClick handler, we need to
          stop propagation if the delete button is pressed */}
      <button type="button" name="delete" onClick={doNotPropagate(deleteBook)}>
        Delete
      </button>
    </div>
  );
}

function doNotPropagate(wrappedFn: () => void): React.MouseEventHandler {
  function callback(event: React.MouseEvent) {
    event.stopPropagation();
    wrappedFn();
  }
  return callback;
}
