import { useState } from "react";

const DuplicateTodoCurry = () => {
  const [todos, setTodos] = useState([1, 2, 3, 4, 5, "🤡"]);
  // Currying
  const handleDuplicateTodo = (todo) => {
    console.log("Calling outer function");
    // Return another function that has access to the `todo` called by the outer function
    return () => {
      console.log({ todo, todos, setTodos });
      console.log("Duplicating todo!!");
      setTodos([
        ...todos, //Copy all the old todos to the new todo state
        todo, // add another of the 'clicked' todo to the end of the list
      ]);
    };
  };

  return (
    <div>
      {todos.map((todo, index) => {
        return (
          <div className="todo" key={`${todo}:${index}`}>
            {todo}
            <button onClick={handleDuplicateTodo(todo)}>🖨️</button>
          </div>
        );
      })}
    </div>
  );
};

const DuplicateTodoInline = () => {
  const [todos, setTodos] = useState([1, 2, 3, 4, 5, "🤡"]);

  return (
    <div>
      {todos.map((todo, index) => {
        return (
          <div className="todo" key={`${todo}:${index}`}>
            {todo}
            <button
              onClick={() => {
                console.log({ todo, index, todos, setTodos });
                console.log("Duplicating todo!!");
                setTodos([
                  ...todos, //Copy all the old todos to the new todo state
                  todo, // add another of the 'clicked' todo to the end of the list
                ]);
              }}
            >
              🖨️
            </button>
          </div>
        );
      })}
    </div>
  );
};

const DuplicateTodosApp = () => {
  return (
    <>
      <div>
        <h3>Duplicating with Inline Handler</h3>
        <DuplicateTodoInline />
      </div>
      <div>
        <h3>
          Duplicating with{" "}
          <a
            href="https://github.com/hemanth/functional-programming-jargon#currying"
            target="_blank"
            rel="noreferrer"
          >
            Currying
          </a>
        </h3>
        <DuplicateTodoCurry />
      </div>
    </>
  );
};

export default DuplicateTodosApp;
