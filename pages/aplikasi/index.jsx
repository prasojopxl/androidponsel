
export async function getStaticUser () {
    const res = await fetch (`https://jsonplaceholder.typicode.com/users`)
    const dataUsers = await res.json();
    console.log(dataUsers)
}

export default function Aplikasi(props) {
    getStaticUser();
    return (
        <div>
            aplikasi
        </div>
    )
}



