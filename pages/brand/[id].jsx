import { useEffect, useState, Fragment } from "react";
import Layout from "../../layout";
import { useRouter } from "next/router";
import { fetchData } from "../../config/data";
import LayoutBlank from "../../layout/layoutBlank";
import ItemProduct from "../../components/products/item";
import styles from "./index.module.scss"
import { Title, GlobalAds } from "../../components";
import { baseUrl } from "../../config/variable";

export default function Brand(props) {
    const router = useRouter();
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
            <div className={styles.pageBrand}>
                <div className={styles.contents}>
                    {
                        props.brands.map((item) => {
                            return (
                                <div key={item.id}>
                                    <Title title={item.title}></Title>
                                    <div className="row">
                                        {
                                            item.products.map(data => {
                                                return (
                                                    <div className="col-lg-3 col-6" key={item.id}>
                                                        <ItemProduct action={getLocalProd} title={data.title} memoryInternal={data.memory_internal} rating={data.rating}
                                                            voters={data.total_voters} productImage={data.product_image[0]} slug={data.slug} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
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
                                    Lihat Perbandingan
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
    const listBrands = await fetchData("/brands?_limit=1000");
    const paths = listBrands.map((item) => ({
        params: {
            id: `${item.slug}`
        },
    }));
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const brands = await fetchData(`/brands?slug=${params.id}`)
    const dataSEO = await fetchData("/general");
    const getMenu = await fetchData("/menus?_sort=order");
    const getTopBrands = await fetchData("/brands?_top_brand=true");

    return {
        props: {
            brands,
            getMenu,
            getTopBrands,
            dataSEO,

        }
    }
}



