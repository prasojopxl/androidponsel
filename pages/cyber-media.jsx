import Image from "next/image"
import { GlobalAds } from "../components";
import styles from "./pages.module.scss";
import { fetchData, fetchDataAndroid } from '../config/data';
import Layout from '../layout'
import { faLink, faEnvelope, faHandshake, faBriefcase, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //https://dev.to/vuongddang/how-to-use-fontawesome-in-next-js-5bl5
import Link from "next/link";
import { useRouter } from "next/router"
import ReactHtmlParser from "react-html-parser";


export default function Tnc(props) {
    const router = useRouter();

    return (
        <Layout
            dataMainMenu={props.getMenu}

            dataSEO={props.dataSEO.seo}
            dataBrands={props.getTopBrands}
        >
            <GlobalAds adsId="1" />
            <div className={styles.pages}>
                <div className={styles.bgGradient}>
                    <div style={{
                        backgroundImage: "url(/tnc.png)",
                        backgroundAttachment: "fixed",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right center",
                        minHeight: 300,
                    }}>
                        <div className={styles.contents}>
                            <h2>{ReactHtmlParser(props.dataContent.title.rendered)}</h2>
                            <ul>
                                <li><Link href="#"><a>Home</a></Link></li>
                                <li><Link href={router.route}><a>Cyber Media</a></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.contents}>
                    <div className={styles.subContents}>
                        <h2>{ReactHtmlParser(props.dataContent.title.rendered)}</h2>
                        {ReactHtmlParser(props.dataContent.content.rendered)}
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export async function getStaticProps() {
    const dataSEO = await fetchData("/general");
    const getMenu = await fetchData("/menus?_sort=order");
    const getTopBrands = await fetchData("/brands?_top_brand=true");
    const dataBanerProdukTop = await fetchData(`/ads/8?_publicationState=preview`);
    const dataContent = await fetchDataAndroid("pages/632")

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
