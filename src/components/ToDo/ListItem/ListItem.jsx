import "./ListItem.css";
import { FaTrashCan } from "react-icons/fa6";
import { ImPencil } from "react-icons/im";
import { motion } from "motion/react";

export default function ListItem({
  task,
  handleModalUpdate,
  setData,
  setOriginalData,
  setMessageType,
  setMessageShow,
  setCongratsShow,
  db,
}) {
  const isChecked = task.status === "completed" ? true : false;

  function handleRemove() {
    setData((prevData) => prevData.filter((obj) => obj.id !== task.id));
    setOriginalData((prevData) => prevData.filter((obj) => obj.id !== task.id));
    setTimeout(() => {
      setMessageShow(false);
    }, 5000);
    setMessageShow(true);
    setMessageType("removeMessage");

    db.collection("tasks").doc({ id: task.id }).delete();
  }

  function handleChecked(e) {
    if (e.target.checked) {
      setData((prevData) =>
        prevData.map((obj) => {
          if (obj.id === task.id) {
            return {
              ...obj,
              status: "completed",
            };
          } else {
            return obj;
          }
        })
      );
      setOriginalData((prevData) =>
        prevData.map((obj) => {
          if (obj.id === task.id) {
            return {
              ...obj,
              status: "completed",
            };
          } else {
            return obj;
          }
        })
      );
      setTimeout(() => {
        setCongratsShow(false);
      }, 5000);
      setCongratsShow(true);

      db.collection("tasks")
        .doc({ id: task.id })
        .update({ status: "completed" });
    } else {
      setData((prevData) =>
        prevData.map((obj) => {
          if (obj.id === task.id) {
            return {
              ...obj,
              status: "incomplete",
            };
          } else {
            return obj;
          }
        })
      );
      setOriginalData((prevData) =>
        prevData.map((obj) => {
          if (obj.id === task.id) {
            return {
              ...obj,
              status: "incomplete",
            };
          } else {
            return obj;
          }
        })
      );
      db.collection("tasks")
        .doc({ id: task.id })
        .update({ status: "incomplete" });
    }
  }

  return (
    <motion.li
      initial={{ transform: "translateY(15px)" }}
      animate={{ transform: "translateY(0)" }}
    >
      <div className="taskInfo">
        <input type="checkbox" checked={isChecked} onChange={handleChecked} />
        <div>
          <p className={isChecked ? "task lineThrough" : "task"}>{task.task}</p>
          <p className="moment">{task.moment}</p>
        </div>
      </div>
      <div className="btns">
        <button className="remove btn" onClick={handleRemove}>
          <FaTrashCan />
        </button>
        <button className="edit btn" onClick={() => handleModalUpdate(task)}>
          <ImPencil />
        </button>
      </div>
    </motion.li>
  );
}
