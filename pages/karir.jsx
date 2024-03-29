import Image from "next/image"
import { GlobalAds } from "../components";
import styles from "./pages.module.scss";
import { fetchData } from '../config/data';
import Layout from '../layout'
import { faLink, faCheck, faEnvelope, faHandshake, faBriefcase, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //https://dev.to/vuongddang/how-to-use-fontawesome-in-next-js-5bl5
import Link from "next/link";
import { useRouter } from "next/router"


export default function Karir(props) {
    const router = useRouter();

    return (
        <Layout
            dataSEO={props.dataSEO.seo}
            dataMainMenu={props.getMenu}
            dataBrands={props.getTopBrands}
        >
            <GlobalAds adsId="1" />
            <div className={styles.bgGradient}>
                <div style={{
                    backgroundImage: "url(/tnc.png)",
                    backgroundAttachment: "fixed",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right center",
                    minHeight: 300,
                }}>
                    <div className={styles.contents}>
                        <h2>Sukses Berkembang<br />Bersama Android Ponsel?</h2>
                        <ul>
                            <li><Link href="#"><a>Home</a></Link></li>
                            <li><Link href={router.route}><a>Kerja Sama</a></Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={styles.pages}>
                <div className={styles.contents}>
                    <div className={styles.subContents}>
                        <h2>Berkabung dan tumbuh bersama kami?</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum obcaecati praesentium quibusdam? Voluptatem debitis quod deserunt cupiditate, reprehenderit facilis nostrum explicabo maxime dolor! Blanditiis architecto eum similique dolore asperiores vel.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum obcaecati praesentium quibusdam? Voluptatem debitis quod deserunt cupiditate, reprehenderit facilis nostrum explicabo maxime dolor! Blanditiis architecto eum similique dolore asperiores vel.</p>

                        <h2 style={{ marginTop: 20, marginBottom: 5 }}>Web Admin</h2>
                        <div className={styles.itemBox}>
                            <div className={styles.listlowker}>
                                <FontAwesomeIcon icon={faCheck} /> <span>Mempunyai basic mengoperasikan kampoter</span><br />
                                <FontAwesomeIcon icon={faCheck} /> <span>Mempunyai basic mengoperasikan kampoter</span><br />
                                <FontAwesomeIcon icon={faCheck} /> <span>Mempunyai basic mengoperasikan kampoter</span><br />
                                <FontAwesomeIcon icon={faCheck} /> <span>Mempunyai basic mengoperasikan kampoter</span><br />
                                <FontAwesomeIcon icon={faCheck} /> <span>Mempunyai basic mengoperasikan kampoter</span>
                            </div>
                        </div>
                        <h2 style={{ marginTop: 20, marginBottom: 5 }}>Freelance Sebagai Penulis</h2>
                        <div className={styles.itemBox}>
                            <div className={styles.listlowker}>
                                <FontAwesomeIcon icon={faCheck} /> <span>Mempunyai basic mengoperasikan kampoter</span><br />
                                <FontAwesomeIcon icon={faCheck} /> <span>Mempunyai basic mengoperasikan kampoter</span><br />
                                <FontAwesomeIcon icon={faCheck} /> <span>Mempunyai basic mengoperasikan kampoter</span><br />
                                <FontAwesomeIcon icon={faCheck} /> <span>Mempunyai basic mengoperasikan kampoter</span><br />
                                <FontAwesomeIcon icon={faCheck} /> <span>Mempunyai basic mengoperasikan kampoter</span>
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
        }
    }
}
