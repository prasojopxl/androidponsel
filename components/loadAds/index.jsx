import React from 'react'

export default function LoadAds() {
    try {
        if (typeof window !== "undefined") {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    } catch (error) {
        console.log("adsense error", error.message);
    }
}
