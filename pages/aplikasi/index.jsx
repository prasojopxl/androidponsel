// export default function Aplikasi({dataUsers}) {
//     console.log(dataUsers)
//     return (
//         <div>
//             aplikasi
//         </div>
//     )
// }

// Aplikasi.getInitialProps = async () => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
//     const dataUsers = await res.json;
//     return {
//         dataUsers
//     }
// }


// posts will be populated at build time by getStaticProps()
function Blog({ dataUsers }) {
    console.log(dataUsers)
    return (        
      <ul>
        {dataUsers &&
            dataUsers.map(post => (
                <div key={post.id}>
                    {post.name}
                </div>
            ))}
      </ul>
    );
}
  
export async function getStaticProps() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");  
    const dataUsers = await res.json();
    return {
        props: {
            dataUsers
        }
    };

}
  
  export default Blog;
  