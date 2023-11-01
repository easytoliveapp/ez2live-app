"use client"; //TODO: REFACTOR THIS <<<

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import supplierService from "@/service/supplier.service";
import { ISupplierList } from "@/types/supplier";
import { showToastify } from "@/hooks/showToastify";
import {
  AccordionInfo,
  ButtonSecondary,
  LoadingComponent,
  SupplierCard,
  SearchCategory,
} from "@/components";
import SupplierLogo from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import { getDateFormater } from "@/utils/getDateFormater";

interface ISupplier {
  id: string;
  name: string;
  email: string;
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

  const handleResponse = (res: any) =>
    setSuppliers(res.data.results ? res.data.results : res.data);

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
      isVerified: false,
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
  }, [pageNumber, textSearched]);

  const handleApprove = (supplierId: string) => {
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

  const renderSupplierContent = (supplier: ISupplier) => {
    const { createdAt, email, isVerified } = supplier;
    return (
      <>
        <div className="flex flex-col m-1 h-auto">
          <div className="flex flex-col mx-2 gap-5">
            <div className="flex flex-col">
              <p className="font-semibold">email</p>
              <p className="">{email}</p>
              <p className="font-semibold">conta criada em:</p>
              <p>{getDateFormater(createdAt)}</p>
              <p className="font-semibold">verificada:</p>
              <p>{isVerified.toString()}</p>
            </div>
          </div>
        </div>

        <ButtonSecondary href="#" onClick={() => handleApprove(supplier.id)}>
          Aprovar empresa
        </ButtonSecondary>
      </>
    );
  };

  const renderSupplierName = (supplier: ISupplier, idx: number) => {
    console.log(supplier);
    return (
      <SupplierCard
        supplierCategory={"test"}
        supplierImage={SupplierLogo}
        name={supplier.name}
        key={supplier.id + idx}
        id={supplier.id}
        onClick={() => null}
        showArrow={false}
      />
    );
  };

  if (Array.isArray(suppliers) && suppliers.length === 0 && isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="md:w-[500px] w-full m-auto p-5 relative">
      <SearchCategory onChange={handleSetSearch} isLoading={isLoading} />

      {Array.isArray(suppliers) && suppliers.length > 0 ? (
        <AccordionInfo
          data={suppliers.map((supplier, idx) => ({
            name: renderSupplierName(supplier, idx),
            content: renderSupplierContent(supplier),
          }))}
        />
      ) : (
        <em className="text-center">Nenhum parceiro encontrado...</em>
      )}
    </div>
  );
}

export default SupplierPage;
