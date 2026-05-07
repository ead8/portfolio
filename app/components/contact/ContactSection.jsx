"use client";

import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const ContactSection = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      id="contact-section"
      className="relative w-full py-24 lg:py-32 border-t border-ghost-16"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-8 meta-mono">
        <span>
          <span className="section-index">[ 99 ]</span>
          <span className="text-ghost ml-2">CONTACT // INITIATE</span>
        </span>
        <span>END OF TRANSMISSION</span>
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="heading-display max-w-[16ch] mb-8"
      >
        Got a project? <span className="text-ember">Open a channel.</span>
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="body-md max-w-[60ch] mb-12"
      >
        Need a full-stack engineer for a sprint? An AI integration to ship a
        new feature? A sounding board on architecture? Most projects start
        with a 30-minute call.
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
        <a
          href="mailto:ebisadugo@gmail.com?subject=Hi%20Ebisa&body=Hi%20Ebisa!%20I'd%20like%20to%20discuss%20a%20project."
          className="btn-outline"
        >
          <span className="btn-outline-label">SEND EMAIL</span>
          <span className="btn-outline-sub">EBISADUGO@GMAIL.COM</span>
        </a>
        <a
          href="https://calendly.com/ebisadugo/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          <span className="btn-outline-label">BOOK CALL</span>
          <span className="btn-outline-sub">30 MIN / CALENDLY</span>
        </a>
      </motion.div>
    </motion.section>
  );
};

export default ContactSection;
