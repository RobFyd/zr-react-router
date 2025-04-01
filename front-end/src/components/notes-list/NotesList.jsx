import styles from "./NotesList.module.css";
import { Title } from "../title/Title";
import { AddNewButton } from "../add-new-button/AddNewButton";
import { TopBar } from "../top-bar/TopBar";
import { ShortNote } from "../short-note/ShortNote";
import {
  useLoaderData,
  NavLink,
  Outlet,
  Form,
  useLocation,
} from "react-router-dom";

export function createNewNote({ params }) {
  return fetch(`http://localhost:3000/notes`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title: "New note",
      body: "Write your note here",
      folderId: Number(params.folderId),
    }),
  });
}

const NotesContainer = ({ children }) => (
  <div className={styles["notes-container"]}>{children}</div>
);

const Notes = ({ children }) => (
  <div className={styles["notes-list"]} role="list">
    {children}
  </div>
);

const NotesList = () => {
  const notes = useLoaderData();
  const location = useLocation();

  return (
    <NotesContainer>
      <Notes>
        <TopBar>
          <Title>Notes</Title>
          <Form method="POST">
            <AddNewButton>+</AddNewButton>
          </Form>
        </TopBar>

        {notes.map((note) => (
          <NavLink
            key={note.id}
            to={
              location.pathname.startsWith("/archive")
                ? `/archive/note/${note.id}`
                : `/notes/${note.folderId}/note/${note.id}`
            }
          >
            {({ isActive }) => (
              <ShortNote
                active={isActive}
                role="listitem"
                note={note}
              ></ShortNote>
            )}
          </NavLink>
        ))}
      </Notes>
      <Outlet />
    </NotesContainer>
  );
};

export default NotesList;
