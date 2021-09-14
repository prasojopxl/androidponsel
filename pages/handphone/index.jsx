import { useRouter } from 'next/router'
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Ads, AdsBanner, Paging, Rate, Title, GlobalAds } from "../../components";
import { apiUrl, baseUrl, totalItem } from "../../config/variable";
import styles from "./index.module.scss";
import { fetchData } from '../../config/data';
import Layout from '../../layout';
import ItemProduct from '../../components/products/item';

export default function Handphone(props) {
    const router = useRouter()
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
            <GlobalAds adsId="1" />
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
                            <GlobalAds adsId="2" />

                            <div className="row">
                                {props.dataListHandphone2.map((item, i) => {
                                    return (
                                        <div className="col-lg-3" key={item.id}>
                                            <ItemProduct action={getLocalProd} title={item.title} memoryInternal={item.memory_internal} rating={item.rating} productImage={item.product_image[0]} slug={item.slug} />
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
    const posts = await fetchData(`/products?category=1`);
    const dataListHandphone = await fetchData(`/products?category=1&_limit=${totalItem}&_sort=release_date:DESC`);
    const dataListHandphone2 = await fetchData(`/products?category=1&_limit=${8}&_start=8&_sort=release_date:DESC`);
    const totalPaging = Math.ceil(posts.length / (totalItem * 2));
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
            totalPaging
        },
    };
}
