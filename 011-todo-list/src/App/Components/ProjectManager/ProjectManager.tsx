import { useState } from "react";
import { ActiveTodo } from "@components/ActiveTodo";
import { Project } from "@components/Project";
import { Todo } from "@components/Todo";
import { TodoList } from "@components/TodoList";
import "./ProjectManager.css";

interface ProjectManagerProps {
  project: Project;
  onProjectDelete: (project: Project) => void;
}

export function ProjectManager({
  project,
  onProjectDelete,
}: ProjectManagerProps) {
  const [activeTodo, setActiveTodo] = useState<Todo>();

  return (
    <div className="project-manager">
      <div className="project-info">
        <h2>{project.title}</h2>
        <div className="actions">
          <button onClick={() => onProjectDelete(project)}>Delete</button>
        </div>
      </div>
      <TodoList
        todos={project.todos}
        activeTodo={activeTodo}
        onTodoSelect={(todo: Todo) => setActiveTodo(todo)}
      />
      {activeTodo && <ActiveTodo todo={activeTodo} />}
    </div>
  );
}
