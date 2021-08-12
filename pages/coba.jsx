import useSWR from "swr";

export default function Coba(props) {
    const { data } = useSWR('xxx/ds', fetch, { initialData: props.posts })
    console.log(data)
    return (
        <div>
            page coba
        </div>
    )
}

export async function getStaticProps() {
    // `getStaticProps` is invoked on the server-side,
    // so this `fetcher` function will be executed on the server-side.
    const data = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await data.json();
    return { props: { posts } }
}