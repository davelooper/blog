import ViewPost from '../components/ViewPost';
import { fetchPost } from '../api/post';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../api/user';
import { fetchPostComments } from '../api/postComments';


function Post() {
    const [post, setPost] = useState({})
    const [user, setUser] = useState({})
    const [comments, setComments] = useState([])
    const id = useParams().id;

    //Récupération du post
    useEffect(() => {
        if (Object.keys(post).length === 0) {

            async function fetchPostDataFromApi() {
                const result = await fetchPost(id)

                if (typeof result === "object" && Object.keys(result).length !== 0) {
                    setPost(result)
                } else {
                    console.error("Erreur lors de la récupération des données.")
                }
            }
            fetchPostDataFromApi()
        }
    }, [post])

    //Récupération de l'auteur du post
    useEffect(() => {
        if (Object.keys(post).length !== 0
            && Object.keys(user).length === 0) {

            async function fetchUserDataFromApi() {
                const result = await fetchUser(id)

                if (typeof result === "object" && Object.keys(result).length !== 0) {
                    setUser(result)
                } else {
                    console.error("Erreur lors de la récupération des données.")
                }
            }
            fetchUserDataFromApi()
        }
    }, [post, user])
    

    //Récupération des commentaires du post
    useEffect(() => {
        if (comments.length === 0) {
            async function fetchCommentsDataFromApi() {
                const result = await fetchPostComments(id)

                if (typeof result === "object" && Object.keys(result).length !== 0) {
                    setComments(result)
                } else {
                    console.error("Erreur lors de la récupération des données.")
                }
            }
            fetchCommentsDataFromApi()
        }
    })

    useEffect(() => {
        if (comments.length !== 0) {
            console.log("comments", comments);
        }
    })

    return (
        <ViewPost />
    );
}

export default Post;
