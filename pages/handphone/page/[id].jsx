import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router"
import { Paging, Title, Ads, AdsBanner, LoadAds } from "../../../components";
import ItemProduct from "../../../components/products/item";
import { fetchData } from "../../../config/data";
import { apiUrl, baseUrl, totalItem, urlAds } from "../../../config/variable";
import Layout from "../../../layout";
import styles from "../index.module.scss";
import Head from "next/head";
import ReactHtmlParser from "react-html-parser";

export default function Page(props) {
    const router = useRouter();
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
            // removeLocalProd();
        }

        if (p2 == null) {
            setCompare2("")
        }
        if (p3 == null) {
            setCompare3("")
        }

    }
    useEffect(() => {
        props.adsData6.URL_Iframe
            ? LoadAds()
            : null;
        return (
            getLocalProd()
        )
    }, []);
    return (
        <Layout
            dataMainMenu={props.getMenu}
            dataBrands={props.getTopBrands}
        >
            <Head>
                <title>
                    {props.dataSEO.seo.title +
                        " Androidponsel spesifikasi dan perbandingan handphone"}{" "}
                </title>
                <meta
                    name="description"
                    content={props.dataSEO.seo.description}
                />
                <meta
                    name="keywords"
                    content={props.dataSEO.seo.keywords}
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
                    content={
                        props.dataSEO.seo.title +
                        " Androidponsel spesifikasi dan perbandingan handphone"
                    }
                />
                <meta
                    property="og:image"
                    content={apiUrl + props.dataSEO.seo.ogimage.url}
                />

                <meta
                    property="og:description"
                    content={props.dataSEO.seo.description}
                />
                <meta
                    property="og:url"
                    content="https://www.androidponsel.com/"
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
                    <Title title="Handphone" />
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
                        </div>
                    </div>

                    <Paging linkPrev={`${parseInt(props.params.id) - 1}`} linkNext={`${parseInt(props.params.id) + 1}`} lengthPost={props.totalPaging} />
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

    )
}

export async function getStaticPaths() {
    const posts = await fetchData("/products?category=1");
    const totalPaging = Math.ceil(posts.length / (totalItem * 2));
    const pages = []
    for (let i = 1; i <= totalPaging; i++) {
        pages.push(i)
    }
    const paths = pages.map((item, i) => ({
        params: {
            id: `${item}`
        },
    }))
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const adsData6 = await fetchData(`/ads/6?_publicationState=preview`);
    const page = 0;
    const dataSEO = await fetchData("/general");
    const getMenu = await fetchData("/menus?_sort=order");
    const getTopBrands = await fetchData("/brands?_top_brand=true");
    const dataListHandphone = await fetchData(`/products?category=1&_limit=${totalItem * 2}&_start=${(params.id - 1) * 12}&_sort=release_date:DESC`);
    const lengthPost = dataListHandphone.length;
    const posts = await fetchData("/products?category=1");
    const totalPaging = Math.ceil(posts.length / (totalItem * 2));
    if (!dataSEO || !getMenu || !getTopBrands || !dataListHandphone) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            params,
            lengthPost,
            getMenu,
            getTopBrands,
            dataSEO,
            dataListHandphone,
            totalPaging,
            adsData6
        },
        revalidate: 3
    }
}

