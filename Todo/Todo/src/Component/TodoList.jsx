import React, { useState, useEffect } from "react";

function TodoList() {
  const [Tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(Tasks));
  }, [Tasks]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTask = Tasks.filter((_, i) => i !== index);
    setTasks(updatedTask);
  };

  const moveUp = (index) => {
    if (index > 0) {
      const updatedTasks = [...Tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  const moveDown = (index) => {
    if (index < Tasks.length - 1) {
      const updatedTasks = [...Tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="p-4">
      <div className="border border-gray p-2 mb-6">
        <h1 className="text-4xl font-extrabold text-center">TODO</h1>
      </div>

      <div className="text-center mb-12">
        <input
          type="text"
          placeholder="Enter your tasks...."
          value={newTask}
          className="w-[50%] h-10 border border-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button
          className="px-4 py-2 m-2 rounded-lg border border-black bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      <ol className="text-center w-[50%] mx-auto mt-10 list-decimal border border-black p-4 rounded-md bg-gray-50">
        {Tasks.length > 0 ? (
          Tasks.map((task, i) => (
            <li
              key={i}
              className="p-2 my-2 flex justify-between items-center border-b-2 border-gray-200"
            >
              <span>{task}</span>
              <div>
                <button
                  className="mx-2 border border-red-500 bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition-all duration-300"
                  onClick={() => deleteTask(i)}
                >
                  Delete
                </button>
                <button
                  className="mx-2 bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-600 transition-all duration-300"
                  onClick={() => moveUp(i)}
                >
                  👆
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-600 transition-all duration-300"
                  onClick={() => moveDown(i)}
                >
                  👇
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No tasks available. Add a new task!</p>
        )}
      </ol>
    </div>
  );
}

export default TodoList;
