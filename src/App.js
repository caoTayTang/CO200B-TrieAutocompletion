import './App.css'
import Post from './Post'
import Input from './Input'
import data from './data.js'
import { useState, useEffect } from "react"
import createTrie from 'autosuggest-trie';

let trie


function App() {

    const [post, setPost] = useState([])
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        // fetch('https://gw.vnexpress.net/tax?tax_id=5504&site_id=1000000&page=1&limit=100&data_select=article_id,article_type,title,share_url,thumbnail_url,publish_time,lead,privacy,original_cate,article_category,location_name&thumb_size=500x300&thumb_quality=100&thumb_dpr=1,2&thumb_fit=crop')
        //     .then(res => res.json())
        //     .then(each => {
        //         setPost(each.data.articles)
        //     })
        trie = createTrie(data, 'title')
        setPost(data)
    }
    , [])


    const handleSCroll = () => {
        setScroll(window.scrollY > 200)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleSCroll)

        return () => {
            window.removeEventListener('scroll', handleSCroll)
        }
    }, [])

    const onQuery = (query) => {
        if (query === '') {
            setPost(data)
            return data
        } else {
            const matches = trie.getMatches(query)
            console.log('matches', matches)
            setPost(matches)
            return matches
        }
    }
        
    return (
        <div className="content-container">
            <Input onQuery={onQuery} />
            <h1 className="h1-content">Content</h1>
                {post.map(item => (
                    <Post key={item.article_id}  href={item.share_url} img={item.thumbnail_url} lead={item.lead}>
                        <h2 className="article-title">{item.title}</h2>
                    </Post>
                ))}
            {scroll && 
                <button 
                    className="back-to-top" 
                    onClick={() => window.scrollTo(0, 0)}
                >
                    Back to Top
                </button>
            }
        </div>
    )
}
export default App