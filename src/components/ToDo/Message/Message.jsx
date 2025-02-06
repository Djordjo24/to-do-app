import "./Message.css";
import { motion } from "motion/react";
import check from "../../../images/check.png";

export default function Message({ messageType }) {
  return (
    <motion.div
      className="message"
      initial={{ transform: "translateY(50px)" }}
      animate={{ transform: "translateY(0)" }}
    >
      <img src={check} alt="check" />
      <p>
        {messageType === "addMessage" && "Task added successfully"}
        {messageType === "removeMessage" && "Task removed successfully"}
        {messageType === "editMessage" && "Task edited successfully"}
      </p>
    </motion.div>
  );
}
