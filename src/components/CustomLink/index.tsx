import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface CustomLinkProps extends LinkProps {
	children: ReactElement;
	activeClassName: string;
}

export function CustomLink({
	children,
	activeClassName,
	...linkProps
}: CustomLinkProps) {
	const { asPath } = useRouter();

	const className = asPath === linkProps.href ? activeClassName : "";

	return <Link {...linkProps}>{cloneElement(children, { className })}</Link>;
}
