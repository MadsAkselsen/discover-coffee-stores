import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "@/components/banner";
import Card from "@/components/card";
import coffeeStoresData from "../data/coffee-stores.json";

export async function getStaticProps(context) {
	// logging only in terminal, not in dev tools in browser
	console.log("hello from getStaticProps");
	return {
		props: { coffeeStores: coffeeStoresData }, // will be passed to the page component as props
	};
}

export default function Home(props) {
	console.log("coffeeStores props", coffeeStoresData);
	const handleOnBannerBtnClick = () => {
		console.log("hi banner button");
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Coffee Connoisseur</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<Banner
					buttonText="View stores nearby"
					handleOnClick={handleOnBannerBtnClick}
				/>
				<div className={styles.heroImage}>
					<Image
						src="/static/hero-image.png"
						alt=""
						width={700}
						height={400}
					/>
				</div>
				{coffeeStoresData.length > 0 && (
					<>
						<h2 className={styles.heading2}>Toronto stores</h2>
						<div className={styles.cardLayout}>
							{props.coffeeStores.map((coffeeStore) => {
								return (
									<Card
										className={styles.card}
										key={coffeeStore.id}
										name={coffeeStore.name}
										imgUrl={coffeeStore.imgUrl}
										href={`/coffee-store/${coffeeStore.id}`}
									/>
								);
							})}
						</div>
					</>
				)}
			</main>
		</div>
	);
}
