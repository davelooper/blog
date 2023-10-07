import { Box, Center, Container, Vstack } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { fetchPosts } from '../api/posts';
import { fetchUsers } from '../api/users';
import PreviewPost from '../components/PreviewPost';
import { Spinner, Text } from '@chakra-ui/react';
import Search from '../components/Search';
import { generateArticleRandomImageURL } from '../utils/imagesUtils';

function Root() {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [searchText, setSearchText] = useState("")
    const [searchCategory, setSearchCategory] = useState("content")

    useEffect(() => {

        if (posts.length === 0) {
            async function fetchPostsDataFromApi() {
                const results = await fetchPosts()

                if (Array.isArray(results) && results.length != 0) {
                    setPosts(results)
                } else {
                    console.error("Erreur lors de la récupération des données.")
                }
            }
            fetchPostsDataFromApi()

        }

    }, [posts])

    useEffect(() => {

        if (users.length === 0) {
            async function fetchUsersDataFromApi() {
                const results = await fetchUsers()

                if (Array.isArray(results) && results.length != 0) {
                    setUsers(results)
                } else {
                    console.error("Erreur lors de la récupération des données.")
                }
            }
            fetchUsersDataFromApi()

        }

    }, [users])

    return (
        <Container
            bg="primary"
            maxW="container.lg"
            p={8}
            color="white"
            centerContent
            mx="auto"
        >
            <Search
                searchText={searchText}
                searchCategory={searchCategory}
                setSearchCategory={setSearchCategory}
                setSearchText={setSearchText}
            />
            {posts.length !== 0 && users.length !== 0 ? (
                posts
                    .filter((post) => {
                        if (searchText === "") {

                            return true

                        } else {
                            if (searchCategory === "title") {

                                return post.title.toLowerCase().includes(searchText.toLowerCase())

                            } else if (searchCategory === "content") {

                                return post.body.toLowerCase().includes(searchText.toLowerCase())

                            } else if (searchCategory === "author") {

                                const author = users.find((user) => user.name.toLowerCase().includes(searchText.toLowerCase()))
                        
                                return post.userId === author.id

                            } else {

                                return true

                            }
                        }

                    })
                    .map((post) => {
                        
                        const author = users.find((user) => user.id === post.userId)
                        const imageSrc = generateArticleRandomImageURL()

                        return (
                            <PreviewPost
                                key={`post-${post.id}`}
                                author={author}
                                title={post.title}
                                content={post.body}
                                id={post.id}
                                imageSrc={imageSrc}
                            />
                        )
                    })
            ) : (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                >
                    <Text mb={4} color={"text.100"} fontWeight="bold">Chargement des posts...</Text>
                    <Spinner size='xl' color='text.100' mx="auto" />
                </Box>
            )}
        </Container>
    )

}

export default Root
