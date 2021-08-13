import { fetchData } from "../../config/data"

export default function Brand({ data }) {
    console.log(data)
    return (
        <div>
            t
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
