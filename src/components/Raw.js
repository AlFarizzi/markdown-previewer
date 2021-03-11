import React from 'react';
import ReactMarkdown from 'react-markdown';
import "./styles/Raw.css";

function Raw(props) {
    console.log(props.content);
    return (
        <div className="raw">
            <ReactMarkdown>
                {props.content}
            </ReactMarkdown>
        </div>
    );
}

export default Raw;