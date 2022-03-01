import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SignInButton } from "../SignInButton";

import styles from "./styles.module.scss";
import { CustomLink } from "../CustomLink";

export function Header() {
	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<img src="/images/logo.svg" alt="ig.news" />
				<nav>
					<CustomLink href="/" activeClassName={styles.active}>
						<a>Home</a>
					</CustomLink>
					<CustomLink
						href="/posts"
						activeClassName={styles.active}
						prefetch
					>
						<a>Posts</a>
					</CustomLink>
				</nav>

				<SignInButton />
			</div>
		</header>
	);
}
