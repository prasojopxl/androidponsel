import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router"
import { Paging, Title } from "../../../components";
import ItemProduct from "../../../components/products/item";
import { fetchData } from "../../../config/data";
import { apiUrl, baseUrl, totalItem } from "../../../config/variable";
import Layout from "../../../layout";
import styles from "../index.module.scss";

export default function Page(props) {
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
        const [totalCompare, setTotalCompare] = useState(0)
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
                setTotalCompare(1)
            }
            else if (p1 !== null && p2 !== null && p3 == null) {
                setCompare2(titleCompare2.title)
                setTotalCompare(2)
            }
            else if (p1 !== null && p2 !== null) {
                setCompare1(titleCompare1.title)
                setCompare2(titleCompare2.title)
                setCompare3(titleCompare3.title)
                setTotalCompare(3)
            }
            else if (p1 !== null && p3 !== null) {
                setCompare1(titleCompare1.title)
                setCompare2("")
                setCompare3(titleCompare3.title)
                setTotalCompare(2)
            }
            else {
                if (p2 !== null || p3 !== null) {
                    setCompare1("")
                }
                else {
                    setCompare3(titleCompare3.title)
                    setTotalCompare(1)
                }
            }
        }
        else {
            setShow(false)
            // removeLocalProd();
        }

        if (p2 == null) {
            setCompare2("")
        }
        if (p3 == null) {
            setCompare3("")
        }

    }
    useEffect(() => {
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
            <div className={styles.pagelisthandphone}>
                <div className={styles.contents}>
                    <Title title="Handphone" />
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                {props.dataListHandphone.map((item, i) => {
                                    return (
                                        <div className="col-lg-3 col-6" key={item.id}>
                                            <ItemProduct action={getLocalProd} title={item.title} memoryInternal={item.memory_internal} rating={item.rating}
                                                voters={item.total_voters} productImage={item.product_image[0]} slug={item.slug} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <Paging linkPrev={`${parseInt(props.params.id) - 1}`} linkNext={`${parseInt(props.params.id) + 1}`} lengthPost={props.totalPaging} />
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
                                    Lihat Bandingkan <span>({totalCompare})</span>
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
    const posts = await fetchData("/products?category=1");
    const totalPaging = Math.ceil(posts.length / (totalItem * 2));
    const pages = []
    for (let i = 1; i <= totalPaging; i++) {
        pages.push(i)
    }
    const paths = pages.map((item, i) => ({
        params: {
            id: `${item}`
        },
    }))
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const page = 0;
    const dataSEO = await fetchData("/general");
    const getMenu = await fetchData("/menus?_sort=order");
    const getTopBrands = await fetchData("/brands?_top_brand=true");
    const dataListHandphone = await fetchData(`/products?category=1&_limit=${totalItem * 2}&_start=${(params.id - 1) * 12}&_sort=release_date:DESC`);
    const lengthPost = dataListHandphone.length;
    const posts = await fetchData("/products?category=1");
    const totalPaging = Math.ceil(posts.length / (totalItem * 2));
    if (!dataSEO || !getMenu || !getTopBrands || !dataListHandphone) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            params,
            lengthPost,
            getMenu,
            getTopBrands,
            dataSEO,
            dataListHandphone,
            totalPaging,
        },
        revalidate: 3
    }
}

