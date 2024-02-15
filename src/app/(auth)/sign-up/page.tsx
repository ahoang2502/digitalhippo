"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
	AuthCredentialsValidator,
	TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";

const SignUpPage = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TAuthCredentialsValidator>({
		resolver: zodResolver(AuthCredentialsValidator),
	});

	const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
		onError: (error) => {
			if (error.data?.code === "CONFLICT") {
				toast.error("This email is already in use. Sign in instead?");

				return;
			}

			if (error instanceof ZodError) {
				toast.error(error.issues[0].message);

				return;
			}

			toast.error("Something went wrong. Please try again later!");
		},
		onSuccess: ({ sentToEmail }) => {
			toast.success(`Verification email sent to ${sentToEmail}.`);
			router.push("/verify-email?to=" + sentToEmail);
		},
	});

	const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
		// Send data to server
		mutate({ email, password });
	};

	return (
		<div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0 ">
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
				<div className="flex flex-col items-center space-y-2 text-center">
					<Icons.logo className="h-20 w-20" />

					<h1 className="text-2xl font-bold">Create an account</h1>

					<Link
						href="/sign-in"
						className={buttonVariants({
							variant: "link",
							className: "gap-1",
						})}
					>
						Already have an account? Sign in
						<ArrowRight className="h-4 w-4" />
					</Link>
				</div>

				{/* Form */}
				<div className="grid gap-6">
					<form className="" onSubmit={handleSubmit(onSubmit)}>
						<div className="grid gap-2">
							<div className="grid gap-1 py-2">
								<Label htmlFor="email">Email</Label>
								<Input
									{...register("email")}
									className={cn({ "focus-visible:ring-red-500": errors.email })}
									placeholder="you@example.com"
								/>

								{errors?.email && (
									<p className="text-xs text-red-500 font-medium">
										{errors.email.message}
									</p>
								)}
							</div>

							<div className="grid gap-1 py-2">
								<Label htmlFor="password">Password</Label>
								<Input
									{...register("password")}
									placeholder="Password"
									type="password"
									className={cn({
										"focus-visible:ring-red-500": errors.password,
									})}
								/>

								{errors?.password && (
									<p className="text-xs text-red-500 font-medium">
										{errors.password.message}
									</p>
								)}
							</div>

							<Button disabled={isLoading}>
								Sign up
								{isLoading && <Loader2 className="h-4 w-4 ml-1 animate-spin" />}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;
