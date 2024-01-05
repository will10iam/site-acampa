import './App.css';
import Title from './components/title';
import Counter from './components/counter';

import BACKG from './assets/bgacampa.png'

import useCountdown from './hooks/useCountdown';


function App() {
  const [day, hour, minute, second] = useCountdown('Feb 10, 2024 08:00:00');


  return (
    <div className="App" style={{ backgroundImage: `url(${BACKG})` }}>
      <div className='container'>
        <Title title='ACAMPA2024 começa em..' />
        <div className='countdown-container'>
          <Counter title='Dias' number={day} />
          <Counter title='Horas' number={hour} />
          <Counter title='Minutos' number={minute} />
          <Counter title='Segundos' number={second} />
        </div>

        <div className='action'>
          <a href='https://forms.gle/qbe9VkYMyZH6QiPs6'><button type='text'>garanta já a sua vaga</button></a>
          <p>clique no botão para fazer a inscrição!</p>
        </div>

      </div>
    </div>
  );
}

export default App;
