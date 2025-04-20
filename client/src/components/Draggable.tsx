import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import styles from "../styles/Draggable.module.css"

interface DraggableProps {
    id: string;
    class?: string;
    children: React.ReactNode;
  }

export function Draggable(props: DraggableProps) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
    data: {title: props.children}
  });
  const style = {   
    transform: CSS.Translate.toString(transform),
  };
  
  
  return (
    <button ref={setNodeRef} className={`${props.class && styles[props.class]} ${styles.word_button}`} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}