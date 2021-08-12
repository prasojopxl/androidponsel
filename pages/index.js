import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { Ads, AdsBanner, Title } from "../components/";
import { fetchData, fetchDataBlog } from "../config/data";
import { apiUrl, baseUrl } from "../config/variable";
import LayoutHome from "../layout/layouthome/layoutHome";
import styles from "./index.module.scss";

export async function getStaticProps(context) {
    const dataBanerHome1 = await fetchData("/ads/1?_publicationState=preview");
    const dataBanerHome2 = await fetchData("/ads/2?_publicationState=preview");
    const dataBanerHome3 = await fetchData("/ads/3?_publicationState=preview");
    const dataBanerHome4 = await fetchData("/ads/4?_publicationState=preview");
    const dataBanerHome5 = await fetchData("/ads/5?_publicationState=preview");
    const dataBanerHome6 = await fetchData("/ads/6?_publicationState=preview");
    const dataBanerHome7 = await fetchData("/ads/7?_publicationState=preview");
    const dataCompare = await fetchData("/compares?_sort=updated_at:ASC");
    const dataProducts = await fetchData("/products?_limit=12");
    const dataSEO = await fetchData("/general");
    const mainNews = await fetchData(
        "/posts?menu=2&_sort=updated_at:DESC&_limit=1"
    );
    const topNews = await fetchDataBlog(
        "categories=8&per_page=4&_embed=author,wp:featuredmedia,wp:term&offset=1"
    );
    const contNews = await fetchDataBlog(
        "categories=8&per_page=9&_embed=author,wp:featuredmedia,wp:term&offset=5"
    );
    const topApp = await fetchDataBlog(
        "categories=19&per_page=2&_embed=author,wp:featuredmedia,wp:term"
    );
    const listApp = await fetchDataBlog(
        "per_page=15&_embed=author,wp:featuredmedia,wp:term&offset=0"
    );
    const tipsTrik = await fetchDataBlog(
        "categories=20&per_page=8&_embed=author,wp:featuredmedia,wp:term&offset=3"
    );
    const tipsTrikMain = await fetchDataBlog(
        "categories=20&per_page=1&_embed=author,wp:featuredmedia,wp:term&offset=0"
    );
    const tipsTrikSecond = await fetchDataBlog(
        "categories=20&per_page=2&_embed=author,wp:featuredmedia,wp:term&offset=1"
    );
    const dataAndroidNews = await fetchDataBlog(
        "categories=8&per_page=1&_embed=author,wp:featuredmedia,wp:term"
    );

    const resMenu = await fetch(`${apiUrl}/menus?_sort=order`);
    const getMenu = await resMenu.json();
    const resTopBrands = await fetch(`${apiUrl}/brands?_top_brand=true`);
    const getTopBrands = await resTopBrands.json();
    if (
        !dataBanerHome1 ||
        !dataBanerHome2 ||
        !dataBanerHome3 ||
        !dataBanerHome4 ||
        !dataBanerHome5 ||
        !dataBanerHome6 ||
        !dataBanerHome7 ||
        !dataCompare ||
        !dataProducts ||
        !mainNews ||
        !topNews ||
        !contNews ||
        !topApp ||
        !listApp ||
        !tipsTrik ||
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
            dataBanerHome1,
            dataBanerHome2,
            dataBanerHome3,
            dataBanerHome4,
            dataBanerHome5,
            dataBanerHome6,
            dataBanerHome7,
            dataCompare,
            dataProducts,
            mainNews,
            topNews,
            contNews,
            topApp,
            listApp,
            tipsTrik,
            tipsTrikMain,
            tipsTrikSecond,
            getMenu,
            getTopBrands,
            dataAndroidNews,
        },
        revalidate: 3,
    };
}

