import { useRouter } from "next/router"
import { apiUrl } from "../../config/variable";
import LayoutBerita from "../../layout/layoutberita/LayoutBerita";



export default function DetailBerita({post}) {
    return (
        <LayoutBerita>
            <h2>{post.title}</h2>
            <div>{post.content}</div>
        </LayoutBerita>
    )
}

export async function getStaticPaths() {
    const res = await fetch (`http://localhost:1337/posts/`)
    const posts = await res.json();

    const paths = posts.map((post)=>({
        params: { id:`${post.slug}`}
    }))
    
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const res = await fetch (`http://localhost:1337/posts/${params.id}`)
    const post = await res.json();
    console.log(res)

    return {
        props: {
            post
        }
    }
}

