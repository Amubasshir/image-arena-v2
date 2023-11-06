import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import '../product.css';

const DragProduct = ({ product }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: product.id,
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={` rounded-[5px] md:rounded-[8px] overflow-hidden border-[2px] border-solid border-[#f1f3f4] hover:overlay-bg cursor-move `}
    >
      <img className="" src={product.src} alt="product image" />
    </div>
  );
};

export default DragProduct;
