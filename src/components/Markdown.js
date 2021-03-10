import React from 'react';
import "./styles/Markdown.css";

function Markdown(props) {
    return (
        <div className="md">
            <input 
            onChange={e => props.cTitleHandler(e.target.value)} 
            placeholder="Type Markdown Title Here" 
            type="text" 
            className="md__title"
            value={props.cTitle}
            />

            <textarea 
            onChange={e => props.cTextHandler(e.target.value)}
            placeholder="Type Markdown Content Here" 
            className="md__content" 
            cols="30" 
            rows="10" value={props.content}>
            </textarea>
        </div>
    );
}

export default Markdown;