import { useEffect, useState, Fragment } from "react";
import Image from "next/image"
import { Ads, AdsBanner } from "../components";
import styles from "./pages.module.scss";
import { fetchData } from '../config/data';
import Layout from '../layout'
import Link from "next/link";
import { useRouter } from "next/router"


export default function Tnc(props) {
    const router = useRouter();
    const [ads1, setAds1] = useState({
        iframe: [],
        bannerImage: [],
        link: [],
        urlImage: [],
        widthImage: [],
        heightImage: [],
    });
    const getAds1 = () => {
        props.dataBanerProdukTop.Image_Banner === null
            ? setAds1({ iframe: props.dataBanerProdukTop.URL_Iframe })
            : setAds1({
                bannerImage: "withBanner",
                link: dataTopAds.url,
                urlImage: apiUrl + dataTopAds.Image_Banner.url,
                widthImage: dataTopAds.Image_Banner.width,
                heightImage: dataTopAds.Image_Banner.height,
            });
    };
    useEffect(() => {
        getAds1();
    }, [])
    return (
        <Layout
            dataSEO={props.dataSEO.seo}
            dataMainMenu={props.getMenu}
            dataBrands={props.getTopBrands}
        >
            {props.dataBanerProdukTop.published_at && (
                <div style={{ background: "#fff" }}>
                    {ads1.bannerImage === "withBanner" ? (
                        <AdsBanner
                            linkbanner={ads1.link}
                            urlImage={ads1.urlImage}
                            width={ads1.widthImage}
                            height={ads1.heightImage}
                        />
                    ) : (
                        <Ads banner={ads1.iframe} />
                    )}
                </div>
            )}
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
        }
    }
}
