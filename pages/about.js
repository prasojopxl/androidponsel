import React, {useEffect} from 'react'
import Layout from '../components/layout/layout'
import axios from "axios";
import { apiUrl } from '../config/variable';

export default function About() {
    useEffect(()=> {
        axios.get(`${apiUrl}posts`)
            .then((res)=> {
            })
    })

    return (
        <Layout title="about">
            ini halaman about
        </Layout>
    )
}
