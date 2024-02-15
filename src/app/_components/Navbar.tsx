import Link from "next/link";
import { cookies } from "next/headers";

import { Icons } from "../../components/Icons";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import { Cart } from "./Cart";
import { NavItems } from "./NavItems";
import { getServerSideUser } from "@/lib/payload-utils";
import { UserAccountNav } from "./UserAccountNav";

const Navbar = async () => {
	const nextCookies = cookies();
	const { user } = await getServerSideUser(nextCookies);

	return (
		<div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
			<header className="relative bg-white">
				<MaxWidthWrapper>
					<div className="border-b border-gray-300">
						<div className="flex h-16 items-center">
							{/* Mobile Nav */}

							{/* Desktop Nav */}
							<div className="ml-4 flex lg:ml-0">
								<Link href="/">
									<Icons.logo className="h-10 w-10" />
								</Link>
							</div>

							<div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch ">
								<NavItems />
							</div>

							<div className="ml-auto flex items-center">
								<div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
									{user ? null : (
										<Link
											href="/sign-in"
											className="text-sm font-semibold hover:underline hover:bg-zinc-100 px-2 py-1.5 rounded-md transition-all"
										>
											Sign in
										</Link>
									)}

									{user ? null : (
										<span
											className="h-6 w-px bg-gray-200 "
											aria-hidden={true}
										/>
									)}

									{user ? (
										<UserAccountNav user={user} />
									) : (
										<Link
											href="/sign-up"
											className="text-sm font-semibold hover:underline hover:bg-zinc-100 px-2 py-1.5 rounded-md transition-all"
										>
											Create account
										</Link>
									)}

									{user ? (
										<span
											className="h-6 w-px bg-gray-200 "
											aria-hidden={true}
										/>
									) : null}

									{user ? null : (
										<div className="flex md:ml-6">
											<span
												className="h-6 w-px bg-gray-200 "
												aria-hidden={true}
											/>
										</div>
									)}

									<div className="flow-root ">
										<Cart />
									</div>
								</div>
							</div>
						</div>
					</div>
				</MaxWidthWrapper>
			</header>
		</div>
	);
};

export default Navbar;
