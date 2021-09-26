import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, doc, getDoc, getDocs, query, orderBy} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBJrA-sWmMREkzu8X_4gU82xZTEk_kF4wo",
    authDomain: "blog-website-b123b.firebaseapp.com",
    projectId: "blog-website-b123b",
    storageBucket: "blog-website-b123b.appspot.com",
    messagingSenderId: "361542546155",
    appId: "1:361542546155:web:2f7f361ea60f54b929c4ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const blogCollection = collection(db, "blogs");

const useFirebase = (DocId = '') => {
    const [data, setData] = useState(null);
    const [isPending, setisPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getBlogs = async () => {
            const blogs = DocId ? 
                await getDoc(doc(blogCollection, DocId)) :
                await getDocs(query(blogCollection, orderBy("timestamp", "desc")));
            return blogs;
        };
        getBlogs().then(blogs => {
                setData(blogs); 
                setisPending(false)
            }).catch(error => {
                setError('Sorry we are unable to get data at the moment please try again later 😓 ' + error);
                setisPending(false)
            })

    }, [DocId])
    
    const createData = async data => {
        const dataDoc = {title: data.title, content: data.content, author: data.author, timestamp: new Date().getTime()};
        const docRef = await addDoc(blogCollection, dataDoc);
        return docRef;
    };

    const deleteData = async id => {
        deleteDoc(doc(blogCollection, id));
    };

    return {data, isPending, error, createData, deleteData };
};

export default useFirebase;