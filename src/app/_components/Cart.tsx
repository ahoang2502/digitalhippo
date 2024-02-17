"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn, formatPrice } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "./CartItem";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Cart = () => {
	const { items } = useCart();

	const itemCount = items.length;
	const cartTotal = items.reduce(
		(total, { product }) => total + product.price,
		0
	);
	const fee = 1;

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<Sheet>
			<SheetTrigger className="group -m-2 flex items-center p-2 relative">
				<ShoppingCart
					aria-hidden={true}
					className="h-6 w-6 flex-shrink-0 text-gray-600 group-hover:text-gray-900"
				/>

				<span
					className={cn(
						"bg-rose-500 rounded-full px-1 py-[0.5px] text-xs text-white font-medium absolute top-0 -right-1.5",
						{ "bg-gray-200 text-gray-800": itemCount === 0 }
					)}
				>
					{isMounted ? itemCount : null}
				</span>
			</SheetTrigger>

			<SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
				<SheetHeader className="space-y-2.5 pr-6">
					<SheetTitle>Cart ({isMounted ? itemCount : null})</SheetTitle>
				</SheetHeader>

				{itemCount > 0 ? (
					<>
						<div className="flex w-full flex-col pr-6">
							{/*  Cart Logic */}
							<ScrollArea>
								{items.map(({ product }) => (
									<CartItem key={product.id} product={product} />
								))}
							</ScrollArea>
						</div>

						<div className="space-y-4 pr-6">
							<Separator />

							<div className="space-y-1.5 text-sm">
								<div className="flex">
									<span className="flex-1">Shipping</span>
									<span>Free</span>
								</div>

								<div className="flex">
									<span className="flex-1">Transaction Fee</span>
									<span>{formatPrice(fee)}</span>
								</div>

								<div className="flex">
									<span className="flex-1">Total</span>
									<span>{formatPrice(cartTotal + fee)}</span>
								</div>
							</div>

							<SheetFooter>
								<SheetTrigger asChild>
									<Link
										href="/cart"
										className={buttonVariants({
											className: "w-full",
										})}
									>
										Continue to Checkout
									</Link>
								</SheetTrigger>
							</SheetFooter>
						</div>
					</>
				) : (
					<div className="flex h-full flex-col items-center justify-center space-y-1">
						<div
							aria-hidden={true}
							className="relative mb-4 h-60 w-60 text-muted-foreground"
						>
							<Image
								src="/hippo-empty-cart.png"
								alt="empty shopping cart"
								fill
							/>
						</div>

						<div className="text-xl font-semibold ">Your cart is empty</div>

						<SheetTrigger asChild>
							<Link
								href="/product"
								className={buttonVariants({
									variant: "link",
									size: "sm",
									className: "text-sm text-muted-foreground",
								})}
							>
								Add items to your cart
							</Link>
						</SheetTrigger>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
};
