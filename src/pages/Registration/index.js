/* global firebase */

import React, { useState } from 'react';
import '../../index.css'

import firebase from 'firebase/compat/app'; // Importa o módulo 'app' compatível
/* import 'firebase/compat/database'; // Importa o módulo 'database' compatível*/
import Title from '../../components/title';

/* import { initializeApp } from 'firebase/app' */
import { getDatabase, ref, push } from 'firebase/database'
import { getStorage, ref as storageRef, uploadBytes } from 'firebase/storage'


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
        profileImage: null,
        name: '',
        doc: '',
        phone: '',
        birthday: '',
        church: '',
        imageUrl: '',
        firstTime: '',
        transport: '',
        pranks: '',
        remedy: '',
        allergic: '',
        payment: '',
    });

    const handleChange = (e) => {

        if (e.target.name === 'profileImage') {
            const file = e.target.files[0];
            setFormData({ ...formData, profileImage: file, imageUrl: URL.createObjectURL(file) });
        } else {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const storage = getStorage();
        const storageRefe = storageRef(storage, formData.profileImage.name);

        uploadBytes(storageRefe, formData.profileImage)
            .then((snapshot) => {
                console.log('Imagem de perfil enviada com sucesso:', snapshot.ref.fullPath);

                return push(ref(getDatabase(), 'inscricoes'), {
                    ...formData,
                    profileImageUrl: snapshot.ref.fullPath
                });
            })
            .then(() => {
                console.log('Dados Salvos no Firebase');
                setFormData({
                    profileImage: null,
                    name: '',
                    doc: '',
                    phone: '',
                    birthday: '',
                    church: '',
                    imageUrl: '',
                    firstTime: '',
                    transport: '',
                    pranks: '',
                    remedy: '',
                    allergic: '',
                    payment: '',
                })
            }).catch(error => {
                console.error('Erro ao enviar imagem de perfil ou salvar dados no Firebase:', error)
            });

        /* firebase.database().ref('inscricoes').push(formData)
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
            }); */
    };

    return (
        <div className='App'>
            <div className='container'>
                <div>
                    <Title title="Preencha os campos abaixo e se inscreva pro nosso acampa!" />
                </div>

                <form onSubmit={handleSubmit} className='form-container'>
                    <div className='form'>
                        {formData.imageUrl && (
                            <div>
                                <img src={formData.imageUrl} alt="Imagem Perfil" className='imageUrl' />
                            </div>
                        )}
                        <label>
                            Insira sua foto aqui
                        </label>
                        <input
                            type="file"
                            name="profileImage"
                            onChange={handleChange}
                        />
                    </div>

                    <div className='form'>
                        <label>
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Insira seu nome aqui..'
                        />
                    </div>
                    <div className='form'>
                        <label>
                            Data de Nascimento
                        </label>
                        <input
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='form'>
                        <label>
                            Seu Telefone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='form'>
                        <label>
                            RG/CPF
                        </label>
                        <input
                            type="text"
                            name="doc"
                            value={formData.doc}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='form'>
                        <label>
                            De qual igreja você é ?
                        </label>
                        <input
                            type="text"
                            name="church"
                            value={formData.church}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='form'>
                        <label>
                            De qual igreja você é ?
                        </label>
                        <input
                            type="radio"
                            name="firstTime"
                            value={formData.firstTime}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Me inscrever</button>
                </form>
            </div>


        </div>
    );
}

export default RegistrationForm;
