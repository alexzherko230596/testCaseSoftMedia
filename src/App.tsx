import React, {useState, FC, useEffect} from 'react';
import './App.scss';
import RadioButton from './RadioButton/RadioButton';
import Switch from "react-switch";

const App: FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [firstSalary, setFirstSalary] = useState(0)
  const [secondSalary, setSecondSalary] = useState(0)
  const [thirdSalary, setThirdSalary] = useState(0)
  const [isToggle, setToggle] = useState(true)
  const [activeRadioButton, setRadioButton] = React.useState('radio1')

  const isRadioSelected = (value: string) : boolean => activeRadioButton === value
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void => setRadioButton(e.currentTarget.value)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length < 9){
      setInputValue(e.target.value)
    }
  }

  useEffect(()=> {
    const value = +inputValue
    if(isToggle){
      setFirstSalary(value)
      setSecondSalary(Math.round(value * 0.13))
      setThirdSalary(Math.round(value * 1.13))
    }
    else{
      setFirstSalary(Math.round(value * 0.82))
      setSecondSalary(Math.round(value * 0.12))
      setThirdSalary(value)
    }
  },[inputValue, isToggle])
  return (
    <div className="app">
      <div className="app__wrapper">
        <div className="app__wrapper__content">
          <div className="app__wrapper__content__form">
            <p className="app__wrapper__content__form_amount">Amount</p>
            <div className="app__wrapper__content__form__radioList">
              <RadioButton 
                value="radio1"
                checked={isRadioSelected('radio1')}
                onChange={handleRadioClick}
                label = {'For one month'}/>

              <RadioButton 
                value="radio2"
                checked={isRadioSelected('radio2')}
                onChange={handleRadioClick}
                label = {'Mrot'} 
                hit/>

              <RadioButton 
                value="radio3"
                checked={isRadioSelected('radio3')}
                onChange={handleRadioClick}
                label = {'Per day'}/>
                
              <RadioButton 
                value="radio4"
                checked={isRadioSelected('radio4')}
                onChange={handleRadioClick}
                label = {'Per hour'}/>
            </div>
          </div>
          { activeRadioButton !=='radio2' &&
            <div className="app__wrapper__content__optional">
              <div className="app__wrapper__content__optional__toggle">
                <p className={isToggle ? "app__wrapper__content__optional__toggle_leftText" : "app__wrapper__content__optional__toggle_leftText_active"}>Указать с НДФЛ</p>
                <Switch 
                  onChange={() => setToggle(prev => !prev)} 
                  checked={isToggle} 
                  offColor='#E9E8E6'
                  onColor='#F7A03A'
                  uncheckedIcon={false}
                  checkedIcon={false}
                  className="app__wrapper__content__optional__toggle_switcher"/>
                <p className= {isToggle ? "app__wrapper__content__optional__toggle_rightText_active" : "app__wrapper__content__optional__toggle_rightText"}>БЕЗ НДФЛ</p>
              </div>
              <div className="app__wrapper__input">
                <input 
                  type={'number'} 
                  value={inputValue} 
                  onChange = {e => handleInput(e)} 
                  className="app__wrapper__content__input_item"
                  placeholder = 'Enter your salary'/>
                <p className="app__wrapper__content__input_text">₽</p>
              </div>  
              {
                activeRadioButton ==='radio1' && inputValue &&
                <div className="app__wrapper__content__optional__calculate">
                  <div className="app__wrapper__content__optional__calculate__field">
                    <p>{firstSalary}</p>
                    <p className="app__wrapper__content__optional__calculate__field_text"><span>₽</span>Сотрудник будет получать на руки</p>
                  </div>
                  <div className="app__wrapper__content__optional__calculate__field">
                    <p>{secondSalary}</p>
                    <p className="app__wrapper__content__optional__calculate__field_text"><span>₽</span>НДФЛ 13% от оклада</p>
                  </div>
                  <div className="app__wrapper__content__optional__calculate__field">
                    <p>{thirdSalary}</p>
                    <p className="app__wrapper__content__optional__calculate__field_text"><span>₽</span>за сотрудника в месяц</p>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App
