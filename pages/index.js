import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { Ads, AdsBanner, Title } from "../components/";
// import { apiUrl } from '../../config/variable';
import { apiUrl } from "../config/variable";
import LayoutHome from "../layout/layouthome/layoutHome";
import styles from "./index.module.scss";

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
  const resMainNews = await fetch(
    `${apiUrl}/posts?menu=2&_sort=updated_at:DESC&_limit=1`
  );
  const mainNews = await resMainNews.json();
  const resTopNews = await fetch(
    `${apiUrl}/posts?menu=2&_sort=updated_at:DESC&_start=2&_limit=4`
  );
  const topNews = await resTopNews.json();
  const resContNews = await fetch(
    `${apiUrl}/posts?menu=2&_sort=updated_at:DESC&_start=6&_limit=6`
  );
  const contNews = await resContNews.json();
  const resTopApp = await fetch(
    `${apiUrl}/posts?menu=2&_limit=2&_sort=updated_at:DESC`
  );
  const topApp = await resTopApp.json();
  const resListApp = await fetch(
    `${apiUrl}/posts?menu=10&_limit=15&_start=3&_sort=updated_at:DESC`
  );
  const listApp = await resListApp.json();
  const resTipsTrik = await fetch(
    `${apiUrl}/posts?menu=8&_limit=8&_sort=updated_at:DESC&_start=4`
  );
  const tipsTrik = await resTipsTrik.json();
  const resTipsTrikMain = await fetch(
    `${apiUrl}/posts?menu=8&_limit=1&_sort=updated_at:DESC&_start=1`
  );
  const tipsTrikMain = await resTipsTrikMain.json();
  const resTipsTrikSecond = await fetch(
    `${apiUrl}/posts?menu=8&_limit=2&_sort=updated_at:DESC&_start=2`
  );
  const tipsTrikSecond = await resTipsTrikSecond.json();
  const resMenu = await fetch(`${apiUrl}/menus?_sort=order`);
  const getMenu = await resMenu.json();
  const resTopBrands = await fetch(`${apiUrl}/brands?_top_brand=true`);
  const getTopBrands = await resTopBrands.json();
  const androidNews = await fetch(
    `https://www.androidponsel.com/wp-json/wp/v2/posts?per_page=1`
  );
  const dataAndroidNews = await androidNews.json();
  const userId = await fetch(
    `https://www.androidponsel.com/wp-json/wp/v2/users`
  );
  const dataUserId = await userId.json();

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
      dataUserId,
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
  dataUserId,
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

  const userAndroidponsel = [];
  dataUserId.map((item, i) => {
    userAndroidponsel.push({ id: item.id, name: item.name });
  });
  console.log(userAndroidponsel);

  const UserPost = (props) => {
    // props.userId = 15 ? [userAndroidponsel[0].name] : "admin";

    return <span>By {props.userId}</span>;
  };

  console.log(userAndroidponsel);
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
                              src={item.yoast_head_json.og_image[0].url}
                              width={item.yoast_head_json.og_image[0].width}
                              height={item.yoast_head_json.og_image[0].height}
                              alt={item.title.rendered}
                            />
                          </div>
                          <div className={styles.desc}>
                            <a href={item.link}>
                              <h4>{item.title.rendered}</h4>
                            </a>
                            <div className={styles.infodate}>
                              <UserPost userId={item.author} />
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
                                    src={apiUrl + item.thumbnail.url}
                                    width={item.thumbnail.width / 3}
                                    height={item.thumbnail.height / 3}
                                    alt={item.title}
                                  />
                                </div>
                                <div className={styles.content}>
                                  <div className={styles.tags}>
                                    {item.tags.map((data) => {
                                      return (
                                        <a href="#" key={data.id}>
                                          {data.tag_name}
                                        </a>
                                      );
                                    })}
                                  </div>
                                  <a href="#">
                                    <h5>{item.title}</h5>
                                  </a>
                                  <div className={styles.infodate}>
                                    <span>
                                      By{" "}
                                      {item.author === null
                                        ? "admin"
                                        : item.author}
                                    </span>
                                    <span>
                                      {item.updated_at.substr(8, 2)}-
                                      {item.updated_at.substr(5, 2)}-
                                      {item.updated_at.substr(0, 4)}{" "}
                                    </span>
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
                      <div className="col-lg-6" key={item.id}>
                        <div className={styles.wrpitemnews}>
                          <div className={styles.imgwrp}>
                            <Image
                              src={apiUrl + item.thumbnail.url}
                              width={item.thumbnail.width / 3}
                              height={item.thumbnail.height / 3}
                              alt={item.title}
                            />
                          </div>
                          <div className={styles.content}>
                            <div className={styles.tags}>
                              {item.tags.map((data) => {
                                return (
                                  <a href="#" key={data.id}>
                                    {data.tag_name}
                                  </a>
                                );
                              })}
                            </div>
                            <a href="#">
                              <h5>{item.title}</h5>
                            </a>
                            <div className={styles.infodate}>
                              <span>
                                By{" "}
                                {item.author === null ? "admin" : item.author}
                              </span>
                              <span>
                                {item.updated_at.substr(8, 2)}-
                                {item.updated_at.substr(5, 2)}-
                                {item.updated_at.substr(0, 4)}{" "}
                              </span>
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
              <a href="#" className="btn medium">
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
                          src={apiUrl + item.thumbnail.url}
                          width={item.thumbnail.width * 1.3}
                          height={item.thumbnail.height * 1.3}
                          alt="item.title"
                        />
                      </div>
                      <div className={styles.desc}>
                        <a href="#">
                          <h5>{item.title}</h5>
                        </a>
                        <p>{item.content.substr(0, 110)}...</p>
                        <div className={styles.infodate}>
                          <span>
                            By {item.author === null ? "admin" : item.author}
                          </span>
                          <span>
                            {item.updated_at.substr(8, 2)}-
                            {item.updated_at.substr(5, 2)}-
                            {item.updated_at.substr(0, 4)}{" "}
                          </span>
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
                        {item.thumbnail != null ? (
                          <Image
                            src={apiUrl + item.thumbnail.url}
                            width={item.thumbnail.width}
                            height={item.thumbnail.height}
                            alt={item.title}
                          />
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              height: "100%",
                              minHeight: 60,
                              alignItems: "center",
                              justifyContent: "space-around",
                              margin: "0 auto",
                              textAlign: "center",
                            }}
                          >
                            <span>Image</span>
                          </div>
                        )}
                      </div>
                      <div className={styles.desc}>
                        <a href="#">
                          <h5>{item.title}</h5>
                        </a>
                        <div className={styles.infodate}>
                          <span>
                            By {item.author === null ? "admin" : item.author}
                          </span>
                          <span>
                            {item.updated_at.substr(8, 2)}-
                            {item.updated_at.substr(5, 2)}-
                            {item.updated_at.substr(0, 4)}{" "}
                          </span>
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
              <a href="#" className="btn medium">
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
                                {item.tags.map((data) => {
                                  return (
                                    <a href="#" key={data.id}>
                                      {data.tag_name}
                                    </a>
                                  );
                                })}
                              </div>
                              <a href="#">
                                <h5>{item.title.substr(0, 50)}..</h5>
                              </a>
                              <div className={styles.infodate}>
                                <span>
                                  By{" "}
                                  {item.author === null ? "admin" : item.author}
                                </span>
                                <span>
                                  {item.updated_at.substr(8, 2)}-
                                  {item.updated_at.substr(5, 2)}-
                                  {item.updated_at.substr(0, 4)}{" "}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className={styles.right}>
                            <div className={styles.imgwrp}>
                              <Image
                                src={apiUrl + item.thumbnail.url}
                                width={item.thumbnail.width / 3}
                                height={item.thumbnail.height / 3}
                                alt={item.title}
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
                              src={apiUrl + item.thumbnail.url}
                              width={item.thumbnail.width * 1.3}
                              height={item.thumbnail.height * 1.3}
                              alt="item.title"
                            />
                          </div>
                          <div className={styles.desc}>
                            <a href="#">
                              <h5>{item.title}</h5>
                            </a>
                            <p>{item.content.substr(0, 110)}...</p>
                            <div className={styles.infodate}>
                              <span>
                                By{" "}
                                {item.author === null ? "admin" : item.author}
                              </span>
                              <span>
                                {item.updated_at.substr(8, 2)}-
                                {item.updated_at.substr(5, 2)}-
                                {item.updated_at.substr(0, 4)}{" "}
                              </span>
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
                              {item.tags.map((data) => {
                                return (
                                  <a href="#" key={data.id}>
                                    {data.tag_name}
                                  </a>
                                );
                              })}
                            </div>
                            <a href="#">
                              <h5>{item.title.substr(0, 55)}..</h5>
                            </a>
                            <div className={styles.infodate}>
                              <span>
                                By{" "}
                                {item.author === null ? "admin" : item.author}
                              </span>
                              <span>
                                {item.updated_at.substr(8, 2)}-
                                {item.updated_at.substr(5, 2)}-
                                {item.updated_at.substr(0, 4)}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={styles.right}>
                          <div className={styles.imgwrp}>
                            <Image
                              src={apiUrl + item.thumbnail.url}
                              width={item.thumbnail.width / 3}
                              height={item.thumbnail.height / 3}
                              alt={item.title}
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
