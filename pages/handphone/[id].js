import { useEffect, useState } from "react"
import Image from "next/image"
import styles from "./index.module.scss";
import { apiUrl } from "../../config/variable";
import LayoutHandphone from "../../layout/layouthandphone/LayoutHandphone";
import { Title } from "../../components";
import Slider from "react-slick";


export default function DetailPage({post}) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };    
    return (
        <LayoutHandphone>
            <div className={styles.detailproducts}>
                <div className={styles.contents}>
                    <Title title="Overview Produk"></Title>
                    <div className="row">
                        <div className="col-lg-5">
                            <Slider {...settings}>
                                {post.product_image.map((item,i)=> {
                                    return(
                                        <div>
                                            <Image src={apiUrl+item.url} width={160} height={212} alt={item.title}/>
                                        </div>
                                    )
                                })}
                            </Slider>

                        </div>
                        <div className="col-lg-7">kanan</div>
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
    return {
        props: {
            post
        }
    }

}
