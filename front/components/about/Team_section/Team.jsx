"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import "./Team.css";
import { useEffect, useState } from "react";
import { getData, getEnData } from "api";

const TeamSection = () => {
  const [team, setTeam] = useState([])

  useEffect(() => {
    getData(`teams`, setTeam);
  }, []);

  return (
    <motion.div
      className="Team-section"
    >
      <div className="Team-box">
        {team.map((member, index) => (
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
                src={'http://drive.google.com/uc?export=view&id=' + member.path}
                alt="member photo"
                width={300}
                height={300}
                className="Member-Icon"
              />
            </div>
            <div className="bot">
              <p className="member-text">{member.name}</p>
              <h2 className="member-title">{member.status}</h2>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TeamSection;
