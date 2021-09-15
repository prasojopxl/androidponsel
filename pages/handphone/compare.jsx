import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import useSWR from 'swr';
import { GlobalAds, Rate, } from "../../components";
import Image from "next/image";
import { apiUrl, baseUrl } from "../../config/variable";
import styles from "./index.module.scss";
import { fetchData } from "../../config/data";
import Layout from "../../layout";


export default function compare({
	getMenu,
	getTopBrands,
	dataSEO
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
			dataSEO={dataSEO.seo}
			dataMainMenu={getMenu}
			dataBrands={getTopBrands}
		>
			<div className={styles.comparepage}>
				<GlobalAds adsId="11" />
				<div className={styles.detailCompare}>
					<div className={styles.contents}>
						<div className="row justify-content-center">
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}></div>

							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>
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
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								<h4 className={styles.titleCompare}>rating</h4>
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>
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
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Brand Produk
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.brand.title}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Status dan Release
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.status}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Warna
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.color}</div>
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
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Ukuran Dimensi
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.size}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Weight
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.weight}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Resolution
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.resolution}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Type
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.display_type}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Protection
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.protection}</div>
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
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Processor
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.cpu}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Graphic
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.gpu}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Memory
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.ram}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Card Slot
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.card_slot}</div>
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
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Quad
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.main_cam_triple}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Feature
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.main_cam_features}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Video
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.main_cam_video}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-12">
								<h5>Selfie Camera</h5>
							</div>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Quad
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.selfie_cam_single}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Feature
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.selfie_cam_features}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Video
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.selfie_cam_video}</div>
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
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Baterai
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.charging_type}</div>
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
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Operating System
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.os}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Chipset
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.chipset}</div>
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
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Sensor
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.sensors}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								NFC
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.nfc}</div>
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
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Teknologi | {" "}
								<span className={styles.linkGeneral} onClick={showData}>
									Lihat Detail
								</span>
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>
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
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								SIM
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.sim}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								WLAN
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.wlan}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Bluetooth
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.bluetooth}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								GPS
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.gps}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Infrared
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.infrared}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								Radio
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.radio}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								USB
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>{item.usb}</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className="col-lg-12">
								<h4 className={styles.titleCompare}>Harga di Marketplace</h4>
							</div>
						</div>
						<div className={`row justify-content-end ${styles.itemInfoCompare}`}>
							{
								dataCompare.map((item, i) => {
									return (
										<Fragment key={item.id}>
											{
												<div className={dataCompare.length == 2 ? "col-lg-4" : "col-lg-3"} key={item.id}>
													{
														item.Price_Marketplace.length < 1 ? "Belom ada data" :
															item.Price_Marketplace.map((market, i) => {
																return (
																	<div key={market.id}>
																		<Image src={apiUrl + market.logo.url} width={171} height={50} alt={market.title} />
																		{
																			market.List.map((dataList, i) => {
																				return (
																					<div key={dataList.id}>
																						<h4>{dataList.title}</h4>
																						<h5>{dataList.price}</h5>
																						<a href={dataList.link} target="_blank">Cek Harga</a>
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
						{/* <div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								<Image src="/logo-tokopedia.png" width={171} height={50} alt="tokopedia" />
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>
											{
												item.Tokopedia !== null ? <div>{item.Tokopedia.title}<br /><a href={item.Tokopedia.link}>Cek harga di {item.Tokopedia.marketplace} </a></div>
													: "Belum ada data"

											}
										</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								<Image src="/logo-shopee.png" width={171} height={50} alt="shopee" />
							</div>

							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>
											{
												item.Shopee !== null ? <div>{item.Shopee.title}<br /><a href={item.Shopee.link}>Cek harga di {item.Shopee.marketplace} </a></div>
													: "Belum ada data"

											}
										</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								<Image src="/logo-blibli.png" width={171} height={50} alt="Blibli" />
							</div>

							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>
											{
												item.Blibli !== null ? <div>{item.Blibli.title}<br /><a href={item.Blibli.link}>Cek harga di {item.Blibli.marketplace} </a></div>
													: "Belum ada data"

											}
										</div>
									)
								})
							}
						</div>
						<div className={`row justify-content-center ${styles.itemInfoCompare}`}>
							<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"}>
								<Image src="/logo-lazada.png" width={171} height={50} alt="Lazada" />
							</div>

							{
								dataCompare.map((item, i) => {
									return (
										<div className={dataCompare.length == 3 ? "col-lg-3" : "col-lg-4"} key={item.id}>
											{
												item.Lazada !== null ? <div>{item.Lazada.title}<br /><a href={item.Lazada.link}>Cek harga di {item.Lazada.marketplace} </a></div>
													: "Belum ada data"

											}
										</div>
									)
								})
							}
						</div> */}
					</div>
				</div>

			</div>
		</Layout>
	);
}

export async function getStaticProps() {
	const dataSEO = await fetchData("/general");
	const getMenu = await fetchData("/menus?_sort=order");
	const getTopBrands = await fetchData("/brands?_top_brand=true");
	return {
		props: {
			getMenu,
			getTopBrands,
			dataSEO,
		},
	};
}
