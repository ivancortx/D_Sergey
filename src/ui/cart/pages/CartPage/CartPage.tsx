import React, { useState } from 'react'

import styles from './CartPage.module.scss'
import { useCartPage } from '@/ui/cart/hooks/useCartPage'
import { CartItem } from '@/ui/cart/components/CartItem/CartItem'
import { DeliveryModal } from '@/ui/cart/components/DeliveryModal/DeliveryModal'
import { AuctionDataType } from '@/ui/auctions'

export const CartPage:React.VFC = () => {
  const { auctionsData } = useCartPage()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [productData, setProductData] = useState<AuctionDataType>()
  const closeModal = () => setShowModal(false)
  const openModal = (item: AuctionDataType) => {
    setShowModal(true)
    setProductData(item)
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Корзина</div>
      <div>
        {auctionsData?.map(item => (
          <CartItem item={item} openModal={openModal}/>
        ))}
      </div>
      {showModal && productData &&
        <div>
          <DeliveryModal closeModal={closeModal} showModal={showModal} productData={productData}/>
        </div>
      }
    </div>
  )
}