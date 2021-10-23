import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { ProductDataType } from '../../interfaces/ProductPage/ProductPageInterfaces'
import { Portal } from 'ui/productPage/components/Portal/Portal'
import emptyImage from 'assets/images/empty_image.png'
import { SeePriceModal } from '../SeePriceModal/SeePriceModal'
import { clearCurrentPrice, fetchCurrentPrice } from '../../store/action'
import { useProductPageWithData } from '../../hooks/useProductPageWithData'
import { modificatedCurrentPrice } from 'api/api'

import styles from './ProductPageWithData.module.scss'

type Props = {
  productData: ProductDataType
}

export const ProductPageWithData: React.VFC<Props> = ({ productData }) => {
  const dispatch = useDispatch()
  const { currentPrice } = useProductPageWithData()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [showSeePriceModal, setShowSeePriceModal] = useState<boolean>(false)
  const [seePricePeriod, setSeePricePeriod] = useState<boolean>(false)
  const [timerSeconds, setTimerSeconds] = useState<string>('')
  const [loader, setLoader] = useState<boolean>(false)

  useEffect(() => {
    if (currentPrice !== '') {
      setLoader(false)
      showCurrentPrice()
    }
  }, [currentPrice])

  console.log(loader)

  const closeSeePriceModal = () => {
    setShowSeePriceModal(false)
  }

  const openSeePriceModal = () => {
    setShowSeePriceModal(true)
  }

  const photoHandler = () => {
    setOpenModal(true)
  }
  const closeModal = () => {
    setOpenModal(false)
  }

  const timer = (t: number) => {
    setTimerSeconds(String(t))
    let seconds = t
    const interval = setInterval(() => {
      if (seconds <= 0) {
        setTimerSeconds('')
        clearInterval(interval)
      } else {
        setTimerSeconds(`${Math.trunc(seconds - 1)}`)
      }
      --seconds
    }, 1000)
  }

  const openCurrentPrice = () => {
    dispatch(fetchCurrentPrice(productData.auctionId))
    setLoader(true)
  }

  const showCurrentPrice = () => {
    timer(Number(productData.stepTime))
    setSeePricePeriod(true)
    setTimeout(() => {
      setSeePricePeriod(false)
      modificatedCurrentPrice(productData.auctionId, productData.priceStep)
      dispatch(clearCurrentPrice())
    }, (Number(productData.stepTime)) * 1000)
  }

  return (
    <div className={styles.container}>
      <div className={styles.photoBlock}>
        {openModal && <div className={styles.portal}>
          <Portal openModal={openModal}
                  closeModal={closeModal}
                  photo={productData.photoUrlsData[0]}/>
        </div>}
        {productData.photoUrlsData[0] ?
          <img onClick={() => photoHandler()} src={productData.photoUrlsData[0]} alt={productData.productName}/>
          :
          <img src={emptyImage} alt={'emptyImage'}/>
        }
      </div>
      <div className={styles.contentBlock}>
        <div className={styles.productTitle}>
          {productData.productName}
        </div>
        <div className='mt-3 mb-3'>
          <div className={styles.stringContainer}>
            <div className={styles.stringContainer__name}>Категория</div>
            <div className={styles.stringContainer__content}>{productData.category}</div>
          </div>
          <div className={styles.stringContainer}>
            <div className={styles.stringContainer__name}>Автор</div>
            <div className={styles.stringContainer__content}>{productData.userEmail}</div>
          </div>
        </div>
        <div className={styles.stringContainer}>
          <div className={styles.stringContainer__name}>Стоимость просмотра цены</div>
          <div className={styles.stringContainer__content}>{productData.seePrice} $</div>
        </div>
        <div className={styles.stringContainer}>
          <div className={styles.stringContainer__name}>Стартовая цена</div>
          <div className={styles.stringContainer__content}>{productData.startPrice} $</div>
        </div>
        <div className={styles.stringContainer}>
          <div className={styles.stringContainer__name}>Шаг цены</div>
          <div className={styles.stringContainer__content}>{productData.priceStep} $</div>
        </div>
        <div className={styles.stringContainer}>
          <div className={styles.stringContainer__name}>Шаг времени</div>
          <div className={styles.stringContainer__content}>{productData.stepTime} сек</div>
        </div>
        <div className={styles.buttonPriceBlock}>
          <div className={styles.currentPriceBlock}>
            <div className={styles.currentPriceBlock__title}>
              <div className='mt-1'>Текущая цена</div>
            </div>
            <div className={styles.currentPriceBlock__price}>
              {seePricePeriod ?
                <div className='mt-1'>{currentPrice}</div>
                :
                <>
                  {loader ?
                    <div className='pt-2'><Spinner animation="grow" variant="secondary" size="sm"/></div>
                    :
                    <div className='mt-1'>хххх</div>
                  }
                </>
              }
            </div>
            <div className={styles.currentPriceBlock__timeStep}>
              {seePricePeriod ?
                <div className='mt-1'>{timerSeconds} сек</div>
                :
                <>
                  {loader ?
                    <div className='pt-2'><Spinner animation="grow" variant="secondary" size="sm"/></div>
                    :
                    <div className='mt-1'>{productData.stepTime} сек</div>
                  }
                </>
              }
            </div>
          </div>
          <div onClick={openSeePriceModal} className={styles.buttonBlock}>
            Посмотреть цену
          </div>
        </div>
        <div className={styles.descriptionBlock}>
          <div className={styles.descriptionBlock__title}>Описание:</div>
          <div className={styles.descriptionBlock__content}>{productData.description}</div>
        </div>
      </div>
      {showSeePriceModal && <SeePriceModal
          showSeePriceModal={showSeePriceModal}
          closeSeePriceModal={closeSeePriceModal}
          openCurrentPrice={openCurrentPrice}/>}
    </div>
  )
}