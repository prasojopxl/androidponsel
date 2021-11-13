import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { GlobalAds, Rate, RateBox, Title } from "../../components";
import { fetchData } from "../../config/data";
import { apiUrl, baseUrl, staticImage } from "../../config/variable";
import Layout from "../../layout";
import styles from "./index.module.scss";
// import styles from "./stylebug.module.scss";
import { Cookies, useCookies } from "react-cookie";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //https://dev.to/vuongddang/how-to-use-fontawesome-in-next-js-5bl5

export default function DetailPage(props) {
    const [newRate, setNewRate] = useState("")
    const [newSubmitRate, setNewSubmitRate] = useState(0)
    const [valueNewVoters, setValueNewVoters] = useState(props.post.total_voters)
    const router = useRouter()
    const checkDataUser = () => {
        axios.post(`${apiUrl}/auth/local`, {
            "identifier": "guest@androidponsel.com",
            "password": "camel0tlancel0t09"
        }).then((res) => {
            localStorage.setItem("authRate", res.data.jwt)
        })
    }
    const [cookie, setCookie, removeCookie] = useCookies([])
    const submitRate = () => {
        if (newSubmitRate >= 0) {
            setCookie(`statusID`, "deactive", {
                maxAge: 60 * 60 * 24 * 1,
                sameSite: true
            })
            setDisplayRate(false)
            const token = localStorage.getItem("authRate")
            const valueNewRate = (parseFloat(props.post.rating) + parseInt(newSubmitRate));
            console.log(parseFloat(props.post.rating))
            axios.put(`${apiUrl}/products/${props.post.id}`,
                {
                    "rating": parseFloat(valueNewRate),
                    "total_voters": valueNewVoters + 1
                },
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
        }
        else {
            alert("Terima kasih")
        }

    }
    const [displayRate, setDisplayRate] = useState(true)
    const [state, setState] = useState({ nav1: null, nav2: null });
    const slider1 = useRef();
    const slider2 = useRef();
    var showSlider = 0;
    props.post.product_image.length <= 3
        ? (showSlider = props.post.product_image.length)
        : (showSlider = 4);
    const { nav1, nav2 } = state;

    const [show, setShow] = useState(false);
    const showData = () => {
        show === true ? setShow(false) : setShow(true);
    };
    const currentPage = ["handphone"];
    useEffect(() => {
        checkDataUser();
        cookie.statusID === "deactive" && setDisplayRate(false), localStorage.removeItem("authRate")
        setState({
            nav1: slider1.current,
            nav2: slider2.current,
        });
    }, []);

    return (
        <Layout
            dataSEO={props.dataSEO.seo}
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
                            <div className="col-lg-7 add-md-4">
                                <div className={styles.shortdesc}>
                                    <h1>{props.post.title}</h1>
                                    <Rate rate={props.post.rating} voters={props.post.total_voters} />
                                    <h4>Specification</h4>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src={staticImage + "icon-brand.png"}
                                                        width={19}
                                                        height={21}
                                                        alt="brand"
                                                    />
                                                    <label>Brand Product</label>
                                                </div>
                                                {ReactHtmlParser(props.post.brand.title)}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src={staticImage + "icon-release.png"}
                                                        width={18}
                                                        height={18}
                                                        alt="release"
                                                    />
                                                    <label>Status / Release</label>
                                                </div>
                                                {ReactHtmlParser(props.post.status)}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src={staticImage + "icon-network.png"}
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
                                                        src={staticImage + "icon-resolution.png"}
                                                        width={21}
                                                        height={16}
                                                        alt="resolution"
                                                    />
                                                    <label>Resolution</label>
                                                </div>
                                                {ReactHtmlParser(props.post.resolution)}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src={staticImage + "icon-size.png"}
                                                        width={18}
                                                        height={18}
                                                        alt="size"
                                                    />
                                                    <label>Size</label>
                                                </div>
                                                {ReactHtmlParser(props.post.size)}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src={staticImage + "icon-os.png"}
                                                        width={22}
                                                        height={13}
                                                        alt="os"
                                                    />
                                                    <label>Operating Sistem</label>
                                                </div>
                                                {ReactHtmlParser(props.post.os)}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src={staticImage + "icon-processor.png"}
                                                        width={21}
                                                        height={21}
                                                        alt="processor"
                                                    />
                                                    <label>Prosessor</label>
                                                </div>
                                                {ReactHtmlParser(props.post.cpu)}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src={staticImage + "icon-memory.png"}
                                                        width={15}
                                                        height={20}
                                                        alt="memory"
                                                    />
                                                    <label>Memory Storage</label>
                                                </div>
                                                {ReactHtmlParser(props.post.memory_internal)}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src={staticImage + "icon-camera.png"}
                                                        width={20}
                                                        height={16}
                                                        alt="camera"
                                                    />
                                                    <label>Main Camera</label>
                                                </div>
                                                {ReactHtmlParser(props.post.main_cam)}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src={staticImage + "icon-camera.png"}
                                                        width={20}
                                                        height={16}
                                                        alt="camera"
                                                    />
                                                    <label>Selfie Camera</label>
                                                </div>
                                                {ReactHtmlParser(props.post.selfie_cam_single)}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}>
                                                    <Image
                                                        src={staticImage + "icon-battery.png"}
                                                        width={22}
                                                        height={11}
                                                        alt="camera"
                                                    />
                                                    <label>Battery Capacity</label>
                                                </div>
                                                {ReactHtmlParser(props.post.charging_type)}
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
                        <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
                            <div className="left_side_spesification">
                                <div className="separateLines">
                                    <Title title="Basic Information" idName="basic" />
                                    {/* <div className={styles.itemDesc}>
                                        <h5>Description Product</h5>
                                        {props.post.description !== null
                                            ? props.post.description
                                            : "Belum ada deskripsi produk"}
                                    </div> */}
                                    <div className={styles.itemDesc}>
                                        <h5>Brand Produk</h5>
                                        {ReactHtmlParser(props.post.brand.title)}
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>Status</h5>
                                        {ReactHtmlParser(props.post.status)}
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>Tanggal Rilis</h5>
                                        {ReactHtmlParser(props.post.release_date)}
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>Warna</h5>
                                        {ReactHtmlParser(props.post.color)}
                                    </div>
                                </div>
                                <GlobalAds adsId="3" />
                                <div className="separateLines">
                                    <Title title="Design Material" idName="design" />
                                    <div className={styles.itemDesc}>
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <h5>Ukuran Dimensi</h5>
                                                {ReactHtmlParser(props.post.size)}
                                            </div>
                                            <div className="col-lg-4">
                                                <h5>Weight</h5>
                                                {ReactHtmlParser(props.post.weight)}
                                            </div>
                                            <div className="col-lg-4">
                                                <h5>Resolution</h5>
                                                {ReactHtmlParser(props.post.resolution)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>Type</h5>
                                        {ReactHtmlParser(props.post.display_type)}
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>Protection</h5>
                                        {ReactHtmlParser(props.post.protection)}
                                    </div>
                                </div>
                                <GlobalAds adsId="4" />
                                <div className="separateLines">
                                    <Title title="Performance & Hardware" idName="hardware" />
                                    <div className={styles.itemDesc}>
                                        <h5>Processor</h5>
                                        {ReactHtmlParser(props.post.cpu)}
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>Graphic</h5>
                                        {ReactHtmlParser(props.post.gpu)}
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>Memory</h5>
                                        {ReactHtmlParser(props.post.ram)}
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>Card Slot</h5>
                                        {ReactHtmlParser(props.post.card_slot)}
                                    </div>
                                </div>
                                <GlobalAds adsId="5" />
                                <div className="separateLines">
                                    <Title title="Camera" idName="camera" />
                                    <div className={styles.itemDesc}>
                                        <h5>Main Camera: {props.post.main_cam}</h5>
                                        <div className="row">
                                            {props.post.sensor_cam1 !== "" && <div className="col-lg-4">{ReactHtmlParser(props.post.sensor_cam1)}</div>}
                                            {props.post.sensor_cam2 !== "" && <div className="col-lg-4">{ReactHtmlParser(props.post.sensor_cam2)}</div>}
                                            {props.post.sensor_cam3 !== "" && <div className="col-lg-4">{ReactHtmlParser(props.post.sensor_cam3)}</div>}
                                            {props.post.sensor_cam4 !== "" && <div className="col-lg-4">{ReactHtmlParser(props.post.sensor_cam4)}</div>}
                                            {props.post.sensor_cam5 !== "" && <div className="col-lg-4">{ReactHtmlParser(props.post.sensor_cam5)}</div>}
                                            {props.post.sensor_cam6 !== "" && <div className="col-lg-4">{ReactHtmlParser(props.post.sensor_cam6)}</div>}
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <h6>Feature</h6>
                                                {ReactHtmlParser(props.post.main_cam_features)}
                                            </div>
                                            <div className="col-lg-4">
                                                <h6>Video</h6>
                                                {ReactHtmlParser(props.post.main_cam_video)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>Selfie Camera</h5>
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <h6>Quad</h6>
                                                {ReactHtmlParser(props.post.selfie_cam_single)}
                                            </div>
                                            <div className="col-lg-4">
                                                <h6>Feature</h6>
                                                {ReactHtmlParser(props.post.selfie_cam_features)}
                                            </div>
                                            <div className="col-lg-4">
                                                <h6>Video</h6>
                                                {ReactHtmlParser(props.post.selfie_cam_video)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <GlobalAds adsId="6" />
                                <div className="separateLines">
                                    <Title title="Battery" idName="battery" />
                                    <div className={styles.itemDesc}>
                                        <h5>Batterai</h5>
                                        {ReactHtmlParser(props.post.charging_type)}
                                    </div>
                                </div>
                                <GlobalAds adsId="7" />
                                <div className="separateLines">
                                    <Title title="Software" idName="software" />
                                    <div className={styles.itemDesc}>
                                        <h5>Operating System</h5>
                                        {ReactHtmlParser(props.post.os)}
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>Chipset</h5>
                                        {ReactHtmlParser(props.post.chipset)}
                                    </div>
                                </div>
                                <GlobalAds adsId="8" />
                                <div className="separateLines">
                                    <Title title="Sensors" idName="sensors" />
                                    <div className={styles.itemDesc}>
                                        <h5>Sensor</h5>
                                        {ReactHtmlParser(props.post.sensors)}
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>NFC</h5>
                                        {ReactHtmlParser(props.post.nfc)}
                                    </div>
                                </div>
                                <GlobalAds adsId="9" />
                                <div className="separateLines">
                                    <Title title="Network" idName="network" />
                                    <div className={styles.itemDesc}>
                                        <h5>Teknologi</h5>
                                        {ReactHtmlParser(props.post.technology)} |{" "}
                                        <span className={styles.linkGeneral} onClick={showData}>
                                            Lihat Detail
                                        </span>
                                        {show && (
                                            <ul>
                                                <li>2G : {ReactHtmlParser(props.post.bands_2G)}</li>
                                                <li>3G : {ReactHtmlParser(props.post.bands_3G)}</li>
                                                <li>4G : {ReactHtmlParser(props.post.bands_4G)}</li>
                                                <li>5G : {ReactHtmlParser(props.post.bands_5G)}</li>
                                            </ul>
                                        )}
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>SIM</h5>
                                        {ReactHtmlParser(props.post.SIM)}
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>WLAN</h5>
                                        {ReactHtmlParser(props.post.wlan)}
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>Bluetooth</h5>
                                        {ReactHtmlParser(props.post.bluetooth)}
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>GPS</h5>
                                        {ReactHtmlParser(props.post.gps)}
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>Infrared</h5>
                                        {ReactHtmlParser(props.post.infrared)}
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>Radio</h5>
                                        {ReactHtmlParser(props.post.radio)}
                                    </div>
                                    <div className={styles.itemDesc}>
                                        <h5>USB</h5>
                                        {ReactHtmlParser(props.post.usb)}
                                    </div>
                                </div>
                                <GlobalAds adsId="10" />
                                <Fragment>
                                    <Title title="Price Marketplace" idName="harga" />
                                    <div className="row gutter-0 commerce_price" style={{ marginTop: 15 }}>
                                        {
                                            props.post.Price_Marketplace.map((item, i) => {
                                                return (
                                                    <div className="col-lg-3 col-md-12 col-sm-12 col-12" key={item.id}>
                                                        <div className="wrp-commercePrice">
                                                            <div className={styles.itemMarket}>
                                                                <div className={styles.logoMarketplace}>
                                                                    <Image src={apiUrl + item.logo.url} width={item.logo.width} height={item.logo.height} alt={item.title} />
                                                                </div>
                                                                {
                                                                    item.List.map((listItem, i) => {
                                                                        return (
                                                                            <div className={styles.productMarketplace} key={listItem.id}>
                                                                                <h6>{ReactHtmlParser(listItem.spec)}</h6>
                                                                                <h4>{ReactHtmlParser(listItem.price)}</h4>
                                                                                <Link href={listItem.link}><a>Check di {item.title}</a></Link>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
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
                        </div>

                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-12 order-first order-md-last">
                            <div className={styles.boxTableContent}>
                                <div className="right_side_spesification">
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
                                            <a href="#software">Software</a>
                                        </li>
                                        <li>
                                            <a href="#sensors">Sensors</a>
                                        </li>
                                        <li>
                                            <a href="#network">Network</a>
                                        </li>
                                        <li>
                                            <a href="#harga">Price Marketplace</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.ratingSubmit}>
                    <div className={styles.contents}>
                        <Title title="Rating" />
                        <div className={styles.rateInfo} style={{ display: "flex", alignItems: "center" }}>
                            <div className={styles.ratingBox}>
                                <RateBox rate={props.post.rating} voters={props.post.total_voters} />
                            </div>
                            {displayRate ? (
                                <div className={styles.ratingformdisplay}>
                                    <h2 className={styles.titlerate}>Submit Your Rate</h2>
                                    <FontAwesomeIcon icon={faStar} style={{ cursor: "pointer", color: newSubmitRate >= 1 ? "#ffc529" : "#d7d7d7" }} onClick={() => { setNewSubmitRate(1) }} />
                                    <FontAwesomeIcon icon={faStar} style={{ cursor: "pointer", color: newSubmitRate >= 2 ? "#ffc529" : "#d7d7d7" }} onClick={() => { setNewSubmitRate(2) }} />
                                    <FontAwesomeIcon icon={faStar} style={{ cursor: "pointer", color: newSubmitRate >= 3 ? "#ffc529" : "#d7d7d7" }} onClick={() => { setNewSubmitRate(3) }} />
                                    <FontAwesomeIcon icon={faStar} style={{ cursor: "pointer", color: newSubmitRate >= 4 ? "#ffc529" : "#d7d7d7" }} onClick={() => { setNewSubmitRate(4) }} />
                                    <FontAwesomeIcon icon={faStar} style={{ cursor: "pointer", color: newSubmitRate >= 5 ? "#ffc529" : "#d7d7d7" }} onClick={() => { setNewSubmitRate(5) }} />
                                    <div style={{
                                        background: "#89c340", color: "#fff", borderRadius: 17, padding: 11, maxWidth: 170, textAlign: "center", marginTop: 15, fontSize: 17
                                    }} onClick={submitRate}>Submit</div>
                                </div>
                            ) : <div className={styles.inforating} style={{ marginLeft: 15 }}>Thanks for your contribution</div>
                            }
                        </div>
                    </div>
                </div>

                <div className={styles.relatedProducts}>
                    <div className={styles.contents}>
                        <Title title="Related Product" />
                        <div className="row">
                            {props.dataRelatedProd.map((value, index) => {
                                return (
                                    <Fragment key={value.id}>
                                        <div
                                            className={
                                                props.dataRelatedProd !== 3 ? `col-lg-3 col-sm-6 col-6 relateProduct` : `col-lg-4`
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
                                                        <div className="flextitleSpesific">
                                                            <div className="contTitleSpesific">
                                                                <Link href={`${"/handphone/" + value.slug}`}><a><h5>{value.title}</h5></a></Link>
                                                                <h6>{value.memory_internal}</h6>
                                                            </div>
                                                        </div>
                                                        <Rate rate={value.rating} voters={value.total_voters} />
                                                    </div>
                                                </div>
                                                <div className={styles.wrpbtn}>
                                                    <Link href={baseUrl + currentPage + "/" + value.slug}>
                                                        <a className={styles.btnblank}>
                                                            See Detail Spesification
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
        </Layout >
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
        revalidate: 3
    };
}
