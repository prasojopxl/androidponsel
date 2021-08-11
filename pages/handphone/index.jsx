import { useRouter } from 'next/router'
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

    // let limitpages = Math.ceil(productsHP.length / totalItem);
    // var pages = [];
    // for (let i = 1; i <= limitpages; i++) {
    //     pages.push(i);
    // }

    return {
        props: {
            dataListHandphone,
            dataListHandphone2,
            getMenu,
            getTopBrands,
            dataBanerProdukTop,
            dataBanerProdukBody,
        },
    };
}

export default function Handphone({
    dataListHandphone,
    getMenu,
    getTopBrands,
    dataBanerProdukTop,
    dataBanerProdukBody,
}) {
    const router = useRouter()

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
                                <Link href="#">
                                    <a>{item}</a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <Link href="#">
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

    const compareProd = () => {
        console.log();
    };
    const [show, setShow] = useState(false)
    const [compare1, setCompare1] = useState("")
    const [compare2, setCompare2] = useState("")
    const [compare3, setCompare3] = useState("")
    const [disable, setDisabled] = useState(false)
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
        if (p2 == null) {
            console.log(disable)
        }
        else {
            console.log(disable)
        }
    }
    function removeLocalProd() {
        localStorage.removeItem("produk1")
        localStorage.removeItem("produk2")
        localStorage.removeItem("produk3")
        setDisabled(false)
    }
    const goToCompare = () => {
        // {`${baseUrl}handphone/compare?produk1=${localStorage.getItem("produk1")}&produk2=${localStorage.getItem("produk2")}&produk3=${localStorage.getItem("produk3")}`}        
        const p1 = localStorage.getItem("produk1");
        const p2 = localStorage.getItem("produk2");
        const p3 = localStorage.getItem("produk3");
        if (p1 === p2 || p1 === p3 || p2 === p3) {
            alert("produk perbandingan tidak boleh sama")
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
        setCompare1("")
        setCompare2("")
        setCompare3("")
        removeLocalProd()
        setDisabled(false);
        setShow(false)
    }
    useEffect(() => {
        getAds1();
        getAds2();
        removeLocalProd();
        resetCompare()
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
                                            <div className={styles.productItem}>
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
        </LayoutHandphone >
    );
}
