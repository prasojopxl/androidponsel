import { useRouter } from "next/router"


export default function DetailBerita() {
    const router = useRouter();
    const {slug} = router.query;
    return (
        <div>
            Hello Detail {slug}
        </div>
    )
}

