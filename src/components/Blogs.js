import './style-sheets/Blogs.css'
import { Link } from 'react-router-dom';

const Blogs = ({blogs}) => {
    return(
        blogs.map(blog => (
            <div className="blog" key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>    
                    <h2 className="blog-title">{blog.title}</h2>
                    <p className="blog-author">Written by {blog.author}</p>
                </Link>
            </div>
        ))
    );
};

export default Blogs;