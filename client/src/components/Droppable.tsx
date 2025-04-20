import {useDroppable} from '@dnd-kit/core';
import { Draggable } from './Draggable'
import styles from "../styles/Droppable.module.css"

interface DroppableProps {
    items: string[];
  }

export default function Droppable(props: DroppableProps) {
    const { setNodeRef } = useDroppable({
      id: 'cart-droppable',
    });
  console.log(props)
  
    return (
        <ul ref={setNodeRef} className={styles.droppable}>
          <span></span>
        {props.items.map((item, idx) => (
              <Draggable key={`${item}-${idx}`} id={item}>{item}</Draggable>
        ))}
      </ul>
    );
  }
  