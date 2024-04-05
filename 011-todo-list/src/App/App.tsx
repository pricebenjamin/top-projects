import { useState } from "react";
import { Header } from "@components/Header";
import { ProjectNavigator } from "@components/ProjectNavigator";
import { TodoList } from "@components/TodoList";
import { createNewProject } from "@components/Project";
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

  function updateTodoStatus(id: string) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, finished: !todo.finished };
        }
        return todo;
      })
    );
  }

  return (
    <>
      <Header title="Todo List" project={activeProject} />
      <div className="container">
        <ProjectNavigator
          activeProjectId={activeProjectId}
          projects={projects}
          onProjectSelect={setActiveProjectId}
          onCreateProject={() => setProjects([...projects, createNewProject()])}
        />
        <TodoList todos={activeTodos} onTodoStatusChange={updateTodoStatus} />
      </div>
    </>
  );
}

export default App;
