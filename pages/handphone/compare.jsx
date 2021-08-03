import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
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

	const [dataCompare, setDataCompare] = useState([])
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

	const getCompare = () => {
		axios.get(`${apiUrl}/products?slug=${produk1}&slug=${produk2}&slug=${produk3}`).then((res) => {
			setDataCompare(res.data)
		})
	}
	setTimeout(() => {
		getCompare()
	})

	useEffect(() => {
		getAds1();
		getAds2();
	}, []);
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
													<Image src={apiUrl + item.product_image[0].url} width={item.product_image[0].width / 2} height={item.product_image[0].height / 2} />
												</div>
												<h4>{item.title}</h4>
												<span>{item.memory_internal}</span>
											</div>
										</div>
									)
								})
							}
						</div>
						<div className="row justify-content-center">
							<div className="col-lg-3">
								dsad
							</div>
							{
								dataCompare.map((item, i) => {
									return (
										<div className="col-lg-3">
											<Rate TotalRate={item.rating} />

											{item.title}
										</div>
									)
								})
							}
						</div>
					</div>
				</div>
			</div>
		</LayoutHandphone>
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
