import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

import "../Css/Tudo.css";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setinputValue] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  const addTask = () => {
    if (inputValue.length === 0) {
      return;
    }

    axios
      .post("/api/tasks", {
        content: inputValue,
        isCompleted: false,
      })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setinputValue("");
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const deleteTask = (id) => {
    axios
      .delete(`/api/tasks/${id}`)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task._id !== id);
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const completed = (id, isCompleted) => {
    axios
      .put(`/api/tasks/${id}`, { isCompleted: !isCompleted })
      .then((res) => {
        const updatedTasks = tasks.map((task) =>
          task._id === id
            ? { ...task, isCompleted: res.data.isCompleted }
            : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const editTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task._id === id ? { ...task, isEditing: true } : task
    );
    setTasks(updatedTasks);
  };

  const updateValue = (id, content) => {
    const updatedTasks = tasks.map((task) =>
      task._id === id ? { ...task, content } : task
    );
    setTasks(updatedTasks);
  };

  const save = (id, content) => {
    axios
      .put(`/api/tasks/${id}`, { content })
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task._id === id ? { ...task, isEditing: false } : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <div className="container mt-5">
      <div className="main" style={{background:"gray",borderRadius: "10px"}}>
        <h1 className="text-center text-white fs-1">My Todo App</h1>
        <div className="d-flex justify-content-center mt-4">
          <div className="col-lg-6 col-md-8 col-sm-7 col-8">
            <input
              className="form-control"
              value={inputValue}
              onChange={(event) => setinputValue(event.target.value)}
              type="text"
            />
          </div>
          <Button
            className="btn btn-primary ml-2"
            onClick={addTask}
            type="submit"
          >
            Add
          </Button>
        </div>

        <div className="d-flex justify-content-center mt-3">
          <ul className="list-group">
            {tasks.map((task) => (
              <div key={task._id}>
                <li className="list-group-item">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => completed(task._id, task.isCompleted)}
                    />
                    {task.isEditing ? (
                      <span>
                        <input
                          type="text"
                          value={task.content}
                          onChange={(event) =>
                            updateValue(task._id, event.target.value)
                          }
                        />
                        <button
                          className="btn btn-success"
                          onClick={() => save(task._id, task.content)}
                        >
                          Save
                        </button>
                      </span>
                    ) : (
                      <span>
                        {task.isCompleted ? (
                          <del>{task.content}</del>
                        ) : (
                          task.content
                        )}
                        <Button
                          variant="warning"
                          onClick={() => editTask(task._id)}
                          className="ml-2"
                        >
                          Edit
                        </Button>
                      </span>
                    )}

                    <Button
                      onClick={() => deleteTask(task._id)}
                      variant="danger"
                      className="ml-2"
                    >
                      Del
                    </Button>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
