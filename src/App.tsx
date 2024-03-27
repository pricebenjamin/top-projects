import { useState, useRef } from "react";
import { Book, Library } from "./library.ts";
import { books } from "./data.js";
import "./App.css";
import trashIcon from "./icons/trash-can-outline.svg";
import editIcon from "./icons/text-box-edit-outline.svg";

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

    function updateDialogInputs(event: React.ChangeEvent<HTMLInputElement>) {
      const key = event.target.name;
      const value =
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;

      console.log(`updateDialogInputs(): ${key} => ${value}`);

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
            id={name}
            onChange={updateDialogInputs}
            type={inputTypes[name]}
          />
        </div>
      ) : (
        <>
          <label htmlFor={name}>{displayLabels[name]}</label>
          <input
            value={dialogState[name]}
            name={name}
            id={name}
            onChange={updateDialogInputs}
            type={inputTypes[name]}
          />
        </>
      );
    }

    function embedKey() {
      return (
        <input value={key} type="text" disabled style={{ display: "none" }} />
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
          {embedKey()}
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
    <div className="book">
      <h2 className="title">{title}</h2>
      <h3 className="author">{author}</h3>
      <p>{`Pages: ${pageCount}`}</p>
      {hasBeenRead && <p>✅ Read</p>}
      <div className="actions">
        <button type="button" className="icon" onClick={updateBook}>
          <img src={editIcon} alt="Edit Details" title="Edit Details" />
        </button>
        <button type="button" className="icon" onClick={deleteBook}>
          <img src={trashIcon} alt="Remove" title="Remove" />
        </button>
      </div>
    </div>
  );
}
