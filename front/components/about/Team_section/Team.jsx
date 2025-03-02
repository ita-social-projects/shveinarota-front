"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import "./Team.css";

const TeamSection = () => {
  return (
    <motion.div 
      className="Team-section"
    >
      <div className="Team-box">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="Team-member"
          >
            <div className="top">
              <Image
                src={index === 0 ? "/images/about/Main.png" : "/images/about/user.png"}
                alt="Team Member"
                className="Member-Icon"
                width={100}
                height={100}
                unoptimized
              />
            </div>
            <div className="bot">
              <p className="member-text">Ксенія Самойлович</p>
              <h2 className="member-title">Організатор</h2>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TeamSection;
