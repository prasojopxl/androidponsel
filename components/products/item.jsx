import { Fragment, useState, useEffect } from "react"
import styles from "./products.module.scss"
import { Rate } from "../index";
import { apiUrl, baseUrl } from "../../config/variable";
import Image from "next/image";
import Link from "next/link";
import ReactHtmlParser from "react-html-parser";

export default function ItemProduct(props) {
    const removeLocalProd = () => {
        localStorage.removeItem("produk1")
        localStorage.removeItem("produk2")
        localStorage.removeItem("produk3")
    }
    const resetColor = () => {
        var elements = document.getElementsByClassName('btncompare'); // get all elements
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = "#89c340";
            elements[i].innerText = "Compare";
        }
    }
    const addCompare = (slug, e, title) => {
        let p1 = localStorage.getItem("produk1");
        let p2 = localStorage.getItem("produk2");
        let p3 = localStorage.getItem("produk3");
        let valueLocalStore = { slug, title, status: e.target.innerText === "Compare" ? "enable" : "disable" };
        if (e.target.innerText === "Compare") {
            e.target.innerText = "Compared"
            e.target.style.background = "#ddd"
            if (p1 === null) {
                localStorage.setItem("produk1", JSON.stringify(valueLocalStore))
                e.target.title = "produk1"
            }
            else if (p1 !== null && p2 == null) {
                localStorage.setItem("produk2", JSON.stringify(valueLocalStore))
                e.target.title = "produk2"
            }
            else if (p1 !== null && p2 !== null && p3 == null) {
                localStorage.setItem("produk3", JSON.stringify(valueLocalStore))
                e.target.title = "produk3"
            }
            else {
                alert("Maximal 3 product")
                localStorage.removeItem("produk1")
                localStorage.removeItem("produk2")
                localStorage.removeItem("produk3")
                resetColor();
            }
        }
        else {
            e.target.innerText = "Compare"
            e.target.style.background = "#89c340"
            if (p2 === null) {
                localStorage.removeItem(e.target.title)
            }
            if (p3 === null) {
                localStorage.removeItem(e.target.title)
            }
            else {
                localStorage.removeItem(e.target.title)
            }
        }
    }
    useEffect(() => {
        // removeLocalProd();
    }, [])
    return (
        <Fragment>
            <div className={styles.productItem}>
                <div className={styles.shortproduct}>
                    <div className={styles.imageprod} style={{ maxWidth: 80 }}>
                        <Image
                            src={apiUrl + props.productImage.url}
                            width={props.productImage.width / 3}
                            height={props.productImage.height / 3}
                            alt={props.productImage.name}
                        />{" "}
                    </div>
                    <div className={styles.productinfo}>
                        <div className="flextitleSpesific">
                            <div className="contTitleSpesific">
                                <Link href={`${"handphone/" + props.slug}`}><a><h5 style={{ minHeight: 45 }}>{ReactHtmlParser(props.title)}</h5></a></Link>
                                <h6>{ReactHtmlParser(props.memoryInternal)}</h6>
                            </div>
                        </div>
                        {/* <Rate rate={props.post.rating} voters={props.post.total_voters} /> */}
                        {props.rating !== null && (
                            <Rate rate={props.rating} voters={props.voters} />
                        )}
                    </div>
                </div>
                <div className={`${styles.wrpbtn}`}>
                    <div onClick={props.action}>
                        <button className={`${styles.btnfull} btncompare`} name="mybtn" onClick={(e) => addCompare(props.slug, e, props.title)} >
                            Compare
                        </button>
                    </div>
                    <Link href={`${"handphone/" + props.slug}`}>
                        <a className={styles.btnblank}>
                            See Details
                        </a>
                    </Link>
                </div>
            </div>
        </Fragment>
    )
}
