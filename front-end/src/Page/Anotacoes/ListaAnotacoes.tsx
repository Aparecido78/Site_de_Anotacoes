import React, { useState, useEffect } from "react"
import axios from "axios"

import { api } from "../../Conponents/Api"
import { toast } from "react-toastify"

import Button from "../../Conponents/Button"
import LoadingCarr from "../../Conponents/Loading"
import Form from "../../Conponents/Form"
import Input from "../../Conponents/Input"

import '../../Conponents/Input.css'
import './ListaAnotacoes.css'



interface PropsLista {
    id: number
    titulo: string
    texto: string
}

interface PropsTexto {
    id: number
    titulo: string
    texto: string
}

function ListaAnotacoes() {

    const [ListaDeAnotacoes, setLista] = useState<PropsLista[]>([])
    const [ListaDeAnotacoesUsuario, setTexto] = useState<PropsTexto | null>(null)
    const [Loading, setLoading] = useState<boolean>(false)
    const [anotacaoAberta, setAnotacaoAberta] = useState<number | null>(null)

    const [AparecerTitulo,setAparecerTitulo] = useState(false)

    const [AbrirModalExcluir,setAbriarModalExcluir] = useState(false)

    async function ListaAnotacao() {
        try {
            setLoading(true)

            const token = localStorage.getItem("token")

            const resp = await axios.get(`${api}ListaAnotacoes`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setLista(resp.data.ListaDeAnotacoes)

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    async function TextoAnotacoes(id: number) {
        try {
            const token = localStorage.getItem("token")

            const resp = await axios.get(`${api}BuscarAnotacoes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setTexto(resp.data)
            setAnotacaoAberta(id)

        } catch (err) {
            console.log(err)
        }
    }

    async function EditarAnotacoes(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!ListaDeAnotacoesUsuario) return

        try {
            const token = localStorage.getItem("token")

            const resp = await axios.put(
                `${api}EditarAnotacoesUsuario/${ListaDeAnotacoesUsuario.id}`,
                ListaDeAnotacoesUsuario,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )

            toast.success(resp.data.msg)
            ListaAnotacao()

        } catch (err) {
            console.log(err)

        }
    }

    useEffect(() => {
        ListaAnotacao()
    }, [])

    function PegarInput(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        if (!ListaDeAnotacoesUsuario) return

        setTexto({
            ...ListaDeAnotacoesUsuario,
            [e.target.name]: e.target.value
        })
    }

    async function FuncaoQueDeletaAnotacoes(id: number) {
        try {
            const token = localStorage.getItem("token");
            const resp = await axios.delete(`${api}ExcluirAnotacao/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success(resp.data.msg || "Excluído com sucesso!");
            setAbriarModalExcluir(false); 
            setTexto(null); 
            setAnotacaoAberta(null);
            ListaAnotacao(); 
        } catch (err) {
            console.log(err);
            toast.error("Erro ao excluir anotação");
        }
    }

    return (
        <div>
            {Loading && <LoadingCarr />}

            {ListaDeAnotacoes.length === 0 && (
                <p>Você não possui anotações</p>
            )}
            <div className="listaDeAnotacoes">
              {!AparecerTitulo && (
                    <h1
                        className="tituloAnotacoes"
                        onClick={() => setAparecerTitulo(true)}
                    >
                        ☰
                    </h1>
                )}
              
            
            <div className={`titulo ${AparecerTitulo ? "mostrarTitulo" : ""}`}>
                <h1>Titulos </h1>

            {ListaDeAnotacoes.map(ano => (
                
                <div  key={ano.id}>
                    <Button
                    className="tituloBtn"
                        type="button"
                        onClick={() => {
                            if (anotacaoAberta === ano.id) {
                                setAnotacaoAberta(null)
                                setTexto(null)
                            } else {
                                TextoAnotacoes(ano.id)
                            }
                            setAparecerTitulo(false)
                        }}
                    >
                        {ano.titulo}
                    </Button>
                </div>
            ))}
            </div>

            <div className="texto">

            {ListaDeAnotacoesUsuario &&
                anotacaoAberta === ListaDeAnotacoesUsuario.id && (
                    <div className="FormEditarAnotacao">
                        <Form onSubmit={EditarAnotacoes}>
                            <div>

                                <Input
                                className="inputTitulo"
                                    type="text"
                                    name="titulo"
                                    placeholder="Digite seu titulo"
                                    value={ListaDeAnotacoesUsuario.titulo}
                                    onChange={PegarInput}
                                />

                            </div>
                            <br />
                            <div className="divTexto">

                                <textarea
                                    name="texto"
                                    placeholder="Digite sua anotação"
                                    value={ListaDeAnotacoesUsuario.texto}
                                    onChange={PegarInput}
                                    className="input_Texto"
                                />

                            </div>
                            <br />
                            <div className="botoes">
                            <Button className="button" type="submit">Salvar Alteração</Button>
                           
                            <Button className="excluir" type="button" onClick={() => setAbriarModalExcluir(true)}>
                                Excluir
                            </Button>
                            </div>

                        </Form>

                       
                                            {AbrirModalExcluir && (
                        <div className="modal-overlay">

                            <div className="modal">

                                <p>
                                    Deseja mesmo excluir anotação =
                                    <strong> {ListaDeAnotacoesUsuario.titulo}</strong> ?
                                    Isso não poderá ser revertido!
                                </p>

                                <div className="modal-botoes">

                                    <Button
                                        type="button"
                                        onClick={() => FuncaoQueDeletaAnotacoes(ListaDeAnotacoesUsuario.id)}
                                    >
                                        Confirmar Exclusão
                                    </Button>

                                    <Button
                                        type="button"
                                        onClick={() => setAbriarModalExcluir(false)}
                                    >
                                        Cancelar
                                    </Button>

                                </div>

                            </div>

                        </div>
                    )}
                       
                    </div>
                     
                )}
        </div>
        </div>
        </div>
       
    )
}

export default ListaAnotacoes