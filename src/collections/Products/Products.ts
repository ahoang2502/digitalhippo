import { CollectionConfig } from "payload/types";

import { PRODUCT_CATEGORIES } from "../../config";

export const Products: CollectionConfig = {
	slug: "products",
	admin: {
		useAsTitle: "name",
	},
	access: {},
	fields: [
		{
			name: "user",
			type: "relationship",
			relationTo: "users",
			required: true,
			hasMany: false,
			admin: {
				condition: () => false,
			},
		},
		{
			name: "name",
			label: "Name",
			type: "text",
			required: true,
		},
		{
			name: "description",
			label: "Product details",
			type: "textarea",
		},
		{
			name: "price",
			label: "Price in USD",
			type: "number",
			required: true,
			min: 0,
			max: 1000,
		},
		{
			name: "category",
			label: "Category",
			type: "select",
			options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
			required: true,
		},
		{
			name: "product_files",
			label: "Product file(s)",
			type: "relationship",
			relationTo: "product_files",
			required: true,
			hasMany: false,
		},
		{
			name: "approvedForSale",
			label: "Product status",
			access: {
				create: ({ req }) => req.user.role === "admin",
				read: ({ req }) => req.user.role === "admin",
				update: ({ req }) => req.user.role === "admin",
			},
			type: "select",
			defaultValue: "pending",
			options: [
				{
					label: "Pending verification",
					value: "pending",
				},
				{
					label: "Approved",
					value: "approved",
				},
				{
					label: "Denied",
					value: "denied",
				},
			],
		},
		{
			name: "priceId",
			access: {
				create: () => false,
				read: () => false,
				update: () => false,
			},
			type: "text",
			admin: {
				hidden: true,
			},
		},
		{
			name: "stripeId",
			access: {
				create: () => false,
				read: () => false,
				update: () => false,
			},
			type: "text",
			admin: {
				hidden: true,
			},
		},
		{
			name: "images",
			label: "Product images",
			labels: {
				singular: "Image",
				plural: "Images",
			},
			type: "array",
			minRows: 1,
			maxRows: 4,
			required: true,
			fields: [
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					required: true,
				},
			],
		},
	],
};
