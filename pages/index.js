import Head from 'next/head'
import React, {useState, useEffect} from 'react';
import Image from "next/image";
import styles from "./Pages.module.scss";
import LayoutHome from '../components/layouthome/layoutHome';
import axios from 'axios';
import { apiUrl } from '../config/variable';

export default function Home() {
  const [post, setPost] = useState([]);
  const [banerTop, setBanerTop]= useState([]);
  const [subBanerTop, setSubBanerTop] = useState([]);

  const getPost = () => {
    axios.get(`${apiUrl}/posts`)
    .then ((res)=> {
      setPost(res.data);
    })
  }

  const getSubBanerTop = () => {
    axios.get(`${apiUrl}/products?_start=2&_sort=updated_at:DESC&_limit=3`)
    .then((res)=> {
      setSubBanerTop(res.data)
    })
  }

  const getBanerTop = () => {
    axios.get(`${apiUrl}/products?_sort=updated_at:DESC&_limit=1`)
    .then((res)=> {
      setBanerTop(res.data)
    })
  }

  useEffect(()=> {
    getPost();
    getBanerTop();
    getSubBanerTop();
  },[])

  return (
    <React.Fragment>
      <LayoutHome title="androidponsel.com">
          <div className={styles.banerHome}>
            <div className={styles.left}>
              {banerTop.map((item,i)=> {
                  return (
                    <div key={item.id}>
                      <div className={styles.itemContent}>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className={styles.vcenter}>
                              <Image
                                src={item.product_image[0].url}
                                alt={item.title}
                                width={item.product_image[0].width}
                                height={item.product_image[0].height}
                                />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="txtleft">
                              <h2><a href="#">{item.title}</a></h2>
                              {(item.updated_at).substr(2,2)}-{(item.updated_at).substr(5,2)}-{(item.updated_at).substr(0,4)}
                              <p>{(item.SEO.description_tag).substr(0,200)}...</p>
                              <a href="#">Lebih Lanjut</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className={styles.right, styles.banerHomeRight}>
              {subBanerTop.map((item,i)=> {
                return (
                    <div className={styles.itembaner} key={item.id}>
                      <div className={styles.imgwrp}>
                        <Image src={item.product_image[0].url} width={item.product_image[0].width} height={item.product_image[0].height} alt={item.title}/>
                      </div>
                      <div className={styles.contentSub}>
                        <h5><a href="#">{item.title}</a></h5>
                        <span>{(item.updated_at).substr(8,2)}-{(item.updated_at).substr(5,2)}-{(item.updated_at).substr(0,4)}</span>
                      </div>
                    </div>
                )
              })}
            </div>
          </div>
          <div className={styles.wrpPosts}>
            <div className="row">
              {post.map((item, i)=> {
                return (
                  <div className="col-lg-4" key={item.id}>
                    <div className={styles.itemPost}>
                      <div className={styles.imgwrp}>
                        <Image src={item.thumbnail.url} width={item.thumbnail.width} height={item.thumbnail.height}></Image>
                      </div>
                      <h5><a href="#">{item.menu.title}</a></h5>
                      <a href="#">{item.title}</a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
      </LayoutHome>
    </React.Fragment>
  )
}
