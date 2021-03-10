import React,{ useEffect, useState } from 'react';
import Raw from './components/Raw';
import Markdown from './components/Markdown';
import Sidebar from './components/Sidebar';
import "./App.css";
const MemoizedSidebar = React.memo(Sidebar);

function App(props) {
  const [md,setMd] = useState(true);
  const [title,setTitle] = useState('');
  const [text,setText] = useState('');
  const [posts,setPosts] = useState([]);

  const textHandler = (text) => {
    setText(text);
  }

  const titleHandler = (title) => {
    setTitle(title);
  }
  
  const getPosts = () => {
    setPosts(JSON.parse(localStorage.getItem("notes")));
  }

  const saveHandler = (e) => {
    let id = `NOTES-${Math.random() * Math.random() * 9999}`;
    let posts = localStorage.getItem("notes");
    let post = {
      id,
      title,
      content:text
    };
    if(posts === null) {
      let newPosts = [];
      newPosts.push(post)
      localStorage.setItem("notes", JSON.stringify(newPosts));
    } else {
      let parsed = JSON.parse(posts);
      let updatedPost = [
        ...parsed,post
      ]
      console.log(updatedPost);
      localStorage.setItem("notes", JSON.stringify(updatedPost))
    }
    setTitle('');
    setText('');
    getPosts();
  }

  const deleteHandler = (id) => {
    getPosts();
    let updatedPosts = posts.filter(post => {
      return post.id !== id
    })
    localStorage.setItem("notes", JSON.stringify(updatedPosts));
    getPosts();
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
   <>
      <div className="container">
        <MemoizedSidebar 
          deleteHandler={deleteHandler} 
          cTextHandler={textHandler} 
          cTitleHandler={titleHandler} 
          posts={posts} 
        />
        
        <div className="content">
          <div className="btn__container">
           <button className="switch__button" onClick={e => setMd(!md)}>Switch</button>
           <button className="save__button" onClick={saveHandler} >Save</button>
          </div>
          {md 
          ? <Markdown content={text} cTitle={title} 
          title cTextHandler={textHandler} cTitleHandler={titleHandler}/> 
          : <Raw content={text} />}
        </div>
      </div>
   
   </>
  )
}

export default App