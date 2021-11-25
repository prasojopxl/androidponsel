import Image from "next/image"
import { fetchData } from "../config/data";
import { baseUrl, staticImage } from "../config/variable";
import Layout from "../layout";

export default function Page404({ getMenu, getTopBrands, dataSEO }) {
    return (
        <Layout
            dataMainMenu={getMenu}
            dataSEO={dataSEO.seo}
            dataBrands={getTopBrands}
        >
            <div style={{ padding: "50px 0", textAlign: "center" }}>
                <div style={{ margin: "20px 0" }}><Image src={staticImage + "images/img-notfound.png"} width="349" height="252" alt="not found" /></div>
                <h4>[Page Not Found]</h4>
            </div>
        </Layout>
    )
}

export async function getStaticProps({ params }) {
    const dataSEO = await fetchData("/general");
    const getMenu = await fetchData("/menus?_sort=order");
    const getTopBrands = await fetchData("/brands?_top_brand=true");
    return {
        props: {
            getMenu,
            getTopBrands,
            dataSEO,
        },
        revalidate: 3
    };
}
