import '../../index.css'

import Title from '../../components/title'
import Counter from '../../components/counter';

/* import BACKG from './assets/bgacampa.png'
import BACKG2 from './assets/bgacampamobile.png' */

import useCountdown from '../../hooks/useCountdown'
import Button from '../../components/button';
import { Link } from 'react-router-dom';
import logo from "../../assets/construide_logo.png"



function App() {
  const [day, hour, minute, second] = useCountdown('Mar 01, 2025 00:00:00');


  return (
    <div className="App">
      <div className='container'>


        <div className='logo'>
          <img src={logo} alt="" />
        </div>

        <div>
          <Title title='ACAMPA2025 começa em..' />

        </div>

        <div className='countdown-container'>
          <Counter title='Dias' number={day} />
          <Counter title='Horas' number={hour} />
          <Counter title='Minutos' number={minute} />
          <Counter title='Segundos' number={second} />
        </div>

        <div className='button1'>
          <Link to="/register">
            <Button children="GARANTA JÁ SUA VAGA!" />
          </Link>
        </div>

        {/* <div className='action'>
          <a href='https://forms.gle/qbe9VkYMyZH6QiPs6'><button type='text'>garanta já a sua vaga</button></a>
          <p>clique no botão para fazer a inscrição!</p>
        </div> */}

        {/* <div className='over'>
          <span className='umapena'>
            AS INSCRIÇÕES JÁ SE ENCERRARAM, UMA PENA!
          </span>

          <span className='whats'>Mas se precisar falar com a gente, <a href='https://api.whatsapp.com/send?phone=5519989318887&text=Oi!%20Queria%20conversar%20sobre%20o%20Acampa.'>
            CLIQUE AQUI
          </a>
          </span>
        </div> */}

      </div>
    </div>
  );
}

export default App;
