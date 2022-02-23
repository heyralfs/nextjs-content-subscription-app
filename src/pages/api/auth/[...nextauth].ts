import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import { query as q } from "faunadb";

import { fauna } from "../../../services/fauna";

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		// ...add more providers here
	],

	secret: process.env.SIGNING_KEY,

	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			try {
				await fauna.query(
					q.If(
						q.Not(
							q.Exists(
								q.Match(
									q.Index("user_by_email"),
									q.Casefold(user.email)
								)
							)
						),
						q.Create(q.Collection("users"), {
							data: { email: user.email },
						}),
						q.Get(
							q.Match(
								q.Index("user_by_email"),
								q.Casefold(user.email)
							)
						)
					)
				);

				return true;
			} catch (err) {
				console.log(err);
				return false;
			}
		},
	},
});
