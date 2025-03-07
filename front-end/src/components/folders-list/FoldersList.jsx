import styles from "./FoldersList.module.css";

import { useState } from "react";
import { Folder } from "../folder/Folder";
import { Title } from "../title/Title";
import { TopBar } from "../top-bar/TopBar";
import { AddNewButton } from "../add-new-button/AddNewButton";
import { Link, NavLink } from "react-router-dom";

const Folders = ({ children }) => (
  <div className={styles["folders-column"]}>{children}</div>
);
const UserCreatedFolders = ({ children }) => (
  <div role="list" className={styles["folders-list"]}>
    {children}
  </div>
);

const FoldersList = () => {
  const [folders] = useState([
    {
      name: "Lists",
      id: 1,
    },
    {
      name: "Thoughts",
      id: 2,
    },
  ]);

  return (
    <Folders>
      <TopBar>
        <input
          className={styles["new-folder-input"]}
          type="text"
          placeholder="Folder name"
        />
        <AddNewButton type="submit">+</AddNewButton>
      </TopBar>

      <Title>Folders</Title>
      <UserCreatedFolders>
        {folders.map((folder) => (
          <NavLink key={folder.id} to={`/notes/${folder.id}`}>
            {({ isActive }) => {
              return <Folder active={isActive}>{folder.name}</Folder>;
            }}
          </NavLink>
        ))}
      </UserCreatedFolders>
      {/* <Folder icon="archive">Archiwum</Folder> */}
    </Folders>
  );
};

export default FoldersList;
