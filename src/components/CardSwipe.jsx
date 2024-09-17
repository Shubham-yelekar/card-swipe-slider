import React from 'react'
import { useState  } from 'react'
import {motion, useMotionValue, useTransform } from 'framer-motion'

const CardSwipe = () => {

  const [cards, setCards] = useState(cardData)
  return (
    <div className='min-h-screen  grid place-items-center '>
      {cardData.map(card => {
        return <Card key={card.id}
        cards = {cards}
        setCards = {setCards}
        {...card}></Card>
      })}
    </div>
  )
}

const Card = ({id, url, name, cards, setCards}) => {

  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0 , 150], [0, 1, 0]);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

  const isFront = id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;

    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 50) {
      setCards((pv) => pv.filter((v) => v.id !== id));

    }
  };

  return <motion.div
  style={{
    gridRow:1,
    gridColumn: 1,
    x,
    opacity,
    rotate,
    transition: "0.125s transform",
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : undefined,
  }}
  animate={{
    scale: isFront ? 1 : 0.98,
  }}
  className='card-wrapper hover:cursor-grab active:cursor-grabbing p-4 bg-slate-50'
  drag={isFront ? "x" : true}

  dragConstraints={
    {
      left:0,
      right: 0,
      top:0,
      bottom: 0,
    }
  }
  onDragEnd={handleDragEnd}
  >
    <img src={url} alt='placeholder' />
    <h1 className='text-slate-950'>{name}</h1>
  </motion.div>
}

export default CardSwipe

const cardData = [
  {
    id: 1,
    name: "Robert",
    url: "/public/cat-1.jpg"
  },
  {
    id: 2,
    name: "Tail Blazer aka TB",
    url: "/public/cat-2.jpg"
  },
  {
    id: 3,
    name: "Megatron",
    url: "/public/cat-3.jpg"
  },
  {
    id: 4,
    name: "kiki",
    url: "/public/cat-4.jpg"
  }
]