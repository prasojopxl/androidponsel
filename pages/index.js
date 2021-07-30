import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import ReactHtmlParser from 'react-html-parser';
import { Ads, AdsBanner, Title } from "../components/";
// import { apiUrl } from '../../config/variable';
import { apiUrl } from "../config/variable";
import LayoutHome from "../layout/layouthome/layoutHome";
import styles from "./index.module.scss";


const monthName = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agust", "Sep", "Okt", "Nov", "Des"]

export async function getStaticProps(context) {
  // ads

    const resBanerHome1 = await fetch(
        `${apiUrl}/ads/1?_publicationState=preview`
    );
    const dataBanerHome1 = await resBanerHome1.json();
    const resBanerHome2 = await fetch(
        `${apiUrl}/ads/2?_publicationState=preview`
    );
    const dataBanerHome2 = await resBanerHome2.json();
    const resBanerHome3 = await fetch(
    `${apiUrl}/ads/3?_publicationState=preview`
    );
    const dataBanerHome3 = await resBanerHome3.json();
    const resBanerHome4 = await fetch(
    `${apiUrl}/ads/4?_publicationState=preview`
    );
    const dataBanerHome4 = await resBanerHome4.json();
    const resBanerHome5 = await fetch(
    `${apiUrl}/ads/5?_publicationState=preview`
    );
    const dataBanerHome5 = await resBanerHome5.json();
    const resBanerHome6 = await fetch(
    `${apiUrl}/ads/6?_publicationState=preview`
    );
    const dataBanerHome6 = await resBanerHome6.json();
    const resBanerHome7 = await fetch(
    `${apiUrl}/ads/7?_publicationState=preview`
    );
    const dataBanerHome7 = await resBanerHome7.json();

    const resDataCompare = await fetch(`${apiUrl}/compares?_sort=updated_at:ASC`);
    const dataCompare = await resDataCompare.json();
    const resDataProducts = await fetch(`${apiUrl}/products?_limit=12`);
    const dataProducts = await resDataProducts.json();
    const resMainNews = await fetch(`${apiUrl}/posts?menu=2&_sort=updated_at:DESC&_limit=1`);
    const mainNews = await resMainNews.json();
    const resTopNews = await fetch(`https://www.androidponsel.com/wp-json/wp/v2/posts?categories=8&per_page=4&_embed=author,wp:featuredmedia,wp:term&offset=1`);
    const topNews = await resTopNews.json();
    const resContNews = await fetch(`https://www.androidponsel.com/wp-json/wp/v2/posts?categories=8&per_page=9&_embed=author,wp:featuredmedia,wp:term&offset=5`);
    const contNews = await resContNews.json();
    const resTopApp = await fetch(`https://www.androidponsel.com/wp-json/wp/v2/posts?categories=19&per_page=2&_embed=author,wp:featuredmedia,wp:term`);
    const topApp = await resTopApp.json();
    const resListApp = await fetch(`https://www.androidponsel.com/wp-json/wp/v2/posts?categories=19&per_page=15&_embed=author,wp:featuredmedia,wp:term&offset=2`);
    const listApp = await resListApp.json();
    const resTipsTrik = await fetch(`https://www.androidponsel.com/wp-json/wp/v2/posts?categories=20&per_page=8&_embed=author,wp:featuredmedia,wp:term&offset=3`);
    const tipsTrik = await resTipsTrik.json();
    const resTipsTrikMain = await fetch(`https://www.androidponsel.com/wp-json/wp/v2/posts?categories=20&per_page=1&_embed=author,wp:featuredmedia,wp:term&offset=0`);
    const tipsTrikMain = await resTipsTrikMain.json();
    const resTipsTrikSecond = await fetch(`https://www.androidponsel.com/wp-json/wp/v2/posts?categories=20&per_page=2&_embed=author,wp:featuredmedia,wp:term&offset=1`);
    const tipsTrikSecond = await resTipsTrikSecond.json();
    const resMenu = await fetch(`${apiUrl}/menus?_sort=order`);
    const getMenu = await resMenu.json();
    const resTopBrands = await fetch(`${apiUrl}/brands?_top_brand=true`);
    const getTopBrands = await resTopBrands.json();
    const androidNews = await fetch(
    `https://www.androidponsel.com/wp-json/wp/v2/posts?categories=8&per_page=1&_embed=author,wp:featuredmedia,wp:term`
    );
    const dataAndroidNews = await androidNews.json();
  // api data second
  // https://www.androidponsel.com/wp-json/wp/v2/posts?per_page=4&_embed=author,wp:featuredmedia&offset=1

  // const settings = {
  //     method: 'POST',
  //     body: JSON.stringify({
  //         "identifier": "guest@androidponsel.com",
  //         "password": "Guest123"
  //     }),
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     }
  // }
  // const resAuth = await fetch(`${apiUrl}/auth/local`,settings)
  // const dataAuth = await resAuth.json();
  // const jwtValue = dataAuth.jwt;
  return {
	props: {
	  dataBanerHome1,
	  dataBanerHome2,
	  dataBanerHome3,
	  dataBanerHome4,
	  dataBanerHome5,
	  dataBanerHome6,
	  dataBanerHome7,
	  dataCompare,
	  dataProducts,
	  mainNews,
	  topNews,
	  contNews,
	  topApp,
	  listApp,
	  tipsTrik,
	  tipsTrikMain,
	  tipsTrikSecond,
	  getMenu,
	  getTopBrands,
	  dataAndroidNews,
	},
	revalidate: 5,
  };
}

