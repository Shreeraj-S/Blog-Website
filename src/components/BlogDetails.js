import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import './style-sheets/BlogDetails.css'

const BlogDetails = () => {
    const {id} = useParams();
    const history = useHistory();
    const {data: blog, deleteData} = useFetch('http://localhost:8000/blogs/' + id);
    const handleClick = () => {
        deleteData()
            .then(data => {
                history.push('/');
            })
            .catch(error => {
                console.log(error.statusText);
            });
    };
    return(
        blog && (
            <div className="blog-details">
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-content">{blog.content}</p>
                <button className="blog-delete" onClick={handleClick}>Delete Blog</button>
                <p className="blog-author">Written by {blog.author}</p>
            </div>
        )
    );
};

export default BlogDetails;