import React from "react";
import TodoList from "./TodoList.jsx";


const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">📝 Lista de Tareas</h1>
      <TodoList />
    </div>
  );
};

export default Home;
