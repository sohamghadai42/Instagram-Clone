import React from "react";
import Approutes from "../Approutes";
import './style.scss'
import PostContext from "./features/post/PostContext";

const App = () => {
  return (
    <PostContext>
      <Approutes/>
    </PostContext>
  );
};

export default App;
