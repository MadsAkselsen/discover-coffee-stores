import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import coffeeStoresData from "../../data/coffee-stores.json";

export function getStaticProps(staticProps) {
	const params = staticProps.params;
	return {
		props: {
			coffeeStore: coffeeStoresData.find((coffeeStore) => {
				return coffeeStore.id.toString() === params.id;
			}),
		},
	};
}

export function getStaticPaths() {
	console.log("===> getStaticPaths");
	const paths = coffeeStoresData.map((coffeeStore) => {
		return { params: { id: coffeeStore.id.toString() } };
	});
	return {
		paths,
		fallback: true, // can also be true or 'blocking'
	};
}

const CoffeeStore = (props) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>loading...</div>;
	}

	// must be destructured after above loading state, because
	// data doesn't exist yet
	const { address, name, neighbourhood } = props.coffeeStore;

	console.log("props", props);
	return (
		<div>
			<Head>
				<title>test</title>
			</Head>
			<Link href="/">Back to home</Link>
			<p>{address}</p>
			<p>{name}</p>
			<p>{neighbourhood}</p>
		</div>
	);
};

export default CoffeeStore;
