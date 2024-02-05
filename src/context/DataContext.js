import { createContext,useEffect,useState } from "react";
import Post from "../Post";
import PostLayot from "../PostLayot";
import {format} from 'date-fns';
import api from "../api/posts"
import { Navigate, useNavigate } from "react-router-dom";
import EditPage from "../EditPage";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";
const DataContext =createContext({})

export const DataProvider = ({children}) =>{
    const [posts,setPosts] = useState([ ])
    const [search,setsearch] = useState('')
    const [searchResult,SetsearchResult] = useState([])
    const [postTitle,setPostTitle] = useState('')
    const [postBody,setPostBody] = useState('')
    const [editTitle,setEditTitle] = useState('')
    const [editBody,setEditBody] = useState('')
    const navigate = useNavigate()
    const {width} = useWindowSize()
    const {data,fetchError,isLoading} = useAxiosFetch("http://localhost:3500/posts")
  
    useEffect(()=>{
      setPosts(data);
    },[data])
  
  
  
    useEffect(() =>{
      const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase())
      );
      SetsearchResult(filteredResults.reverse());
    },[posts,search])
  
    
    const handleSubmit =async(e) => {
      e.preventDefault();
      const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
      const datetime =format(new Date(),'MMM dd,yyyy pp')
      const newPost ={id,title : postTitle,datetime,body:postBody};
      try{
        const response = await api.post("/posts",newPost)
        const allPosts = [...posts ,response.data];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        navigate('/')
      }catch(err){
        console.log(`Error : ${err.message}`);
      }
  
    }
    const handleDelete = async(id) => {
      try {
        await api.delete(`posts/${id}`)
        const postsList = posts.filter(post => post.id !== id);
        setPosts(postsList);
        navigate('/')
      } catch (err) {
        console.log(`Error : ${err.message}`);
      }
    }
  
    const handleEdit = async(id) => {
      const datetime =format(new Date(),'MMM dd,yyyy pp')
      const updatedPost ={id,title : editTitle,datetime,body:editBody};
      try {
        const response = await api.put(`/posts/${id}`,updatedPost)
        setPosts(posts.map(post => post.id === id ?{...response.data}:post));
        setEditTitle('');
        setEditBody('');
        navigate('/')
      } catch (err) {
        console.log(`Error : ${err.message}`);
      }
    }
  

    return (
        <DataContext.Provider value ={{
            width,search,setsearch,searchResult,fetchError,isLoading,
            handleSubmit,postTitle,setPostTitle,postBody,setPostBody,
            posts,editBody,setEditTitle,setEditBody,handleEdit,editTitle,handleDelete
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext