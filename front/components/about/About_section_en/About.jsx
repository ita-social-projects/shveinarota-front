"use client";

import "./About.css";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutTextSection = () => {
  return (
    <div className="About_text_box">
      <motion.div
        className="About_text_left"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Our history
        </motion.h1>
        <div className="About_Left_column"></div>
        <motion.p
          className="about-text"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          We are Maryna Palchenko and Kseniia Samoilych, co-founders of "Shveina Rota" — a volunteer sewing initiative that has produced over 100,000 pieces of adaptive clothing for wounded defenders across 90+ hospitals in Ukraine, uniting more than 700 volunteers from all over the world.
          <br /><br />
          On February 28, 2022, we brought our own sewing machines and overlockers into a regular office of a Dnipro-based IT company and launched <span className="highlight">“Shveina Rota”</span> to make balaclavas and thermal underwear, which we distributed to defenders free of charge. Our record — 498 balaclavas in one day!
          <br /><br />
          In May, we received a request from a hospital for <span className="highlight">“cyber clothing”</span> — special adaptive wear with Velcro or snap fasteners that can be put on quickly, without causing pain or requiring a wounded soldier to lift their arms or legs.
          <br /><br />
          Over time, an amazing team of highly skilled and passionate craftswomen and tailors from across Ukraine gathered around "Shveina Rota."
          <br /><br />
          Our volunteers created detailed step-by-step video master classes on sewing all products and digitized patterns so that even beginners can join the initiative from any city. These resources are published in our <Link className="about-link" style={{ color: "#4682B4" }} href={"/guides"}>“Training Center”</Link>.
        </motion.p>
      </motion.div>

      <motion.div
        className="About_text_right"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="About_text_right_top">
          <Link href="/guides" className="shveya_about-button">
            <Image
              src="/images/about/icons/shveya.png"
              width={85}
              height={85}
              alt="Home"
              className="shveya_button_about"
            />
            <span className="shveya_button_about_text">Learning</span>
          </Link>

          <Link href="/questions" className="hospital_about-button">
            <Image
              src="/images/about/icons/light-bulb.png"
              width={75}
              height={75}
              alt="Guides"
              className="hospital_button_about"
            />
            <span className="shveya_button_about_text">Questions</span>
          </Link>
        </div>

        <motion.div
          className="About_text_right_bot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="About_right_column"></div>
          <h1>Interesting</h1>
        </motion.div>
      </motion.div>
    </div>

  );
};

export default AboutTextSection;
