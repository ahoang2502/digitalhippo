"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";

export const AddToCartButton = ({ product }: { product: Product }) => {
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const { addItem } = useCart();

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsSuccess(false);
		}, 2000);

		return () => clearTimeout(timeout);
	}, [isSuccess]);

	return (
		<Button
			onClick={() => {
				addItem(product);
				setIsSuccess(true);
			}}
			size="lg"
			className="w-full"
		>
			{isSuccess ? "Added!" : "Add to cart"}
		</Button>
	);
};
