import React from "react";
import Image from "next/image";
import Link from "next/link";
import FormComponent from "./FormComponent";
import Avatar from "@/images/easytolive/user/user_circle_color_primary.svg";
import { SocialLoginComponent } from "@/components";

import LogoImage from "@/images/easytolive/logo/logotipo-semfundoazulroxo.svg";

const UserRegisterPage = () => {
	return (
		<section
			className={`nc-PageSignUp flex items-center justify-center`}
			data-nc-id="PageSignUp"
			style={{
				backgroundImage: `url('/background-3th-tela.png')`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				minHeight: "100vh",
			}}
		>
			<div className="bg-white w-[30rem] min-h-[3rem] p-12 rounded-[20px]">
				<div className="mb-12 mt-4 flex items-center gap-8 flex-col">
					<Image src={LogoImage} alt="logo" width={80} />
					<h1 className="text-center text-3xl">
						<strong>Você está a 1 passo</strong> de,
						<br />
						economizar ainda mais!
					</h1>
				</div>
				<FormComponent />
				<div className="w-full flex flex-col items-center gap-4 mt-4">
					<p>OU</p>

					<div className="w-full">
						<SocialLoginComponent />
					</div>
					<hr className="w-full border-t border-[#383839]/40" />
					<p className="text-main-purple">
						Já tem uma conta?{" "}
						<Link href="/app/conta/entrar">
							<strong>Entrar</strong>
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
};

export default UserRegisterPage;
