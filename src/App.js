import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BlogDetails from './components/BlogDetails';
import CreateBlog from './components/CreateBlog';

function App() {
    return (
        <Router>
        <Navbar />
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/blogs/:id">
                <BlogDetails />
            </Route>
            <Route path="/create">
                <CreateBlog />
            </Route>
        </Switch>
        </Router>
    );
}

export default App;
