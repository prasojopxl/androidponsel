import { GlobalAds } from "../components";
import styles from "./pages.module.scss";
import { fetchData } from '../config/data';
import Layout from '../layout'
import Link from "next/link";
import { useRouter } from "next/router"

export default function Pages(props) {
    const router = useRouter();

    return (
        <Layout
            dataSEO={props.dataSEO.seo}
            dataMainMenu={props.getMenu}
            dataBrands={props.getTopBrands}
        >
            <GlobalAds adsId="1" />
            <div className={styles.pages}>
                <div className={styles.bgGradient}>
                    <div style={{
                        backgroundImage: "url(/hubungi-kami.png)",
                        backgroundAttachment: "fixed",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right center",
                        minHeight: 400,
                    }}>
                        <div className={styles.contents}>
                            <h2>Ada yang bisa<br />Kami Bantu?</h2>

                            <ul>
                                <li><Link href="/"><a>Home</a></Link></li>
                                <li><Link href={router.route}><a>Hubungi Kami</a></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.contents}>
                    hell
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

    return {
        props: {
            getMenu,
            getTopBrands,
            dataSEO,
            dataBanerProdukTop,
        },
        revalidate: 3
    }
}
