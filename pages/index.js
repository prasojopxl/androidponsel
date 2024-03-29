import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
import { Title, GlobalAds, ItemProduct } from "../components/";
import { fetchData, fetchDataApp, fetchDataBlog } from "../config/data";
import { apiUrl, baseUrl } from "../config/variable";
import Layout from "../layout";
import styles from "./index.module.scss";

//exp
export async function getStaticProps(context) {
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
    useEffect(() => {
        removeLocalProd();
        return getLocalProd();
    }, []);
    return (
        <React.Fragment>
            <Layout
                dataSEO={props.dataSEO.seo}
                dataMainMenu={props.getMenu}
                dataBrands={props.getTopBrands}
                dataProd={props.dataAllProd}
            >
                <GlobalAds adsId="1" />
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
                                                                src="/icon-vs-small.png"
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
                        <GlobalAds adsId="1" />
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
                <GlobalAds adsId="2" />
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
                <GlobalAds adsId="3" />
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
                <GlobalAds adsId="4" />
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
