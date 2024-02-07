"use client";
import React from "react";
import MDEditor from "@uiw/react-md-editor";
import styles from "./editor.module.css";

const Editor = ({ value, setValue, handleSubmit, title, setTitle, edit }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div id="special" className={styles.container}>
        <MDEditor value={value} onChange={setValue} />
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        {edit ? "Update" : "Publish"}
      </button>
    </>
  );
};

export default Editor;
