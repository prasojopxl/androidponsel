import { apiUrl } from '../../../config/variable';
import LayoutBerita from '../../../layout/layoutberita/LayoutBerita'
import styles from "../index.module.scss";

let totalItem = 6;


export default function Berita({post}) {        
    console.log("data "+post)
    return (
        <LayoutBerita>
            <div className={styles.berita}>
                <div className={styles.contents}>
                    {
                        post.map((item,i)=> {
                            return (
                                <div>
                                    <div>{item.id}</div>
                                    <h5>{item.title}</h5>
                                </div>
                            )
                        })
                    }
                </div>
            </div> 
        </LayoutBerita>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${apiUrl}/posts`);
    const posts = await res.json();

    const paths = posts.map((post)=>({
        params: {id: `${post.id}`}
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const res = await fetch(`${apiUrl}/posts?menu=2&_limit=${totalItem}&_start=${params.id*totalItem-totalItem}`)
    const post = await res.json();

    console.log(res)
    return {
        props: {
            post
        }
    }
}
