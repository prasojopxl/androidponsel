import { ListNews } from '../../components'
import LayoutBerita from '../../layout/layoutberita/LayoutBerita'


export default function Berita() {
    return (
        <LayoutBerita>
            <ListNews page={0}/>
        </LayoutBerita>
    )
}
