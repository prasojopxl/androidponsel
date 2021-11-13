import { useRouter } from "next/router"
import { GlobalAds, ItemTeam } from "../components";
import styles from "./pages.module.scss";
import { fetchData } from '../config/data';
import Layout from '../layout'
import Link from "next/link";
import { baseUrl } from "../config/variable";

export default function Team(props) {
    const router = useRouter();

    return (
        <Layout
            dataSEO={props.dataSEO.seo}
            dataBrands={props.getTopBrands}
        >
            <GlobalAds adsId="1" />
            <div className={styles.pages}>
                <div className={styles.bgGradient}>
                    <div style={{
                        backgroundImage: "url(/team-kami.png)",
                        backgroundAttachment: "fixed",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right center",
                        minHeight: 400,
                    }}>
                        <div className={styles.contents}>
                            <h2>Aturan di Android Ponsel</h2>

                            <ul>
                                <li><Link href="/"><a>Home</a></Link></li>
                                <li><Link href={router.route}><a>Team</a></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.contents}>
                    <div className={styles.subContents}>
                        <h2>Tim Kami</h2>
                        <div className="row">
                            <div className="col-lg-4">
                                <ItemTeam name="Bambang" title="CEO" />
                            </div>
                            <div className="col-lg-4">
                                <ItemTeam name="Joko" title="CMO" />
                            </div>
                            <div className="col-lg-4">
                                <ItemTeam name="Bejo" title="CTO" />
                            </div>
                            <div className="col-lg-4">
                                <ItemTeam name="Seteja" title="COO" />
                            </div>
                            <div className="col-lg-4">
                                <ItemTeam name="Budiman" title="CBO" />
                            </div>
                            <div className="col-lg-4">
                                <ItemTeam name="Bambang" title="CEO" />
                            </div>
                            <div className="col-lg-4">
                                <ItemTeam name="Joko" title="CMO" />
                            </div>
                            <div className="col-lg-4">
                                <ItemTeam name="Bejo" title="CTO" />
                            </div>
                            <div className="col-lg-4">
                                <ItemTeam name="Seteja" title="COO" />
                            </div>
                            <div className="col-lg-4">
                                <ItemTeam name="Budiman" title="CBO" />
                            </div>
                        </div>
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
