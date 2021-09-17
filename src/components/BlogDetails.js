import { useParams, useHistory } from "react-router-dom";
import useFirebase from "./useFirebase";
import './style-sheets/BlogDetails.css'

const BlogDetails = () => {
    const {id} = useParams();
    const history = useHistory();
    const {data: blog, isPending, deleteData} = useFirebase(id);
    const handleClick = () => {
        deleteData(id)
            .then(() => {
                history.push('/');
            })
            .catch(error => {
                console.log(error.statusText);
            });
    };
    return(
        blog && !isPending &&(
            <div className="blog-details" key = {blog.id}>
                <h2 className="blog-title">{blog.data().title}</h2>
                <p className="blog-content">{blog.data().content}</p>
                <button className="blog-delete" onClick={handleClick}>Delete Blog</button>
                <p className="blog-author">Written by {blog.data().author}</p>
            </div>
        )
    );
};

export default BlogDetails;