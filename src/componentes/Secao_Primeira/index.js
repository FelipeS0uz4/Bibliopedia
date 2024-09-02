import "./SecaoPrimeira.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { PesquisarImagens } from "../BarraDePesquisa/ProcuraDeDados";


const CriarDicionarioImagens = () =>{
    let ListaDeImagens = []
    const ArrayDeImagem = [];

    ListaDeImagens.map((x) => x)
    ListaDeImagens.forEach((item, index) => {
        ArrayDeImagem.push({
            id: (index + 1).toString(),
            image: item
        });
    });
    return ArrayDeImagem;
}


const SecaodeReal = () => {
    return(
        <section className="container-imagem-livros">
            <Swiper
            slidesPerView={1}
            pagination={{clickable:true}}
            navigation
            >
                {CriarDicionarioImagens().map((item) => (
                <SwiperSlide key={item.id}>
                    <img 
                    src={item.image}
                    alt="Slider"
                    className="slide-item"
                    />
                </SwiperSlide>
            ))};
            </Swiper>
        </section>
    )


}

export default SecaodeReal;