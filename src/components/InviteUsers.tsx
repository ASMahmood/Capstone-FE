import React, { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./styles/InviteUser.css";

function InviteUsers() {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <AiOutlineUserAdd
        className="ml-auto"
        fontSize="30"
        onClick={() => (show ? setShow(false) : setShow(true))}
      />
      <div id="addUserbox" className={show ? "" : "d-none"}>
        HI
      </div>
    </>
  );
}

export default InviteUsers;
