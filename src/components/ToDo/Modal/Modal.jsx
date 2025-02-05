import "./Modal.css";
import { useState } from "react";
import setMoment from "../../../utils/utils.js";
import { motion } from "motion/react";
import { colors } from "../../../style/colors.js";

export default function Modal({
  setData,
  setOriginalData,
  modalType,
  setModalShow,
  modalTask,
  setMessageShow,
  setMessageType,
  setCongratsShow,
  db,
}) {
  const [inputValue, setInputValue] = useState(modalTask ? modalTask.task : "");
  const [status, setStatus] = useState(modalTask ? modalTask.status : "");

  function handleTextChange(e) {
    setInputValue(e.target.value);
  }

  function handleStatusChange(e) {
    setStatus(e.target.value);
  }

  function handleTask(e) {
    e.preventDefault();
    if (!inputValue || !status) return;
    const newTask = {
      id: setMoment(new Date()),
      task: inputValue,
      status: status,
      moment: setMoment(new Date()),
    };
    if (modalType === "add") {
      setData((prevData) => [...prevData, newTask]);
      setOriginalData((prevData) => [...prevData, newTask]);

      setTimeout(() => {
        setMessageShow(false);
      }, 5000);
      setMessageShow(true);
      setMessageType("addMessage");

      db.collection("tasks").add(newTask);
    } else if (modalType === "edit") {
      const prevStatus = modalTask.status;

      setData((prevData) =>
        prevData.map((obj) => {
          if (obj.id === modalTask.id) {
            return newTask;
          } else {
            return obj;
          }
        })
      );
      setOriginalData((prevData) =>
        prevData.map((obj) => {
          if (obj.id === modalTask.id) {
            return newTask;
          } else {
            return obj;
          }
        })
      );

      db.collection("tasks").doc({ id: modalTask.id }).update(newTask);

      if (prevStatus !== "completed" && newTask.status === "completed") {
        setTimeout(() => {
          setCongratsShow(false);
        }, 5000);
        setCongratsShow(true);
      }

      setTimeout(() => {
        setMessageShow(false);
      }, 5000);
      setMessageShow(true);

      setMessageType("editMessage");
    }
    setModalShow(false);
  }

  function handleCancel() {
    setModalShow(false);
  }

  const style = {
    color: modalType === "add" ? colors.blue : colors.darkBlue,
    backgroundColor: colors.transparent,
  };

  return (
    <div className="modalContainer">
      <motion.div
        initial={{ transform: "scale(0.2)" }}
        animate={{ transform: "scale(1)" }}
        className="modal"
      >
        <form onSubmit={handleTask}>
          <div className="modalHeader">
            <h4 style={style}>
              {modalType === "add" ? "Add Task" : "Update Task"}
            </h4>
            <button className="btnX" type="button" onClick={handleCancel}>
              x
            </button>
          </div>
          <label htmlFor="task">Title</label>
          <input
            id="task"
            type="text"
            value={inputValue}
            onChange={handleTextChange}
          />
          <label htmlFor="status">Status</label>
          <select id="status" value={status} onChange={handleStatusChange}>
            <option value="">Select option</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
          <button className="submitBtn" type="submit" style={style}>
            {modalType === "add" ? "Add Task" : "Edit Task"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
