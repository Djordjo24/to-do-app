import "./ToDo.css";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "motion/react";
import Localbase from "localbase";
import Modal from "./Modal/Modal.jsx";
import ListItem from "./ListItem/ListItem.jsx";
import Message from "./Message/Message.jsx";
import handshake from "../../images/handshake.png";
import { filterData } from "../../utils/utils.js";

export default function ToDo() {
  const [data, setData] = useState([]);
  const [modalTask, setModalTask] = useState(undefined);
  const [taskStatus, setTaskStatus] = useState("all");
  const [modalType, setModalType] = useState(undefined);
  const [modalShow, setModalShow] = useState(false);
  const [messageType, setMessageType] = useState(undefined);
  const [messageShow, setMessageShow] = useState(false);
  const [congratsShow, setCongratsShow] = useState(false);
  let db = useRef(undefined);

  useEffect(() => {
    db.current = new Localbase("db");
    db.current
      .collection("tasks")
      .get()
      .then((tasks) => {
        setData(tasks);
      });
  }, [db]);

  const filteredData = useMemo(
    () => filterData(data, taskStatus),
    [data, taskStatus]
  );

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
    setTaskStatus(e.target.value);
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
            {filteredData.map((task) => {
              return (
                <ListItem
                  key={task.id}
                  task={task}
                  setData={setData}
                  handleModalUpdate={handleModalUpdate}
                  setMessageType={setMessageType}
                  setMessageShow={setMessageShow}
                  setCongratsShow={setCongratsShow}
                  db={db.current}
                />
              );
            })}
          </ul>
        </div>
      )}
      {modalShow && (
        <Modal
          setData={setData}
          modalTask={modalTask}
          modalType={modalType}
          setModalShow={setModalShow}
          setMessageType={setMessageType}
          setMessageShow={setMessageShow}
          setCongratsShow={setCongratsShow}
          db={db.current}
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
