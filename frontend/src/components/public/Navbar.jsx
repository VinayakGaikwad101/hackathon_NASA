import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "HeatMap", href: "/about" },
    { title: "Login", href: "/login" },
    { title: "Sign Up", href: "/signup" },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <motion.nav
      className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 relative z-50"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ x, y, rotateX, rotateY, perspective: 1000 }}
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            dragElastic={0.1}
          >
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.5, 1],
              }}
              className="bg-white rounded-full p-2 mr-3"
            >
              <Globe className="h-6 w-6 text-blue-600" />
            </motion.div>
            <motion.span
              className="text-white font-bold text-2xl md:text-3xl tracking-wider"
              animate={{
                textShadow: [
                  "0 0 5px #ffffff",
                  "0 0 20px #ffffff",
                  "0 0 5px #ffffff",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Community Mapping
            </motion.span>
          </motion.div>

          <div className="hidden md:flex space-x-1">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  to={item.href}
                  className="text-white px-4 py-2 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 ease-in-out relative overflow-hidden"
                >
                  <motion.span
                    initial={{ y: 0 }}
                    animate={{
                      y: hoveredIndex === index ? -5 : 0,
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.title}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="md:hidden text-white"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden mt-4"
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  custom={index}
                >
                  <Link
                    to={item.href}
                    className="block text-white py-2 px-4 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 ease-in-out"
                    onClick={toggleMenu}
                  >
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.title}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
