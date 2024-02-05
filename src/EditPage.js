import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DataContext from './context/DataContext';

const EditPage = () => {
    const {posts,editBody,setEditTitle,setEditBody,handleEdit,editTitle} = useContext(DataContext)
    const {id} = useParams();
    const post =posts.find(post => (post.id).toString() === id);
    useEffect(() => {
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    },[post,setEditBody,setEditTitle])
  return (
    <main>
        {
            editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="posttitle">Title :</label>
                        <input
                         id='postTitle' 
                         type="text"
                         required
                         value={editTitle}
                         onChange={(e) => setEditTitle(e.target.value)} 
                        />
                        <label htmlFor="postBody">Post :</label>
                        <textarea 
                            id='editBody'
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
        }
    </main>
  )
}

export default EditPage
