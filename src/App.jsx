import { useState } from "react";
import  AddTask  from "./components/AddTask";
import  PostsList  from "./components/PostsList";


function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <AddTask />
      <PostsList />
    </>
  );
}

export default App;
