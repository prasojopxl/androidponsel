import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import useSWR from 'swr';
import { GlobalAds, Rate, Title, } from "../../components";
import Image from "next/image";
import { apiUrl, baseUrl, staticImage } from "../../config/variable";
import styles from "./index.module.scss";
import { fetchData } from "../../config/data";
import Layout from "../../layout";
import Head from "next/head";


export default function compare({
	getMenu,
	getTopBrands,
	dataSEO,
	otherCompare,
}) {
	const router = useRouter();
	const { produk1, produk2, produk3 } = router.query;

	const [show, setShow] = useState(false);
	const showData = () => {
		show === true ? setShow(false) : setShow(true);
	};

	const { data: produkData, error: produkError } = useSWR(`${apiUrl}/products?slug=${produk1}&slug=${produk2}&slug=${produk3}`)
	const { data: dataBanerCompareTop, errorDataBanerCompareTop } = useSWR(`${apiUrl}/ads/10?_publicationState=preview`)

	if (!produkData) return <div>Loading</div>
	if (produkError) return <div>Failed</div>
	if (!dataBanerCompareTop) return <div>Loading</div>
	if (errorDataBanerCompareTop) return <div>Failed</div>

	const dataCompare = produkData;

	return (
		<Layout
			dataBrands={getTopBrands}
		>
			<Head>
				<title>
					{dataSEO.seo.title}

				</title>
				<meta
					name="description"
					content={dataSEO.seo.description}
				/>
				<meta
					name="keywords"
					content={dataSEO.seo.keywords}
				/>
				<meta name="author" content="androidponsel" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<link
					rel="shortcut icon"
					href={apiUrl + "/uploads/fav_425b2ec632.png"}
				/>
				<meta property="og:locale" content="id_ID" />
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content={
						dataSEO.seo.title +
						" Androidponsel spesifikasi dan perbandingan handphone"
					}
				/>
				<meta
					property="og:image"
					content={apiUrl + dataSEO.seo.ogimage.url}
				/>

				<meta
					property="og:description"
					content={dataSEO.seo.description}
				/>
				<meta
					property="og:url"
					content="https://www.androidponsel.com/"
				/>
			</Head>

			<div className={styles.comparepage}>
				<GlobalAds adsId="11" />
				<div className={styles.detailCompare}>
					<div className={styles.contents}>
						<div className="row justify-content-center">
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}></div>

							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>
											<div className={styles.prodItem}>
												<div className={styles.imgwrp}>
													<Image src={apiUrl + item.product_image[0].url} width={item.product_image[0].width / 1.2} height={item.product_image[0].height / 1.2} alt={item.product_image[0].name} />
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
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								<h4 className={styles.titleCompare}>Rate</h4>
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>
											<Rate rate={item.rating} voters={item.total_voters} />
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
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Brand Produk
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.brand.title}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Status dan Release
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.status}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Warna
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.color}</div>
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
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Ukuran Dimensi
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.size}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Weight
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.weight}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Resolution
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.resolution}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Type
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.display_type}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Protection
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.protection}</div>
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
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Processor
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.cpu}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Graphic
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.gpu}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Memory
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.ram}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Card Slot
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.card_slot}</div>
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
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Quad
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.main_cam_triple}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Feature
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.main_cam_features}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Video
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.main_cam_video}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-12">
								<h5>Selfie Camera</h5>
							</div>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Quad
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.selfie_cam_single}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Feature
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.selfie_cam_features}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Video
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.selfie_cam_video}</div>
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
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Baterai
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.charging_type}</div>
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
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Operating System
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.os}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Chipset
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.chipset}</div>
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
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Sensor
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.sensors}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								NFC
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.nfc}</div>
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
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Teknologi | {" "}
								<span className={styles.linkGeneral} onClick={showData}>
									Lihat Detail
								</span>
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>
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
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								SIM
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.sim}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								WLAN
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.wlan}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Bluetooth
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.bluetooth}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								GPS
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.gps}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Infrared
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.infrared}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								Radio
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.radio}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"}>
								USB
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3 col-3" : "col-lg-4 col-4"} key={item.id}>{item.usb}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-12">
								<h4 className={styles.titleCompare}>Price Marketplace</h4>
							</div>
						</div>
						<div className={`row justify-content-end ${styles.itemInfoCompare}`} style={{ border: "none" }}>
							{
								dataCompare.map((item, i) => {
									return (
										<Fragment key={item.id}>
											{
												<div className={dataCompare.length == 2 ? "col-lg-4 col-4" : "col-lg-3 col-3"} key={item.id}>
													{
														item.Price_Marketplace.length < 1 ? "Prices for marketplaces not avaliable for now" :
															item.Price_Marketplace.map((market, i) => {
																return (
																	<div key={market.id}>
																		<Image src={apiUrl + market.logo.url} width={171} height={50} alt={market.title} />
																		{
																			market.List.map((dataList, i) => {
																				return (
																					<div key={dataList.id}>
																						<h4>{dataList.title}</h4>
																						<h5 style={{ marginBottom: 0 }}>{dataList.price}</h5>
																						<a href={dataList.link} target="_blank">Cek Harga</a>
																						<hr />
																					</div>
																				)
																			})
																		}
																	</div>
																)
															})
													}
												</div>
											}
										</Fragment>
									)
								})
							}
						</div>
						<GlobalAds adsId="2" />
						<div style={{ marginTop: "30px" }}><Title title="Other Comparation" /></div>
						<div className="row" style={{ marginBottom: 30 }}>
							{
								otherCompare.map(item => {
									return (
										<div className="col-lg-4 col-md-6 col-sm-12 col-12" key={item.id}>
											<div className={styles.itemcompare} style={{ width: "100%", minHeight: 100, margin: "15px auto", borderRadius: 11, border: "#d7d7d7 solid 1px", overflow: "hidden", padding: 20 }}>
												<div className={styles.wrpCompare} style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", position: "relative" }}>
													{item.products.map((data) => {
														return (
															<div
																className={
																	styles.item
																}
																style={{
																	flex: 1
																}}
																key={data.id}
															>
																<div
																	className={
																		styles.imgwrp
																	}
																>
																	<Image
																		src={
																			apiUrl +
																			data
																				.product_image[0]
																				.url
																		}
																		width={
																			data
																				.product_image[0]
																				.width /
																			2
																		}
																		height={
																			data
																				.product_image[0]
																				.height /
																			2
																		}
																		alt={
																			data
																				.product_image[0]
																				.name
																		}
																	></Image>
																</div>
																<div
																	className={
																		styles.contentDec
																	}
																	style={{
																		padding: "15px 20px",
																		display: "flex",
																		flexWrap: "wrap",
																		minHeight: 120,
																		alignItems: "center"
																	}}
																>
																	<div className="flexing-title-compare">
																		<div className="min_heigh_two_lines">
																			<Link
																				href={
																					baseUrl +
																					"handphone/" +
																					data.slug
																				}
																			>
																				<a style={{ color: 111 }}>
																					<h5 className="mediumtitleTile" style={{ marginBottom: 5, color: "#89c340" }}>
																						{
																							data.title
																						}
																					</h5>
																				</a>
																			</Link>
																			<h6 style={{ fontSize: 11, color: "#666666" }}>
																				{
																					data.memory_internal
																				}
																			</h6>
																		</div>
																	</div>
																</div>
															</div>
														);
													})}
												</div>
												<Link
													href={
														baseUrl +
														"handphone/compare?produk1=" +
														item.products[0].slug +
														"&produk2=" +
														item.products[1].slug
													}
												>
													<a style={{ background: "#89c340", borderRadius: 5, padding: 10, minWidth: 150, color: "#fff", textAlign: "center", display: "flex", alignItems: "center", margin: "15px 0", justifyContent: "center" }}>
														<div
															style={{
																marginRight: "10px",
																display: "flex",
																alignItems:
																	"center",
															}}
														>
															<Image
																src={staticImage + "icon-vs-small.png"}
																width={25}
																height={18}
																alt="camera"
															/>
														</div>
														See Comparation
													</a>
												</Link>
											</div>
										</div>
									)
								})
							}
						</div>
					</div>
				</div>


			</div>
		</Layout >
	);
}

export async function getStaticProps() {
	const dataSEO = await fetchData("/general");
	const getMenu = await fetchData("/menus?_sort=order");
	const getTopBrands = await fetchData("/brands?_top_brand=true");
	const otherCompare = await fetchData("/compares?_sort=updated_at:ASC&_limit=3");
	return {
		props: {
			getMenu,
			getTopBrands,
			dataSEO,
			otherCompare,
		},
		revalidate: 3
	};
}
