import React, {useEffect, useState} from 'react'
import styles from "./Sliderhome.module.scss";
import Slider from "react-slick";
import axios from "axios";
import Image from "next/image";

export default function Sliderhome() {
    const [dataBaner, setDataBaner] = useState([]);

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const getData = () => {
        axios.get (`http://stagingaja.com:1337/sliders`)
        .then ((res)=>{
            setDataBaner(res.data[0].posts)
        })   
    }

    useEffect(()=> {
        getData();
    },[])

    return (
        <div className="wrpsliderhome">
            <Slider {...settings}>
                {dataBaner.map((item,i)=> {
                    return (
                        <React.Fragment key={item.thumbnail.id}>
                            <div className={styles.itembaner}>
                                <div className={styles.imgwrp}><Image src={item.thumbnail.formats.medium.url} width={item.thumbnail.width} height={item.thumbnail.height}></Image></div>
                                <a href="#" className={styles.title}>{item.title}</a>
                            </div>
                        </React.Fragment>
                    )
                })}
            </Slider>            
        </div>
    )
}
