import "./ToDo.css";
import Modal from "./Modal/Modal.jsx";
import ListItem from "./ListItem/ListItem.jsx";
import { useState } from "react";
import Message from "./Message/Message.jsx";
import handshake from "../../images/handshake.png";
import { motion } from "motion/react";

export default function ToDo() {
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState(undefined);
  const [modalTask, setModalTask] = useState(undefined);
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [messageShow, setMessageShow] = useState(false);
  const [messageType, setMessageType] = useState(undefined);
  const [congratsShow, setCongratsShow] = useState(false);

  function handleModallAdd() {
    setModalTask(undefined);
    setModalShow(true);
    setModalType("add");
  }

  function handleModalUpdate(task) {
    setModalTask(task);
    setModalShow(true);
    setModalType("edit");
  }

  function handleFilter(e) {
    const optionValue = e.target.value;
    if (optionValue === "incomplete") {
      setData(originalData.filter((obj) => obj.status === "incomplete"));
    } else if (optionValue === "completed") {
      setData(originalData.filter((obj) => obj.status === "completed"));
    } else {
      setData(originalData);
    }
  }

  const controlPanel = (
    <div className="controlPanel">
      <button className="addBtn" onClick={handleModallAdd}>
        Add Task
      </button>
      <select className="select" onChange={handleFilter}>
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );

  return (
    <div className="toDo">
      <h1>TODO LIST</h1>
      {controlPanel}
      {!data || data.length === 0 ? (
        <div className="taskList">
          <ul>
            <li>No tasks</li>
          </ul>
        </div>
      ) : (
        <div className="taskList">
          <ul>
            {data.map((task) => {
              return (
                <ListItem
                  key={task.id}
                  task={task}
                  handleModalUpdate={handleModalUpdate}
                  setData={setData}
                  setOriginalData={setOriginalData}
                  setMessageShow={setMessageShow}
                  setMessageType={setMessageType}
                  setCongratsShow={setCongratsShow}
                />
              );
            })}
          </ul>
        </div>
      )}
      {modalShow && (
        <Modal
          modalType={modalType}
          setModalShow={setModalShow}
          setData={setData}
          setOriginalData={setOriginalData}
          modalTask={modalTask}
          setMessageShow={setMessageShow}
          setMessageType={setMessageType}
          setCongratsShow={setCongratsShow}
        />
      )}
      {messageShow && <Message messageType={messageType} />}
      {congratsShow && (
        <motion.div
          className="congrats"
          initial={{ transform: "scale(0.2)" }}
          animate={{ transform: "scale(1)" }}
        >
          <img src={handshake} alt="handshake" />
          <motion.p
            initial={{ transform: "rotate(0)" }}
            animate={{
              transform: "rotate(360deg)",
            }}
          >
            WELL DONE!
          </motion.p>
        </motion.div>
      )}
    </div>
  );
}
