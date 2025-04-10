import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from 'swiper/modules'
import { useEffect, useState } from 'react'
import { PesquisarImagens } from '../BarraDePesquisa/ProcuraDeDados'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import './BookCarousel.css'

interface Imagem {
  id: string
  image: string
}

const CriarDicionarioImagens = async (): Promise<Imagem[]> => {
  const ListaDeImagens = await PesquisarImagens('Harry Potter')
  const ArrayDeImagem: Imagem[] = []

  if (Array.isArray(ListaDeImagens)) {
    ListaDeImagens.forEach((item: string, index: number) => {
      ArrayDeImagem.push({
        id: (index + 1).toString(),
        image: item || 'URL_DA_IMAGEM_FALLBACK',
      })
    })
  } else {
    console.error('Erro: ListaDeImagens não é um array.', ListaDeImagens)
  }

  return ArrayDeImagem
}

export function BookCarousel() {
  const [images, setImages] = useState<Imagem[]>([])

  useEffect(() => {
    const loadImages = async () => {
      const data = await CriarDicionarioImagens()
      setImages(data)
    }
    loadImages()
  }, [])

  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        slidesPerView={3}
        spaceBetween={20}
        effect="coverflow"
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
      >
        {images.map(item => (
          <SwiperSlide key={item.id}>
            <img src={item.image} alt="Book Cover" className="slide-item" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
