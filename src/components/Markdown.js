import React, { useEffect } from 'react';
import "./styles/Markdown.css";
import { Textarea, Input } from '@chakra-ui/react';

function Markdown(props) {

    useEffect(() => {
        const slicer = (arr,start,end) => {
            return arr.slice(start,end).join("");
        }
        const tabbed = () => {
            let t= document.getElementById("textarea");
            t.addEventListener("keydown", (e) => {
            if(e.keyCode === 9) {
                e.preventDefault()
                let arr = e.target.value.split("");
                e.target.value = slicer(arr,0,t.selectionStart) + "\t" + slicer(arr,t.selectionStart,arr.length);
            }
            })
        }
        tabbed();
    }, []);

    return (
        <>
            <Input 
                mt={5}
                id="title"
                variant="flushed"
                value={props.cTitle}
                onChange={e => props.cTitleHandler(e.target.value)} 
                placeholder="Type Markdown Title Here" 
            />
            <Textarea 
                id="textarea" 
                mt={5}
                value={props.content}
                onChange={e => props.cTextHandler(e.target.value)}
                placeholder="Type Markdown Content Here" 
            />
        </>
    );
}

export default Markdown;