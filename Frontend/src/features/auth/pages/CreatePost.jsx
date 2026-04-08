import React, { useRef, useState } from 'react'
import '../styles/Createpost.scss'
import { usePost } from '../hooks/use.Post';
import {useNavigate} from 'react-router-dom';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const postimgref = useRef(null);

  const {login, handleCreatePost} = usePost();
  const navigate = useNavigate();

  async function handlesubmit(e){
    e.preventDefault();
    const files = postimgref.current.files[0];
    await handleCreatePost(files, caption)
    navigate('/')
  }

  if(login){
    return (
      <main>
        <h1>Creating Post...</h1>
      </main>
    )
  }


  return (
    <div className="createpost">
      <div className="form-container">
          <h1>Create Post</h1>
          <form  onSubmit={handlesubmit}>
            <label htmlFor="postImg" className='post-image-label'>Select Image</label>
            <input hidden ref={postimgref} type="file" name='postImg' id='postImg'/>
            <input  value={caption} onChange={(e)=>{
              setCaption(e.target.value)
            }} type="text" name="caption" id="caption" placeholder='Enter Caption' />
            <button>Create Post</button>
          </form>
      </div>
    </div>
  )
}

export default CreatePost