export default function Home({
    dataBanerHome1,
    dataBanerHome2,
    dataBanerHome3,
    dataBanerHome4,
    dataBanerHome5,
    dataBanerHome6,
    dataBanerHome7,
    dataCompare,
    dataProducts,
    mainNews,
    topNews,
    contNews,
    topApp,
    listApp,
    tipsTrik,
    tipsTrikMain,
    tipsTrikSecond,
    getMenu,
    getTopBrands,
    dataAndroidNews,
    dataSEO,
}) {
    const [ads1, setAds1] = useState({
        iframe: [],
        bannerImage: [],
        link: [],
        urlImage: [],
        widthImage: [],
        heightImage: [],
    });
    const getAds1 = () => {
        dataBanerHome1.Image_Banner === null
            ? setAds1({ iframe: dataBanerHome1.URL_Iframe })
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
        dataBanerHome2.Image_Banner === null
            ? setAds2({ iframe: dataBanerHome2.URL_Iframe })
            : setAds2({
                  bannerImage: "withBanner",
                  link: dataBanerHome2.url,
                  urlImage: apiUrl + dataBanerHome2.Image_Banner.url,
                  widthImage: dataBanerHome2.Image_Banner.width,
                  heightImage: dataBanerHome2.Image_Banner.height,
              });
    };
    const [ads3, setAds3] = useState({
        iframe: [],
        bannerImage: [],
        link: [],
        urlImage: [],
        widthImage: [],
        heightImage: [],
    });
    const getAds3 = () => {
        dataBanerHome3.Image_Banner === null
            ? setAds3({ iframe: dataBanerHome3.URL_Iframe })
            : setAds3({
                  bannerImage: "withBanner",
                  link: dataBanerHome3.url,
                  urlImage: apiUrl + dataBanerHome3.Image_Banner.url,
                  widthImage: dataBanerHome3.Image_Banner.width,
                  heightImage: dataBanerHome3.Image_Banner.height,
              });
    };
    const [ads4, setAds4] = useState({
        iframe: [],
        bannerImage: [],
        link: [],
        urlImage: [],
        widthImage: [],
        heightImage: [],
    });
    const getAds4 = () => {
        dataBanerHome4.Image_Banner === null
            ? setAds4({ iframe: dataBanerHome4.URL_Iframe })
            : setAds4({
                  bannerImage: "withBanner",
                  link: dataBanerHome4.url,
                  urlImage: apiUrl + dataBanerHome4.Image_Banner.url,
                  widthImage: dataBanerHome4.Image_Banner.width,
                  heightImage: dataBanerHome4.Image_Banner.height,
              });
    };
    const [ads5, setAds5] = useState({
        iframe: [],
        bannerImage: [],
        link: [],
        urlImage: [],
        widthImage: [],
        heightImage: [],
    });
    const getAds5 = () => {
        dataBanerHome5.Image_Banner === null
            ? setAds5({ iframe: dataBanerHome5.URL_Iframe })
            : setAds5({
                  bannerImage: "withBanner",
                  link: dataBanerHome5.url,
                  urlImage: apiUrl + dataBanerHome5.Image_Banner.url,
                  widthImage: dataBanerHome5.Image_Banner.width,
                  heightImage: dataBanerHome5.Image_Banner.height,
              });
    };
    const [ads6, setAds6] = useState({
        iframe: [],
        bannerImage: [],
        link: [],
        urlImage: [],
        widthImage: [],
        heightImage: [],
    });
    const getAds6 = () => {
        dataBanerHome6.Image_Banner === null
            ? setAds6({ iframe: dataBanerHome6.URL_Iframe })
            : setAds6({
                  bannerImage: "withBanner",
                  link: dataBanerHome6.url,
                  urlImage: apiUrl + dataBanerHome6.Image_Banner.url,
                  widthImage: dataBanerHome6.Image_Banner.width,
                  heightImage: dataBanerHome6.Image_Banner.height,
              });
    };
    const [ads7, setAds7] = useState({
        iframe: [],
        bannerImage: [],
        link: [],
        urlImage: [],
        widthImage: [],
        heightImage: [],
    });
    const getAds7 = () => {
        dataBanerHome7.Image_Banner === null
            ? setAds7({ iframe: dataBanerHome7.URL_Iframe })
            : setAds7({
                  bannerImage: "withBanner",
                  link: dataBanerHome7.url,
                  urlImage: apiUrl + dataBanerHome7.Image_Banner.url,
                  widthImage: dataBanerHome7.Image_Banner.width,
                  heightImage: dataBanerHome7.Image_Banner.height,
              });
    };

    useEffect(() => {
        getAds1();
        getAds2();
        getAds3();
        getAds4();
        getAds5();
        getAds6();
        getAds7();
    }, []);

    return (
        <React.Fragment>
            <LayoutHome
                dataSEO={dataSEO.seo}
                dataMainMenu={getMenu}
                dataBrands={getTopBrands}
            >
                {dataBanerHome1.published_at && (
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
                <div className={styles.compareItem}>
                    <div className={styles.contens}>
                        <Title title="Top Perbandingan" />
                        <div className="row">
                            {dataCompare.map((item, index) => {
                                return (
                                    <div className="col-lg-6" key={item.id}>
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
                                                                ></Image>
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.contentDec
                                                                }
                                                            >
                                                                <h5>
                                                                    {data.title}
                                                                </h5>
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
                                                    LIHAT PERBANDINGAN
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {dataBanerHome2.published_at && (
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
                            {dataProducts.map((item, index) => {
                                return (
                                    <div className="col-lg-3" key={item.id}>
                                        <div className={styles.productItem}>
                                            <div
                                                className={styles.shortproduct}
                                            >
                                                <div
                                                    className={styles.imageprod}
                                                >
                                                    <Image
                                                        src={
                                                            apiUrl +
                                                            item
                                                                .product_image[0]
                                                                .url
                                                        }
                                                        width={
                                                            item
                                                                .product_image[0]
                                                                .width / 3
                                                        }
                                                        height={
                                                            item
                                                                .product_image[0]
                                                                .height / 3
                                                        }
                                                    />{" "}
                                                </div>
                                                <div
                                                    className={
                                                        styles.productinfo
                                                    }
                                                >
                                                    <h5>{item.title}</h5>
                                                    <h6>
                                                        {item.memory_internal}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className={styles.wrpbtn}>
                                                <a
                                                    href="#"
                                                    className={styles.btnfull}
                                                >
                                                    BANDINGKAN PRODUK
                                                </a>
                                                <a
                                                    href="#"
                                                    className={styles.btnblank}
                                                >
                                                    LIHAT SELENGKAPNYA
                                                </a>
                                            </div>
                                        </div>
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
                            <a href="#" className="btn medium">
                                Lihat Selegkapnya
                            </a>
                        </div>
                    </div>
                </div>
                {dataBanerHome3.published_at && (
                    <Fragment>
                        {ads3.bannerImage === "withBanner" ? (
                            <AdsBanner
                                linkbanner={ads3.link}
                                urlImage={ads3.urlImage}
                                width={ads3.widthImage}
                                height={ads3.heightImage}
                            />
                        ) : (
                            <Ads banner={ads3.iframe} />
                        )}
                    </Fragment>
                )}
                <div className={styles.latestnews}>
                    <div className={styles.contents}>
                        <Title title="Berita Terbaru" />
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-5">
                                        {dataAndroidNews.map((item, i) => {
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
                                                            <h4>
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
                                                {topNews.map((item, i) => {
                                                    return (
                                                        <div
                                                            className="col-lg-6"
                                                            key={item.id}
                                                        >
                                                            <div
                                                                className={
                                                                    styles.wrpitemnews
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
                                                                        <h5>
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
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {dataBanerHome4.published_at && (
                                    <Fragment>
                                        {ads4.bannerImage === "withBanner" ? (
                                            <AdsBanner
                                                linkbanner={ads4.link}
                                                urlImage={ads4.urlImage}
                                                width={ads4.widthImage}
                                                height={ads4.heightImage}
                                            />
                                        ) : (
                                            <Ads banner={ads4.iframe} />
                                        )}
                                    </Fragment>
                                )}
                                <div className="row">
                                    {contNews.map((item, i) => {
                                        return (
                                            <div
                                                className="col-lg-4"
                                                key={item.id}
                                            >
                                                <div
                                                    className={
                                                        styles.wrpitemnews
                                                    }
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
                                                                    .width / 6
                                                            }
                                                            height={
                                                                item._embedded[
                                                                    "wp:featuredmedia"
                                                                ][0]
                                                                    .media_details
                                                                    .height / 6
                                                            }
                                                            alt={
                                                                item.title
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
                                                            <h5>
                                                                {
                                                                    item.title
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
                                    })}
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
                                className="btn medium"
                            >
                                Lihat berita terbaru lainnya
                            </a>
                        </div>
                    </div>
                </div>
                {dataBanerHome5.published_at && (
                    <Fragment>
                        {ads5.bannerImage === "withBanner" ? (
                            <AdsBanner
                                linkbanner={ads5.link}
                                urlImage={ads5.urlImage}
                                width={ads5.widthImage}
                                height={ads5.heightImage}
                            />
                        ) : (
                            <Ads banner={ads5.iframe} />
                        )}
                    </Fragment>
                )}
                <div className={styles.kanalapp}>
                    <div className={styles.contents}>
                        <Title title="Kanal Aplikasi" />
                        <div className="row">
                            {topApp.map((item, i) => {
                                return (
                                    <div className="col-lg-6" key={item.id}>
                                        <div className={styles.topkanal}>
                                            <div className={styles.imgwrp}>
                                                <Image
                                                    src={
                                                        item._embedded[
                                                            "wp:featuredmedia"
                                                        ][0].source_url
                                                    }
                                                    width={
                                                        item._embedded[
                                                            "wp:featuredmedia"
                                                        ][0].media_details.width
                                                    }
                                                    height={
                                                        item._embedded[
                                                            "wp:featuredmedia"
                                                        ][0].media_details
                                                            .height
                                                    }
                                                    alt={item.title.rendered}
                                                />
                                            </div>
                                            <div className={styles.desc}>
                                                <div className={styles.imgwrp}>
                                                    <Image
                                                        src={
                                                            item._embedded[
                                                                "wp:featuredmedia"
                                                            ][0].source_url
                                                        }
                                                        width={
                                                            item._embedded[
                                                                "wp:featuredmedia"
                                                            ][0].media_details
                                                                .width
                                                        }
                                                        height={
                                                            item._embedded[
                                                                "wp:featuredmedia"
                                                            ][0].media_details
                                                                .height
                                                        }
                                                        alt={
                                                            item.title.rendered
                                                        }
                                                    />
                                                </div>
                                                <a href={item.link}>
                                                    <h5>
                                                        {item.title.rendered}
                                                    </h5>
                                                </a>
                                                {ReactHtmlParser(
                                                    item.excerpt.rendered
                                                )}
                                                <div
                                                    className={styles.infodate}
                                                >
                                                    <span>
                                                        By{" "}
                                                        {
                                                            item._embedded
                                                                .author[0].name
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
                        {dataBanerHome6.published_at && (
                            <Fragment>
                                {ads6.bannerImage === "withBanner" ? (
                                    <AdsBanner
                                        linkbanner={ads6.link}
                                        urlImage={ads6.urlImage}
                                        width={ads6.widthImage}
                                        height={ads6.heightImage}
                                    />
                                ) : (
                                    <Ads banner={ads6.iframe} />
                                )}
                            </Fragment>
                        )}
                        <div className="row">
                            {listApp.map((item, i) => {
                                return (
                                    <div className="col-lg-4" key={item.id}>
                                        <div className={styles.wrplistapp}>
                                            <div className={styles.imgwrp}>
                                                <Image
                                                    src={
                                                        item._embedded[
                                                            "wp:featuredmedia"
                                                        ][0].source_url
                                                    }
                                                    width={
                                                        item._embedded[
                                                            "wp:featuredmedia"
                                                        ][0].media_details.width
                                                    }
                                                    height={
                                                        item._embedded[
                                                            "wp:featuredmedia"
                                                        ][0].media_details
                                                            .height
                                                    }
                                                    alt={item.title.rendered}
                                                />
                                            </div>
                                            <div className={styles.desc}>
                                                <div className={styles.tags}>
                                                    {item._embedded[
                                                        "wp:term"
                                                    ][0].map((data) => {
                                                        return (
                                                            <a
                                                                href={data.link}
                                                                key={data.id}
                                                            >
                                                                {data.name}
                                                            </a>
                                                        );
                                                    })}
                                                </div>
                                                <a href={item.link}>
                                                    <h5>
                                                        {item.title.rendered}
                                                    </h5>
                                                </a>
                                                <div
                                                    className={styles.infodate}
                                                >
                                                    <span>
                                                        By{" "}
                                                        {
                                                            item._embedded
                                                                .author[0].name
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
                        <div
                            style={{
                                textAlign: "center",
                                display: "block",
                                marginTop: 30,
                            }}
                        >
                            <a
                                href="https://www.androidponsel.com/download/"
                                className="btn medium"
                            >
                                Lihat aplikasi lainnya
                            </a>
                        </div>
                    </div>
                </div>
                {dataBanerHome7.published_at && (
                    <Fragment>
                        {ads7.bannerImage === "withBanner" ? (
                            <AdsBanner
                                linkbanner={ads7.link}
                                urlImage={ads7.urlImage}
                                width={ads7.widthImage}
                                height={ads7.heightImage}
                            />
                        ) : (
                            <Ads banner={ads7.iframe} />
                        )}
                    </Fragment>
                )}
                <div className={styles.tipstrik}>
                    <div className={styles.contents}>
                        <Title title="Tips & Trik"></Title>
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="row">
                                    {tipsTrik.map((item, i) => {
                                        return (
                                            <div
                                                className="col-lg-6"
                                                key={item.id}
                                            >
                                                <div
                                                    className={
                                                        styles.itemcontent
                                                    }
                                                >
                                                    <div
                                                        className={styles.left}
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
                                                                <h5>
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
                                                        className={styles.right}
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
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className={styles.maintipstrik}>
                                    {tipsTrikMain.map((item, i) => {
                                        return (
                                            <div key="item.id">
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
                                                            <h5>
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
                                <div className={styles.secondtipstrik}>
                                    {tipsTrikSecond.map((item, i) => {
                                        return (
                                            <div
                                                className={styles.itemcontent}
                                                key={item.id}
                                            >
                                                <div className={styles.left}>
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
                                                            <h5>
                                                                {
                                                                    item.title
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
                                                <div className={styles.right}>
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
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutHome>
        </React.Fragment>
    );
}
