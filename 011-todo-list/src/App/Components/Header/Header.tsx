import { useState } from "react";
import { Project } from "@components/Project";
import { ConfirmationModal } from "@components/Modal";
import "./Header.css";

interface HeaderProps {
  project: Project;
  onProjectDelete: (id: string) => void;
  onProjectTitleChange: (id: string, title: string) => void;
  onTodoCreate: (id: string) => void;
}

export function Header({
  project,
  onProjectDelete,
  onProjectTitleChange,
  onTodoCreate,
}: HeaderProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <header className="header">
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
