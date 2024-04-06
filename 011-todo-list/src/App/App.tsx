import { useState, useEffect } from "react";
import { Header } from "@components/Header";
import { ProjectNavigator } from "@components/ProjectNavigator";
import { TodoList } from "@components/TodoList";
import { createNewProject } from "@components/Project";
import { Todo, createNewTodo } from "@components/Todo";
import { initialAppState, ApplicationState } from "./initialAppData";
import "./App.css";

const APP_KEY = "todo-list";

function storageKey(key: string) {
  return `${APP_KEY}:${key}`;
}

const initState = getInitialState() as ApplicationState;

function getInitialState() {
  return Object.fromEntries(
    Object.entries(initialAppState).map(([key, value]) => {
      const storage = window.localStorage.getItem(storageKey(key));
      if (!storage) return [key, value];
      return [key, JSON.parse(storage)];
    })
  );
}

function saveApplicationState(app: ApplicationState) {
  for (const [key, value] of Object.entries(app)) {
    window.localStorage.setItem(storageKey(key), JSON.stringify(value));
  }
}

function App() {
  const [activeProjectId, setActiveProjectId] = useState(
    initState.activeProjectId
  );
  const [projects, setProjects] = useState(initState.projects);
  const [todos, setTodos] = useState(initState.todos);

  useEffect(() => {
    saveApplicationState({ activeProjectId, projects, todos });
  }, [activeProjectId, projects, todos]);

  const activeProject = projects.find((p) => p.id === activeProjectId);
  const finishedTodos: Todo[] = [];
  const unfinishedTodos: Todo[] = [];

  todos.forEach((todo) => {
    if (todo.projectId !== activeProjectId) return;
    todo.finished ? finishedTodos.push(todo) : unfinishedTodos.push(todo);
  });

  function updateTodo(id: string, changes: Partial<Todo>) {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, ...changes } : todo;
      })
    );
  }

  function deleteTodo(id: string) {
    setTodos(todos.filter((todo) => todo.id !== id));
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
            onProjectTitleChange={(id: string, title: string) => {
              setProjects(
                projects.map((project) =>
                  project.id === id ? { ...project, title: title } : project
                )
              );
            }}
            onTodoCreate={(id: string) => {
              setTodos([...todos, createNewTodo(id)]);
            }}
          />
        )}{" "}
        <TodoList
          title="In Progress"
          todos={unfinishedTodos}
          onTodoEdit={updateTodo}
          onTodoDelete={deleteTodo}
        />
        <TodoList
          title="Completed"
          todos={finishedTodos}
          onTodoEdit={updateTodo}
          onTodoDelete={deleteTodo}
        />
      </div>
    </>
  );
}

export default App;
