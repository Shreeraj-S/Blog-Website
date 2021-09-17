import './style-sheets/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () =>{
    return(
        <div className="navbar">
            <header>
                <h1>Blogs</h1>
            </header>
            <ul className="links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create">Create a Blog</Link></li>
            </ul>
        </div>
    );  
};

export default Navbar;