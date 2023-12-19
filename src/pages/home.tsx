import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import homes from "../../data/homes.json";
import ReviveSvg from "../../public/images/revive.svg";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Web Technical Interview</title>
      </Head>
      <main className={styles.main}>
        <span className={styles.logo}>
          <Image 
            src={ReviveSvg} 
            alt="Revive Logo"
          />
        </span>

        <ul>
        {homes.map((home, id) => (
          <li key= {id} className="my-4 w-full flex justify-between">
            <div className="p-4 w-full flex justify-between">
              <span className="capitalize">{home.address}</span>
              <span className="capitalize">{home.fullAddress}</span>
              <span>{home.city}</span>
              <span>{home.state}</span>
              <span>{home.zipCode}</span>
              <span>{home.city}</span>
              <span>{home.state}</span>
              <span>{home.zipCode}</span>
            </div>
          </li>
        ))}
        </ul>

        <div className={styles.grid} />

        <div className={styles.card} />
      </main>

      <footer className={styles.footer}>
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </footer>
    </div>
  )
}

export default Home
