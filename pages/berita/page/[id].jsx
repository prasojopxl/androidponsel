import { useEffect, useState } from 'react';
import { ListNews } from '../../../components'
import LayoutBerita from '../../../layout/layoutberita/LayoutBerita'
import { useRouter } from 'next/router';
import axios from 'axios';
import { apiUrl } from '../../../config/variable';
import Link from 'next/link';

export default function Berita() {
    const router = useRouter();
    const {id} = router.query
    if(!id) return null;

    const [totalPage, setTotalPage] = useState([]);

    const getTotalPage = () => {
        axios.get(`${apiUrl}/posts/count?menu=2`)
        .then(res=> {
            setTotalPage(res.data)
        })
    }
    getTotalPage();

    useEffect (()=> {
        const {id} = router.query
        if(!router.isReady) return;
        
    },[router.isReady])

    return (
        <LayoutBerita>
            <ListNews page={id*9-9}/>
        </LayoutBerita>
    )
}
