import React, {useEffect, useState} from 'react';
import axios from "axios";
import LayoutHome from '../../layout/layouthome/layoutHome';
import {Ads, CompareItem} from "../../components/";
import Image from "next/image";
import { apiUrl } from '../../config/variable';

export default function Home() {
    const [topBanner, setTopBanner] = useState([]);
    
    const getTopBanner = () => {
        axios.get(`${apiUrl}/ads/1`)
        .then((res)=> {
            res.data.Image_Banner === null ? setTopBanner(res.data.URL_Iframe) : console.log("ada baner")
        }) 
    }

    useEffect(()=> {
        getTopBanner();
    },[])
    return (
        <React.Fragment>
            <LayoutHome>
                <Ads banner={topBanner}/>                
                <CompareItem/>
            </LayoutHome>
        </React.Fragment>
    )
}
