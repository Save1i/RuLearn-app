import { useState } from 'react'
import { DndContext, DragEndEvent, TouchSensor, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import Droppable from '../components/Droppable'
import { Draggable } from '../components/Draggable'
import styles from "../styles/dnd.module.css"

interface Data {
    options: string[];
    el: string;
    setAnswer: (value: string) => void;
  }

const DndTest = ({options, el, setAnswer}: Data) => {

  const isTouchDevice = typeof window !== 'undefined' &&
  (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));

  const sensors = useSensors(
    useSensor(isTouchDevice ? TouchSensor : PointerSensor)
  );

      const [fruits, setFruits] = useState<string[]>(options);
      const [cartItems, setCartItems] = useState<string[]>([]);

      const result = (selectedOption: string[], correctAnswer: string) => {
        if (!setAnswer) return;
        if (selectedOption.join(" ") === correctAnswer) {
          setAnswer("Правильно!");
        } else {
          setAnswer("Ошибка");
        }
      };

      const dragOnClick = (item: string) => {
        console.log("burger")
          setCartItems(prev =>  [...new Set([...prev, item])]);
          setFruits(prev => prev.filter(fruit => fruit !== item));
      }

      const handleReturnToFruits = (item: string) => {
        console.log("chips")
          setFruits(prev => [...new Set([...prev, item])]); // вернуть в список
          setCartItems(prev => prev.filter(cartItem => cartItem !== item)); // удалить из корзины
      };


      const addItemsToCart = (e: DragEndEvent) => {
        const newItem = e.active?.data?.current?.title;
        if (!newItem) return;
    
        if (e.over?.id === 'cart-droppable') {
          setCartItems(prev =>  [...new Set([...prev, newItem])]);
          setFruits(prev => prev.filter(fruit => fruit !== newItem));
        } else {
          setCartItems(prev => prev.filter(item => item !== newItem));
          setFruits(prev =>  [...new Set([...prev, newItem])]);
        }
      };
    
      console.log(cartItems)
  return (
    <>
    <DndContext onDragEnd={addItemsToCart} sensors={sensors}>
    <main className={styles.main}>
    <div className={styles["cart_section"]}>
        <Droppable items={cartItems} dClick={handleReturnToFruits}/>
      </div>
      <div className={styles["fruit_list_section"]}>
        <ul className={styles["fruit_list"]} id='fruit-cart'>
{options.map((fruit, index) => (
  <li key={fruit} className={styles["fruit_container"]} >
    {(fruits.includes(fruit) && (
      <Draggable class={`el${index}`} isTouchDevice={isTouchDevice} dClick={() => dragOnClick(fruit)} key={fruit} id={fruit}>
        {fruit}
      </Draggable>
    )) || 
    <button className={styles.fake_button} style={{opacity: 0}}>{fruit}</button>}
  </li>
))}
</ul>

      </div>
    </main>
  </DndContext>
  <button className={styles.send__button}  onClick={() => result(cartItems, el)}>Отправить</button>
  </>
        )
}

export default DndTest
