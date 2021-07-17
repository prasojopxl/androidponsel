import Image from "next/image"
import {baseUrl} from "../config/variable";
import LayoutDefault from "../layout/layoutdefault/LayoutDefault";

export default function Page404() {
    return (
        <LayoutDefault>
            <div style={{padding:"50px 0",textAlign:"center"}}>
                <h1>Ooops...</h1>
                <div style={{margin: "20px 0"}}><Image src={baseUrl+"/images/img-notfound.png"} width="349" height="252" alt="page tidak ada"/></div>
                <h4>[Halaman Tidak Ditemukan]</h4>
            </div>
        </LayoutDefault>
    )
}
