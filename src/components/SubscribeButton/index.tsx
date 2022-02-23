import { useSession, signIn } from "next-auth/react";
import React from "react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
	priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
	const session = useSession();

	async function handleSubscribe() {
		if (session.status !== "authenticated") {
			signIn("github");
			return;
		}

		try {
			const res = await api.post("/subscribe");
			const { sessionId } = res.data;

			const stripe = await getStripeJs();
			await stripe.redirectToCheckout({ sessionId });
		} catch (err) {
			alert(err.message);
		}
	}

	return (
		<button
			type="button"
			className={styles.subscribeButton}
			onClick={handleSubscribe}
		>
			Subscribe now
		</button>
	);
}
