import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return <>
    <Head><title>John Online Services and Applications</title></Head>
    <main><h1>John Online Services and Applications</h1><p>Website development and online application services across Tanzania.</p><nav aria-label="Site navigation"><Link href="/services">Explore our services</Link></nav></main>
    <footer>Developed by John Charles Sarwi · <a href="https://wa.me/255698170989">Contact the developer on WhatsApp</a></footer>
  </>;
}
