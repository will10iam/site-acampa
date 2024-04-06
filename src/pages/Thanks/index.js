import React from 'react'
import '../../index.css'
import logo from "../../assets/construide_logo.png"
import Title from '../../components/title'
import Button from '../../components/button'

export default function Thanks() {
    return (
        <div className="App">

            <div className="container">

                <div className='logo'>
                    <img src={logo} alt="" />
                </div>

                <div className="obrigado">
                    <Title title="OBRIGADO POR SE INSCREVER PARA O ACAMPA2025!" />
                    <p className='touch'>Logo entraremos em contato com você.</p>
                </div>

                <div className="button2">
                    <a href='/' className='home'><Button children="QUANTO TEMPO FALTA PARA O ACAMPA?" /></a>
                </div>


            </div>

        </div>
    )
}
