import { useRouter } from 'next/router'
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Ads, AdsBanner, Rate, Title } from "../../components";
import { apiUrl, baseUrl, totalItem } from "../../config/variable";
import styles from "./index.module.scss";
import { fetchData } from '../../config/data';
import Layout from '../../layout';

export default function Handphone({
    dataListHandphone,
    getMenu,
    getTopBrands,
    dataSEO,
    dataBanerProdukTop,
    dataBanerProdukBody,
}) {
    const router = useRouter()


    const [ads1, setAds1] = useState({
        iframe: [],
        bannerImage: [],
        link: [],
        urlImage: [],
        widthImage: [],
        heightImage: [],
    });
    const getAds1 = () => {
        dataBanerProdukTop.Image_Banner === null
            ? setAds1({ iframe: dataBanerProdukTop.URL_Iframe })
            : setAds1({
                bannerImage: "withBanner",
                link: dataTopAds.url,
                urlImage: apiUrl + dataTopAds.Image_Banner.url,
                widthImage: dataTopAds.Image_Banner.width,
                heightImage: dataTopAds.Image_Banner.height,
            });
    };

    const [ads2, setAds2] = useState({
        iframe: [],
        bannerImage: [],
        link: [],
        urlImage: [],
        widthImage: [],
        heightImage: [],
    });
    const getAds2 = () => {
        dataBanerProdukBody.Image_Banner === null
            ? setAds2({ iframe: dataBanerProdukBody.URL_Iframe })
            : setAds2({
                bannerImage: "withBanner",
                link: dataTopAds.url,
                urlImage: apiUrl + dataTopAds.Image_Banner.url,
                widthImage: dataTopAds.Image_Banner.width,
                heightImage: dataTopAds.Image_Banner.height,
            });
    };

    const compareProd = () => {
        console.log();
    };
    const [show, setShow] = useState(false)
    const [compare1, setCompare1] = useState("")
    const [compare2, setCompare2] = useState("")
    const [compare3, setCompare3] = useState("")
    const [disable, setDisabled] = useState("")
    const addCompare = (slug, e, title) => {
        let p1 = localStorage.getItem("produk1");
        let p2 = localStorage.getItem("produk2");
        let p3 = localStorage.getItem("produk3");
        if (p1 == null && p2 == null && p3 == null) {
            localStorage.setItem("produk1", slug)
            setCompare1(title)
            setShow(true)
            e.target.disabled = true
        }
        else if (p1 !== null && p2 == null && p3 == null) {
            localStorage.setItem("produk2", slug)
            setCompare2(title)
            setShow(true)
            e.target.disabled = true
        }
        else {
            localStorage.setItem("produk3", slug)
            setCompare3(title)
            setDisabled(true)
        }
    }
    function removeLocalProd() {
        localStorage.removeItem("produk1")
        localStorage.removeItem("produk2")
        localStorage.removeItem("produk3")
        setDisabled(false)
    }
    const goToCompare = () => {
        const p1 = localStorage.getItem("produk1");
        const p2 = localStorage.getItem("produk2");
        const p3 = localStorage.getItem("produk3");
        if (p1 === p2 || p1 === p3 || p2 === p3) {
            removeLocalProd();
            setShow(false)
            router.push(`${baseUrl}handphone`)
        }
        else {
            router.push(`${baseUrl}handphone/compare?produk1=${localStorage.getItem("produk1")}&produk2=${localStorage.getItem("produk2")}&produk3=${localStorage.getItem("produk3")}`)
            removeLocalProd();
        }
    }
    const resetCompare = () => {
        const p3 = localStorage.getItem("produk3");
        const p2 = localStorage.getItem("produk2");
        setCompare1("")
        setCompare2("")
        setCompare3("")
        removeLocalProd()
        setShow(false)
        if (p2 == null || p3 == null) {
            location.reload();
        }
    }

    useEffect(() => {
        getAds1();
        getAds2();
        removeLocalProd();
        setShow(false)
    }, []);

    return (
        <Layout
            dataSEO={dataSEO.seo}
            dataMainMenu={getMenu}
            dataBrands={getTopBrands}
        >
            {dataBanerProdukTop.published_at && (
                <Fragment>
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
                </Fragment>
            )}

            <div className={styles.pagelisthandphone}>
                <div className={styles.contents}>
                    <Title title="Handphone"></Title>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                {dataListHandphone.map((item, i) => {
                                    return (
                                        <div className="col-lg-3" key={item.id}>
                                            <div className={styles.productItem}>
                                                <div className={styles.shortproduct}>
                                                    <div className={styles.imageprod}>
                                                        <Image
                                                            src={apiUrl + item.product_image[0].url}
                                                            width={item.product_image[0].width / 3}
                                                            height={item.product_image[0].height / 3}
                                                            alt={item.product_image[0].name}
                                                        />{" "}
                                                    </div>
                                                    <div className={styles.productinfo}>
                                                        <h5>{item.title}</h5>
                                                        <h6>{item.memory_internal}</h6>
                                                        {item.rating !== null && (
                                                            <Rate TotalRate={item.rating} />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={`${styles.wrpbtn}`}>
                                                    <button className={`${styles.btnfull} btncompare`} name="mybtn" onClick={(e) => addCompare(item.slug, e, item.title)} disabled={disable}>
                                                        BANDINGKAN PRODUK
                                                    </button>
                                                    <Link href={`${"/handphone/" + item.slug}`}>
                                                        <a className={styles.btnblank}>
                                                            LIHAT SELENGKAPNYA
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {dataBanerProdukBody.published_at && (
                                <Fragment>
                                    {ads2.bannerImage === "withBanner" ? (
                                        <AdsBanner
                                            linkbanner={ads2.link}
                                            urlImage={ads2.urlImage}
                                            width={ads2.widthImage}
                                            height={ads2.heightImage}
                                        />
                                    ) : (
                                        <Ads banner={ads2.iframe} />
                                    )}
                                </Fragment>
                            )}

                            <div className="row">
                                {dataListHandphone.map((item, i) => {
                                    return (
                                        <div className="col-lg-3" key={item.id}>
                                            <div className={styles.productItem} onClick={compareProd}>
                                                <div className={styles.shortproduct}>
                                                    <div className={styles.imageprod}>
                                                        <Image
                                                            src={apiUrl + item.product_image[0].url}
                                                            width={item.product_image[0].width / 3}
                                                            height={item.product_image[0].height / 3}
                                                            alt={item.product_image[0].name}
                                                        />{" "}
                                                    </div>
                                                    <div className={styles.productinfo}>
                                                        <h5>{item.title}</h5>
                                                        <h6>{item.memory_internal}</h6>
                                                        {item.rating !== null && (
                                                            <Rate TotalRate={item.rating} />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={`${styles.wrpbtn}`}>
                                                    <button className={`${styles.btnfull}`} name="mybtn" onClick={(e) => addCompare(item.slug, e, item.title)} disabled={disable}>
                                                        BANDINGKAN PRODUK
                                                    </button>
                                                    <Link href={`${"/handphone/" + item.slug}`}>
                                                        <a className={styles.btnblank}>
                                                            LIHAT SELENGKAPNYA
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    show && (
                        <div className={styles.containerCompare}>
                            <div className={styles.desc}>
                                {localStorage.getItem("produk1") !== null && <h5>Handphone 1: {compare1}</h5>}
                                {localStorage.getItem("produk2") !== null && <h5>Handphone 2: {compare2}</h5>}
                                {localStorage.getItem("produk3") !== null && <h5>Handphone 3: {compare3}</h5>}
                            </div>
                            <div className={styles.wrpAction}>
                                <div className={styles.btnReset} onClick={() => resetCompare()}>Reset</div>
                                <div className={styles.btnCompareProd} onClick={() => goToCompare()} >
                                    Bandingkan
                                </div>
                            </div>

                        </div>
                    )
                }

            </div>
        </Layout>
    );
}

export async function getStaticProps() {
    const dataListHandphone = await fetchData(`/products?category=1&_limit=${totalItem}`);
    const dataListHandphone2 = await fetchData(`/products?category=1&_limit=${totalItem}&offset=8`);
    const dataBanerProdukTop = await fetchData(`/ads/8?_publicationState=preview`);
    const dataBanerProdukBody = await fetchData(`/ads/9?_publicationState=preview`);
    const dataSEO = await fetchData("/general");
    const getMenu = await fetchData("/menus?_sort=order");
    const getTopBrands = await fetchData("/brands?_top_brand=true");

    return {
        props: {
            dataListHandphone,
            dataListHandphone2,
            getMenu,
            getTopBrands,
            dataSEO,
            dataBanerProdukTop,
            dataBanerProdukBody,
        },
    };
}
