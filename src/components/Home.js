import './style-sheets/Home.css';
import Blogs from './Blogs';
import useFetch from './useFetch';

const Home = () => {
    const {isPending, error, data: blogs} = useFetch('http://localhost:8000/blogs/');
    return(
        <div className="home">
            <h2>Blogs</h2>
            {isPending && <p className="loding">Loding. . . . 😃</p>}
            {error && <p className="error">{error}</p> }
            {blogs && <Blogs blogs={blogs}/>}
        </div>
    );
};

export default Home;