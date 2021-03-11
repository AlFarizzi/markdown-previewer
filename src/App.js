import React,{ useEffect, useState } from 'react';
import Raw from './components/Raw';
import Markdown from './components/Markdown';
import Sidebar from './components/Sidebar';
import "./App.css";
import { HStack, Button, Switch, FormLabel, FormControl, useClipboard } from '@chakra-ui/react';
import { AddIcon, CopyIcon } from '@chakra-ui/icons';
const MemoizedSidebar = React.memo(Sidebar);

function App(props) {
  const [md,setMd] = useState(true);
  const [title,setTitle] = useState('');
  const [text,setText] = useState('');
  const [posts,setPosts] = useState([]);
  const {hasCopied, onCopy} = useClipboard(text);

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
            <HStack mt={1.5}>
              <Button 
              colorScheme="facebook" 
              leftIcon={<AddIcon />} 
              size="sm" 
              onClick={saveHandler}>Save</Button>

              <Button 
              colorScheme="facebook" 
              leftIcon={<CopyIcon />} 
              size="sm" 
              onClick={onCopy}
             >{hasCopied ? "Copied" : "Copy"}</Button>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">
                  Converted Result
                </FormLabel>
                <Switch colorScheme="facebook" onChange={() => setMd(!md)} />
              </FormControl>

            </HStack>
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