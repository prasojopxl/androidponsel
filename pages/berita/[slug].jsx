// import { useRouter } from "next/router"
// import { apiUrl } from "../../config/variable";
import LayoutBerita from "../../layout/layoutberita/LayoutBerita";

export default function DetailBerita() {
    return (
        <LayoutBerita>
        <div>
            Halo
        </div>
        </LayoutBerita>
    )
}

// export async function getStaticPaths() {
//     return {
//       paths: [
//         { params: { ... } } // See the "paths" section below
//       ],
//       fallback: true or false // See the "fallback" section below
//     };
//   }

// Lihat di sini: https://www.youtube.com/watch?v=628ZBS6dWSM&list=PLLhpK5IKtgqnexMqh_UdR9OKV_nD_huPR&index=13
export async function getStaticPaths() {
    return {
        paths: [
            {params: {slug:"p01" }}
        ],
        fallback:false
    };
}

// export async function getServerSideProps(context) {
//     const slug = context.query.slug;
//     try {
//         const resDataBerita = await fetch(`${apiUrl}/posts/${slug}`)
//         const dataBerita = await resDataBerita.json();
//         return {
//             props: {
//                 dataBerita
//             }
//         }    
//     } catch (error) {
//         return {error};
//     }
// }

