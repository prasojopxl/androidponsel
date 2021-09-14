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

export async function getStaticProps(context) {
    const dataAllProd = await fetchData("/products");
    const dataCompare = await fetchData("/compares?_sort=updated_at:ASC");
    // const dataProducts = await fetchData("/products?_limit=12");
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
    const topApp = await fetchDataBlog(
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
            } else if (p1 !== null && p2 !== null && p3 == null) {
                setCompare2(titleCompare2.title);
            } else if (p1 !== null && p2 !== null) {
                setCompare1(titleCompare1.title);
                setCompare2(titleCompare2.title);
                setCompare3(titleCompare3.title);
            } else if (p1 !== null && p3 !== null) {
                setCompare1(titleCompare1.title);
                setCompare2("");
                setCompare3(titleCompare3.title);
            } else {
                if (p2 !== null || p3 !== null) {
                    setCompare1("");
                } else {
                    setCompare3(titleCompare3.title);
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
                        <Title title="Top Perbandingan" />
                        <div className="row">
                            {props.dataCompare.map((item, index) => {
                                return (
                                    <div
                                        className="col-lg-6 col-md-6 col-sm-12"
                                        key={item.id}
                                    >
                                        <div className={styles.itemcompare}>
                                            <div className={styles.wrpCompare}>
                                                {item.products.map((data) => {
                                                    return (
                                                        <div
                                                            className={
                                                                styles.item
                                                            }
                                                            key={data.id}
                                                        >
                                                            <div
                                                                className={
                                                                    styles.imgwrp
                                                                }
                                                            >
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
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.contentDec
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
                                                    );
                                                })}
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
                                                <a className={styles.fullLink}>
                                                    <div
                                                        style={{
                                                            marginRight: "10px",
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
                                                    LIHAT PERBANDINGAN
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="row">
                            {props.dataListHandphone.map((item, i) => {
                                return (
                                    <div className="col-lg-3" key={item.id}>
                                        {/* <div>
                                            <h4>{item.product_image[0]}</h4>
                                            Rate: {item.rating}
                                        </div> */}
                                        <ItemProduct
                                            action={getLocalProd}
                                            title={item.title}
                                            memoryInternal={
                                                item.memory_internal
                                            }
                                            rating={item.rating}
                                            productImage={item.product_image[0]}
                                            slug={item.slug}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        <div
                            style={{
                                textAlign: "center",
                                display: "block",
                                marginTop: 30,
                            }}
                        >
                            <Link href={baseUrl + "handphone"}>
                                <a className="btn ap-btn-secondary ap-btn-md">
                                    Lihat Selegkapnya
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <GlobalAds adsId="2" />
                <div className={styles.latestnews}>
                    <div className={styles.contents}>
                        <Title title="Berita Terbaru" />
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-5">
                                        {props.dataAndroidNews.map(
                                            (item, i) => {
                                                return (
                                                    <div
                                                        className={
                                                            styles.mainpost
                                                        }
                                                        key={item.id}
                                                    >
                                                        <div
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
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.desc
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.tags
                                                                }
                                                            >
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
                                                            <a href={item.link}>
                                                                <h4 className="titlefloatingCard">
                                                                    {
                                                                        item
                                                                            .title
                                                                            .rendered
                                                                    }
                                                                </h4>
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
                                                );
                                            }
                                        )}
                                    </div>
                                    <div className="col-lg-7">
                                        <div className={styles.wrptopnews}>
                                            <div className="row">
                                                {props.topNews.map(
                                                    (item, i) => {
                                                        return (
                                                            <div
                                                                className="col-lg-6"
                                                                key={item.id}
                                                            >
                                                                <div
                                                                    className={
                                                                        styles.wrpitemnews
                                                                    }
                                                                    key={
                                                                        item.id
                                                                    }
                                                                >
                                                                    <div
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
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            styles.content
                                                                        }
                                                                    >
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
                                Lihat berita terbaru lainnya
                            </a>
                        </div>
                    </div>
                </div>
                <GlobalAds adsId="3" />
                <div className={styles.kanalapp}>
                    <div className={styles.contents}>
                        <Title title="Kanal Aplikasi" />
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-5">
                                        {props.topApp.map((item, i) => {
                                            return (
                                                <div
                                                    className={styles.mainpost}
                                                    key={item.id}
                                                >
                                                    <div
                                                        className={
                                                            styles.imgwrp
                                                        }
                                                    >
                                                        <Image
                                                            src={
                                                                item._embedded[
                                                                    "wp:featuredmedia"
                                                                ][0].source_url
                                                            }
                                                            width={
                                                                item._embedded[
                                                                    "wp:featuredmedia"
                                                                ][0]
                                                                    .media_details
                                                                    .width
                                                            }
                                                            height={
                                                                item._embedded[
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
                                                    </div>
                                                    <div
                                                        className={styles.desc}
                                                    >
                                                        <div
                                                            className={
                                                                styles.tags
                                                            }
                                                        >
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
                                                        <a href={item.link}>
                                                            <h4 className="titlefloatingCard">
                                                                {
                                                                    item.title
                                                                        .rendered
                                                                }
                                                            </h4>
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
                                            );
                                        })}
                                    </div>

                                    <div className="col-lg-7">
                                        <div className={styles.wrptopnews}>
                                            <div className="row">
                                                {props.listApp.map(
                                                    (item, i) => {
                                                        return (
                                                            <div
                                                                className="col-lg-6"
                                                                key={item.id}
                                                            >
                                                                <div
                                                                    className={
                                                                        styles.wrpitemnews
                                                                    }
                                                                    key={
                                                                        item.id
                                                                    }
                                                                >
                                                                    <div
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
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            styles.content
                                                                        }
                                                                    >
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
                                Lihat aplikasi lainnya
                            </a>
                        </div>
                        <GlobalAds adsId="4" />
                    </div>
                </div>
                <div className={styles.tipstrik}>
                    <div className={styles.contents}>
                        <Title title="Tips & Trik"></Title>
                        <div className="row">
                            <div className="col-lg-5">
                                <div className={styles.maintipstrik}>
                                    {props.tipsTrikMain.map((item, i) => {
                                        return (
                                            <div key={item.id}>
                                                <div
                                                    className={styles.topberita}
                                                >
                                                    <div
                                                        className={
                                                            styles.imgwrp
                                                        }
                                                    >
                                                        <Image
                                                            src={
                                                                item._embedded[
                                                                    "wp:featuredmedia"
                                                                ][0].source_url
                                                            }
                                                            width={
                                                                item._embedded[
                                                                    "wp:featuredmedia"
                                                                ][0]
                                                                    .media_details
                                                                    .width
                                                            }
                                                            height={
                                                                item._embedded[
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
                                                    </div>
                                                    <div
                                                        className={styles.desc}
                                                    >
                                                        <div
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
                                                        </div>
                                                        <a href={item.link}>
                                                            <h5 className="titlefloatingCard">
                                                                {
                                                                    item.title
                                                                        .rendered
                                                                }
                                                            </h5>
                                                        </a>
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
                            <div className="col-lg-7">
                                <div className={styles.secondtipstrik}>
                                    <div className="row">
                                        {props.tipsTrikSecond.map((item, i) => {
                                            return (
                                                <div
                                                    className="col-lg-6"
                                                    key={item.id}
                                                >
                                                    <div
                                                        className={
                                                            styles.itemcontent
                                                        }
                                                        key={item.id}
                                                    >
                                                        <div
                                                            className={
                                                                styles.left
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.desc
                                                                }
                                                            >
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
                                                        <div
                                                            className={
                                                                styles.right
                                                            }
                                                        >
                                                            <div
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
                                                                        item
                                                                            .title
                                                                            .rendered
                                                                    }
                                                                />
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
                                Tips lainnya
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.containerCompare}>
                    {show && (
                        <Fragment>
                            <div className={styles.desc}>
                                Badingkan Produk:
                                {compare1 && <h5>{compare1}</h5>}
                                {compare2 && <h5>{compare2}</h5>}
                                {compare3 && <h5>{compare3}</h5>}
                            </div>
                            <div className={styles.wrpAction}>
                                <div
                                    className={styles.btnCompareProd}
                                    onClick={() => goToCompare()}
                                >
                                    Lihat Bandingkan
                                </div>
                            </div>
                        </Fragment>
                    )}
                </div>
            </Layout>
        </React.Fragment>
    );
}
