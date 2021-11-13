import { GlobalAds } from "../components";
import styles from "./pages.module.scss";
import { fetchData } from '../config/data';
import Layout from '../layout'
import { useState, useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";

export default function Pages(props) {
    const people = [
        "Siri",
        "Alexa",
        "Google",
        "Facebook",
        "Twitter",
        "Linkedin",
        "Sinkedin"
    ];
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSeacrh, setShowSearch] = useState(false)
    const handleChange = e => {
        setSearchTerm(e.target.value);
        e.target.value === "" ? setShowSearch(false) : setShowSearch(true)

    };
    useEffect(() => {
        const results = people.filter(person =>
            person.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm]);

    return (
        <Layout
            dataSEO={props.dataSEO.seo}
            dataBrands={props.getTopBrands}
        >
            <GlobalAds adsId="1" />
            <div className={styles.pages}>
                <div className={styles.contents}>
                    <div className="App">
                        <h2>{searchTerm}</h2>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        {
                            showSeacrh && <ul>
                                {searchResults.map(item => (
                                    <li>{item}</li>
                                ))}
                            </ul>

                        }
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const dataSEO = await fetchData("/general");
    const getMenu = await fetchData("/menus?_sort=order");
    const getTopBrands = await fetchData("/brands?_top_brand=true");
    const dataBanerProdukTop = await fetchData(`/ads/8?_publicationState=preview`);
    return {
        props: {
            getMenu,
            getTopBrands,
            dataSEO,
            dataBanerProdukTop,
        },
        revalidate: 3
    }
}
