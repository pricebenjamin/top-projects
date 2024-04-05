import { useState } from "react";
import { Header } from "@components/Header";
import { ProjectNavigator } from "@components/ProjectNavigator";
import { TodoList } from "@components/TodoList";
import { createNewProject } from "@components/Project";
import { Todo, createNewTodo } from "@components/Todo";
import init from "./initialAppData";
import "./App.css";

function App() {
  const [activeProjectId, setActiveProjectId] = useState(init.activeProjectId);
  const [projects, setProjects] = useState(init.projects);
  const [todos, setTodos] = useState(init.todos);

  const activeProject = projects.find((p) => p.id === activeProjectId);
  const activeTodos = todos.filter(
    (todo) => todo.projectId === activeProjectId
  );

  function updateTodo(id: string, changes: Partial<Todo>) {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, ...changes } : todo;
      })
    );
  }

  return (
    <>
      <ProjectNavigator
        activeProjectId={activeProjectId}
        projects={projects}
        onProjectSelect={setActiveProjectId}
        onCreateProject={() => setProjects([...projects, createNewProject()])}
      />
      <div className="flex-column">
        {activeProject && (
          <Header
            project={activeProject}
            onProjectDelete={(id: string) => {
              setTodos(todos.filter((todo) => todo.projectId !== id));
              setProjects(projects.filter((project) => project.id !== id));
            }}
            onTodoCreate={(id: string) => {
              setTodos([...todos, createNewTodo(id)]);
            }}
          />
        )}{" "}
        <TodoList todos={activeTodos} onTodoEdit={updateTodo} />
      </div>
    </>
  );
}

export default App;
