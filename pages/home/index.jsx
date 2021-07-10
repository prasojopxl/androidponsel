import React, {useEffect, useState} from 'react';
import axios from "axios";
import LayoutHome from '../../layout/layouthome/layoutHome';
import {Ads, AdsBanner, CompareItem, LatestNews, KanalApp} from "../../components/";
import Image from "next/image";
import { apiUrl } from '../../config/variable';

export default function Home() {
    const [topAds, setTopAds] = useState({
        iframe:[],
        bannerImage:[],
        link:[],
        urlImage:[],
        widthImage:[],
        heightImage:[]
    })    
    const getTopBanner = () => {
        axios.get(`${apiUrl}/ads/1`)
        .then((res)=> {
            res.data.Image_Banner === null ? setTopAds({iframe:res.data.URL_Iframe}) : setTopAds({
                bannerImage:"withBanner",
                link:res.data.url,
                urlImage:res.data.Image_Banner.url,
                widthImage: res.data.Image_Banner.width,
                heightImage: res.data.Image_Banner.height,
            })
        })
    }

    const [contentAds, setContentAds] = useState({
        iframe:[],
        bannerImage:[],
        link:[],
        urlImage:[],
        widthImage:[],
        heightImage:[]
    })
    const getContent1Banner = () => {
        axios.get(`${apiUrl}/ads/2`)
        .then((res)=>{
            res.data.Image_Banner === null ? setContentAds({iframe:res.data.URL_Iframe}) : setContentAds({
                bannerImage:"withBanner",
                link:res.data.url,
                urlImage:res.data.Image_Banner.url,
                widthImage: res.data.Image_Banner.width,
                heightImage: res.data.Image_Banner.height,
            })
        })
    }

    const [contentAds2, setContentAds2] = useState({
        iframe:[],
        bannerImage:[],
        link:[],
        urlImage:[],
        widthImage:[],
        heightImage:[]
    })
    const getContentAds2 = () => {
        axios.get(`${apiUrl}/ads/4`)
        .then((res)=>{
            res.data.Image_Banner === null ? setContentAds2({iframe:res.data.URL_Iframe}) : setContentAds2({
                bannerImage:"withBanner",
                link:res.data.url,
                urlImage:res.data.Image_Banner.url,
                widthImage: res.data.Image_Banner.width,
                heightImage: res.data.Image_Banner.height,
            })
        })
    }


    useEffect(()=> {
        getTopBanner();
        getContent1Banner();
        getContentAds2();
    },[])
    return (
        <React.Fragment>
            <LayoutHome>
                {
                    topAds.bannerImage === "withBanner" ? <AdsBanner linkbanner={topAds.link} urlImage={topAds.urlImage} width={topAds.widthImage} height={topAds.heightImage}/>
                    : <Ads banner={topAds.iframe}/>
                }            

                <CompareItem/>

                {
                    contentAds.bannerImage === "withBanner" ? <AdsBanner linkbanner={contentAds.link} urlImage={contentAds.urlImage} width={contentAds.widthImage} height={contentAds.heightImage}/>
                    : <Ads banner={contentAds.iframe}/>
                }            

                <LatestNews/>
                <KanalApp/>

                {
                    contentAds2.bannerImage === "withBanner" ? <AdsBanner linkbanner={contentAds2.link} urlImage={contentAds2.urlImage} width={contentAds2.widthImage} height={contentAds2.heightImage}/>
                    : <Ads banner={contentAds2.iframe}/>
                }            

            </LayoutHome>
        </React.Fragment>
    )
}
