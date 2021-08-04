import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import useSWR from 'swr';
import { Ads, AdsBanner, Rate } from "../../components";
import { apiUrl } from "../../config/variable";
import LayoutHandphone from "../../layout/layouthandphone/LayoutHandphone";
import styles from "./index.module.scss";


export default function compare({
	getMenu,
	getTopBrands,
	dataBanerCompareTop,
	dataBanerCompareBody,
}) {
	const router = useRouter();
	const { produk1, produk2, produk3 } = router.query;

	const [show, setShow] = useState(false);
	const showData = () => {
		show === true ? setShow(false) : setShow(true);
	};

	// const [dataCompare, setDataCompare] = useState([])
	const [ads1, setAds1] = useState({
		iframe: [],
		bannerImage: [],
		link: [],
		urlImage: [],
		widthImage: [],
		heightImage: [],
	});
	const getAds1 = () => {
		dataBanerCompareTop.Image_Banner === null
			? setAds1({ iframe: dataBanerCompareTop.URL_Iframe })
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
		dataBanerCompareBody.Image_Banner === null
			? setAds2({ iframe: dataBanerCompareBody.URL_Iframe })
			: setAds2({
				bannerImage: "withBanner",
				link: dataTopAds.url,
				urlImage: apiUrl + dataTopAds.Image_Banner.url,
				widthImage: dataTopAds.Image_Banner.width,
				heightImage: dataTopAds.Image_Banner.height,
			});
	};

	const url = `${apiUrl}/products?slug=${produk1}&slug=${produk2}&slug=${produk3}`
	const { data, error } = useSWR(`${url}`)
	if (!data) return <div>Loading</div>
	if (error) return <div>Failed</div>

	const dataCompare = data;


	// const getCompare = () => {
	// 	axios.get(`${apiUrl}/products?slug=${produk1}&slug=${produk2}&slug=${produk3}`).then((res) => {
	// 		setDataCompare(res.data)
	// 	})
	// }

	// const getCompare = async () => {
	// 	const res = await fetch(`${apiUrl}/products?slug=${produk1}&slug=${produk2}&slug=${produk3}`);
	// 	const dataCompare = await res.json();
	// 	setDataCompare(dataCompare)
	// }
	// getCompare();


	// useEffect(() => {
	// 	getAds1();
	// 	getAds2();
	// }, []);
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
			<div className={styles.comparepage}>
				{dataBanerCompareTop.published_at && (
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

				<div className={styles.detailCompare}>
					<div className={styles.contents}>
						<div className="row justify-content-center">
							<div className="col-lg-3"></div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>
											<div className={styles.prodItem}>
												<div className={styles.imgwrp}>
													<Image src={apiUrl + item.product_image[0].url} width={item.product_image[0].width / 1.2} height={item.product_image[0].height / 1.2} />
												</div>
												<h4>{item.title}</h4>
												<span>{item.memory_internal}</span>
											</div>
										</div>
									)
								})
							}
						</div>
						<div className={styles.spaceHeight}></div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								<h4 className={styles.titleCompare}>rating</h4>
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>
											<Rate TotalRate={item.rating} />
										</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-12">
								<h4 className={styles.titleCompare}>General Features</h4>
							</div>
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Brand Produk
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.brand.title}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Status dan Release
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.status}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Warna
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.color}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-12">
								<h4 className={styles.titleCompare}>Design Material</h4>
							</div>
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Ukuran Dimensi
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.size}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Weight
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.weight}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Resolution
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.resolution}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Type
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.display_type}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Protection
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.protection}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-12">
								<h4 className={styles.titleCompare}>Performance &amp; Hardware</h4>
							</div>
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Processor
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.cpu}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Graphic
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.gpu}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Memory
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.ram}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Card Slot
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.card_slot}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-12">
								<h4 className={styles.titleCompare}>Camera</h4>
							</div>
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-12">
								<h5>Main Camera</h5>
							</div>
							<div className="col-lg-3">
								Quad
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.main_cam_triple}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Feature
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.main_cam_features}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Video
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.main_cam_video}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-12">
								<h5>Selfie Camera</h5>
							</div>
							<div className="col-lg-3">
								Quad
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.selfie_cam_single}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Feature
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.selfie_cam_features}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Video
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.selfie_cam_video}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-12">
								<h4 className={styles.titleCompare}>Baterai</h4>
							</div>
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Baterai
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.charging_type}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-12">
								<h4 className={styles.titleCompare}>Sofware</h4>
							</div>
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Operating System
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.os}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Chipset
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.chipset}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-12">
								<h4 className={styles.titleCompare}>Sensors</h4>
							</div>
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Sensor
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.sensors}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								NFC
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.nfc}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-12">
								<h4 className={styles.titleCompare}>Network</h4>
							</div>
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Teknologi | {" "}
								<span className={styles.linkGeneral} onClick={showData}>
									Lihat Detail
								</span>
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>
											{item.technology}
											{show && (
												<ul>
													<li>2G : {item.bands_2G}</li>
													<li>3G : {item.bands_3G}</li>
													<li>4G : {item.bands_4G}</li>
													<li>5G : {item.bands_5G}</li>
												</ul>
											)}
										</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								SIM
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.sim}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								WLAN
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.wlan}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Bluetooth
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.bluetooth}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								GPS
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.gps}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Infrared
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.infrared}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								Radio
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.radio}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-3">
								USB
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3" key={item.id}>{item.usb}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-12">
								<h4 className={styles.titleCompare}>Harga di Marketplace</h4>
							</div>
						</div>
						{
							dataCompare.map((item, i) => {
								return (
									<div className={`row justify-content-center ${styles.itemInfoCompare}`} key={item.id}>

									</div>
								)
							})
						}

					</div>
				</div>
			</div>
		</LayoutHandphone >
	);
}

export async function getStaticProps() {
	const resMenu = await fetch(`${apiUrl}/menus?_sort=order`);
	const getMenu = await resMenu.json();
	const resTopBrands = await fetch(`${apiUrl}/brands?_top_brand=true`);
	const getTopBrands = await resTopBrands.json();

	//ads
	const resBanerCompareTop = await fetch(
		`${apiUrl}/ads/10?_publicationState=preview`
	);
	const dataBanerCompareTop = await resBanerCompareTop.json();
	const resBanerCompareBody = await fetch(
		`${apiUrl}/ads/11?_publicationState=preview`
	);
	const dataBanerCompareBody = await resBanerCompareBody.json();

	return {
		props: {
			getMenu,
			getTopBrands,
			dataBanerCompareTop,
			dataBanerCompareBody,
		},
	};
}
