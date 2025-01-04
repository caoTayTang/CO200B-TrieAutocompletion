import './Post.css';

function Post({children, href, img, lead}) {
    return (
        <div className="wrapper" >
            {/* <img className="image" src={img} alt="thumbnail"/> */}
            <a className="post-title" href={href}> {children} </a>
            <p className="description"> {lead} </p>
        </div>
    )
}

export default Post