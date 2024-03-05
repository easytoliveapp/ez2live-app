"use client";

import classNames from "@/utils/classNames";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import DashboardIcon from "@/images/easytolive/icons/dashboardIcon.svg";
import LogoImage from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import supplierService from "@/service/supplier.service";
import { ISupplierList } from "@/types/supplier";
import { showToastify } from "@/hooks/showToastify";
import LogoMain from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import {
  AccordionInfo,
  ButtonSecondary,
  LoadingComponent,
  SearchCategory,
  Pagination,
  ButtonThird,
  Modal,
} from "@/components";
import { getDateFormater } from "@/utils/getDateFormater";
import userService from "@/service/users.service";

interface ISupplier {
  _id?: string;
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  whatsappPhoneNumber: string;
  isVerified: boolean;
  createdAt: string;
  supplierInfo: any;
}

const AdminPage = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);

  const [search, setSearch] = useState("");
  const [textSearched] = useDebounce(search, 1000);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showOnlyNotVerified, setShowOnlyNotVerified] = useState(true);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 1,
  });

  const handleResponse = (res: any) => {
    setSuppliers(res.data.results ? res.data.results : res.data);
    setPaginationData({
      currentPage: res.data.page,
      totalPages: res.data.totalPages,
      totalItems: res.data.totalItems,
    });
  };

  const toggleIsVerified = () => {
    setShowOnlyNotVerified(!showOnlyNotVerified);
    setPageNumber(1);
  };

  const getAllSuppliers = async (data: Partial<ISupplierList>) => {
    const res: any = await supplierService
      .getSupplierList(data)
      .finally(() => setIsLoading(false));
    return res;
  };

  useEffect(() => {
    const data = {
      page: pageNumber,
      ...(textSearched && { name: textSearched }),
      isVerified: !showOnlyNotVerified,
      sortBy: "name:asc",
      limit: -1,
    };

    getAllSuppliers(data)
      .then(handleResponse)
      .catch((error) => {
        if (error?.response?.data?.code === 401) {
          showToastify({ label: "Usuário não autenticado", type: "error" });
        }
      });
  }, [pageNumber, textSearched, showOnlyNotVerified]);

  const handleSupplierIsVerified = (
    supplierId: string,
    isVerified: boolean,
  ) => {
    setSuppliers((prevSuppliers) =>
      prevSuppliers.map((s) =>
        s._id === supplierId ? { ...s, isVerified } : s,
      ),
    );
  };

  const handleApprove = (supplierId?: string) => {
    if (!supplierId) return;

    supplierService
      .verifySupplier(supplierId)
      .then(() => {
        setSuppliers((prevSuppliers) =>
          prevSuppliers.map((s) =>
            s.id === supplierId ? { ...s, isVerified: true } : s,
          ),
        );
        showToastify({
          label: "Parceiro verificado com sucesso!",
          type: "success",
        });

        handleSupplierIsVerified(supplierId, true);
      })
      .catch((error) => {
        if (error?.response?.data?.code === 401) {
          showToastify({ label: "Usuário não autenticado", type: "error" });
        }
      });
  };

  const handleSetSearch = (e: any) => {
    setIsLoading(true);
    setSearch(e.target.value);
    setPageNumber(1);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [partnerToDelete, setPartnerToDelete] = useState<string | null>(null);

  const handleDeletePartner = (id?: string) => {
    if (!id) return;

    setPartnerToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setPartnerToDelete(null);
    setIsLoadingDelete(false);
  };

  const handleDeleteRequest = async () => {
    if (!partnerToDelete) return;

    setIsLoadingDelete(true);

    userService
      .updateUser(partnerToDelete, { active: false })
      .then((res) => {
        if (res) {
          showToastify({
            label: "Parceiro inativado com sucesso!",
            type: "success",
          });
        }
      })
      .catch((error) => {
        if (error?.response?.data?.code === 400) {
          showToastify({
            label: "Oops! Parece que você não tem permissão",
            type: "error",
          });
        }
      })
      .finally(() => handleCloseModal());
  };

  const renderSupplierContent = (supplier: ISupplier) => {
    const {
      _id: id,
      createdAt,
      email,
      isVerified,
      supplierInfo,
      phoneNumber,
      whatsappPhoneNumber,
    } = supplier;

    return (
      <>
        <div className="flex mx-2 gap-5 justify-between w-100">
          <div className="flex flex-col pb-5">
            <p className="font-semibold">email</p>
            <p className="">{email}</p>
            <p className="font-semibold">telefone</p>
            <p className="">{phoneNumber ?? "-"}</p>
            <p className="font-semibold">whatsapp da loja</p>
            <p className="">{whatsappPhoneNumber ?? "-"}</p>
            <p className="font-semibold">conta criada em:</p>
            <p>{getDateFormater(createdAt)}</p>
            <p className="font-semibold">status do parceiro:</p>
            <p>{isVerified ? "Verificado" : "Não verificado"}</p>
          </div>
          <div className="flex flex-col">
            {/* address */}
            <p className="font-semibold">Endereço</p>
            <p>
              {supplierInfo?.address?.street} - {supplierInfo?.address?.number}
            </p>
            <p className="font-semibold">Bairro/Cidade/Estado</p>
            <p>
              {supplierInfo?.address?.neighborhood} -{" "}
              {supplierInfo?.address?.city}/{supplierInfo?.address?.state}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <ButtonThird href="#" onClick={() => handleDeletePartner(id)}>
            Inativar parceiro
          </ButtonThird>
          {!isVerified && (
            <ButtonSecondary
              href="#"
              onClick={() => handleApprove(supplier._id)}
            >
              Aprovar empresa
            </ButtonSecondary>
          )}
        </div>
      </>
    );
  };

  const renderSupplierName = (supplier: ISupplier) => {
    return <p>{supplier.name}</p>;
  };

  if (Array.isArray(suppliers) && suppliers.length === 0 && isLoading) {
    return <LoadingComponent Icon={LogoMain} fullSize={true} />;
  }

  const handlePaginationClick = (pageNumber: number) => {
    setPageNumber(pageNumber);
    setIsLoading(true);
  };

  return (
    <div>
      <div className="relative overflow-hidden flex gap-3 p-5 max-w-screen-2xl mx-auto flex-col sm:flex-row">
        <div className="md:flex flex-col sm:w-[300px] w-full pb-5 mb-3 sm:mb-0 border-b border-gray-100 sm:border-none">
          <div className="flex flex-col w-full gap-5 rounded-lg bg-[#e7eaf133] px-2">
            <div className="flex flex-col w-full h-24 gap-5 relative">
              <div
                className="bg-primary-main rounded-lg"
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "100%",
                  filter: "contrast(0.5) blur(1px)",
                }}
              />
              <div className="absolute left-0 top-0 h-full flex items-center justify-center">
                <div className="flex flex-row justify-center items-center">
                  <div className="flex flex-row w-full h-full gap-1 justify-center items-center ml-2">
                    <div className="rounded-full bg-gray-200">
                      <Image
                        src={LogoImage}
                        alt="logo"
                        className="rounded-full"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="flex flex-col">
                      {session?.user?.name && (
                        <p className="text-lg font-semibold text-white">
                          {session?.user?.name}
                        </p>
                      )}
                      {session?.user?.email && (
                        <p className="text-xs text-white">
                          {session?.user?.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* validate coupon */}
            <div className="">
              <div className="w-full flex flex-col relative mb-2 justify-center gap-2">
                {[
                  {
                    href: "/app/dashboard",
                    label: "Dashboard",
                    icon: DashboardIcon,
                  },
                ].map(({ href, label, icon }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    className={classNames(
                      "w-full py-2 px-3 hover:bg-secondary-main font-semibold text-xs md:text-sm flex flex-row gap-3 text-primary-main rounded-md transition",
                      pathname === href
                        ? "bg-secondary-main"
                        : "bg-transparent",
                    )}
                  >
                    <Image src={icon} width={20} alt="icon" className="flex" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full px-5">
          <h2 className="text-xl font-semibold mb-7">Dashboard</h2>
          <div className="grid lg:grid-cols-4 justify-center gap-10 b9r grid-cols-1 sm:grid-cols-2">
            <div className="md:w-[800px] w-full m-auto p-5 relative">
              <div className="flex justify-end gap-2">
                <p className="font-semibold">Apenas não verificados</p>
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  onChange={() => toggleIsVerified()}
                  checked={showOnlyNotVerified}
                />
              </div>
              <SearchCategory
                onChange={handleSetSearch}
                isLoading={isLoading}
              />
              {Array.isArray(suppliers) && suppliers.length > 0 ? (
                <AccordionInfo
                  data={suppliers.map((supplier) => ({
                    name: renderSupplierName(supplier),
                    content: renderSupplierContent(supplier),
                  }))}
                />
              ) : (
                <em className="text-center">Nenhum parceiro encontrado...</em>
              )}

              <Pagination
                {...paginationData}
                handleOnClick={handlePaginationClick}
              />

              {isDeleteModalOpen && (
                <Modal
                  show
                  onCloseModal={() => {
                    setIsDeleteModalOpen(false);
                  }}
                >
                  <div className="w-full flex flex-col gap-3 px-5">
                    <h2 className="font-bold text-xl w-full text-center pb-1 text-black">
                      Inativar Parceiro
                    </h2>
                    <p>
                      <b>Este processo é irreversível.</b> Depois de inativo, o
                      parceiro não aparece nos resultados de busca e não poderá
                      ter acesso ao app.
                    </p>
                    <p className="mb-5">
                      <b>Todos os códigos de cupom</b> já gerados pelos clientes
                      que ainda não foram ativados{" "}
                      <b>
                        ficarão inabilitados, já que o parceiro não terá mais
                        acesso a sua conta.
                      </b>
                    </p>

                    <div className="flex px-4 flex-col gap-3">
                      <ButtonThird
                        loading={isLoadingDelete}
                        disabled={isLoadingDelete}
                        onClick={() => {
                          handleDeleteRequest();
                        }}
                      >
                        Tenho certeza, excluir parceiro!
                      </ButtonThird>
                      <ButtonThird
                        disabled={isLoadingDelete}
                        onClick={() => handleCloseModal()}
                        className="text-gray-800"
                      >
                        Não quero inativar agora
                      </ButtonThird>
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
