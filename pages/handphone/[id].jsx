import { useEffect, useState, useRef, Fragment } from "react"
import Image from "next/image"
import styles from "./index.module.scss";
import { apiUrl } from "../../config/variable";
import LayoutHandphone from "../../layout/layouthandphone/LayoutHandphone";
import { Title } from "../../components";
import Slider from "react-slick";


export default function DetailPage({post}) {
    const [state, setState] = useState({ nav1: null, nav2: null });
    const slider1 = useRef();
    const slider2 = useRef();
    var showSlider = 0;
    post.product_image.length <=3 ? showSlider= post.product_image.length: showSlider=4;
    useEffect(()=> {
        setState({
            nav1: slider1.current,
            nav2: slider2.current
        });
    },[])
    const { nav1, nav2 } = state;

    return (
        <LayoutHandphone>
            <div className={styles.detailproducts}>
                <div className={styles.contents}>
                    <Title title="Overview Produk"></Title>
                    <div className="row">
                        <div className="col-lg-5">
                    <Slider asNavFor={nav2} ref={slider => (slider1.current = slider)}>
                        {
                            post.product_image.map((item,i)=> {
                                return (
                                    <Fragment>                  
                                        <div>
                                            <Image src={apiUrl+item.url} width={160} height={212} alt={item.name}/>
                                        </div>
                                    </Fragment>
                                )
                            })
                        }
                    </Slider>  

                    {
                        post.product_image.length > 1 &&
                        <Slider asNavFor={nav1} ref={slider => (slider2.current = slider)} slidesToShow={showSlider}  swipeToSlide={true} focusOnSelect={true}>
                        {
                            post.product_image.map((item,i)=> {
                                return (
                                    <Fragment>                  
                                        <div>
                                            <Image src={apiUrl+item.url} width={160/3} height={212/3} alt={item.name}/>
                                        </div>
                                    </Fragment>
                                )
                            })
                        }
                        </Slider>      

                    }


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
