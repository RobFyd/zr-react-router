import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import NotesList from "./components/notes-list/NotesList";
import {
  deleteNote,
  Note,
  deleteNoteFromArchive,
  restoreFromArchive,
} from "./components/note/Note";
import { createFolder } from "./components/folders-list/FoldersList";
import { createNewNote } from "./components/notes-list/NotesList";
import { updateNote } from "./components/note/Note";
import { NotFound } from "./components/not-found/NotFound";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    errorElement: <NotFound />,
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
    errorElement: <NotFound />,
    children: [
      {
        path: "archive",
        element: <NotesList />,
        loader: () => {
          return fetch("http://localhost:3000/archive");
        },
        children: [
          {
            path: `note/:noteId`,
            element: <Note />,
            action: updateNote,
            errorElement: <NotFound />,
            loader: async ({ params }) => {
              const result = await fetch(
                `http://localhost:3000/archive/${params.noteId}`
              );

              if (result.status === 404) {
                throw new Error();
              } else {
                return result.json();
              }
            },
            shouldRevalidate: ({ formAction }) => {
              return !formAction;
            },
            children: [
              {
                path: "delete",
                action: deleteNoteFromArchive,
              },
              {
                path: "restore",
                action: restoreFromArchive,
              },
            ],
          },
        ],
      },
      {
        path: "notes/:folderId",
        element: <NotesList />,
        action: createNewNote,
        loader: ({ params }) => {
          return fetch(
            `http://localhost:3000/notes?folderId=${params.folderId}`
          );
        },
        children: [
          {
            path: `note/:noteId`,
            element: <Note />,
            action: updateNote,
            errorElement: <NotFound />,
            loader: async ({ params }) => {
              const result = await fetch(
                `http://localhost:3000/notes/${params.noteId}`
              );

              if (result.status === 404) {
                throw new Error();
              } else {
                return result.json();
              }
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
