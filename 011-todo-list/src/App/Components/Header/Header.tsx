import { useState } from "react";
import { Project } from "@interfaces/Project";
import { ConfirmationModal } from "@components/Modal";
import "./Header.css";

interface HeaderProps {
  project: Project;
  searchText: string;
  onProjectDelete: (id: string) => void;
  onProjectTitleChange: (id: string, title: string) => void;
  onTodoCreate: (projectId: string) => void;
  onSearchTextChange: (text: string) => void;
}

export function Header({
  project,
  searchText,
  onProjectDelete,
  onProjectTitleChange,
  onTodoCreate,
  onSearchTextChange,
}: HeaderProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-row">
          <h1 className="active-project">
            <input
              type="text"
              value={project.title}
              onChange={(event) =>
                onProjectTitleChange(project.id, event.target.value)
              }
            />
          </h1>
          <nav>
            <button onClick={() => onTodoCreate(project.id)}>Add Todo</button>
            <button onClick={() => setShowDeleteConfirmation(true)}>
              Delete
            </button>
          </nav>
        </div>
        <div className="header-row">
          <input
            className="search-bar"
            type="text"
            value={searchText}
            onChange={(event) => onSearchTextChange(event?.target.value)}
            placeholder="Search todos"
          />
        </div>
      </header>
      <ConfirmationModal
        show={showDeleteConfirmation}
        heading="Are you sure?"
        message={`Delete: ${project.title}`}
        onAccept={() => {
          onProjectDelete(project.id);
          setShowDeleteConfirmation(false);
        }}
        onReject={() => setShowDeleteConfirmation(false)}
      />
    </>
  );
}
