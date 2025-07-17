import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Details.module.css";

export async function getServerSideProps({ params }) {
    const res = await fetch(
        `https://pokemon-ssr.s3.sa-east-1.amazonaws.com/pokemon-main/pokemon/${params.id}.json`
    );
    return { props: { pokemon: await res.json() } };
}

const Details = ({ pokemon }) => {
    return (
        <div>
            <Head>
                <title>{pokemon?.name}</title>
            </Head>
            <main>
                <Link href="/">
                    <a>Back</a>
                </Link>
                <section className={styles.layout}>
                    <header>
                        <Image
                            className={styles.picture}
                            src={`https://pokemon-ssr.s3.sa-east-1.amazonaws.com/pokemon-main/${pokemon?.image}`}
                            alt={pokemon?.name}
                            width={500}
                            height={500}
                        />
                        <div>
                            <p className={styles.name}>{pokemon?.name}</p>
                            <p className={styles.type}>
                                {pokemon?.type.join(", ")}
                            </p>
                        </div>
                    </header>
                    <table>
                        <thead className={styles.header}>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon?.stats.map(({ name, value }) => (
                                <tr key={name}>
                                    <td className={styles.attribute}>{name}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Details;
