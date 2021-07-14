import { useEffect, useState } from 'react';
import { ListNews } from '../../../components'
import LayoutBerita from '../../../layout/layoutberita/LayoutBerita'
import { useRouter } from 'next/router';
import axios from 'axios';
import { apiUrl } from '../../../config/variable';
import Link from 'next/link';

export default function Berita() {
    return (
        <LayoutBerita>
            <ListNews/>
        </LayoutBerita>
    )
}
