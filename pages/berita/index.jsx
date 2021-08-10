import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Ads, AdsBanner, Title } from "../../components";
import { apiUrl, baseUrl, totalItem } from "../../config/variable";
import LayoutBerita from "../../layout/layoutberita/LayoutBerita";
import styles from "./index.module.scss";

export async function getServerSideProps() {
  const res = await fetch(
    `${apiUrl}/posts?menu=2&_start=0&_limit=${totalItem}`
  );
  const dataListNews = await res.json();

  const resPostsBerita = await fetch(`${apiUrl}/posts?menu=2`);
  const posts = await resPostsBerita.json();
  let limitpages = Math.ceil(posts.length / totalItem);
  var pages = [];
  for (let i = 1; i <= limitpages; i++) {
    pages.push(i);
  }

  const res2 = await fetch(`${apiUrl}/ads/3`);
  const dataBanner = await res2.json();

  return {
    props: {
      dataListNews,
      dataBanner,
      pages,
      limitpages,
    },
  };
}

export default function Berita({
  dataListNews,
  dataBanner,
  pages,
  limitpages,
}) {
  const [verticalAds, setVerticalAds] = useState({
    iframe: [],
    bannerImage: [],
    link: [],
    urlImage: [],
    widthImage: [],
    heightImage: [],
  });

  const getVerticalAds = () => {
    dataBanner.Image_Banner == null
      ? setVerticalAds({ iframe: dataBanner.URL_Iframe })
      : setVerticalAds({
        bannerImage: "withBanner",
        link: dataBanner.url,
        urlImage: apiUrl + dataBanner.Image_Banner.url,
        widthImage: dataBanner.Image_Banner.width,
        heightImage: dataBanner.Image_Banner.height,
      });
  };


  useEffect(() => {
    getVerticalAds();
  }, []);

  return (
    <LayoutBerita>
      <div className={styles.berita}>
        <div className={styles.contents}>
          <Title title="Berita"></Title>
          <div className="row">
            <div className="col-lg-9">
              <div className="row">
                {dataListNews.map((item) => {
                  return (
                    <div className="col-lg-4" key={item.id}>
                      <div className={styles.wrpitemnews}>
                        <div className={styles.imgwrp}>
                          <Image
                            src={`${apiUrl}${item.thumbnail.url}`}
                            width={item.thumbnail.width}
                            height={item.thumbnail.height}
                            alt={item.title}
                          />
                        </div>
                        <div className={styles.content}>
                          <div className={styles.tags}>
                            {item.tags.map((data) => {
                              return (
                                <Fragment key={data.id}>
                                  <a href="#">{data.tag_name}</a>
                                </Fragment>
                              );
                            })}
                          </div>
                          <Link
                            href={baseUrl + item.menu.title + "/" + item.slug}
                          >
                            <a>
                              <h5>{item.title}</h5>
                            </a>
                          </Link>
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
            </div>
            <div className="col-lg-3">
              <div className={styles.verticalbaner}>
                {verticalAds.bannerImage === "withBanner" ? (
                  <AdsBanner
                    linkbanner={verticalAds.link}
                    urlImage={verticalAds.urlImage}
                    width={verticalAds.widthImage}
                    height={verticalAds.heightImage}
                  />
                ) : (
                  <Ads banner={verticalAds.iframe} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutBerita>
  );
}
