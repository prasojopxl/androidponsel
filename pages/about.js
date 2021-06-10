import React, {useEffect} from 'react'
import Layout from '../components/layout'
import axios from "axios";

export default function About() {
    useEffect(()=> {
        axios.get(`http://stagingaja.com:1337/posts`)
            .then((res)=> {
                console.log(res.data)
            })
    })

    return (
        <Layout title="about">
            ini halaman about
        </Layout>
    )
}
