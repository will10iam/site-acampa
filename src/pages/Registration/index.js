

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css'
import { FiUpload } from 'react-icons/fi'


import firebase from 'firebase/compat/app'; // Importa o módulo 'app' compatível
/* import 'firebase/compat/database'; // Importa o módulo 'database' compatível*/
import Title from '../../components/title';
import logo from "../../assets/construide_logo.png"
import avatar from '../../assets/avatar.png'

/* import { initializeApp } from 'firebase/app' */
import { getDatabase, ref, push } from 'firebase/database'
import { getStorage, ref as storageRef, uploadBytes } from 'firebase/storage'
import Button from '../../components/button';


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

    const navigate = useNavigate();

    const handleChange = (e) => {

        if (e.target.name === 'profileImage') {
            const file = e.target.files[0];
            setFormData({ ...formData, profileImage: file, imageUrl: URL.createObjectURL(file) });
        } else {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        }

    };

    const handleRadioChange = (name, value) => {
        setFormData({ ...formData, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const storage = getStorage();
        const storageRefe = storageRef(storage, formData.profileImage.name);


        if (formData.name !== '' && formData.phone !== '' && formData.doc !== '' && formData.payment !== '') {

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
                    navigate("/thanks")
                }).catch(error => {
                    console.error('Erro ao enviar imagem de perfil ou salvar dados no Firebase:', error)
                });

        }


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

                <div className='logo'>
                    <img src={logo} alt="" />
                </div>

                <div className='title'>
                    <Title title="Preencha os campos abaixo e se inscreva pro nosso acampa!" />
                </div>

                <form onSubmit={handleSubmit} className='form-container'>

                    <div className='azul-claro'>

                        <div className='verde-claro'>

                            <label>
                                <span>
                                    <FiUpload color="#FFF" size={25} />

                                </span>
                                <input
                                    type="file"
                                    name="profileImage"
                                    onChange={handleChange}
                                />
                                {formData.imageUrl ? (
                                    <img src={formData.imageUrl} alt="Imagem Perfil" className='image' />
                                ) : (
                                    <img src={avatar} alt='Imagem Perfil' className='image' />
                                )}
                                <p>Clique pra inserir sua foto</p>
                            </label>

                        </div>

                        <div className="user-data">
                            <div className="rosa">
                                <div className='name'>
                                    <label>
                                        Nome Completo
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='date'>
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
                            </div>

                            <div className="amarelo">
                                <div className='tel'>
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

                                <div className='doc'>
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

                            </div>


                            <div className="azul-escuro">
                                <div className='church'>
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
                            </div>

                        </div>

                    </div>

                    <div className='laranja'>
                        <div className='roxo'>
                            <p>É a primeira vez que acampa com a gente?</p>
                            <div className='form-input'>
                                <label>
                                    <input
                                        type="radio"
                                        name="firstTime"
                                        value={formData.firstTime}
                                        checked={formData.firstTime === "Sim"}
                                        onChange={() => handleRadioChange("firstTime", "Sim")}

                                    /> Sim
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="firstTime"
                                        value={formData.firstTime}
                                        checked={formData.firstTime === "Não"}
                                        onChange={() => handleRadioChange("firstTime", "Não")}
                                    />
                                    Não
                                </label>
                            </div>
                        </div>



                        <div className='verde-agua'>
                            <p>Você precisará de transporte para a chacará?</p>
                            <div className='form-input'>
                                <label >
                                    <input
                                        type="radio"
                                        name="transport"
                                        value={formData.transport}
                                        checked={formData.transport === "Sim"}
                                        onChange={() => handleRadioChange("transport", "Sim")}

                                    /> Sim
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="transport"
                                        value={formData.transport}
                                        checked={formData.transport === "Não"}
                                        onChange={() => handleRadioChange("transport", "Não")}
                                    />
                                    Não
                                </label>
                            </div>
                        </div>




                        <div className='vermelho'>
                            <p>Você topa participar de todas as brincadeiras?</p>
                            <div className="form-input">
                                <label >
                                    <input
                                        type="radio"
                                        name="pranks"
                                        value={formData.pranks}
                                        checked={formData.pranks === "Sim"}
                                        onChange={() => handleRadioChange("pranks", "Sim")}

                                    /> Sim
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="pranks"
                                        value={formData.pranks}
                                        checked={formData.pranks === "Não"}
                                        onChange={() => handleRadioChange("pranks", "Não")}
                                    />
                                    Não
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="pranks"
                                        value={formData.pranks}
                                        checked={formData.pranks === "Depende"}
                                        onChange={() => handleRadioChange("pranks", "Depende")}
                                    />
                                    Depende
                                </label>
                            </div>
                        </div>


                    </div>





                    <div className='pink'>
                        <label>
                            Você toma algum remédio diariamente?  Se sim, qual remédio?
                        </label>
                        <input
                            type="text"
                            name="remedy"
                            value={formData.remedy}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='azul-marinho'>
                        <label>
                            É alérgico a algum alimento? Se sim, quais alimentos?
                        </label>
                        <input
                            type="text"
                            name="allergic"
                            value={formData.allergic}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='white'>
                        <p>ATENÇÃO! Menores de 18 anos, clique no botão para baixar a ficha de autorização!</p>
                        <a href="AUTACAMP" download="AUTACAMP"><button type='button'>Baixar Ficha</button></a>
                    </div>

                    <div className='green'>
                        <div className='payment'>
                            <label>
                                Como você fará o pagamento?
                            </label>

                            <select
                                name="payment"
                                value={formData.payment}
                                onChange={handleChange}
                                required
                            >
                                <option value="À vista">À vista</option>
                                <option value="2x">2x R$125,00</option>
                                <option value="3x">3x R$83,33</option>
                                <option value="4x">4x R$62,50</option>
                                <option value="5x">5x R$50,00</option>
                                <option value="6x">6x R$41,66</option>
                                <option value="7x">7x R$35,71</option>
                                <option value="8x">8x R$31,25</option>
                                <option value="9x">9x R$27,77</option>
                                <option value="10x">10x de R$25,00</option>
                            </select>

                            <p> **preços para apenas 1 pessoa, para promoções e descontos procure a liderança!</p>

                        </div>

                        <div className="whats">
                            <p>Se precisar de ajuda para pagar, fale com a gente!</p>
                            <a href='https://api.whatsapp.com/send?phone=5519989318887&text=Olá!%20Queria%20conversar%20sobre%20o%20Acampa20255.'
                                target='_blank' rel='noreferrer'>Nosso Whatsapp</a>
                        </div>


                    </div>
                    {/* <button type="submit">Me inscrever</button> */}
                    <div className="button2">
                        <Button children="Garantir AGORA minha vaga!" type="submit" />
                    </div>

                </form>
            </div >


        </div >
    );
}

export default RegistrationForm;
