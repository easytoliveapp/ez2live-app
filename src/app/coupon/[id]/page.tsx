import { ButtonPrimary } from '@/components';
import ButtonThird from '@/components/atoms/Button/ButtonThird';
import ModalEdit from '@/components/mols/Modal/ModalEdit';
import couponsService from '@/service/coupons.service';
import React , {useState , useEffect} from 'react';

interface CouponProps {
  params: {
    couponld: IGetCouponById
  };
};

const CouponPage = ({params}: IGetCouponById)=> {
  const [showModal, setShowModal] = useState(false);

  const getCoupon = couponsService.getCouponById(params.couponld)

  useEffect(()=> {
    getCoupon
  },[])

  return (
    <ModalEdit onCloseModalEdit={()=> setShowModal(false)} show={showModal}>
      <div>
        <ButtonPrimary>Eu quero!</ButtonPrimary>
        <ButtonThird>não quero mais</ButtonThird>
      </div>
    </ModalEdit>
  )
}

export default CouponPage;
