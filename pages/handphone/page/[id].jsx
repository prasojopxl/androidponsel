import { apiUrl } from "../../../config/variable";

export default function Page(props) {
    return (
        <div>
            asd
        </div>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${apiUrl}/products?category=1`);
    const posts = await res.json();


    const paths = posts.map((item, i) => ({
        params: {
            id: `${item.id}`
        },
    }))
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            params
        }
    }
}

