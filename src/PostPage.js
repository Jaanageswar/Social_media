import { useParams ,Link} from 'react-router-dom'
import DataContext from './context/DataContext';
import { useContext } from 'react';
 

const PostPage = () => {
  const {posts,handleDelete} = useContext(DataContext)
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() ===id);

  return (
    <main className='PostPage'>
      <article className='post'>
        {post && 
          <>
              <h2>{post.title}</h2>
              <p className='postDate'>{post.datetime}</p>
              <p className='postBody'>{post.body}</p>
              <Link to = {`/edit/${id}`}><button className='editButton'>Edit page</button></Link>
              <button className='deleteButton' onClick = {() => (handleDelete(post.id))}>Delete Post</button>
          </>
        }
        {
          !post && 
          <>
              <h2>Post not found</h2>
              <p><Link to ='/'> visit our home page</Link></p>

          </>
        }
      </article>
    </main>
  )
}

export default PostPage
