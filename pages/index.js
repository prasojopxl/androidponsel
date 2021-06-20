import Head from 'next/head'
import React, {useState, useEffect} from 'react';
import Image from "next/image";
import styles from "./Pages.module.scss";
import Layout from "../components/layout/layout";
import axios from 'axios';
import { apiUrl } from '../config/variable';

export default function Home() {
  const [post, setPost] = useState([]);

  const getPost = () => {
    axios.get(`${apiUrl}/posts`)
    .then ((res)=> {
      setPost(res.data);
    })
  }
  useEffect(()=> {
    getPost()
  },[])

  return (
    <React.Fragment>
      <Layout title="androidponsel.com">
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
      </Layout>
    </React.Fragment>
  )
}
