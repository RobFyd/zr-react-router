import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import NotesList from "./components/notes-list/NotesList";
import { deleteNote, Note } from "./components/note/Note";
import { createFolder } from "./components/folders-list/FoldersList";
import { createNote } from "./components/notes-list/NotesList";
import { updateNote } from "./components/note/Note";

// const NotFound = () => (
//   <h1 style={{ textAlign: "center", marginTop: "50px" }}>404 - Not Found</h1>
// );

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/", // This is the root path
    action: createFolder,
    loader: () => {
      return fetch("http://localhost:3000/folders");
    },
    shouldRevalidate: ({ formAction }) => {
      if (formAction === "/") {
        return true;
      } else {
        return false;
      }
    },

    children: [
      {
        path: "/notes/:folderId",
        element: <NotesList />,
        action: createNote,
        loader: ({ params }) => {
          return fetch(
            `http://localhost:3000/notes?folderId=${params.folderId}`
          );
        },
        children: [
          {
            path: "note/:noteId",
            element: <Note />,
            action: updateNote,
            loader: ({ params }) => {
              return fetch(`http://localhost:3000/notes/${params.noteId}`);
            },
            shouldRevalidate: ({ formAction }) => {
              if (formAction) {
                return false;
              } else {
                return true;
              }
            },
            children: [
              {
                path: "delete",
                action: deleteNote,
              },
            ],
          },
        ],
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
