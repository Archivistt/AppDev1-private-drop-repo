import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

function PostsList() {
  const [posts, setPosts] = useState([{}]);

  // const docs = [
  //     {
  //         title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  //         body:
  //         "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  //     },
  //     {
  //       title: "HAHAH aut facere repellat provident occaecati excepturi optio reprehenderit",
  //       body:
  //       "quia et HAHHAHHA\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  //   }
  // ]

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "post"), (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      setPosts(data);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white flex justify-center mt-20 mb-20">
        Post list
      </h1>

      { posts.length == 0 ? <p> No posts </p> 
      :
        posts.map((post) => {
        return (
          <dl
            className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mx-auto"
            key={post.id}
          >
            <div className="flex flex-col pb-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                {post.title}
              </dt>
              <dd className="text-lg font-semibold">{post.body}</dd>
            </div>
          </dl>
        );
      })}
    </>
  );
}

export default PostsList;
