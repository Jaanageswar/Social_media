import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext'

const Home = ({}) => {
  const {isLoading,fetchError,searchResult} = useContext(DataContext)
  return (
    <main className='Home'>
      {isLoading && <p className='statusMrg'>Loading posts ...</p>}
      {isLoading && fetchError && <p className='statusMsg'style ={{color: "red"}}>{fetchError}</p>}
      {!isLoading && !fetchError && (searchResult.length ?<Feed posts ={searchResult}/>:<p className='statusMsg'>No post to diplay.</p>)}
    </main>

  )
}

export default Home
