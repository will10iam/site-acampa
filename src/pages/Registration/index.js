import React, { useState } from 'react';
import '../../index.css'

import firebase from 'firebase/compat/app'; // Importa o módulo 'app' compatível
import 'firebase/compat/database'; // Importa o módulo 'database' compatível
import Title from '../../components/title';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCKBe_ihYqUodo0nKTobRAjAYB8tTc1AzE",
    authDomain: "site-acampa.firebaseapp.com",
    projectId: "site-acampa",
    storageBucket: "site-acampa.appspot.com",
    messagingSenderId: "902054107094",
    appId: "1:902054107094:web:80da466455b7c503f03677",
    measurementId: "G-NY5L59GT5S"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: '',
        doc: '',
        phone: '',
        birthday: '',
        church: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        firebase.database().ref('inscricoes').push(formData)
            .then(() => {
                console.log('Dados salvos no Firebase!');
                setFormData({
                    name: '',
                    doc: '',
                    phone: '',
                    birthday: '',
                    church: '',
                });
            }).catch(error => {
                console.error('Erro ao salvar dados no Firebase', error);
            });
    };

    return (
        <div className='App'>
            <div className='container'>
                <div>
                    <Title title="Preencha os campos abaixo e se inscreva pro nosso acampa!" />
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Nome:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            RG/CPF:
                            <input
                                type="text"
                                name="doc"
                                value={formData.doc}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Telefone:
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Data de Nascimento:
                            <input
                                type="date"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Igreja:
                            <input
                                type="text"
                                name="church"
                                value={formData.church}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button type="submit">Me inscrever</button>
                </form>
            </div>


        </div>
    );
}

export default RegistrationForm;