export default function Home({
  dataBanerHome1,
  dataBanerHome2,
  dataBanerHome3,
  dataBanerHome4,
  dataBanerHome5,
  dataBanerHome6,
  dataBanerHome7,
  dataCompare,
  dataProducts,
  mainNews,
  topNews,
  contNews,
  topApp,
  listApp,
  tipsTrik,
  tipsTrikMain,
  tipsTrikSecond,
  jwtValue,
  getMenu,
  getTopBrands,
  dataAndroidNews,
}) {
  const [ads1, setAds1] = useState({
	iframe: [],
	bannerImage: [],
	link: [],
	urlImage: [],
	widthImage: [],
	heightImage: [],
  });
  const getAds1 = () => {
	dataBanerHome1.Image_Banner === null
	  ? setAds1({ iframe: dataBanerHome1.URL_Iframe })
	  : setAds1({
		  bannerImage: "withBanner",
		  link: dataTopAds.url,
		  urlImage: dataTopAds.Image_Banner.url,
		  widthImage: dataTopAds.Image_Banner.width,
		  heightImage: dataTopAds.Image_Banner.height,
		});
  };

  useEffect(() => {
	getAds1();
  }, []);

  return (
	<React.Fragment>
	  <LayoutHome
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
		{dataBanerHome1.published_at && (
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
		{/* {ads1.bannerImage === "withBanner" ? (
			<AdsBanner
			linkbanner={ads1.link}
			urlImage={ads1.urlImage}
			width={ads1.widthImage}
			height={ads1.heightImage}
			/>
		) : (
			<Ads banner={ads1.iframe} />
		)} */}
		<div className={styles.compareItem}>
		  <div className={styles.contens}>
			<Title title="Top Perbandingan" />
			<div className="row">
			  {dataCompare.map((item, index) => {
				return (
				  <div className="col-lg-6" key={item.id}>
					<div className={styles.itemcompare}>
					  <div className={styles.wrpCompare}>
						{item.products.map((data) => {
						  return (
							<div className={styles.item} key={data.id}>
							  <div className={styles.imgwrp}>
								<Image
								  src={apiUrl + data.product_image[0].url}
								  width={data.product_image[0].width / 2}
								  height={data.product_image[0].height / 2}
								></Image>
							  </div>
							  <div className={styles.contentDec}>
								<h5>{data.title}</h5>
								<h6>{data.memory_internal}</h6>
							  </div>
							</div>
						  );
						})}
					  </div>
					  <a href="#" className={styles.fullLink}>
						LIHAT PERBANDINGAN
					  </a>
					</div>
				  </div>
				);
			  })}
			</div>
			iklan2
			<div className="row">
			  {dataProducts.map((item, index) => {
				return (
				  <div className="col-lg-3" key={item.id}>
					<div className={styles.productItem}>
					  <div className={styles.shortproduct}>
						<div className={styles.imageprod}>
						  <Image
							src={apiUrl + item.product_image[0].url}
							width={item.product_image[0].width / 3}
							height={item.product_image[0].height / 3}
						  />{" "}
						</div>
						<div className={styles.productinfo}>
						  <h5>{item.title}</h5>
						  <h6>{item.memory_internal}</h6>
						</div>
					  </div>
					  <div className={styles.wrpbtn}>
						<a href="#" className={styles.btnfull}>
						  BANDINGKAN PRODUK
						</a>
						<a href="#" className={styles.btnblank}>
						  LIHAT SELENGKAPNYA
						</a>
					  </div>
					</div>
				  </div>
				);
			  })}
			</div>
			<div
			  style={{ textAlign: "center", display: "block", marginTop: 30 }}
			>
			  <a href="#" className="btn medium">
				Lihat Selegkapnya
			  </a>
			</div>
		  </div>
		</div>
		iklan3
		<div className={styles.latestnews}>
		  <div className={styles.contents}>
			<Title title="Berita Terbaru" />
			<div className="row">
			  <div className="col-lg-12">
				<div className="row">
				  <div className="col-lg-5">
					{dataAndroidNews.map((item, i) => {
					  return (
						<div className={styles.mainpost} key={item.id}>
						  <div className={styles.imgwrp}>
							<Image
							  src={
								item._embedded["wp:featuredmedia"][0].source_url
							  }
							  width={
								item._embedded["wp:featuredmedia"][0]
								  .media_details.width
							  }
							  height={
								item._embedded["wp:featuredmedia"][0]
								  .media_details.height
							  }
							  alt={item.title.rendered}
							/>
						  </div>
						  <div className={styles.desc}>
								<div className={styles.tags}>
									{item._embedded["wp:term"][0].map((data) => {
										return (
											<a href={data.link} key={data.id}>{data.name}</a>
										)
									})}
								</div>							  
							<a href={item.link}>
							  <h4>{item.title.rendered}</h4>
							</a>
							<div className={styles.infodate}>
							  <span>By {item._embedded.author[0].name}</span>
							  <span>{item.date.substr(0, 10)}</span>
							</div>
						  </div>
						</div>
					  );
					})}
				  </div>
				  <div className="col-lg-7">
					<div className={styles.wrptopnews}>
					  <div className="row">
						{topNews.map((item, i) => {
						  return (
							<div className="col-lg-6" key={item.id}>
							  <div className={styles.wrpitemnews} key={item.id}>
								<div className={styles.imgwrp}>
								  <Image
									src={item._embedded["wp:featuredmedia"][0].source_url}
									width={item._embedded["wp:featuredmedia"][0].media_details.width/6}
									height={item._embedded["wp:featuredmedia"][0].media_details.height/6}
									alt={item.title.rendered}
								  />
								</div>
								<div className={styles.content}>
									<div className={styles.tags}>
										{item._embedded["wp:term"][0].map((data) => {
											return (
												<a href={data.link} key={data.id}>{data.name}</a>
											)
										})}
									</div>							  
									<a href={item.link}>
										<h5>{item.title.rendered}</h5>
									</a>								  
								  <div className={styles.infodate}>
									<span>By {item._embedded.author[0].name}</span>
									<span>{item.date.substr(0, 10)}</span>
								  </div>
								</div>
							  </div>
							</div>
						  );
						})}
					  </div>
					</div>
				  </div>
				</div>
				iklan 4
				<div className="row">
				  {contNews.map((item, i) => {
					return (
					  <div className="col-lg-4" key={item.id}>
						<div className={styles.wrpitemnews}>
						  <div className={styles.imgwrp}>
								<Image
									src={item._embedded["wp:featuredmedia"][0].source_url}
									width={item._embedded["wp:featuredmedia"][0].media_details.width/6}
									height={item._embedded["wp:featuredmedia"][0].media_details.height/6}
									alt={item.title.rendered}
								/>
						  </div>
						  <div className={styles.content}>
							<div className={styles.tags}>
								{item._embedded["wp:term"][0].map((data) => {
									return (
										<a href={data.link} key={data.id}>{data.name}</a>
									)
								})}
							</div>							  
							<a href={item.link}>
								<h5>{item.title.rendered}</h5>
							</a>								  
							<div className={styles.infodate}>
								<span>By {item._embedded.author[0].name}</span>
								<span>{item.date.substr(0, 10)}</span>
							</div>
						  </div>
						</div>
					  </div>
					);
				  })}
				</div>
			  </div>
			</div>
			<div
			  style={{ textAlign: "center", display: "block", marginTop: 30 }}
			>
			  <a href="https://www.androidponsel.com/news/" className="btn medium">
				Lihat berita terbaru lainnya
			  </a>
			</div>
		  </div>
		</div>
		iklan 5
		<div className={styles.kanalapp}>
		  <div className={styles.contents}>
			<Title title="Kanal Aplikasi" />
			<div className="row">
				{topApp.map((item, i) => {
				return (
					<div className="col-lg-6" key={item.id}>
						<div className={styles.topkanal}>
							<div className={styles.imgwrp}>
								<Image
								src={item._embedded["wp:featuredmedia"][0].source_url}
								width={item._embedded["wp:featuredmedia"][0].media_details.width}
								height={item._embedded["wp:featuredmedia"][0].media_details.height}
								alt={item.title.rendered}
								/>
							</div>
							<div className={styles.desc}>
								<div className={styles.imgwrp}>
									<Image
										src={item._embedded["wp:featuredmedia"][0].source_url}
										width={item._embedded["wp:featuredmedia"][0].media_details.width}
										height={item._embedded["wp:featuredmedia"][0].media_details.height}
										alt={item.title.rendered}
									/>
								</div>								
								<a href={item.link}>
									<h5>{item.title.rendered}</h5>
								</a>	
								{ReactHtmlParser(item.excerpt.rendered)}							  
								<div className={styles.infodate}>
									<span>By {item._embedded.author[0].name}</span>
									<span>{item.date.substr(0, 10)}</span>
								</div>
							</div>
						</div>
					</div>
				);
				})}
			</div>
			iklan 6
			<div className="row">
			  {listApp.map((item, i) => {
				return (
				  <div className="col-lg-4" key={item.id}>
					<div className={styles.wrplistapp}>
					  <div className={styles.imgwrp}>
						<Image
							src={item._embedded["wp:featuredmedia"][0].source_url}
							width={item._embedded["wp:featuredmedia"][0].media_details.width}
							height={item._embedded["wp:featuredmedia"][0].media_details.height}
							alt={item.title.rendered}
						/>
					  </div>
					  <div className={styles.desc}>
						<a href={item.link}>
							<h5>{item.title.rendered}</h5>
						</a>	
						<div className={styles.infodate}>
							<span>By {item._embedded.author[0].name}</span>
							<span>{item.date.substr(0, 10)}</span>
						</div>
					  </div>
					</div>
				  </div>
				);
			  })}
			</div>
			<div
			  style={{ textAlign: "center", display: "block", marginTop: 30 }}
			>
			  <a href="https://www.androidponsel.com/aplikasi/" className="btn medium">
				Lihat aplikasi lainnya
			  </a>
			</div>
		  </div>
		</div>
		iklan 7
		<div className={styles.tipstrik}>
		  <div className={styles.contents}>
			<Title title="Tips & Trik"></Title>
			<div className="row">
			  <div className="col-lg-7">
				<div className="row">
				  {tipsTrik.map((item, i) => {
					return (
					  <div className="col-lg-6" key={item.id}>
						<div className={styles.itemcontent}>
						  <div className={styles.left}>
							<div className={styles.desc}>
								<div className={styles.tags}>								
									{item._embedded["wp:term"][0].map((data) => {
										return (
											<a href={data.link} key={data.id}>{data.name}</a>
										)
									})}									
								</div>							  
								<a href={item.link}>
									<h5>{item.title.rendered}</h5>
								</a>	
								<div className={styles.infodate}>
									<span>By {item._embedded.author[0].name}</span>
									<span>{item.date.substr(0, 10)}</span>
								</div>
							</div>
						  </div>
						  <div className={styles.right}>
							<div className={styles.imgwrp}>
								<Image
									src={item._embedded["wp:featuredmedia"][0].source_url}
									width={item._embedded["wp:featuredmedia"][0].media_details.width}
									height={item._embedded["wp:featuredmedia"][0].media_details.height}
									alt={item.title.rendered}
								/>
							</div>
						  </div>
						</div>
					  </div>
					);
				  })}
				</div>
			  </div>
			  <div className="col-lg-5">
				<div className={styles.maintipstrik}>
				  {tipsTrikMain.map((item, i) => {
					return (
					  <div key="item.id">
						<div className={styles.topberita}>
							<div className={styles.imgwrp}>
								<Image
									src={item._embedded["wp:featuredmedia"][0].source_url}
									width={item._embedded["wp:featuredmedia"][0].media_details.width}
									height={item._embedded["wp:featuredmedia"][0].media_details.height}
									alt={item.title.rendered}
								/>
							</div>
							<div className={styles.desc}>
								<div className={styles.imgwrp}>
									<Image
										src={item._embedded["wp:featuredmedia"][0].source_url}
										width={item._embedded["wp:featuredmedia"][0].media_details.width}
										height={item._embedded["wp:featuredmedia"][0].media_details.height}
										alt={item.title.rendered}
									/>
								</div>																
								<a href={item.link}>
									<h5>{item.title.rendered}</h5>
								</a>								  
								<p>{ReactHtmlParser(item.excerpt.rendered)}</p>
								<div className={styles.infodate}>
									<span>By {item._embedded.author[0].name}</span>
									<span>{item.date.substr(0, 10)}</span>
								</div>
							</div>
						</div>
					  </div>
					);
				  })}
				</div>
				<div className={styles.secondtipstrik}>
				  {tipsTrikSecond.map((item, i) => {
					return (
					  <div className={styles.itemcontent} key={item.id}>
						<div className={styles.left}>
						  <div className={styles.desc}>
							<div className={styles.tags}>								
								{item._embedded["wp:term"][0].map((data) => {
									return (
										<a href={data.link} key={data.id}>{data.name}</a>
									)
								})}									
							</div>							  
							<a href={item.link}>
								<h5>{item.title.rendered}</h5>
							</a>								  
							<div className={styles.infodate}>
								<span>By {item._embedded.author[0].name}</span>
								<span>{item.date.substr(0, 10)}</span>
							</div>
						  </div>
						</div>
						<div className={styles.right}>
							<div className={styles.imgwrp}>
								<Image
									src={item._embedded["wp:featuredmedia"][0].source_url}
									width={item._embedded["wp:featuredmedia"][0].media_details.width}
									height={item._embedded["wp:featuredmedia"][0].media_details.height}
									alt={item.title.rendered}
								/>
							</div>
						</div>
					  </div>
					);
				  })}
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </LayoutHome>
	</React.Fragment>
  );
}
