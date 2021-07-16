import { useRouter } from "next/router"
import { apiUrl } from "../../config/variable";
import LayoutBerita from "../../layout/layoutberita/LayoutBerita";

export async function getServerSideProps(context) {
    const slug = context.query.slug;
    const resDataBerita = await fetch(`${apiUrl}/posts/${slug}`)
    const dataBerita = await resDataBerita.json();
    return {
        props: {
            dataBerita
        }
    }
}

export default function DetailBerita({dataBerita}) {
    const router = useRouter();
    const {slug} = router.query;
    console.log(dataBerita)
    return (
        <LayoutBerita>
        <div>
            <h4>{dataBerita.title}</h4>
            {dataBerita.content}
        </div>
        </LayoutBerita>
    )
}

