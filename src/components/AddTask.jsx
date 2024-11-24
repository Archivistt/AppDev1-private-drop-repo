import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

function AddTask({ tasks }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handlePost = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, "post"), {
        title,
        body,
        isRead: false,
      }),
        setTitle("");
        setBody("");
    } catch {
      alert("Error adding posts");
    }
  };
  return (
    <>
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="Title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="body"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            body
          </label>
          <input
            type="text"
            id="body"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handlePost}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default AddTask;
