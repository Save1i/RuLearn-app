import {useDroppable} from '@dnd-kit/core';
import { Draggable } from './Draggable'
import styles from "../styles/Droppable.module.css"

interface DroppableProps {
    items: string[];
    dClick?: (item: string) => void;
  }

export default function Droppable(props: DroppableProps) {
    const { setNodeRef } = useDroppable({
      id: 'cart-droppable',
    });
  
    return (
        <ul ref={setNodeRef} className={styles.droppable}>
          <span></span>
        {props.items.map((item, idx) => (
              <Draggable key={`${item}-${idx}`} dClick={() => props.dClick?.(item)} id={item}>{item}</Draggable>
        ))}
      </ul>
    );
  }
  