import Head from "next/head";
import Link from "next/link";

export default function Services() {
  return (
    <main style={{ maxWidth: "44rem", margin: "auto", padding: "1rem" }}>
      <Head><title>Services | John Online Services and Applications</title></Head>
      <nav aria-label="Site navigation"><Link href="/">Home</Link> · <span aria-current="page">Services</span></nav>
      <h1>Our services</h1>
      <h2>Education applications</h2>
      <p>Get assistance with university applications and HESLB loan applications.</p>
      <h2>Online registration</h2>
      <p>Ask about support with RITA applications and preparing the documents you need.</p>
      <h2>Website development</h2>
      <p>Discuss the pages, features and contact options your business needs.</p>
      <a href="https://wa.me/255698170989">Ask about a service on WhatsApp</a>
    </main>
  );
}
