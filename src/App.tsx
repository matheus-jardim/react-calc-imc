import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/images/powered.png';
import leftArrowImage from './assets/images/leftarrow.png';
import { GridItem } from './components/GridItem';

import {levels, calculateImc, Level} from './helpers/imc'

const App = () => {
  const[heightField, setHeightField] = useState<number>(0);
  const[weightField, setWeightField] = useState<number>(0);
  const[toShow, setToshow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if(heightField && weightField) {
      setToshow(calculateImc(weightField, heightField));
    } else {
      alert('Digite todos os campos')
    }
  }
  const handleBackButton = () => {
    setToshow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return(
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150}/>
        </div>
      </header>
        <div className={styles.container}>
          <div className={styles.leftSide}>
            <h1>Calcule seu IMC</h1>
            <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial da Saúde para calcular o peso ideal de cada pessoa.</p>
            
            <input 
            type="number"
            placeholder='Digite a sua altura. Ex: 1.80 (em metros)'
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            step="0.01"
            disabled={toShow ? true : false}
            />
            <input 
            type="number"
            placeholder='Digite seu peso. Ex: 83.8 (em kg)'
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            step="0.1"
            disabled={toShow ? true : false}
            />

            <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
          </div>
          <div className={styles.rightSide}>
            {!toShow &&
              <div className={styles.grid}>
                {levels.map((item, key) => (
                  <GridItem key={key} item={item}/>
                ))}
              </div>
            }
            {toShow &&
              <div className={styles.rightBig}>
                <div className={styles.rightArrow} onClick={handleBackButton}>
                  <img src={leftArrowImage} width={25} />
                </div>
                <GridItem item={toShow}/>
              </div>
            }
          </div>
        </div>
    </div>
  )
};

export default App;