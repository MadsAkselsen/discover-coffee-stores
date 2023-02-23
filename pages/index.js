import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "@/components/banner";

export default function Home() {
	const handleOnBannerBtnClick = () => {
		console.log("hi banner button");
	};
	console.log("styles", styles);

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
			</main>
		</div>
	);
}