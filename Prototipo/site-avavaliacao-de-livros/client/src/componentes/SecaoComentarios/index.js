import "./SecaoComentario.css";
import React, { useState } from "react";

const SecaoComentarios = ({ LivroId }) => {
    // Correção na desestruturação do useState
    const [comentario, setComentario] = useState('');

    const handleInputChange = (event) => {
        setComentario(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Enviando comentário:', { LivroId, comentario });
        
        try {
            const response = await fetch('/api/comentarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    LivroId,
                    comentario
                }),
            });
    
            if (response.ok) {
                console.log('Comentário enviado com sucesso!');
                setComentario('');
            } else {
                console.error('Erro ao enviar o comentário', response.status);
            }
    
        } catch (error) {
            console.error('Erro ao enviar o comentário', error);
        }
    };
    

    return (
        <section className="container-comentario">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="comentarios"
                    value={comentario}
                    onChange={handleInputChange}
                    placeholder="Digite seu comentário..."
                    required
                />
                <button className="btn-submit" type="submit">Comentar</button>
            </form>
        </section>
    );
};

export default SecaoComentarios;
