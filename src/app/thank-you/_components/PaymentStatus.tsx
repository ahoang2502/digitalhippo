"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { trpc } from "@/trpc/client";

interface PaymentStatusProps {
	orderEmail: string;
	isPaid: boolean;
	orderId: string;
}

export const PaymentStatus = ({
	orderEmail,
	isPaid,
	orderId,
}: PaymentStatusProps) => {
	const router = useRouter();

	const { data } = trpc.payment.pollOrderStatus.useQuery(
		{ orderId },
		{
			enabled: isPaid === false,
			refetchInterval: (data) => (data?.isPaid ? false : 1000),
		}
	);

	useEffect(() => {
		if (data?.isPaid) router.refresh();
	}, [data?.isPaid, router]);

	return (
		<div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
			<div className="">
				<p className="font-medium text-gray-900 ">Shipping To</p>

				<p className="">{orderEmail}</p>
			</div>

			<div className="">
				<p className="font-medium text-gray-900 ">Order status</p>

				<p className="">{isPaid ? "Paid" : "Pending payment"}</p>
			</div>
		</div>
	);
};
