import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { apiUrl } from "../../config/variable";
import LayoutHandphone from "../../layout/layouthandphone/LayoutHandphone";

export default function DetailPage() {
    const router = useRouter();
    const {slug} = router.query;

    return (
        <LayoutHandphone>
            Halaman {slug}
        </LayoutHandphone>
    )
}
