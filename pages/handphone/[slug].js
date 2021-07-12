import {useState, useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import { apiUrl } from '../../config/variable';

export default function HandphoneDetail() {
    const router = useRouter()    
    const {id} = router.query

      

    const getData = () => {
        axios.get(`${apiUrl}/products/${id}`)
        .then((res)=> {
            console.log(res.data)
        })
    }


    useEffect(()=> {
        if(!router.isReady) return;
        getData()
    },[router.isReady])

    return (
        <div>
            <React.Fragment>
                ini id {id}
            </React.Fragment>

        </div>
    )
}
