import "./styles/Sidebar.css";

function Sidebar(props) {

    return (
        <div id="sidebar" className="sidebar">
            <ul className="post__list">
                {
                    props.posts?.map((post,key) => (
                        <li onClick={e => {
                            props.cTitleHandler(post.title)
                            props.cTextHandler(post.content)
                        }} className="post__item" key={key}>
                            {post.title}
                            <br/>
                            <span 
                            onClick={e => {
                                props.deleteHandler(post.id)
                            }} className="delete">Delete</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Sidebar;