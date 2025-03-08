import styles from "./FoldersList.module.css";
import { Folder } from "../folder/Folder";
import { Title } from "../title/Title";
import { TopBar } from "../top-bar/TopBar";
import { AddNewButton } from "../add-new-button/AddNewButton";
import { Link, NavLink, useLoaderData } from "react-router-dom";

const Folders = ({ children }) => (
  <div className={styles["folders-column"]}>{children}</div>
);
const UserCreatedFolders = ({ children }) => (
  <div role="list" className={styles["folders-list"]}>
    {children}
  </div>
);

const FoldersList = () => {
  const folders = [];
  const loaderData = useLoaderData();
  console.log(loaderData);

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
