import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { NotesList } from "./components/notes-list/NotesList";
import { Note } from "./components/note/Note";
import { createFolder } from "./components/folders-list/FoldersList";
import { createNote } from "./components/notes-list/NotesList";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/", // This is the root path
    action: createFolder,
    loader: () => {
      return fetch("http://localhost:3000/folders");
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
            path: "/notes/:folderId/note/:noteId",
            element: <Note />,
            loader: ({ params }) => {
              return fetch(`http://localhost:3000/notes/${params.noteId}`);
            },
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
