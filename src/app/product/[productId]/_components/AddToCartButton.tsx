"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export const AddToCartButton = () => {
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsSuccess(false);
		}, 2000);

		return () => clearTimeout(timeout);
	}, [isSuccess]);

	return (
		<Button onClick={() => setIsSuccess(true)} size="lg" className="w-full">
			{isSuccess ? "Added!" : "Add to cart"}
		</Button>
	);
};
