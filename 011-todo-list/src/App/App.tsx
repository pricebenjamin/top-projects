import { useState, useEffect } from "react";
import { Header } from "@components/Header";
import { ProjectNavigator } from "@components/ProjectNavigator";
import { createNewProject } from "@utilities/createNewProject";
import { createNewTodo } from "@utilities/createNewTodo";
import { Todo } from "@interfaces/Todo";
import { TodoEditor } from "@components/TodoEditor";
import { TodoList } from "@components/TodoList";
import { initialAppState } from "./initialAppData";
import { ApplicationState } from "@interfaces/ApplicationState";
import "./App.css";

const APP_KEY = "todo-list";

function storageKey(key: string) {
  return `${APP_KEY}:${key}`;
}

const initState = getInitialState();

function getInitialState() {
  return Object.fromEntries(
    Object.entries(initialAppState).map(([key, value]) => {
      const storage = window.localStorage.getItem(storageKey(key));
      if (!storage) return [key, value];
      return [key, JSON.parse(storage)];
    })
  ) as ApplicationState;
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
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    saveApplicationState({ activeProjectId, projects, todos });
  }, [activeProjectId, projects, todos]);

  const activeProject = projects.find((p) => p.id === activeProjectId);
  const activeTodo = todos.find(
    (todo) => todo.id === activeProject?.activeTodoId
  );

  const finishedTodos: Todo[] = [];
  const unfinishedTodos: Todo[] = [];

  todos.forEach((todo) => {
    if (todo.projectId !== activeProjectId) return;

    const search = searchText.toLowerCase();
    const matchesTitle = todo.title.toLowerCase().includes(search);

    if (!matchesTitle) return;

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

  function updateProjectActiveTodo(id?: string) {
    setProjects(
      projects.map((project) => {
        if (project.id !== activeProjectId) return project;
        return { ...project, activeTodoId: id };
      })
    );
  }

  return (
    <>
      <ProjectNavigator
        activeProjectId={activeProjectId}
        projects={projects}
        onProjectSelect={setActiveProjectId}
        onCreateProject={() => {
          const newProject = createNewProject();
          setActiveProjectId(newProject.id);
          setProjects([...projects, newProject]);
        }}
      />
      <div className="flex-column">
        {activeProject && (
          <Header
            project={activeProject}
            searchText={searchText}
            onProjectDelete={(id: string) => {
              // set adjacent project as active, if possible
              const idx = projects.findIndex((project) => project.id === id);
              const prevProject = projects[idx - 1];
              const nextProject = projects[idx + 1];

              if (nextProject) setActiveProjectId(nextProject.id);
              else if (prevProject) setActiveProjectId(prevProject.id);

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
            onTodoCreate={(projectId: string) => {
              const newTodo = createNewTodo(projectId);
              setTodos([...todos, newTodo]);
              updateProjectActiveTodo(newTodo.id);
            }}
            onSearchTextChange={setSearchText}
          />
        )}
        <TodoList
          title="In Progress"
          todos={unfinishedTodos}
          activeTodoId={activeProject?.activeTodoId}
          onTodoEdit={updateTodo}
          onTodoDelete={deleteTodo}
          onSetActiveTodo={updateProjectActiveTodo}
        />
        <TodoList
          title="Completed"
          todos={finishedTodos}
          activeTodoId={activeProject?.activeTodoId}
          onTodoEdit={updateTodo}
          onTodoDelete={deleteTodo}
          onSetActiveTodo={updateProjectActiveTodo}
        />
      </div>
      {activeTodo && (
        <TodoEditor
          {...activeTodo}
          onTodoEdit={updateTodo}
          onTodoClose={() => updateProjectActiveTodo()}
        />
      )}
    </>
  );
}

export default App;
