import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Ads, AdsBanner, Rate, Title } from "../../components";
import { apiUrl, baseUrl, totalItem } from "../../config/variable";
import LayoutHandphone from "../../layout/layouthandphone/LayoutHandphone";
import styles from "./index.module.scss";

export async function getStaticProps() {
    const resListHanphone = await fetch(
        `${apiUrl}/products?category=1&_limit=${totalItem}`
    );
    const dataListHandphone = await resListHanphone.json();
    const resListHandphone2 = await fetch(
        `${apiUrl}/products?category=1&_limit=${totalItem}&offset=8`
    );
    const dataListHandphone2 = await resListHandphone2.json();

    const resBanerProdukTop = await fetch(
        `${apiUrl}/ads/8?_publicationState=preview`
    );
    const dataBanerProdukTop = await resBanerProdukTop.json();
    const resBanerProdukBody = await fetch(
        `${apiUrl}/ads/9?_publicationState=preview`
    );
    const dataBanerProdukBody = await resBanerProdukBody.json();

    const resMenu = await fetch(`${apiUrl}/menus?_sort=order`);
    const getMenu = await resMenu.json();
    const resTopBrands = await fetch(`${apiUrl}/brands?_top_brand=true`);
    const getTopBrands = await resTopBrands.json();

    const resProductsHP = await fetch(`${apiUrl}/products?category=1`);
    const productsHP = await resProductsHP.json();
    let limitpages = Math.ceil(productsHP.length / totalItem);
    var pages = [];
    for (let i = 1; i <= limitpages; i++) {
        pages.push(i);
    }

    return {
        props: {
            dataListHandphone,
            dataListHandphone2,
            pages,
            limitpages,
            getMenu,
            getTopBrands,
            dataBanerProdukTop,
            dataBanerProdukBody,
        },
    };
}

export default function Handphone({
    dataListHandphone,
    dataListHandphone2,
    pages,
    getMenu,
    getTopBrands,
    dataBanerProdukTop,
    dataBanerProdukBody,
    limitpages,
}) {
    const Paging = () => {
        return (
            <div className={styles.paging}>
                <Link href="#">
                    <a>Awal</a>
                </Link>
                <ul>
                    {pages.map((item, i) => {
                        return (
                            <li key={item}>
                                <Link href={baseUrl + "/handphone/page/" + item}>
                                    <a>{item}</a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <Link href={`${baseUrl}handphone/page/${pages.length}`}>
                    <a>Akhir</a>
                </Link>
            </div>
        );
    };

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

    const [compare1, setCompare1] = useState("");
    const [compare2, setCompare2] = useState("");
    const [compare3, setCompare3] = useState("");
    const compareProd = () => {
        console.log();
    };
    useEffect(() => {
        getAds1();
        getAds2();
    }, []);

    return (
        <LayoutHandphone
            title="handphone"
            menu={getMenu.map((item, i) => {
                return (
                    <li key={item.id}>
                        <Link href={item.url}>{item.title}</Link>
                    </li>
                );
            })}
            listTopBrands={getTopBrands.map((item, i) => {
                return (
                    <li key={item.id}>
                        <Link href="#">{item.title}</Link>
                    </li>
                );
            })}
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
                                            <div className={styles.productItem} onClick={compareProd}>
                                                <div className={styles.shortproduct}>
                                                    <div className={styles.imageprod}>
                                                        <Image
                                                            src={apiUrl + item.product_image[0].url}
                                                            width={item.product_image[0].width / 3}
                                                            height={item.product_image[0].height / 3}
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
                                                <div className={styles.wrpbtn}>
                                                    <div className={styles.btnfull}>
                                                        BANDINGKAN PRODUK
                                                    </div>
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
                                                <div className={styles.wrpbtn}>
                                                    <div className={styles.btnfull}>
                                                        BANDINGKAN PRODUK
                                                    </div>
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
                    <Paging />
                </div>
            </div>
        </LayoutHandphone>
    );
}
