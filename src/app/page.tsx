"use client"

import React, { useEffect, useState } from "react";
import { SupplierCard } from '@/components/mols';
import { ButtonPrimary, CategoryCard, FormItem, ImputImage, TextArea } from '@/components/atoms'
import * as Yup from "yup";
import SupplierLogo from '@/images/easytolive/logo/logotipo-fundoazulroxo.svg'
import SearchCategory from '@/app/searchCategory'
import SupplierService from '@/service/supplier.service'
import imageCategory from '@/images/easytolive/icons/categorie-example.svg'
import { ISUpplierCompleteRegister, ISupplier, ISupplierList } from '@/types/supplier';
import { useDebounce } from 'use-debounce';
import { categorieProps } from '@/components/atoms/CategoryCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useToastify } from "@/hooks/useToastify";
import { userLoginResponseProps } from "@/types/user";
import { getItemByLocalStorage } from "@/utils/localStorageHelper";
import { useRouter } from "next/navigation";
import ModalEdit from '@/components/mols/Modal/ModalEdit';
import { Field, Form, Formik } from 'formik';
import ButtonThird from '@/components/atoms/Button/ButtonThird';

function PageHome() {
  const router = useRouter();

  const [suppliers, setSuppliers] = useState([])
  const [search, setSearch] = useState('');
  const [textSearched] = useDebounce(search, 1000);
  const [categories, setCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [supplierCategoriesFilter, setSupplierCategoriesFilter] = useState('');
  const [user, setUser] = useState<userLoginResponseProps>();
  const [controlmodalNotVerified, setControlModalNotVerified] = useState(false)
  const [ControlModalSupplierUploadRegister, setControlModalSupplierUploadRegister] = useState(false)
  const [loading, setloading] = useState(false);

  const CompleteSupplierRegisterSchema = Yup.object().shape({
    logo: Yup.string().required("Logo é requerido"),
    ilustration_image: Yup.string().required("Escolha uma imagem ilustrativa que ficará na sua página de estabelecimento."),
    description: Yup.string().required("escolha uma descrição para seu estabelecimento")
  });

  const getAllCategories = async () => {
    const res: any = await SupplierService.getSupplierCategories();
    return res;
  };

  const handleCategoryFilter = (categoryId: string) => {
    setSupplierCategoriesFilter(prevState => prevState === categoryId ? '' : categoryId);
  };

  useEffect(() => {
    const localUser = getItemByLocalStorage('user');
    if (!localUser) return router.push('/login');
    setUser(localUser);
    if (user?.isSupplier) {
      if (user.isVerified === false) {
        setControlModalNotVerified(true)
      }
      else {
        setControlModalSupplierUploadRegister(true)
      };
    };


    getAllCategories()
      .then((res) => setCategories(res?.data?.supplierCategories?.results))
      .catch((error) => {
        if (error?.response?.data?.code === 401) {
          useToastify({ label: 'Não autorizado. Por favor, autentique-se', type: 'error' });
        }
        if (error?.response?.data?.code === 404) {
          useToastify({ label: 'Nenhuma categoria encontrada', type: 'error' });
        }
      });
  }, []);

  const handleFormSubmit = async (values: ISUpplierCompleteRegister) => {
    setloading(true)
    //criar endpoint para atualizar cadastro supplier
    console.log(values, 'formulário enviado')
    setloading(false)
  };

  function handleSetSearch(e: any) {
    setSearch(e.target.value)
    setPageNumber(1);
  };

  const getAllSuppliers = async (data: Partial<ISupplierList>) => {
    const res: any = await SupplierService.getSupplierList(data);

    if (res?.data?.totalPages <= pageNumber) {
      setHasMore(false)
    }
    else {
      setHasMore(true)
    }
    return res;
  };

  const handleResponse = (res: any) =>
    setSuppliers(
      pageNumber === 1
        ? res?.data?.results
        : suppliers.concat(res?.data?.results)
    );

  useEffect(() => {
    const data = {
      page: pageNumber,
      ...(textSearched && { name: textSearched }),
      ...(supplierCategoriesFilter && { supplierCategory: supplierCategoriesFilter }),
      sortBy: 'coupons:desc',
    };

    getAllSuppliers(data)
      .then(handleResponse)
      .catch((error) => {
        if (error?.response?.data?.code === 401) {
          useToastify({ label: 'Usuário não autenticado', type: 'error' })
        }
      })
  }, [textSearched, pageNumber, supplierCategoriesFilter]);

  return user && (
    <div className="md:w-[500px] w-full m-auto p-5">
      <ModalEdit show={controlmodalNotVerified} onCloseModalEdit={() => setControlModalNotVerified(false)}>
        <h1> Bem-vindo ao Easy2Live. Seu cadastro foi enviado com sucesso e agora é só esperar a aprovação feita pelo nosso time. Bom ter você com a gente!</h1>
        <p>Será enviado um email de aprovação, quando realizada.</p>
      </ModalEdit>
      <ModalEdit
        show={true}
        onCloseModalEdit={() => setControlModalSupplierUploadRegister(false)}>
        <div className='h-[85vh] w-auto'>
          <div className='mt-8 mb-16 flex items-center justify-between'>
            <h2 className=" pl-6 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-bold text-black dark:text-neutral-100 justify-center">
              Completar <br /> cadastro
            </h2>
            <div>
              <div className='relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-ez2live to-secondary-ez2livebg'>
                <div className='absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-ez2live to-secondary-ez2livebg'>
                </div>
              </div>
            </div>
          </div>

          <Formik
            initialValues={{
              logo: '',
              ilustration_image: '',
              description: ''
            }}
            validationSchema={CompleteSupplierRegisterSchema}
            onSubmit={handleFormSubmit}>
            {({ errors, touched, handleSubmit }) => (
              <Form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3">
                <FormItem
                  label='logo'
                  errorMessage={errors.logo}
                  invalid={!!(errors.logo && touched.logo)}
                >
                  <Field
                    invalid={!!(errors.logo && touched.logo)}
                    name="logo"
                    label="logo"
                    accept= "image/*"
                    component={ImputImage}
                  />
                </FormItem>
                <FormItem
                  label='imagem ilustrativa'
                  errorMessage={errors.ilustration_image}
                  invalid={!!(errors.ilustration_image && touched.ilustration_image)}
                >
                  <Field
                    invalid={!!(errors.ilustration_image && touched.ilustration_image)}
                    name="ilustration_image"
                    label="ilustration_image"
                    accept= "image/*"
                    component={ImputImage}
                  />
                </FormItem>
                <FormItem
                  label='descrição'
                  errorMessage={errors.description}
                  invalid={!!(errors.description && touched.description)}

                >
                  <Field
                    invalid={!!(errors.description && touched.description)}
                    name="description"
                    type="text"
                    label="description"
                    component={TextArea}
                    className= "h-32 bg-white text-black"
                    placeholder="escrever descrição do estabelecimento"
                  />
                </FormItem>
                <ButtonPrimary
                  type="submit"
                  className="w-full mt-6"
                  disabled={loading}
                  loading={loading}
                >
                  Completar cadastro
                </ButtonPrimary>

                <ButtonThird onClick={() => setControlModalSupplierUploadRegister(false)}>
                  cancelar
                </ButtonThird>

              </Form>
            )}
          </Formik>
        </div>
      </ModalEdit>
      <SearchCategory onChange={handleSetSearch} />
      <div className='flex flex-wrap my-6 w-full gap-3'>
        {
          categories.map((category: categorieProps, index) => (
            <CategoryCard
              key={index}
              name={category.title}
              onClick={() => handleCategoryFilter(category.id)}
              image={imageCategory}
              isActive={category.id === supplierCategoriesFilter}
            />
          ))
        }
      </div>
      <InfiniteScroll
        className='flex flex-col gap-3'
        dataLength={suppliers.length}
        next={() => setPageNumber(pageNumber + 1)}
        hasMore={hasMore}
        loader={<h4 className=' m-4 text-primary-ez2live'>Carregando...</h4>}
        endMessage={<p className='m-4 text-primary-ez2live text-center'>...</p>}
      >
        {suppliers.map((supplier: ISupplier) => (
          <SupplierCard
            supplierCategory={supplier?.supplierCategory?.title}
            supplierImage={SupplierLogo}
            avaliation='4.6'
            couponsAvaible={supplier.numberOfCoupons}
            name={supplier.name}
            key={supplier.id}
            id={supplier.id}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PageHome;
