import Image from "next/image";

const dataGambar = [
    'https://images.unsplash.com/photo-1586227740560-8cf2732c1531',
    'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9',
    'https://images.unsplash.com/photo-1593642532400-2682810df593'        
]



export default function Coba() {
    return (
        <div>
            {
                dataGambar.map((item,index)=> {
                    return (
                        <div key={index}>
                            {item}
                            <Image src={item} width={200} height={100} alt="judul"/>
                        </div>
                    )
                })
            }
            {/* <Image src="https://images.unsplash.com/photo-1593642634315-48f5414c3ad9" width={200} height={100}  alt="judul"/> */}
        </div>
    )
}
