import { createPost, getfeedPosts, likePost, unlikePost } from '../services/post.api'
import { Context } from '../../post/PostContext.jsx'
import { useContext, useEffect } from 'react'

export const usePost = () => {
    const context = useContext(Context)
    if (!context) {
        throw new Error('usePost must be used inside PostContext')
    }

    const { loading, setLoading, post, setPost, feed, setFeed } = context

    const handlegetfeed = async () => {
        setLoading(true)
        const data = await getfeedPosts()
        setFeed(data.posts)
        setLoading(false)
    }

    const handleCreatePost = async (image, caption)=>{
        setLoading(true)
        const data = await createPost(image, caption);
        setFeed([data.post, ...feed])
        setLoading(false)
    }

    const handlelikepost = async (post) => {

        const data =await likePost(post)
        await handlegetfeed();
    }
    const handleunlikepost = async (post) => {

        const data =await unlikePost(post)
        await handlegetfeed();
    }

    useEffect(()=>{
        handlegetfeed();
    },[])

    return { loading, feed, post, handlegetfeed, handleCreatePost, setPost, setFeed, handlelikepost, handleunlikepost }
}