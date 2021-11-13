import { GlobalAds } from "../components";
import styles from "./pages.module.scss";
import { fetchData } from '../config/data';
import Layout from '../layout'
import Link from "next/link";
import { useRouter } from "next/router"
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //https://dev.to/vuongddang/how-to-use-fontawesome-in-next-js-5bl5

export default function HubungiKami(props) {
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
                    <div className={styles.subContents}>
                        <div className="row">
                            <div className="col-lg-6">
                                <h3>Kantor Utama</h3>
                                <p>Gedung Fuga Aliquam<br />
                                    Jl. eius nobis facilis No 002 Perferendis<br />laudantium laboriosam<br />Jakarta Selatan</p>
                            </div>
                            <div className="col-lg-6">
                                <div className={styles.itemContact} style={{ marginTop: "20px" }}>
                                    <div className={styles.icon}><FontAwesomeIcon icon={faPhone} /></div>
                                    <h5>Telephone</h5>
                                    (021) 5671 2121
                                </div>
                                <div className={styles.itemContact}>
                                    <div className={styles.icon}><FontAwesomeIcon icon={faEnvelope} /></div>
                                    <h5>Email</h5>
                                    <Link href="mailto:contact@androidponsel.com"><a>contact@androidponsel.com</a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.googleMaps}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6664270097594!2d106.82496411518466!3d-6.175392395529179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sMonumen+Nasional!5e0!3m2!1sid!2sid!4v1555926259955!5m2!1sid!2sid" allowfullscreen></iframe>
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
