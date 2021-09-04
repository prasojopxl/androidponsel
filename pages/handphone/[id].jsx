import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { GlobalAds, Rate, Title } from "../../components";
import { fetchData } from "../../config/data";
import { apiUrl, baseUrl } from "../../config/variable";
import Layout from "../../layout";
import styles from "./index.module.scss";

export default function DetailPage(props) {
    const [state, setState] = useState({ nav1: null, nav2: null });
    const slider1 = useRef();
    const slider2 = useRef();
    var showSlider = 0;
    props.post.product_image.length <= 3
        ? (showSlider = props.post.product_image.length)
        : (showSlider = 4);
    const { nav1, nav2 } = state;

    const router = useRouter()

    const [show, setShow] = useState(false);
    const showData = () => {
        show === true ? setShow(false) : setShow(true);
    };
    const currentPage = ["handphone"];
    useEffect(() => {
        setState({
            nav1: slider1.current,
            nav2: slider2.current,
        });
    }, []);

    return (
        <Layout
            dataSEO={props.dataSEO.seo}
            dataMainMenu={props.getMenu}
            dataBrands={props.getTopBrands}
        >

            <GlobalAds adsId="1" />

            <div className={styles.detailproducts}>
                <div className={styles.contents}>
                    <Title title="Overview Produk"></Title>
                    <div className={styles.overview}>
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="slider_overview">
                                    <div className={styles.mainslide}>
                                        <Slider
                                            fade={true}
                                            slidesToShow={1}
                                            asNavFor={nav2}
                                            ref={(slider) => (slider1.current = slider)}
                                        >
                                            {props.post.product_image.map((item, i) => {
                                                return (
                                                    <Fragment key={item.id}>
                                                        <div className="main_image_overview">
                                                            <Image
                                                                src={apiUrl + item.url}
                                                                width={208}
                                                                height={275.6}
                                                                alt={item.name}
                                                            />
                                                        </div>
                                                    </Fragment>
                                                );
                                            })}
                                        </Slider>
                                    </div>

                                    {props.post.product_image.length > 1 && (
                                        <div className={styles.subslider}>
                                            <div className="subslide-thub">
                                                <Slider
                                                    asNavFor={nav1}
                                                    ref={(slider) => (slider2.current = slider)}
                                                    slidesToShow={showSlider}
                                                    swipeToSlide={true}
                                                    focusOnSelect={true}
                                                >
                                                    {props.post.product_image.map((item, i) => {
                                                        return (
                                                            <Fragment key={item.id}>
                                                                <div className="sub_image_overview">
                                                                    <Image
                                                                        src={apiUrl + item.url}
                                                                        width={160 / 3}
                                                                        height={212 / 3}
                                                                        alt={item.name}
                                                                    />
                                                                </div>
                                                            </Fragment>
                                                        );
                                                    })}
                                                </Slider>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className={styles.shortdesc}>
                                    <h1>{props.post.title}</h1>
                                    <Rate TotalRate={props.post.rating} />
                                    <h4>Spesifikasi Ringkas</h4>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src="/icon-brand.png"
                                                        width={19}
                                                        height={21}
                                                        alt="brand"
                                                    />
                                                    <label>Brand Product</label>
                                                </div>
                                                {props.post.brand.title}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src="/icon-release.png"
                                                        width={18}
                                                        height={18}
                                                        alt="release"
                                                    />
                                                    <label>Status / Release</label>
                                                </div>
                                                {props.post.status}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src="/icon-network.png"
                                                        width={19}
                                                        height={21}
                                                        alt="network"
                                                    />
                                                    <label>Network</label>
                                                </div>
                                                {props.post.bands_2G !== null && <span>2G</span>}{" "}
                                                {props.post.bands_3G !== null && <span>3G</span>}{" "}
                                                {props.post.bands_4G !== null && <span>4G</span>}{" "}
                                                {props.post.bands_5G !== null && <span>5G</span>}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src="/icon-resolution.png"
                                                        width={21}
                                                        height={16}
                                                        alt="resolution"
                                                    />
                                                    <label>Resolution</label>
                                                </div>
                                                {props.post.resolution}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src="/icon-size.png"
                                                        width={18}
                                                        height={18}
                                                        alt="size"
                                                    />
                                                    <label>Size</label>
                                                </div>
                                                {props.post.size}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src="/icon-os.png"
                                                        width={22}
                                                        height={13}
                                                        alt="os"
                                                    />
                                                    <label>Operating Sistem</label>
                                                </div>
                                                {props.post.os}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src="/icon-processor.png"
                                                        width={21}
                                                        height={21}
                                                        alt="processor"
                                                    />
                                                    <label>Prosessor</label>
                                                </div>
                                                {props.post.cpu}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src="/icon-memory.png"
                                                        width={15}
                                                        height={20}
                                                        alt="memory"
                                                    />
                                                    <label>Memory Penyimpanan</label>
                                                </div>
                                                {props.post.memory_internal}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src="/icon-camera.png"
                                                        width={20}
                                                        height={16}
                                                        alt="camera"
                                                    />
                                                    <label>Main Camera</label>
                                                </div>
                                                {props.post.main_cam_triple}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src="/icon-camera.png"
                                                        width={20}
                                                        height={16}
                                                        alt="camera"
                                                    />
                                                    <label>Selfie Camera</label>
                                                </div>
                                                {props.post.selfie_cam_single}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src="/icon-battery.png"
                                                        width={22}
                                                        height={11}
                                                        alt="camera"
                                                    />
                                                    <label>Kapasitas Battery</label>
                                                </div>
                                                {props.post.charging_type}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <GlobalAds adsId="2" />

                <div className={styles.contents}>
                    <div className="row">
                        <div className="col-lg-9">
                            <Title title="Basic Information" idName="basic" />
                            <div className={styles.itemDesc}>
                                <h5>Deskripsi Produk</h5>
                                {props.post.description !== null
                                    ? props.post.description
                                    : "Belum ada deskripsi produk"}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Brand Produk</h5>
                                {props.post.brand.title}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Status dan Release</h5>
                                {props.post.status}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Warna</h5>
                                {props.post.color}
                            </div>

                            <Title title="Design Material" idName="design" />
                            <div className={styles.itemDesc}>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <h5>Ukuran Dimensi</h5>
                                        {props.post.size}
                                    </div>
                                    <div className="col-lg-4">
                                        <h5>Weight</h5>
                                        {props.post.weight}
                                    </div>
                                    <div className="col-lg-4">
                                        <h5>Resolution</h5>
                                        {props.post.resolution}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Type</h5>
                                {props.post.display_type}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Protection</h5>
                                {props.post.protection}
                            </div>

                            <Title title="Performance & Hardware" idName="hardware" />
                            <div className={styles.itemDesc}>
                                <h5>Processor</h5>
                                {props.post.cpu}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Graphic</h5>
                                {props.post.gpu}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Memory</h5>
                                {props.post.ram}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Card Slot</h5>
                                {props.post.card_slot}
                            </div>

                            <Title title="Camera" idName="camera" />
                            <div className={styles.itemDesc}>
                                <h5>Main Camera</h5>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <h6>Quad</h6>
                                        {props.post.main_cam_triple}
                                    </div>
                                    <div className="col-lg-4">
                                        <h6>Feature</h6>
                                        {props.post.main_cam_features}
                                    </div>
                                    <div className="col-lg-4">
                                        <h6>Video</h6>
                                        {props.post.main_cam_video}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Selfie Camera</h5>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <h6>Quad</h6>
                                        {props.post.selfie_cam_single}
                                    </div>
                                    <div className="col-lg-4">
                                        <h6>Feature</h6>
                                        {props.post.selfie_cam_features}
                                    </div>
                                    <div className="col-lg-4">
                                        <h6>Video</h6>
                                        {props.post.selfie_cam_video}
                                    </div>
                                </div>
                            </div>

                            <Title title="Battery" idName="battery" />
                            <div className={styles.itemDesc}>
                                <h5>Batterai</h5>
                                {props.post.charging_type}
                            </div>

                            <Title title="Sofware" idName="software" />
                            <div className={styles.itemDesc}>
                                <h5>Operating System</h5>
                                {props.post.os}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Chipset</h5>
                                {props.post.chipset}
                            </div>

                            <Title title="Sensors" idName="sensors" />
                            <div className={styles.itemDesc}>
                                <h5>Sensor</h5>
                                {props.post.sensors}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>NFC</h5>
                                {props.post.nfc}
                            </div>

                            <Title title="Network" idName="network" />
                            <div className={styles.itemDesc}>
                                <h5>Teknologi</h5>
                                {props.post.technology} |{" "}
                                <span className={styles.linkGeneral} onClick={showData}>
                                    Lihat Detail
                                </span>
                                {show && (
                                    <ul>
                                        <li>2G : {props.post.bands_2G}</li>
                                        <li>3G : {props.post.bands_3G}</li>
                                        <li>4G : {props.post.bands_4G}</li>
                                        <li>5G : {props.post.bands_5G}</li>
                                    </ul>
                                )}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>SIM</h5>
                                {props.post.sim}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>WLAN</h5>
                                {props.post.wlan}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Bluetooth</h5>
                                {props.post.bluetooth}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>GPS</h5>
                                {props.post.gps}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Infrared</h5>
                                {props.post.infrared}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Radio</h5>
                                {props.post.radio}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>USB</h5>
                                {props.post.usb}
                            </div>

                            <Fragment>
                                <Title title="Harga di Marketplace" idName="harga" />
                                <div className="row" style={{ marginTop: 15 }}>
                                    {
                                        props.post.Price_Marketplace.map((item, i) => {
                                            return (
                                                <div className="col-lg-3">
                                                    <div className={styles.itemMarket}>
                                                        <div className={styles.logoMarketplace}>
                                                            <Image src={apiUrl + item.logo.url} width={item.logo.width} height={item.logo.height} alt={item.title} />
                                                        </div>
                                                        <hr />
                                                        {
                                                            item.List.map((listItem, i) => {
                                                                return (
                                                                    <div className={styles.productMarketplace}>
                                                                        <h6>{listItem.spec}</h6>
                                                                        <h4>{listItem.price}</h4>
                                                                        <Link href={listItem.link}><a>Check di {item.title}</a></Link>
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
                            </Fragment>

                            {props.post.post && (
                                <div>
                                    <Title title="Review" idName="review" />
                                    <div className={styles.contentreview}>
                                        <h4>{props.post.post.title}</h4>
                                        <div className={styles.bodypost}>
                                            {props.post.post.content}
                                            <p style={{ marginTop: 20 }}>
                                                <Link
                                                    href={baseUrl + currentPage + "/" + props.post.post.slug}
                                                >
                                                    <a className="btn">Full Review</a>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="col-lg-3">
                            <div className={styles.boxTableContent}>
                                <Title title="Table of Content" />
                                <ul>
                                    <li>
                                        <a href="#basic">Basic Information</a>
                                    </li>
                                    <li>
                                        <a href="#design">Design Material</a>
                                    </li>
                                    <li>
                                        <a href="#hardware">Performance & Hardware</a>
                                    </li>
                                    <li>
                                        <a href="#camera">Camera</a>
                                    </li>
                                    <li>
                                        <a href="#battery">Battery</a>
                                    </li>
                                    <li>
                                        <a href="#sofware">Sofware</a>
                                    </li>
                                    <li>
                                        <a href="#sensors">Sensors</a>
                                    </li>
                                    <li>
                                        <a href="#network">Network</a>
                                    </li>
                                    <li>
                                        <a href="#harga">Harga di Marketplace</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.ratingSubmit}>
                    <div className={styles.contents}>
                        <h1>Rating di sini</h1>
                    </div>
                </div>

                <div className={styles.relatedProducts}>
                    <div className={styles.contents}>
                        <Title title="Produk Terkait" />
                        <div className="row">
                            {props.dataRelatedProd.map((value, index) => {
                                return (
                                    <Fragment key={value.id}>
                                        <div
                                            className={
                                                props.dataRelatedProd !== 3 ? `col-lg-3` : `col-lg-4`
                                            }
                                            key={value.id}
                                        >
                                            <div className={styles.productItem}>
                                                <div className={styles.shortproduct}>
                                                    <div className={styles.imageprod}>
                                                        <Image
                                                            src={apiUrl + value.product_image[0].url}
                                                            width={value.product_image[0].width / 3}
                                                            height={value.product_image[0].height / 3}
                                                            alt={value.product_image[0].name}
                                                        />{" "}
                                                    </div>
                                                    <div className={styles.productinfo}>
                                                        <h5>{value.title}</h5>
                                                        <h6>{value.memory_internal}</h6>
                                                        <Rate TotalRate={value.rating} />
                                                    </div>
                                                </div>
                                                <div className={styles.wrpbtn}>
                                                    <a href="#" className={styles.btnfull}>
                                                        BANDINGKAN PRODUK
                                                    </a>
                                                    <Link href={baseUrl + currentPage + "/" + value.slug}>
                                                        <a className={styles.btnblank}>
                                                            LIHAT SELENGKAPNYA
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const res = await fetch(`${apiUrl}/products?category=1`);
    const posts = await res.json();

    const paths = posts.map((post) => ({
        params: { id: `${post.slug}` },
    }));

    return {
        paths,
        fallback: false,
    };
}

function getRandomDifferent(arr, last = undefined) {
    if (arr.length === 0) {
        return;
    } else if (arr.length === 1) {
        return arr[0];
    } else {
        let num = 0;
        do {
            num = Math.floor(Math.random() * arr.length);
        } while (arr[num] === last);
        return arr[num];
    }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`${apiUrl}/products/${params.id}`);
    const post = await res.json();
    const res3 = await fetch(`${apiUrl}/products?brand=${post.brand.id}`);
    const dataProductBrand = await res3.json();
    const randomID = [];
    const listDataBrand = () => {
        dataProductBrand.map((item, i) => {
            {
                randomID.push(item.id);
            }
        });
    };


    listDataBrand();
    const random1 = getRandomDifferent(randomID);
    const random2 = getRandomDifferent(randomID, random1);
    const random3 = getRandomDifferent(randomID, random1, random2);
    const random4 = getRandomDifferent(randomID);
    const res4 = await fetch(
        `${apiUrl}/products?_id=${random1}&_id=${random2}&_id=${random3}&_id=${random4}`
    );
    const dataRelatedProd = await res4.json();

    const dataSEO = await fetchData("/general");
    const getMenu = await fetchData("/menus?_sort=order");
    const getTopBrands = await fetchData("/brands?_top_brand=true");


    return {
        props: {
            getMenu,
            getTopBrands,
            dataSEO,
            post,
            dataRelatedProd,
        },
    };
}
