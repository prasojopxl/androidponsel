import Image from "next/image"
import { GlobalAds } from "../components";
import styles from "./pages.module.scss";
import { fetchData, fetchDataAndroid } from '../config/data';
import Layout from '../layout'
import { faLink, faEnvelope, faHandshake, faBriefcase, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //https://dev.to/vuongddang/how-to-use-fontawesome-in-next-js-5bl5
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";


export default function TentangKami(props) {

    return (
        <Layout
            dataSEO={props.dataSEO.seo}
            dataBrands={props.getTopBrands}
        >
            <GlobalAds adsId="1" />
            <div className={styles.pages}>
                <div className={styles.mainImage}><Image src="/tentang-kami.png" alt="tentang kami" width={1002} height={616} /> </div>
                <div className={styles.contents}>
                    <div className={styles.subContents}>
                        <h2>{ReactHtmlParser(props.dataContent.title.rendered)}</h2>
                        {ReactHtmlParser(props.dataContent.content.rendered)}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const dataSEO = await fetchData("/general");
    const getMenu = await fetchData("/menus?_sort=order");
    const getTopBrands = await fetchData("/brands?_top_brand=true");
    const dataBanerProdukTop = await fetchData(`/ads/8?_publicationState=preview`);
    const dataContent = await fetchDataAndroid("pages/6324")

    return {
        props: {
            getMenu,
            getTopBrands,
            dataSEO,
            dataBanerProdukTop,
            dataContent
        },
        revalidate: 3
    }
}
