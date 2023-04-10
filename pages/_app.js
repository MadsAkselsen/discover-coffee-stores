import { StoreProvider } from "@/store/store-context";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
	return (
		<div>
			<StoreProvider>
				<Component {...pageProps} />
			</StoreProvider>
			<footer>
				<p>© 2018 Gandalf</p>
			</footer>
		</div>
	);
}
