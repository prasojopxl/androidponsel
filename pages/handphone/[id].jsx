import { useEffect, useState, useRef, Fragment } from "react"
import Image from "next/image"
import styles from "./index.module.scss";
import { apiUrl, baseUrl } from "../../config/variable";
import LayoutHandphone from "../../layout/layouthandphone/LayoutHandphone";
import { Title, Rate, Ads, AdsBanner } from "../../components";
import Slider from "react-slick";


export default function DetailPage({post, dataContentAds}) {
    const [state, setState] = useState({ nav1: null, nav2: null });
    const slider1 = useRef();
    const slider2 = useRef();
    var showSlider = 0;
    post.product_image.length <=3 ? showSlider= post.product_image.length: showSlider=4;
    const { nav1, nav2 } = state;

    const [contentAds, setContentAds] = useState({
        iframe:[],
        bannerImage:[],
        link:[],
        urlImage:[],
        widthImage:[],
        heightImage:[]
    })
    const getContentAds = () => {
        dataContentAds.Image_Banner === null ? setContentAds({iframe:dataContentAds.URL_Iframe}) : setContentAds({
            bannerImage:"withBanner",
            link:dataContentAds.url,
            urlImage:apiUrl+dataContentAds.Image_Banner.url,
            widthImage: dataContentAds.Image_Banner.width,
            heightImage: dataContentAds.Image_Banner.height,
        })
    }    
    const [show, setShow] = useState(false)
    const showData = () => {
        show === true ? setShow(false) : setShow(true)
    }

    useEffect(()=> {
        setState({
            nav1: slider1.current,
            nav2: slider2.current
        });
        getContentAds()
    },[])

    return (
        <LayoutHandphone>
            <div className={styles.detailproducts}>
                <div className={styles.contents}>
                    <Title title="Overview Produk"></Title>
                    <div className={styles.overview}>
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="slider_overview">
                                    <div className={styles.mainslide}>
                                        <Slider fade={true} slidesToShow= {1} asNavFor={nav2} ref={slider => (slider1.current = slider)}>
                                            {
                                                post.product_image.map((item,i)=> {
                                                    return (
                                                        <Fragment>                  
                                                            <div className="main_image_overview">
                                                                <Image src={apiUrl+item.url} width={208} height={275.6} alt={item.name}/>
                                                            </div>
                                                        </Fragment>
                                                    )
                                                })
                                            }
                                        </Slider>  
                                    </div>

                                    {
                                        post.product_image.length > 1 &&
                                        <div className={styles.subslider}>
                                            <div className="subslide-thub">
                                                <Slider asNavFor={nav1} ref={slider => (slider2.current = slider)} slidesToShow={showSlider}  swipeToSlide={true} focusOnSelect={true}>
                                                {
                                                    post.product_image.map((item,i)=> {
                                                        return (
                                                            <Fragment>                  
                                                                <div className="sub_image_overview" >
                                                                    <Image src={apiUrl+item.url} width={160/3} height={212/3} alt={item.name}/>
                                                                </div>
                                                            </Fragment>
                                                        )
                                                    })
                                                }
                                                </Slider>  
                                            </div>  
                                        </div>  
                                    }
                                </div>

                            </div>
                            <div className="col-lg-7">
                                <div className={styles.shortdesc}>
                                    <h1>{post.title}</h1>
                                    <Rate TotalRate={post.rate.rating}/>
                                    <h4>Spesifikasi Ringkas</h4>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}><Image src="/icon-brand.png" width={19} height={21} alt="brand"/><label>Brand Product</label></div>
                                                {post.brand.title}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}><Image src="/icon-release.png" width={18} height={18} alt="release"/><label>Status / Release</label></div>
                                                {post.status}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}><Image src="/icon-network.png" width={19} height={21} alt="network"/><label>Network</label></div>
                                                {post.bands_2G !==null && <span>2G</span>} {post.bands_3G!==null && <span>3G</span>}  {post.bands_4G!==null && <span>4G</span>} {post.bands_5G!==null && <span>5G</span> }
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}><Image src="/icon-resolution.png" width={21} height={16} alt="resolution"/><label>Resolution</label></div>
                                                {post.resolution}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}><Image src="/icon-size.png" width={18} height={18} alt="size"/><label>Size</label></div>
                                                {post.size}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}><Image src="/icon-os.png" width={22} height={13} alt="os"/><label>Operating Sistem</label></div>
                                                {post.os}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}><Image src="/icon-processor.png" width={21} height={21} alt="processor"/><label>Prosessor</label></div>
                                                {post.cpu}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}><Image src="/icon-memory.png" width={15} height={20} alt="memory"/><label>Memory Penyimpanan</label></div>
                                                {post.memory_internal}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}><Image src="/icon-camera.png" width={20} height={16} alt="camera"/><label>Main Camera</label></div>
                                                {post.main_cam_triple}
                                            </div>
                                        </div>                                            
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}><Image src="/icon-camera.png" width={20} height={16} alt="camera"/><label>Selfie Camera</label></div>
                                                {post.selfie_cam_single}
                                            </div>
                                        </div>                                            
                                        <div className="col-lg-4">
                                            <div className={styles.itemshort}>
                                                <div className={styles.title}><Image src="/icon-battery.png" width={22} height={11} alt="camera"/><label>Kapasitas Battery</label></div>
                                                {post.charging_type}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    contentAds.bannerImage === "withBanner" ? <AdsBanner linkbanner={contentAds.link} urlImage={contentAds.urlImage} width={contentAds.widthImage} height={contentAds.heightImage}/>
                    : <Ads banner={contentAds.iframe}/>
                }            

                
                <div className={styles.contents}>
                    <div className="row">
                        <div className="col-lg-10">
                            <Title title="Basic Information" idName="basic"/>
                            <div className={styles.itemDesc}>
                                <h5>Deskripsi Produk</h5>
                                {post.description !==null ? post.description : "Belum ada deskripsi produk" }
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Brand Produk</h5>
                                {post.brand.title}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Status dan Release</h5>
                                {post.status}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Warna</h5>
                                {post.color}
                            </div>

                            <Title title="Design Material" idName="design"/>
                            <div className={styles.itemDesc}>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <h5>Ukuran Dimensi</h5>
                                        {post.size }
                                    </div>
                                    <div className="col-lg-4">
                                        <h5>Weight</h5>
                                        {post.weight }
                                    </div>
                                    <div className="col-lg-4">
                                        <h5>Resolution</h5>
                                        {post.resolution }
                                    </div>
                                </div>
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Type</h5>
                                {post.display_type}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Protection</h5>
                                {post.protection}
                            </div>

                            <Title title="Performance & Hardware" idName="hardware"/>
                            <div className={styles.itemDesc}>
                                <h5>Processor</h5>
                                {post.cpu }
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Graphic</h5>
                                {post.gpu}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Memory</h5>
                                {post.ram}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Card Slot</h5>
                                {post.card_slot}
                            </div>

                            <Title title="Camera" idName="camera"/>
                            <div className={styles.itemDesc}>
                                <h5>Main Camera</h5>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <h6>Quad</h6>
                                        {post.main_cam_triple}
                                    </div>
                                    <div className="col-lg-4">
                                        <h6>Feature</h6>
                                        {post.main_cam_features}
                                    </div>
                                    <div className="col-lg-4">
                                        <h6>Video</h6>
                                        {post.main_cam_video}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Selfie Camera</h5>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <h6>Quad</h6>
                                        {post.selfie_cam_single}
                                    </div>
                                    <div className="col-lg-4">
                                        <h6>Feature</h6>
                                        {post.selfie_cam_features}
                                    </div>
                                    <div className="col-lg-4">
                                        <h6>Video</h6>
                                        {post.selfie_cam_video}
                                    </div>
                                </div>
                            </div>

                            <Title title="Battery" idName="battery"/>
                            <div className={styles.itemDesc}>
                                <h5>Batterai</h5>
                                {post.charging_type}
                            </div>

                            <Title title="Sofware" idName="software"/>
                            <div className={styles.itemDesc}>
                                <h5>Operating System</h5>
                                {post.os}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Chipset</h5>
                                {post.chipset}
                            </div>

                            <Title title="Sensors" idName="sensors"/>
                            <div className={styles.itemDesc}>
                                <h5>Sensor</h5>
                                {post.sensors}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>NFC</h5>
                                {post.nfc}
                            </div>

                            <Title title="Network" idName="network"/>
                            <div className={styles.itemDesc}>
                                <h5>Teknologi</h5>
                                {post.technology} | <span className={styles.linkGeneral} onClick={showData}>Lihat Detail</span>
                                {show && 
                                    <ul>
                                        <li>2G : {post.bands_2G}</li>
                                        <li>3G : {post.bands_3G}</li>
                                        <li>4G : {post.bands_4G}</li>
                                        <li>5G : {post.bands_5G}</li>
                                    </ul>
                                
                                }
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>SIM</h5>
                                {post.sim}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>WLAN</h5>
                                {post.wlan}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Bluetooth</h5>
                                {post.bluetooth}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>GPS</h5>
                                {post.gps}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Infrared</h5>
                                {post.infrared}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>Radio</h5>
                                {post.radio}
                            </div>
                            <div className={styles.itemDesc}>
                                <h5>USB</h5>
                                {post.usb}
                            </div>

                            <Title title="Harga di Marketplace" idName="harga"/>
                            <h2>Harga</h2>


                        </div>

                        <div className="col-lg-2">
                            <Title title="Table of Content"/>
                            <div className={styles.boxTableContent}>
                                <ul>
                                    <li><a href="#">Basic Information</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </LayoutHandphone>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${apiUrl}/products?category=1`)
    const posts = await res.json()

    const paths = posts.map((post)=>({
        params: {id: `${post.slug}`}
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const res = await fetch(`${apiUrl}/products/${params.id}`)
    const post = await res.json()

    const res2 = await fetch(`${apiUrl}/ads/2`)
    const dataContentAds = await res2.json()

    return {
        props: {
            dataContentAds,
            post,
        }
    }

}
