import Image from "next/image"
import { GlobalAds } from "../components";
import styles from "./pages.module.scss";
import { fetchData } from '../config/data';
import Layout from '../layout'
import Link from "next/link";
import { useRouter } from "next/router"


export default function Tnc(props) {
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
                        backgroundImage: "url(/tnc.png)",
                        backgroundAttachment: "fixed",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right center",
                        minHeight: 300,
                    }}>
                        <div className={styles.contents}>
                            <h2>Kerja Sama <br />Bersama Android Ponsel?</h2>
                            <ul>
                                <li><Link href="#"><a>Home</a></Link></li>
                                <li><Link href={router.route}><a>Kerja Sama</a></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.contents}>
                    <div className={styles.subContents}>
                        <h2>Bagaimana cara bekerja sama?</h2>
                        <ol>
                            <li>
                                <h4>Penggunaan Situs</h4>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, aspernatur aliquid odit repudiandae a voluptas eligendi laudantium, hic deleniti temporibus sequi doloremque omnis amet provident tempora pariatur in dolores culpa.</p>
                            </li>
                            <li>
                                <h4>Penggunaan Situs</h4>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, aspernatur aliquid odit repudiandae a voluptas eligendi laudantium, hic deleniti temporibus sequi doloremque omnis amet provident tempora pariatur in dolores culpa.</p>
                            </li>
                            <li>
                                <h4>Penggunaan Situs</h4>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, aspernatur aliquid odit repudiandae a voluptas eligendi laudantium, hic deleniti temporibus sequi doloremque omnis amet provident tempora pariatur in dolores culpa.</p>
                            </li>
                            <li>
                                <h4>Penggunaan Situs</h4>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, aspernatur aliquid odit repudiandae a voluptas eligendi laudantium, hic deleniti temporibus sequi doloremque omnis amet provident tempora pariatur in dolores culpa.</p>
                                <ol>
                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
                                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
                                </ol>
                            </li>
                        </ol>
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
