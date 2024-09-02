"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem } from "@/components";
import * as Yup from "yup";
import { IRegisterAccount } from "@/types/auth/request";
import authService from "@/service/auth.service";
import { showToastify } from "@/hooks/showToastify";
import { useRouter } from "next/navigation";

const FormComponent = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const SignUpValidationSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, "Nome muito curto!")
			.max(36, "Nome muito longo!")
			.required("Campo nome é requerido"),
		email: Yup.string().email("Email inválido").required("Email requerido"),
		password: Yup.string()
			.matches(
				/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
				"Deve conter pelo menos uma letra e um número",
			)
			.required(
				"Coloque uma combinação de numeros, letras e sinais de pontuação (como ! e &).",
			)
			.min(8, "Senha deve conter no mínimo 8 caracteres.")
			.max(36, "Senha não deve contar mais de 36 caracteres"),
	});

	const initialValues: Partial<IRegisterAccount> = {
		name: "",
		email: "",
		password: "",
	};

	const handleFormSubmit = async (values: Partial<IRegisterAccount>) => {
		setLoading(true);

		await authService
			.register({
				name: values.name,
				email: values.email,
				password: values.password,
			})
			.then(async (res: any) => {
				if (res?.data?.user) {
					router.push(`/app/conta/conta-cadastrada?id=${res.data.user.id}`);

					showToastify({
						label:
							"Cadastro criado com sucesso! Verifique seu e-mail para acessar sua conta.",
						type: "success",
					});
				}
			})
			.catch((error) => {
				setLoading(false);

				if (error?.response?.data?.code === 400) {
					return showToastify({
						label:
							"Impossível criar sua conta pois já existe um e-mail cadastrado.",
						type: "error",
					});
				}

				showToastify({
					label: "Impossível criar sua conta. Por favor, tente novamente.",
					type: "error",
				});
			});
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={SignUpValidationSchema}
			onSubmit={handleFormSubmit}
		>
			{({ errors, touched, handleSubmit }) => (
				<Form onSubmit={handleSubmit} className="flex flex-col">
					<FormItem
						label="Nome"
						errorMessage={errors.name}
						invalid={!!(errors.name && touched.name)}
					>
						<Field
							invalid={!!(errors.name && touched.name)}
							name="name"
							type="text"
							label="Name"
							component={Input}
						/>
					</FormItem>
					<FormItem
						label="E-mail"
						errorMessage={errors.email}
						invalid={!!(errors.email && touched.email)}
					>
						<Field
							invalid={!!(errors.email && touched.email)}
							name="email"
							type="email"
							label="Email"
							component={Input}
						/>
					</FormItem>
					<FormItem
						label="Senha"
						errorMessage={errors.password}
						invalid={!!(errors.password && touched.password)}
					>
						<Field
							invalid={!!(errors.password && touched.password)}
							name="password"
							type="password"
							label="Password"
							component={Input}
						/>
					</FormItem>
					<ButtonPrimary
						type="submit"
						className="w-full"
						rounded="rounded-[20px]"
						disabled={loading}
						loading={loading}
					>
						CADASTRAR CONTA
					</ButtonPrimary>
				</Form>
			)}
		</Formik>
	);
};

export default FormComponent;
