import { useRouter } from 'next/router'
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Ads, AdsBanner, Rate, Title } from "../../components";
import { apiUrl, baseUrl, totalItem } from "../../config/variable";
import styles from "./index.module.scss";
import { fetchData } from '../../config/data';
import Layout from '../../layout';
import ItemProduct from '../../components/products/item';

export default function Handphone(props) {
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

    const [ads2, setAds2] = useState({
        iframe: [],
        bannerImage: [],
        link: [],
        urlImage: [],
        widthImage: [],
        heightImage: [],
    });
    const getAds2 = () => {
        props.dataBanerProdukBody.Image_Banner === null
            ? setAds2({ iframe: props.dataBanerProdukBody.URL_Iframe })
            : setAds2({
                bannerImage: "withBanner",
                link: dataTopAds.url,
                urlImage: apiUrl + dataTopAds.Image_Banner.url,
                widthImage: dataTopAds.Image_Banner.width,
                heightImage: dataTopAds.Image_Banner.height,
            });
    };


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
            }
            else if (p1 !== null && p2 !== null && p3 == null) {
                setCompare2(titleCompare2.title)
            }
            else if (p1 !== null && p2 !== null) {
                setCompare1(titleCompare1.title)
                setCompare2(titleCompare2.title)
                setCompare3(titleCompare3.title)
            }
            else if (p1 !== null && p3 !== null) {
                setCompare1(titleCompare1.title)
                setCompare2("")
                setCompare3(titleCompare3.title)
            }
            else {
                if (p2 !== null || p3 !== null) {
                    setCompare1("")
                }
                else {
                    setCompare3(titleCompare3.title)
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
        getAds1();
        getAds2();
        removeLocalProd();
        return (
            getLocalProd()
        )
    }, []);

    return (
        <Layout
            dataSEO={props.dataSEO.seo}
            dataMainMenu={props.getMenu}
            dataBrands={props.getTopBrands}
        >
            {props.dataBanerProdukTop.published_at && (
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
                                {props.dataListHandphone.map((item, i) => {
                                    return (
                                        <div className="col-lg-3" key={item.id}>
                                            <ItemProduct action={getLocalProd} title={item.title} memoryInternal={item.memory_internal} rating={item.rating} productImage={item.product_image[0]} slug={item.slug} />
                                        </div>
                                    );
                                })}
                            </div>
                            {props.dataBanerProdukBody.published_at && (
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
                                {props.dataListHandphone.map((item, i) => {
                                    return (
                                        <div className="col-lg-3" key={item.id}>
                                            <ItemProduct action={getLocalProd} title={item.title} memoryInternal={item.memory_internal} rating={item.rating} productImage={item.product_image[0]} slug={item.slug} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.containerCompare}>
                {
                    show && (
                        <Fragment>
                            <div className={styles.desc}>
                                Badingkan Produk:
                                {compare1 && <h5>{compare1}</h5>}
                                {compare2 && <h5>{compare2}</h5>}
                                {compare3 && <h5>{compare3}</h5>}
                            </div>
                            <div className={styles.wrpAction}>
                                <div className={styles.btnCompareProd} onClick={() => goToCompare()} >
                                    Lihat Bandingkan
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
