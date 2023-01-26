import React, {useState, FC} from "react";
import classes from './RadioButton.module.scss'
import {ReactComponent as Info} from '../info.svg'
import {ReactComponent as Close} from '../close.svg'

interface RadioButtonProps{
    value: string
    checked: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label: string
    hit ?: boolean
}

const RadioButton: FC<RadioButtonProps> = (props) => {

    const [isMessage, setMessage] = useState(false)
    const [permanentMessage, setPermanentMessage] = useState(true)

    const handleMouse = (act:boolean) => {
        setMessage(act)
    }

    return(
        <div className={classes.radio}>
            <input 
                className={classes.radio_item} 
                type="radio" 
                name="salaryType" 
                value={props.value}
                checked={props.checked}
                onChange={props.onChange}/>
            <label className={classes.radio_text}>{props.label}</label>
            {props.hit &&
                <div 
                    className={classes.radio__hit}                         
                    onClick={() => setPermanentMessage(prev => !prev)}>
                    {
                        permanentMessage ? 
                            <Info 
                                className={classes.radio__hit_img}
                                onMouseOver = {() => handleMouse(true)}
                                onMouseOut = {() => handleMouse(false)} />
                        :   
                            <Close 
                                className={classes.radio__hit_img} />
                    }
                </div>
            }
            { isMessage && props.hit && 

                <div className={classes.radio__blockHit}>
                    <div className={classes.radio__blockHit__item}>
                        <p>МРОТ - минимальный размер оплаты труда. Разный для разных регионов.</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default RadioButton