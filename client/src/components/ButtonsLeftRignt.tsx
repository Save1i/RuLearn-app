import { PiArrowBendUpLeft } from "react-icons/pi";
import { PiArrowBendUpRight } from "react-icons/pi";
import "../styles/buttonsLeftRight.css"

type GenericFn = (input: number) => void;

interface isProps {
    func: GenericFn;
}

const ButtonsLeftRignt = ({func}: isProps) => {
  return (
    <div className='buttons'>
      <button className='swipe__btn left__btn' onClick={() => func(-1)}>
        <PiArrowBendUpLeft className='button__icon'/>
        <p className='button__text'>Знаю</p>
      </button>
      <button className='swipe__btn rignt__btn' onClick={() => func(1)}>
        <PiArrowBendUpRight className='button__icon'/>
        <p className='button__text'>Учить</p>
        <div className='effect'></div>
      </button>
    </div>
  )
}

export default ButtonsLeftRignt
