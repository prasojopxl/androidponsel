import Image from "next/image"
import { GlobalAds } from "../components";
import styles from "./pages.module.scss";
import { fetchData } from '../config/data';
import Layout from '../layout'
import { faLink, faEnvelope, faHandshake, faBriefcase, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //https://dev.to/vuongddang/how-to-use-fontawesome-in-next-js-5bl5
import Link from "next/link";


export default function TentangKami(props) {

    return (
        <Layout
            dataSEO={props.dataSEO.seo}
            dataMainMenu={props.getMenu}
            dataBrands={props.getTopBrands}
        >
            <GlobalAds adsId="1" />
            <div className={styles.pages}>
                <div className={styles.mainImage}><Image src="/tentang-kami.png" alt="tentang kami" width={1002} height={616} /> </div>
                <div className={styles.contents}>
                    <div className={styles.subContents}>
                        <h2>Tentang Kami</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum obcaecati praesentium quibusdam? Voluptatem debitis quod deserunt cupiditate, reprehenderit facilis nostrum explicabo maxime dolor! Blanditiis architecto eum similique dolore asperiores vel.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum obcaecati praesentium quibusdam? Voluptatem debitis quod deserunt cupiditate, reprehenderit facilis nostrum explicabo maxime dolor! Blanditiis architecto eum similique dolore asperiores vel.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum obcaecati praesentium quibusdam? Voluptatem debitis quod deserunt cupiditate, reprehenderit facilis nostrum explicabo maxime dolor! Blanditiis architecto eum similique dolore asperiores vel.</p>
                        <h2>Jaringan Android Ponsel</h2>
                        <div className={styles.itemBox}>
                            <Link href="#"><a><FontAwesomeIcon icon={faLink} /> <span>Telkomindonsesia.co.id</span></a></Link>
                        </div>
                        <div className={styles.itemBox}>
                            <Link href="#"><a><FontAwesomeIcon icon={faLink} /> <span>Kominfo.go.id</span></a></Link>
                        </div>
                        <h2>Alamat Surel Penting</h2>
                        <div className={styles.itemBox}>
                            <Link href="#"><a><FontAwesomeIcon icon={faEnvelope} /> <span>mail@androidponsel.com</span></a></Link>
                        </div>
                        <div className={styles.itemBox}>
                            <Link href="#"><a><FontAwesomeIcon icon={faEnvelope} /> <span>mail@androidponsel.com</span></a></Link>
                        </div>
                        <h2>Tautan Penting</h2>
                        <div className={styles.itemBox}>
                            <Link href="#"><a><FontAwesomeIcon icon={faHandshake} /> <span>Kerja Sama Media</span></a></Link>
                        </div>
                        <div className={styles.itemBox}>
                            <Link href="#"><a><FontAwesomeIcon icon={faBriefcase} /> <span>Karir dan Magang</span></a></Link>
                        </div>
                        <div className={styles.itemBox}>
                            <Link href="#"><a><FontAwesomeIcon icon={faPhone} /> <span>Kontak Kami</span></a></Link>
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
