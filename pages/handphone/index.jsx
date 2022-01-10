import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from "react";
import { Paging, Title, Ads, AdsBanner, LoadAds } from "../../components";
import { baseUrl, totalItem, apiUrl, urlAds } from "../../config/variable";
import styles from "./index.module.scss";
import { fetchData } from '../../config/data';
import Layout from '../../layout';
import ItemProduct from '../../components/products/item';
import Head from "next/head";
import ReactHtmlParser from "react-html-parser";

export default function Handphone(props) {
    const router = useRouter()
    const [totalCompare, setTotalCompare] = useState(0)

    function removeLocalProd() {
        localStorage.removeItem("produk1")
        localStorage.removeItem("produk2")
        localStorage.removeItem("produk3")
        setCompare1("")
        setCompare2("")
        setCompare3("")
    }
    const goToCompare = () => {
        const p1 = localStorage.getItem("produk1");
        const p2 = localStorage.getItem("produk2");
        const p3 = localStorage.getItem("produk3");
        const titleCompare1 = JSON.parse(localStorage.getItem("produk1"));
        const titleCompare2 = JSON.parse(localStorage.getItem("produk2"));
        const titleCompare3 = JSON.parse(localStorage.getItem("produk3"));
        if (p1 !== null && p2 == null && p3 == null) {
            router.push(`${baseUrl}handphone/compare?produk1=${titleCompare1.slug}`)
            removeLocalProd();
        }
        else if (p1 !== null && p2 !== null && p3 == null) {
            router.push(`${baseUrl}handphone/compare?produk1=${titleCompare1.slug}&produk2=${titleCompare2.slug}`)
            removeLocalProd();
        }
        else {
            router.push(`${baseUrl}handphone/compare?produk1=${titleCompare1.slug}&produk2=${titleCompare2.slug}&produk3=${titleCompare3.slug}`)
            removeLocalProd();
        }
    }
    const [show, setShow] = useState(false)
    const [compare1, setCompare1] = useState("")
    const [compare2, setCompare2] = useState("")
    const [compare3, setCompare3] = useState("")
    const getLocalProd = () => {
        const p1 = localStorage.getItem("produk1");
        const p2 = localStorage.getItem("produk2");
        const p3 = localStorage.getItem("produk3");
        const titleCompare1 = JSON.parse(localStorage.getItem("produk1"));
        const titleCompare2 = JSON.parse(localStorage.getItem("produk2"));
        const titleCompare3 = JSON.parse(localStorage.getItem("produk3"));
        if (p1 !== null || p2 !== null || p3 !== null) {
            setShow(true)
            if (p1 !== null && p2 == null && p3 == null) {
                setCompare1(titleCompare1.title)
                setTotalCompare(1)
            }
            else if (p1 !== null && p2 !== null && p3 == null) {
                setCompare2(titleCompare2.title)
                setTotalCompare(2)
            }
            else if (p1 !== null && p2 !== null) {
                setCompare1(titleCompare1.title)
                setCompare2(titleCompare2.title)
                setCompare3(titleCompare3.title)
                setTotalCompare(3)
            }
            else if (p1 !== null && p3 !== null) {
                setCompare1(titleCompare1.title)
                setCompare2("")
                setCompare3(titleCompare3.title)
                setTotalCompare(2)
            }
            else {
                if (p2 !== null || p3 !== null) {
                    setCompare1("")
                }
                else {
                    setCompare3(titleCompare3.title)
                    setTotalCompare(1)
                }
            }
        }
        else {
            setShow(false)
            removeLocalProd();
        }

        if (p2 == null) {
            setCompare2("")
        }
        if (p3 == null) {
            setCompare3("")
        }

    }

    useEffect(() => {
        removeLocalProd();
        props.adsData6.URL_Iframe ||
            props.adsData7.URL_Iframe || props.adsData8.URL_Iframe
            ? LoadAds()
            : null;
        return (
            getLocalProd()
        )
    }, []);

    return (
        <Layout
            dataMainMenu={props.getMenu}

            dataSEO={props.dataSEO.seo}
            dataBrands={props.getTopBrands}
        >
            <Head>
                <title>
                    All New Mobile Phone Spesification
                </title>
                <meta
                    name="description"
                    content="comparation review android and iphone device "
                />
                <meta
                    name="keywords"
                    content="smartphone, device, android, ponsel, perbandingan, smarthone "
                />
                <meta name="author" content="androidponsel" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <link
                    rel="shortcut icon"
                    href={apiUrl + "/uploads/fav_425b2ec632.png"}
                />
                <meta property="og:locale" content="id_ID" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="androidponsel.com comparation smartphone device"
                />
                <meta
                    property="og:image"
                    content={apiUrl + props.dataSEO.seo.ogimage.url}
                />

                <meta
                    property="og:description"
                    content="comparation review android and iphone device "
                />
                <meta
                    property="og:url"
                    content="https://www.androidponsel.com/device"
                />
                <script
                    async
                    src={urlAds + props.dataSEO.ads}
                    crossorigin="anonymous"
                ></script>
            </Head>
            {/* Ads 1 id 6 */}
            {props.adsData6.published_at !== null && (
                <div style={{ textAlign: "center" }}>
                    {props.adsData6.Image_Banner ? (
                        <AdsBanner
                            urlImage={
                                apiUrl + props.adsData6.Image_Banner.url
                            }
                            width={props.adsData6.Image_Banner.width}
                            height={props.adsData6.Image_Banner.height}
                            linkbanner={props.adsData6.url}
                        />
                    ) : (
                        <Ads
                            iframeBanner={ReactHtmlParser(
                                props.adsData6.URL_Iframe
                            )}
                        />
                    )}
                </div>
            )}

            <div className={styles.pagelisthandphone}>
                <div className={styles.contents}>
                    <Title title="Mobile Phones"></Title>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                {props.dataListHandphone.map((item, i) => {
                                    return (
                                        <div className="col-lg-3 col-6" key={item.id}>
                                            <ItemProduct action={getLocalProd} title={item.title} memoryInternal={item.memory_internal} rating={item.rating}
                                                voters={item.total_voters} productImage={item.product_image[0]} slug={item.slug} />
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Ads 2 id 7 */}
                            {props.adsData7.published_at !== null && (
                                <div style={{ textAlign: "center" }}>
                                    {props.adsData7.Image_Banner ? (
                                        <AdsBanner
                                            urlImage={
                                                apiUrl + props.adsData7.Image_Banner.url
                                            }
                                            width={props.adsData7.Image_Banner.width}
                                            height={props.adsData7.Image_Banner.height}
                                            linkbanner={props.adsData7.url}
                                        />
                                    ) : (
                                        <Ads
                                            iframeBanner={ReactHtmlParser(
                                                props.adsData7.URL_Iframe
                                            )}
                                        />
                                    )}
                                </div>
                            )}

                            <div className="row">
                                {props.dataListHandphone2.map((item, i) => {
                                    return (
                                        <div className="col-lg-3 col-6" key={item.id}>
                                            <ItemProduct action={getLocalProd} title={item.title} memoryInternal={item.memory_internal} rating={item.rating}
                                                voters={item.total_voters} productImage={item.product_image[0]} slug={item.slug} />
                                        </div>
                                    );
                                })}
                            </div>
                            <div id="other"></div>
                            {/* Ads 2 id 8 */}
                            {props.adsData8.published_at !== null && (
                                <div style={{ textAlign: "center", marginBottom: 30 }}>
                                    {props.adsData8.Image_Banner ? (
                                        <AdsBanner
                                            urlImage={
                                                apiUrl + props.adsData8.Image_Banner.url
                                            }
                                            width={props.adsData8.Image_Banner.width}
                                            height={props.adsData8.Image_Banner.height}
                                            linkbanner={props.adsData8.url}
                                        />
                                    ) : (
                                        <Ads
                                            iframeBanner={ReactHtmlParser(
                                                props.adsData8.URL_Iframe
                                            )}
                                        />
                                    )}
                                </div>
                            )}
                            <Title title="Other Devices"></Title>
                            <div className="row">
                                {props.dataListOthers.map((item, i) => {
                                    return (
                                        <div className="col-lg-3 col-6" key={item.id}>
                                            <ItemProduct action={getLocalProd} title={item.title} memoryInternal={item.memory_internal} rating={item.rating}
                                                voters={item.total_voters} productImage={item.product_image[0]} slug={item.slug} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <Paging linkPrev={0} linkNext={`${1 + 1}`} lengthPost={props.totalPaging} />
                </div>
            </div>
            <div className={styles.containerCompare}>
                {
                    show && (
                        <Fragment>
                            <div className={styles.desc}>
                                Compare Product:
                                {compare1 && <h5>{compare1}</h5>}
                                {compare2 && <h5>{compare2}</h5>}
                                {compare3 && <h5>{compare3}</h5>}
                            </div>
                            <div className={styles.wrpAction}>
                                <div className={styles.btnCompareProd} onClick={() => goToCompare()} >
                                    See Comparation <span>({totalCompare})</span>
                                </div>
                            </div>
                        </Fragment>
                    )
                }
            </div>
        </Layout>
    );
}

export async function getStaticProps() {
    const posts = await fetchData(`/products?category=1&rumor=0`);
    const dataListHandphone = await fetchData(`/products?category=1&rumor=0&_limit=${totalItem}&_sort=release_date:DESC`);
    const dataListHandphone2 = await fetchData(`/products?category=1&rumor=0&_limit=${8}&_start=8&_sort=release_date:DESC`);
    const dataListOthers = await fetchData(`/products?category=2&category=3&category=4&_limit=${8}&rumor=0&_sort=release_date:DESC`);
    const totalPaging = Math.ceil(posts.length / (totalItem * 2));
    const dataBanerProdukTop = await fetchData(`/ads/8?_publicationState=preview`);
    const dataBanerProdukBody = await fetchData(`/ads/9?_publicationState=preview`);
    const dataSEO = await fetchData("/general");
    const getMenu = await fetchData("/menus?_sort=order");
    const getTopBrands = await fetchData("/brands?_top_brand=true");
    const adsData6 = await fetchData(`/ads/6?_publicationState=preview`);
    const adsData7 = await fetchData(`/ads/7?_publicationState=preview`);
    const adsData8 = await fetchData(`/ads/8?_publicationState=preview`);

    return {
        props: {
            dataListHandphone,
            dataListHandphone2,
            dataListOthers,
            getMenu,
            getTopBrands,
            dataSEO,
            dataBanerProdukTop,
            dataBanerProdukBody,
            totalPaging,
            adsData6,
            adsData7,
            adsData8
        },
        revalidate: 3
    };
}
