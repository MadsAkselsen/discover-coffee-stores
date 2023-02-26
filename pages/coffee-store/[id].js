import Link from "next/link";
import { useRouter } from "next/router";

import coffeeStoresData from "../../data/coffee-stores.json";

export function getStaticProps(staticProps) {
	console.log("testssss");
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
	console.log("getStaticPaths");
	return {
		paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
		fallback: true, // can also be true or 'blocking'
	};
}

const CoffeeStore = (props) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>loading...</div>;
	}

	console.log("props", props);
	return (
		<div>
			Coffee Store Page {router.query.id}
			<Link href="/">Back to home</Link>
			<Link href="/coffee-store/dynamic">Go to page dynamic</Link>
			<Link href="/courses/nextjs">Go to page dynamic</Link>
			<p>{props.coffeeStore.address}</p>
			<p>{props.coffeeStore.name}</p>
		</div>
	);
};

export default CoffeeStore;
