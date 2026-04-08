import React, { useEffect } from "react";
import "../styles/Feed.scss";
import Post from "../../post/Post";
import { usePost } from "../hooks/use.Post";
import NavBar from "../components/NavBar";
const Feed = () => {
  const {feed, handlegetfeed, loading, handlelikepost, handleunlikepost} = usePost()
  useEffect(()=>{
    handlegetfeed()
  }, [])

  if(loading || !feed){
    return (<main><h1>Feed is loading</h1></main>)
  }

  console.log(feed)

  return (
    <div className="main">
      <div className="feed">
      <NavBar/>
        <div className="posts">
          {feed.map(post=>{
            return <Post user={post.user} post={post} loading={loading} handlelikepost={handlelikepost} handleunlikepost={handleunlikepost} />
          })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
