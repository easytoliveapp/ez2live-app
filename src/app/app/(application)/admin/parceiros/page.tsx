"use client"; //TODO: REFACTOR THIS <<<

import { useState, useEffect } from "react";
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
  isVerified: boolean;
  createdAt: string;
  supplierInfo: any;
}

function SupplierPage() {
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
    } = supplier;

    return (
      <>
        <div className="flex mx-2 gap-5 justify-between w-100">
          <div className="flex flex-col pb-5">
            <p className="font-semibold">email</p>
            <p className="">{email}</p>
            <p className="font-semibold">telefone</p>
            <p className="">{phoneNumber ?? "-"}</p>
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
      <SearchCategory onChange={handleSetSearch} isLoading={isLoading} />
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

      <Pagination {...paginationData} handleOnClick={handlePaginationClick} />

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
              <b>Este processo é irreversível.</b> Depois de inativo, o parceiro
              não aparece nos resultados de busca e não poderá ter acesso ao
              app.
            </p>
            <p className="mb-5">
              <b>Todos os códigos de cupom</b> já gerados pelos clientes que
              ainda não foram ativados{" "}
              <b>
                ficarão inabilitados, já que o parceiro não terá mais acesso a
                sua conta.
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
  );
}

export default SupplierPage;
