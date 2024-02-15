"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/payload-types";
import { useAuth } from "@/hooks/use-auth";

interface UserAccountNavProps {
	user: User;
}

export const UserAccountNav = ({ user }: UserAccountNavProps) => {
	const { signOut } = useAuth();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="overflow-visible">
				<Button variant="ghost" size="sm" className="relative">
					My account
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="bg-white w-60 " align="end">
				<div className="flex items-center justify-start gap-2 p-2">
					<div className="flex flex-col space-y-0.5 leading-none">
						<p className="font-medium text-sm text-black">{user.email}</p>
					</div>
				</div>

				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/sell">Seller Dashboard</Link>
				</DropdownMenuItem>

				<DropdownMenuItem className="cursor-pointer" onClick={signOut}>
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
