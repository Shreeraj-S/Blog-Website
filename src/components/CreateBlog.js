import './style-sheets/CreateBlog.css'
import { useState, useRef } from 'react';
import useFirebase from './useFirebase';
import { useHistory } from 'react-router-dom';

const CreateBlog = () => {
    const {createData} = useFirebase();
    const history = useHistory();
    const blogDetailsELement = useRef(null);
    const previewHeader = useRef(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        const blog = {title, content, author};
        createData(blog).then(docRef => {
            history.push(`/blogs/${docRef.id}`)
        }).catch(error => {
            console.log(error.statusText);
        });
    };
    const handleClick = () => {
        blogDetailsELement.current.classList.toggle('inactive');
        previewHeader.current.classList.toggle('triggered');
    };

    return(
        <div className="createBlog">
            <form className="createBlogForm" onSubmit={handleSubmit}>
                <label >Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                <label >Content</label>
                <textarea value={content} onChange={e => setContent(e.target.value)}></textarea>
                <label >Author</label>
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)}/>
                <button className="blog-create">Create Blog</button>
            </form>
            <h2 className="preview_header" ref={previewHeader} onClick={handleClick}>Preview</h2>
            <div className="blog-details inactive" ref={blogDetailsELement}>
                <h2 className="blog-title">{title}</h2>
                <p className="blog-content">{content}</p>
                {author && <p className="blog-author">Written by {author}</p>}
            </div>
        </div>
    );
};

export default CreateBlog;