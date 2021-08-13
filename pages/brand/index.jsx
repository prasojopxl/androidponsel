import { fetchData } from "../../config/data"

export default function Brand({ data }) {
    console.log(data)
    return (
        <div>
            index all brands here
        </div>
    )
}

export async function getStaticProps() {
    const data = await fetchData("/brands")
    return {
        props: {
            data
        }
    }
}
