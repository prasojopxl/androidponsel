import { useRouter } from "next/router"
import { apiUrl } from "../../config/variable";
import LayoutBerita from "../../layout/layoutberita/LayoutBerita";

export async function getServerSideProps(context) {
    const slug = context.query.slug;
    try {
        const resDataBerita = await fetch(`${apiUrl}/posts/${slug}`)
        const dataBerita = await resDataBerita.json();
        return {
            props: {
                dataBerita
            }
        }    
    } catch (error) {
        return {error};
    }
}

export default function DetailBerita({dataBerita}) {
    const router = useRouter();
    const {slug} = router.query;
    console.log(dataBerita)
    return (
        <LayoutBerita>
        <div>
            <h4>{dataBerita.title && dataBerita.title}</h4>
            {dataBerita.content && dataBerita.content}
        </div>
        </LayoutBerita>
    )
}

