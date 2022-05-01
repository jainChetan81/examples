import { useRouter } from "next/router";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaHome, FaLinkedin, FaStackOverflow, FaTwitter, FaUser } from "react-icons/fa";

const Sidebar = () => {
	const router = useRouter();
	console.log(router.pathname);
	return (
		<aside className="nav-bar">
			<Link href="/">
				<a className="logo">
					<img src={"/portfolio/logo-s.png"} alt="logo" />
					<img src={"/portfolio/logo_sub.png"} className="sub-logo" alt="logo subtitle" />
				</a>
			</Link>
			<nav>
				<Link href="/portfolio">
					<a className={router.pathname === "/portfolio" ? "active" : ""}>
						<FaHome />
					</a>
				</Link>
				<Link href="/portfolio/about">
					<a className={router.pathname === "/portfolio/about" ? "active about-link" : "about-link"}>
						<FaUser />
					</a>
				</Link>
				<Link href="/portfolio/contact">
					<a className={router.pathname === "/portfolio/contact" ? "active contact-link" : "contact-link"}>
						<FaEnvelope />
					</a>
				</Link>
			</nav>
			<ul>
				<li>
					<a target="_blank" rel="noreferrer" href="linkedin.com">
						<FaLinkedin />
					</a>
				</li>
				<li>
					<a target="_blank" rel="noreferrer" href="linkedin.com">
						<FaTwitter />
					</a>
				</li>
				<li>
					<a target="_blank" rel="noreferrer" href="linkedin.com">
						<FaGithub />
					</a>
				</li>
				<li>
					<a target="_blank" rel="noreferrer" href="linkedin.com">
						<FaStackOverflow />
					</a>
				</li>
			</ul>
		</aside>
	);
};

export default Sidebar;
