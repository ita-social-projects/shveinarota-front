"use client";

import { motion } from "framer-motion"
import '$style/infoPage/Popup.css'
import InfoBlock from '$component/info/InfoBlock/InfoBlock';
import CardBlock from '$component/info/CardBlock/CardBlock';
import ConBlock from '$component/info/ConBlock/ConBlock';
import OrderBlock from '$component/info/OrderBlock/OrderBlock';
import PartnersBlock from '$component/info/PartnersBlock/PartnersBlock';
import dynamic from "next/dynamic";
const MapBlock = dynamic(() => import('$component/info/MapBlock/MapBlock'), { ssr: false });

export default function InfoPage() {

  const anitmationLeft = {
    hidden: {
      x: -40,
      opacity: 0,
    },
    visible: custom => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.2 },
    }),
  }
  const anitmationRight = {
    hidden: {
      x: 40,
      opacity: 0,
    },
    visible: custom => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.2 },
    }),
  }

  return (
    <main className='main'>
      <InfoBlock />
      <OrderBlock />
      <CardBlock />
      <ConBlock />
      <PartnersBlock />
      <div className="infobox">
        <div className="_background"></div>
        <div className="infobox__container1">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
            custom={1}
            variants={anitmationRight}
            className='_main-title'>
            Масштаб діяльності
          </motion.h1>
          <h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2, once: true }}
              custom={2}
              variants={anitmationLeft}
            >
              Ми діємо як в <span className='_italic'>Україні</span>, так і за кордоном, постачаючи адаптивний одяг у
              реабілітаційні центри <span className='_italic'>Швеції, Данії, Польщі, Німеччини</span> тощо.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2, once: true }}
              custom={2}
              variants={anitmationRight}
              className='_right'
            >
              Залучаємо українців за кордоном до волонтерської діяльності, що
              допомагає підтримувати зв’язок із  <span className='_italic'>батьківщиною</span>.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2, once: true }}
              custom={2}
              variants={anitmationLeft}
            >
              Першими створили <span className='_italic'>унікальні моделі:</span> адаптивні худі, жіночу адаптивну
              білизну та інший одяг, який враховує потреби поранених.
            </motion.p>
          </h2>
        </div>
      </div>
      <MapBlock />
    </main>
  );
}