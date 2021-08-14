import Layout from "../../layout";
import { useRouter } from "next/router";
import { fetchData } from "../../config/data";
import LayoutBlank from "../../layout/layoutBlank";

export default function Brand({ brands, getMenu, getTopBrands, dataSEO }) {
    return (
        <Layout
            dataSEO={dataSEO.seo}
            dataMainMenu={getMenu}
            dataBrands={getTopBrands}
        >            {
                brands.map((item) => {
                    return (
                        <div key={item.id}>
                            <h1>{item.title}</h1>
                            {
                                item.products.map(data => {
                                    return (
                                        <div key={data.id}>{data.title}</div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </Layout>
    )
}

export async function getStaticPaths() {
    const listBrands = await fetchData("/brands?_limit=1000");
    const paths = listBrands.map((item) => ({
        params: {
            id: `${item.slug}`
        },
    }));
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const brands = await fetchData(`/brands?slug=${params.id}`)
    const dataSEO = await fetchData("/general");
    const getMenu = await fetchData("/menus?_sort=order");
    const getTopBrands = await fetchData("/brands?_top_brand=true");

    return {
        props: {
            brands,
            getMenu,
            getTopBrands,
            dataSEO,

        }
    }
}



