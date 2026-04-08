import React, { createContext, useState } from 'react'

export const Context = createContext()
export const PostContext = ({children}) => {

    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState(null)
    const [feed, setFeed] = useState(null)

  return (
    <Context.Provider value={{loading, setLoading, post, setPost, feed, setFeed}}>
        {children}
    </Context.Provider>
  )
}

export default PostContext