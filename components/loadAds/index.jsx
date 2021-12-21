import React from 'react'

export default function LoadAds() {
    // try {
    //     if (typeof window !== "undefined") {
    //         (window.adsbygoogle = window.adsbygoogle || []).push({});
    //     }
    // } catch (error) {
    //     console.log("adsense error", error.message);
    // }
    var ads = document.getElementsByClassName("adsbygoogle").length;
    for (var i = 0; i < ads; i++) {
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) { }
    }
}
