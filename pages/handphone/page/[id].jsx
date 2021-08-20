import { fetchData } from "../../../config/data";
import { apiUrl } from "../../../config/variable";
import Layout from "../../../layout";

export default function Page(props) {
    return (
        <Layout
            dataSEO={props.dataSEO.seo}
            dataMainMenu={props.getMenu}
            dataBrands={props.getTopBrands}
        >
            dasd
        </Layout>

    )
}

export async function getStaticPaths() {
    const posts = await fetchData("/products?category=1");
    const paths = posts.map((item, i) => ({
        params: {
            id: `${item.id}`
        },
    }))
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const dataSEO = await fetchData("/general");
    const getMenu = await fetchData("/menus?_sort=order");
    const getTopBrands = await fetchData("/brands?_top_brand=true");
    if (!dataSEO || !getMenu || !getTopBrands) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            params,
            getMenu,
            getTopBrands,
            dataSEO,
        },
        revalidate: 3
    }
}

