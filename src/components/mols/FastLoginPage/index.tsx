"use client";

import { ButtonPrimary, SocialLoginComponent } from "@/components";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const FastLoginPage = () => {
	const [loadingLogin, setLoadingLogin] = useState(false);
	const router = useRouter();
	const params = useSearchParams();
	const callbackUrl = params.get("callbackUrl");

	const handleRedirectToLogin = async () => {
		setLoadingLogin(true);
		router.push(
			callbackUrl
				? `/app/conta/entrar?callbackUrl=${encodeURIComponent(callbackUrl)}`
				: "/app/conta/entrar",
		);
		setTimeout(() => {
			setLoadingLogin(false);
		}, 1500);
	};

	const variants = {
		hidden: { opacity: 0, y: -100 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<section
			className="w-screen h-screen select-none flex items-center justify-center"
			style={{
				backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/pessoas_correndo.png)`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<main className="w-full lg:w-[34rem] flex flex-col justify-between h-full bg-main-purple">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={variants}
					transition={{ duration: 0.5 }}
					className="p-8 lg:p-16 bg-main-gray w-full h-[80%] lg:h-[75%] rounded-b-[30px] flex flex-col gap-8 shadow-xl"
				>
					<Image
						src="/logobranca.svg"
						alt="logo branca"
						width={90}
						height={80}
					/>
					<h1 className="text-white leading-[2.5rem] text-[32px]">
						<b className="font-extrabold">Você está a 1 passo</b> <br /> de
						facilitar sua rotina saudável!
					</h1>

					<p className="text-xl text-white font-semibold">Continue abaixo:</p>

					<SocialLoginComponent />

					<ButtonPrimary
						onClick={() => handleRedirectToLogin()}
						loading={loadingLogin}
						className="!p-3 hover:translate-y-[-2px] transition-all "
					>
						Entrar com email/senha
					</ButtonPrimary>

					<p className="text-lg text-white text-center">
						Ainda não possui uma conta?{" "}
						<strong className="text-[#A47AFF] hover:cursor-pointer">
							Clique aqui
						</strong>
					</p>
				</motion.div>

				<div className="p-8 h-full lg:p-16 flex flex-col items-center  gap-4">
					<p className="text-2xl text-white">Tenho uma empresa</p>

					<button className="px-12 py-4 rounded-full bg-[#00AD1A] text-2xl text-white hover:scale-105 transition-all">
						<strong>QUERO SER PARCEIRO</strong>
					</button>
				</div>
			</main>

			<div
				className="w-full h-fit flex flex-col py-6 absolute bottom-0"
				style={{
					background: "linear-gradient(to top, black, transparent)",
					paddingTop: "4rem",
				}}
			>
				<div
					id="brands"
					className="w-full h-[3rem]"
					style={{
						backgroundImage: "url(/marcas.png)",
						backgroundRepeat: "repeat-x",
						backgroundSize: "auto 100%",
						backgroundPosition: "2rem 0",
						paddingLeft: "2rem",
					}}
				></div>
			</div>
		</section>
	);
};

export default FastLoginPage;
