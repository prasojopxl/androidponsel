import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
import { Title, GlobalAds, ItemProduct, Ads, AdsBanner } from "../components/";
import { fetchData, fetchDataApp, fetchDataBlog } from "../config/data";
import { apiUrl, baseUrl, staticImage } from "../config/variable";
import Layout from "../layout";
import styles from "./index.module.scss";
import Head from "next/head";

export default function Home(props) {
    const router = useRouter();
    const [totalCompare, setTotalCompare] = useState(0);
    function removeLocalProd() {
        localStorage.removeItem("produk1");
        localStorage.removeItem("produk2");
        localStorage.removeItem("produk3");
        setCompare1("");
        setCompare2("");
        setCompare3("");
    }
    const goToCompare = () => {
        const p1 = localStorage.getItem("produk1");
        const p2 = localStorage.getItem("produk2");
        const p3 = localStorage.getItem("produk3");
        const titleCompare1 = JSON.parse(localStorage.getItem("produk1"));
        const titleCompare2 = JSON.parse(localStorage.getItem("produk2"));
        const titleCompare3 = JSON.parse(localStorage.getItem("produk3"));
        if (p1 !== null && p2 == null && p3 == null) {
            router.push(
                `${baseUrl}handphone/compare?produk1=${titleCompare1.slug}`
            );
            removeLocalProd();
        } else if (p1 !== null && p2 !== null && p3 == null) {
            router.push(
                `${baseUrl}handphone/compare?produk1=${titleCompare1.slug}&produk2=${titleCompare2.slug}`
            );
            removeLocalProd();
        } else {
            router.push(
                `${baseUrl}handphone/compare?produk1=${titleCompare1.slug}&produk2=${titleCompare2.slug}&produk3=${titleCompare3.slug}`
            );
            removeLocalProd();
        }
    };
    const [show, setShow] = useState(false);
    const [compare1, setCompare1] = useState("");
    const [compare2, setCompare2] = useState("");
    const [compare3, setCompare3] = useState("");
    const getLocalProd = () => {
        const p1 = localStorage.getItem("produk1");
        const p2 = localStorage.getItem("produk2");
        const p3 = localStorage.getItem("produk3");
        const titleCompare1 = JSON.parse(localStorage.getItem("produk1"));
        const titleCompare2 = JSON.parse(localStorage.getItem("produk2"));
        const titleCompare3 = JSON.parse(localStorage.getItem("produk3"));
        if (p1 !== null || p2 !== null || p3 !== null) {
            setShow(true);
            if (p1 !== null && p2 == null && p3 == null) {
                setCompare1(titleCompare1.title);
                setTotalCompare(1);
            } else if (p1 !== null && p2 !== null && p3 == null) {
                setCompare2(titleCompare2.title);
                setTotalCompare(2);
            } else if (p1 !== null && p2 !== null) {
                setCompare1(titleCompare1.title);
                setCompare2(titleCompare2.title);
                setCompare3(titleCompare3.title);
                setTotalCompare(3);
            } else if (p1 !== null && p3 !== null) {
                setCompare1(titleCompare1.title);
                setCompare2("");
                setCompare3(titleCompare3.title);
                setTotalCompare(2);
            } else {
                if (p2 !== null || p3 !== null) {
                    setCompare1("");
                } else {
                    setCompare3(titleCompare3.title);
                    setTotalCompare(1);
                }
            }
        } else {
            setShow(false);
            removeLocalProd();
        }

        if (p2 == null) {
            setCompare2("");
        }
        if (p3 == null) {
            setCompare3("");
        }
    };
    const loadAds = () => {
        try {
            if (typeof window !== "undefined") {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (error) {
            console.log("adsense error", error.message);
        }
    };
    useEffect(() => {
        props.adsData1.URL_Iframe ||
        props.adsData2.URL_Iframe ||
        props.adsData3.URL_Iframe ||
        props.adsData4.URL_Iframe
            ? loadAds()
            : null;
        removeLocalProd();
        return getLocalProd();
    }, []);
    return (
        <React.Fragment>
            <Layout
                dataMainMenu={props.getMenu}
                dataSEO={props.dataSEO.seo}
                dataBrands={props.getTopBrands}
                dataProd={props.dataAllProd}
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
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4889404422926996"
                        crossorigin="anonymous"
                    ></script>
                </Head>
                {/* ads 1 */}
                {props.adsData1.published_at !== null && (
                    <div style={{ textAlign: "center" }}>
                        props.adsData1.Image_Banner ? (
                        <AdsBanner
                            urlImage={apiUrl + props.adsData1.Image_Banner.url}
                            width={props.adsData1.Image_Banner.width}
                            height={props.adsData1.Image_Banner.height}
                            linkbanner={props.adsData1.url}
                        />
                        ) : (
                        <Ads
                            iframeBanner={ReactHtmlParser(
                                props.adsData1.URL_Iframe
                            )}
                        />
                        )
                    </div>
                )}
                <div className={styles.compareItem}>
                    <div className={styles.contens}>
                        <div className="containerComparehome">
                            <Title title="Top Comparation" />
                            <div className="row">
                                {props.dataCompare.map((item, index) => {
                                    return (
                                        <div
                                            className="col-lg-6 col-md-6 col-sm-12 col-12 col-top-compared"
                                            key={item.id}
                                        >
                                            <div className={styles.itemcompare}>
                                                <div
                                                    className={
                                                        styles.wrpCompare
                                                    }
                                                >
                                                    {item.products.map(
                                                        (data) => {
                                                            return (
                                                                <div
                                                                    className={
                                                                        styles.item
                                                                    }
                                                                    key={
                                                                        data.id
                                                                    }
                                                                >
                                                                    <div
                                                                        className={
                                                                            styles.imgwrp
                                                                        }
                                                                    >
                                                                        <Link
                                                                            href={
                                                                                baseUrl +
                                                                                "handphone/" +
                                                                                data.slug
                                                                            }
                                                                        >
                                                                            <a>
                                                                                <Image
                                                                                    src={
                                                                                        apiUrl +
                                                                                        data
                                                                                            .product_image[0]
                                                                                            .url
                                                                                    }
                                                                                    width={
                                                                                        data
                                                                                            .product_image[0]
                                                                                            .width /
                                                                                        2
                                                                                    }
                                                                                    height={
                                                                                        data
                                                                                            .product_image[0]
                                                                                            .height /
                                                                                        2
                                                                                    }
                                                                                    alt={
                                                                                        data
                                                                                            .product_image[0]
                                                                                            .name
                                                                                    }
                                                                                ></Image>
                                                                            </a>
                                                                        </Link>
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            styles.contentDec
                                                                        }
                                                                    >
                                                                        <div className="flexing-title-compare">
                                                                            <Link
                                                                                href={
                                                                                    baseUrl +
                                                                                    "handphone/" +
                                                                                    data.slug
                                                                                }
                                                                            >
                                                                                <a className="min_heigh_two_lines">
                                                                                    <h5 className="mediumtitleTile">
                                                                                        {
                                                                                            data.title
                                                                                        }
                                                                                    </h5>
                                                                                </a>
                                                                            </Link>
                                                                            <h6>
                                                                                {
                                                                                    data.memory_internal
                                                                                }
                                                                            </h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                                <Link
                                                    href={
                                                        baseUrl +
                                                        "handphone/compare?produk1=" +
                                                        item.products[0].slug +
                                                        "&produk2=" +
                                                        item.products[1].slug
                                                    }
                                                >
                                                    <a
                                                        className={
                                                            styles.fullLink
                                                        }
                                                    >
                                                        <div
                                                            style={{
                                                                marginRight:
                                                                    "10px",
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <Image
                                                                src={
                                                                    staticImage +
                                                                    "/icon-vs-small.png"
                                                                }
                                                                width={31}
                                                                height={21}
                                                                alt="camera"
                                                            />
                                                        </div>
                                                        See Comparation
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* ads 2 */}
                        {props.adsData2.published_at && (
                            <div style={{ textAlign: "center" }}>
                                props.adsData2.Image_Banner ? (
                                <AdsBanner
                                    urlImage={
                                        apiUrl + props.adsData2.Image_Banner.url
                                    }
                                    width={props.adsData2.Image_Banner.width}
                                    height={props.adsData2.Image_Banner.height}
                                    linkbanner={props.adsData2.url}
                                />
                                ) : (
                                <Ads
                                    iframeBanner={ReactHtmlParser(
                                        props.adsData2.URL_Iframe
                                    )}
                                />
                                )
                            </div>
                        )}
                        <div className="containerComparehome">
                            <div className="row">
                                {props.dataListHandphone.map((item, i) => {
                                    return (
                                        <div
                                            className="col-lg-3 col-6"
                                            key={item.id}
                                        >
                                            <ItemProduct
                                                action={getLocalProd}
                                                title={item.title}
                                                memoryInternal={
                                                    item.memory_internal
                                                }
                                                rating={item.rating}
                                                voters={item.total_voters}
                                                productImage={
                                                    item.product_image[0]
                                                }
                                                slug={item.slug}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="btnMediumLoad">
                                <Link href={baseUrl + "handphone"}>
                                    <a className="btn ap-btn-secondary ap-btn-md">
                                        See Details
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Ads 3 */}
                {props.adsData3.published_at && (
                    <div style={{ textAlign: "center" }}>
                        props.adsData3.Image_Banner ? (
                        <AdsBanner
                            urlImage={apiUrl + props.adsData3.Image_Banner.url}
                            width={props.adsData3.Image_Banner.width}
                            height={props.adsData3.Image_Banner.height}
                            linkbanner={props.adsData3.url}
                        />
                        ) : (
                        <Ads
                            iframeBanner={ReactHtmlParser(
                                props.adsData3.URL_Iframe
                            )}
                        />
                        )
                    </div>
                )}
                <div className={styles.latestnews}>
                    <div className={styles.contents}>
                        <Title title="News Updates" />
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                                        {props.dataAndroidNews.map(
                                            (item, i) => {
                                                return (
                                                    <div
                                                        className="largeFeatured"
                                                        key={item.id}
                                                    >
                                                        <div className="wrpFeatured">
                                                            <Link
                                                                href={item.link}
                                                            >
                                                                <a>
                                                                    <Image
                                                                        src={
                                                                            item
                                                                                ._embedded[
                                                                                "wp:featuredmedia"
                                                                            ][0]
                                                                                .source_url
                                                                        }
                                                                        width={
                                                                            item
                                                                                ._embedded[
                                                                                "wp:featuredmedia"
                                                                            ][0]
                                                                                .media_details
                                                                                .width
                                                                        }
                                                                        height={
                                                                            item
                                                                                ._embedded[
                                                                                "wp:featuredmedia"
                                                                            ][0]
                                                                                .media_details
                                                                                .height
                                                                        }
                                                                        alt={
                                                                            item
                                                                                .title
                                                                                .rendered
                                                                        }
                                                                    />
                                                                </a>
                                                            </Link>
                                                        </div>
                                                        <div className="descFeatured">
                                                            <div className="tagGreen">
                                                                {item._embedded[
                                                                    "wp:term"
                                                                ][0].map(
                                                                    (data) => {
                                                                        return (
                                                                            <a
                                                                                href={
                                                                                    data.link
                                                                                }
                                                                                key={
                                                                                    data.id
                                                                                }
                                                                            >
                                                                                {
                                                                                    data.name
                                                                                }
                                                                            </a>
                                                                        );
                                                                    }
                                                                )}
                                                            </div>
                                                            <div className="feturedCard">
                                                                <a
                                                                    href={
                                                                        item.link
                                                                    }
                                                                >
                                                                    <h4 className="titlefloatingCard">
                                                                        {
                                                                            item
                                                                                .title
                                                                                .rendered
                                                                        }
                                                                    </h4>
                                                                </a>
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.infodate
                                                                }
                                                            >
                                                                <span>
                                                                    By{" "}
                                                                    {
                                                                        item
                                                                            ._embedded
                                                                            .author[0]
                                                                            .name
                                                                    }
                                                                </span>
                                                                <span>
                                                                    {item.date.substr(
                                                                        0,
                                                                        10
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                    <div className="col-lg-7 col-md-7 col-sm-12 col-12">
                                        <div className={styles.wrptopnews}>
                                            <div className="row">
                                                {props.topNews.map(
                                                    (item, i) => {
                                                        return (
                                                            <div
                                                                className="col-lg-6 col-md-6 col-sm-6 col-6"
                                                                key={item.id}
                                                            >
                                                                <div
                                                                    className="row gutter-10"
                                                                    key={
                                                                        item.id
                                                                    }
                                                                >
                                                                    <div className="col-lg-5 col-md-12 col-sm-3 col-12">
                                                                        <div className="wrp_thumbapps">
                                                                            <a
                                                                                href={
                                                                                    item.link
                                                                                }
                                                                            >
                                                                                <Image
                                                                                    src={
                                                                                        item
                                                                                            ._embedded[
                                                                                            "wp:featuredmedia"
                                                                                        ][0]
                                                                                            .source_url
                                                                                    }
                                                                                    width={
                                                                                        item
                                                                                            ._embedded[
                                                                                            "wp:featuredmedia"
                                                                                        ][0]
                                                                                            .media_details
                                                                                            .width /
                                                                                        6
                                                                                    }
                                                                                    height={
                                                                                        item
                                                                                            ._embedded[
                                                                                            "wp:featuredmedia"
                                                                                        ][0]
                                                                                            .media_details
                                                                                            .height /
                                                                                        6
                                                                                    }
                                                                                    alt={
                                                                                        item
                                                                                            .title
                                                                                            .rendered
                                                                                    }
                                                                                />
                                                                            </a>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-7 col-md-12 col-sm-9 col-12">
                                                                        <div
                                                                            className={
                                                                                styles.tags
                                                                            }
                                                                        >
                                                                            {item._embedded[
                                                                                "wp:term"
                                                                            ][0].map(
                                                                                (
                                                                                    data
                                                                                ) => {
                                                                                    return (
                                                                                        <a
                                                                                            href={
                                                                                                data.link
                                                                                            }
                                                                                            key={
                                                                                                data.id
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                data.name
                                                                                            }
                                                                                        </a>
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </div>
                                                                        <div className="sm_title_cardNews">
                                                                            <a
                                                                                href={
                                                                                    item.link
                                                                                }
                                                                            >
                                                                                <h5 className="smalltitleTile">
                                                                                    {
                                                                                        item
                                                                                            .title
                                                                                            .rendered
                                                                                    }
                                                                                </h5>
                                                                            </a>
                                                                            <div
                                                                                className={
                                                                                    styles.infodate
                                                                                }
                                                                            >
                                                                                <span>
                                                                                    By{" "}
                                                                                    {
                                                                                        item
                                                                                            ._embedded
                                                                                            .author[0]
                                                                                            .name
                                                                                    }
                                                                                </span>
                                                                                <span>
                                                                                    {item.date.substr(
                                                                                        0,
                                                                                        10
                                                                                    )}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                textAlign: "center",
                                display: "block",
                                marginTop: 30,
                            }}
                        >
                            <a
                                href="https://www.androidponsel.com/news/"
                                className="btn ap-btn-secondary ap-btn-md"
                            >
                                See More News Updates
                            </a>
                        </div>
                    </div>
                </div>
                {/* ads 4 */}
                {props.adsData4.published_at && (
                    <div style={{ textAlign: "center" }}>
                        props.adsData4.Image_Banner ? (
                        <AdsBanner
                            urlImage={apiUrl + props.adsData4.Image_Banner.url}
                            width={props.adsData4.Image_Banner.width}
                            height={props.adsData4.Image_Banner.height}
                            linkbanner={props.adsData4.url}
                        />
                        ) : (
                        <Ads
                            iframeBanner={ReactHtmlParser(
                                props.adsData4.URL_Iframe
                            )}
                        />
                        )
                    </div>
                )}
                <div className={styles.kanalapp}>
                    <div className={styles.contents}>
                        <Title title="Application Channel" />
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-5 col-md-12 col-sm-12 col-12">
                                        {props.topApp.map((item, i) => {
                                            return (
                                                <div
                                                    className="largeFeatured"
                                                    key={item.id}
                                                >
                                                    <div className="wrpFeatured">
                                                        <a
                                                            href={item.link}
                                                            className={
                                                                styles.imageFeature
                                                            }
                                                        >
                                                            <Image
                                                                src={
                                                                    item
                                                                        ._embedded[
                                                                        "wp:featuredmedia"
                                                                    ][0]
                                                                        .source_url
                                                                }
                                                                width={
                                                                    item
                                                                        ._embedded[
                                                                        "wp:featuredmedia"
                                                                    ][0]
                                                                        .media_details
                                                                        .width
                                                                }
                                                                height={
                                                                    item
                                                                        ._embedded[
                                                                        "wp:featuredmedia"
                                                                    ][0]
                                                                        .media_details
                                                                        .height
                                                                }
                                                                alt={
                                                                    item.title
                                                                        .rendered
                                                                }
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="descFeatured">
                                                        <div className="tagGreen">
                                                            {item._embedded[
                                                                "wp:term"
                                                            ][0].map((data) => {
                                                                return (
                                                                    <a
                                                                        href={
                                                                            data.link
                                                                        }
                                                                        key={
                                                                            data.id
                                                                        }
                                                                    >
                                                                        {
                                                                            data.name
                                                                        }
                                                                    </a>
                                                                );
                                                            })}
                                                        </div>
                                                        <div className="feturedCard">
                                                            <a href={item.link}>
                                                                <h4 className="titlefloatingCard">
                                                                    {
                                                                        item
                                                                            .title
                                                                            .rendered
                                                                    }
                                                                </h4>
                                                            </a>
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.infodate
                                                            }
                                                        >
                                                            <span>
                                                                By{" "}
                                                                {
                                                                    item
                                                                        ._embedded
                                                                        .author[0]
                                                                        .name
                                                                }
                                                            </span>
                                                            <span>
                                                                {item.date.substr(
                                                                    0,
                                                                    10
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="col-lg-7 col-md-12 col-sm-12 col-12">
                                        <div className={styles.wrptopnews}>
                                            <div className="row">
                                                {props.listApp.map(
                                                    (item, i) => {
                                                        return (
                                                            <div
                                                                className="col-lg-6 col-md-6 col-sm-6 col-12"
                                                                key={item.id}
                                                            >
                                                                <div
                                                                    className="row gutter-10"
                                                                    key={
                                                                        item.id
                                                                    }
                                                                >
                                                                    <div className="col-lg-5 col-md-5 col-sm-4 col-4">
                                                                        <div className="wrp_thumbapps">
                                                                            <a
                                                                                href={
                                                                                    item.link
                                                                                }
                                                                            >
                                                                                <Image
                                                                                    src={
                                                                                        item
                                                                                            ._embedded[
                                                                                            "wp:featuredmedia"
                                                                                        ][0]
                                                                                            .source_url
                                                                                    }
                                                                                    width={
                                                                                        item
                                                                                            ._embedded[
                                                                                            "wp:featuredmedia"
                                                                                        ][0]
                                                                                            .media_details
                                                                                            .width /
                                                                                        6
                                                                                    }
                                                                                    height={
                                                                                        item
                                                                                            ._embedded[
                                                                                            "wp:featuredmedia"
                                                                                        ][0]
                                                                                            .media_details
                                                                                            .height /
                                                                                        6
                                                                                    }
                                                                                    alt={
                                                                                        item
                                                                                            .title
                                                                                            .rendered
                                                                                    }
                                                                                />
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-7 col-md-7 col-sm-8 col-8">
                                                                        <div
                                                                            className={
                                                                                styles.tags
                                                                            }
                                                                        >
                                                                            {item._embedded[
                                                                                "wp:term"
                                                                            ][0].map(
                                                                                (
                                                                                    data
                                                                                ) => {
                                                                                    return (
                                                                                        <a
                                                                                            href={
                                                                                                data.link
                                                                                            }
                                                                                            key={
                                                                                                data.id
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                data.name
                                                                                            }
                                                                                        </a>
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </div>
                                                                        <div className="sm_title_cardNews">
                                                                            <a
                                                                                href={
                                                                                    item.link
                                                                                }
                                                                            >
                                                                                <h5 className="smalltitleTile">
                                                                                    {
                                                                                        item
                                                                                            .title
                                                                                            .rendered
                                                                                    }
                                                                                </h5>
                                                                            </a>
                                                                        </div>
                                                                        <div
                                                                            className={
                                                                                styles.infodate
                                                                            }
                                                                        >
                                                                            <span>
                                                                                By{" "}
                                                                                {
                                                                                    item
                                                                                        ._embedded
                                                                                        .author[0]
                                                                                        .name
                                                                                }
                                                                            </span>
                                                                            <span>
                                                                                {item.date.substr(
                                                                                    0,
                                                                                    10
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                textAlign: "center",
                                display: "block",
                                marginTop: 30,
                            }}
                        >
                            <a
                                href="https://www.androidponsel.com/download/"
                                className="btn ap-btn-secondary ap-btn-md"
                            >
                                See More Other Apllication
                            </a>
                        </div>
                    </div>
                </div>
                {/* ads 5 */}
                {props.adsData5.published_at && (
                    <div style={{ textAlign: "center" }}>
                        props.adsData5.Image_Banner ? (
                        <AdsBanner
                            urlImage={apiUrl + props.adsData5.Image_Banner.url}
                            width={props.adsData5.Image_Banner.width}
                            height={props.adsData5.Image_Banner.height}
                            linkbanner={props.adsData5.url}
                        />
                        ) : (
                        <Ads
                            iframeBanner={ReactHtmlParser(
                                props.adsData5.URL_Iframe
                            )}
                        />
                        )
                    </div>
                )}
                <div className={styles.tipstrik}>
                    <div className={styles.contents}>
                        <Title title="Tips & Tricks"></Title>
                        <div className="row">
                            <div className="col-lg-5 col-md-12 col-sm-12 col-12">
                                <div className={styles.maintipstrik}>
                                    {props.tipsTrikMain.map((item, i) => {
                                        return (
                                            <div key={item.id}>
                                                <div className="largeFeatured">
                                                    <div className="wrpFeatured">
                                                        <a href={item.link}>
                                                            <Image
                                                                src={
                                                                    item
                                                                        ._embedded[
                                                                        "wp:featuredmedia"
                                                                    ][0]
                                                                        .source_url
                                                                }
                                                                width={
                                                                    item
                                                                        ._embedded[
                                                                        "wp:featuredmedia"
                                                                    ][0]
                                                                        .media_details
                                                                        .width
                                                                }
                                                                height={
                                                                    item
                                                                        ._embedded[
                                                                        "wp:featuredmedia"
                                                                    ][0]
                                                                        .media_details
                                                                        .height
                                                                }
                                                                alt={
                                                                    item.title
                                                                        .rendered
                                                                }
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="descFeatured">
                                                        {/* <div
                                                            className={
                                                                styles.imgwrp
                                                            }
                                                        >
                                                            <Image
                                                                src={
                                                                    item
                                                                        ._embedded[
                                                                        "wp:featuredmedia"
                                                                    ][0]
                                                                        .source_url
                                                                }
                                                                width={
                                                                    item
                                                                        ._embedded[
                                                                        "wp:featuredmedia"
                                                                    ][0]
                                                                        .media_details
                                                                        .width
                                                                }
                                                                height={
                                                                    item
                                                                        ._embedded[
                                                                        "wp:featuredmedia"
                                                                    ][0]
                                                                        .media_details
                                                                        .height
                                                                }
                                                                alt={
                                                                    item.title
                                                                        .rendered
                                                                }
                                                            />
                                                        </div> */}
                                                        <div className="feturedCard">
                                                            <a href={item.link}>
                                                                <h4 className="titlefloatingCard">
                                                                    {
                                                                        item
                                                                            .title
                                                                            .rendered
                                                                    }
                                                                </h4>
                                                            </a>
                                                        </div>
                                                        {ReactHtmlParser(
                                                            item.excerpt
                                                                .rendered
                                                        )}
                                                        <div
                                                            className={
                                                                styles.infodate
                                                            }
                                                        >
                                                            <span>
                                                                By{" "}
                                                                {
                                                                    item
                                                                        ._embedded
                                                                        .author[0]
                                                                        .name
                                                                }
                                                            </span>
                                                            <span>
                                                                {item.date.substr(
                                                                    0,
                                                                    10
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-12 col-sm-12 col-12">
                                <div className={styles.secondtipstrik}>
                                    <div className="row">
                                        {props.tipsTrikSecond.map((item, i) => {
                                            return (
                                                <div
                                                    className="col-lg-6 col-md-6 col-sm-6 col-12"
                                                    key={item.id}
                                                >
                                                    <div
                                                        className="row gutter-10"
                                                        key={item.id}
                                                    >
                                                        <div className="col-lg-7 col-md-7 col-sm-8 col-8">
                                                            <div className="sm_title_cardNews">
                                                                <div
                                                                    className={
                                                                        styles.tags
                                                                    }
                                                                >
                                                                    {item._embedded[
                                                                        "wp:term"
                                                                    ][0].map(
                                                                        (
                                                                            data
                                                                        ) => {
                                                                            return (
                                                                                <a
                                                                                    href={
                                                                                        data.link
                                                                                    }
                                                                                    key={
                                                                                        data.id
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        data.name
                                                                                    }
                                                                                </a>
                                                                            );
                                                                        }
                                                                    )}
                                                                </div>
                                                                <a
                                                                    href={
                                                                        item.link
                                                                    }
                                                                >
                                                                    <h5 className="smalltitleTile">
                                                                        {
                                                                            item
                                                                                .title
                                                                                .rendered
                                                                        }
                                                                    </h5>
                                                                </a>
                                                                <div
                                                                    className={
                                                                        styles.infodate
                                                                    }
                                                                >
                                                                    <span>
                                                                        By{" "}
                                                                        {
                                                                            item
                                                                                ._embedded
                                                                                .author[0]
                                                                                .name
                                                                        }
                                                                    </span>
                                                                    <span>
                                                                        {item.date.substr(
                                                                            0,
                                                                            10
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-5 col-md-5 col-sm-4 col-4">
                                                            <div className="wrp_thumbapps">
                                                                <a
                                                                    href={
                                                                        item.link
                                                                    }
                                                                >
                                                                    <Image
                                                                        src={
                                                                            item
                                                                                ._embedded[
                                                                                "wp:featuredmedia"
                                                                            ][0]
                                                                                .source_url
                                                                        }
                                                                        width={
                                                                            item
                                                                                ._embedded[
                                                                                "wp:featuredmedia"
                                                                            ][0]
                                                                                .media_details
                                                                                .width
                                                                        }
                                                                        height={
                                                                            item
                                                                                ._embedded[
                                                                                "wp:featuredmedia"
                                                                            ][0]
                                                                                .media_details
                                                                                .height
                                                                        }
                                                                        alt={
                                                                            item
                                                                                .title
                                                                                .rendered
                                                                        }
                                                                    />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                textAlign: "center",
                                display: "block",
                                marginTop: 30,
                            }}
                        >
                            <a
                                href="https://www.androidponsel.com/trik-android/"
                                className="btn ap-btn-secondary ap-btn-md"
                            >
                                See More Tips
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.containerCompare}>
                    {show && (
                        <Fragment>
                            <div className={styles.desc}>
                                Compare Product:
                                {compare1 && <h5>{compare1}</h5>}
                                {compare2 && <h5>{compare2}</h5>}
                                {compare3 && <h5>{compare3}</h5>}
                            </div>
                            <div className={styles.wrpAction}>
                                <div
                                    className={styles.btnCompareProd}
                                    onClick={() => goToCompare()}
                                >
                                    See Comparation{" "}
                                    <span>({totalCompare})</span>
                                </div>
                            </div>
                        </Fragment>
                    )}
                </div>
            </Layout>
        </React.Fragment>
    );
}

export async function getStaticProps(context) {
    const adsData1 = await fetchData(`/ads/1?_publicationState=preview`);
    const adsData2 = await fetchData(`/ads/2?_publicationState=preview`);
    const adsData3 = await fetchData(`/ads/3?_publicationState=preview`);
    const adsData4 = await fetchData(`/ads/4?_publicationState=preview`);
    const adsData5 = await fetchData(`/ads/5?_publicationState=preview`);
    const dataAllProd = await fetchData("/products");
    const dataCompare = await fetchData("/compares?_sort=updated_at:ASC");
    const dataListHandphone = await fetchData(
        `/products?category=1&_limit=8&_sort=release_date:DESC`
    );
    const dataSEO = await fetchData("/general");
    const mainNews = await fetchData(
        "/posts?menu=2&_sort=updated_at:DESC&_limit=1"
    );
    const topNews = await fetchDataBlog(
        "categories=127&per_page=4&_embed=author,wp:featuredmedia,wp:term&offset=1"
    );
    const topApp = await fetchDataApp(
        "per_page=1&_embed=author,wp:featuredmedia,wp:term"
    );
    const listApp = await fetchDataApp(
        "per_page=4&_embed=author,wp:featuredmedia,wp:term&offset=1"
    );
    const tipsTrikMain = await fetchDataBlog(
        "categories=20&per_page=1&_embed=author,wp:featuredmedia,wp:term&offset=0"
    );
    const tipsTrikSecond = await fetchDataBlog(
        "categories=20&per_page=4&_embed=author,wp:featuredmedia,wp:term&offset=1"
    );
    const dataAndroidNews = await fetchDataBlog(
        "categories=127&per_page=1&_embed=author,wp:featuredmedia,wp:term"
    );

    const getMenu = await fetchData("/menus?_sort=order");
    const getTopBrands = await fetchData("/brands?_top_brand=true");
    if (
        !dataCompare ||
        !mainNews ||
        !topNews ||
        !topApp ||
        !dataListHandphone ||
        !listApp ||
        !tipsTrikMain ||
        !tipsTrikSecond ||
        !dataAndroidNews
    ) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            adsData1,
            adsData2,
            adsData3,
            adsData4,
            adsData5,
            dataSEO,
            dataCompare,
            mainNews,
            topNews,
            topApp,
            dataListHandphone,
            listApp,
            tipsTrikMain,
            tipsTrikSecond,
            getMenu,
            getTopBrands,
            dataAndroidNews,
            dataAllProd,
        },
        revalidate: 3,
    };
}
