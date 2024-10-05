import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../../utils/Toast";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, User, LogOut, Menu, X } from "lucide-react";

const LoggedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = (e) => {
    localStorage.removeItem("loggedUserEmail");
    localStorage.removeItem("loggedUserIP");
    handleSuccess("User logged out successfully");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const menuItems = [
    { title: "Profile", href: "/profile", icon: User },
    { title: "Map", href: "/map", icon: MapPin },
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
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.nav
      className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 shadow-lg"
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
          >
            <motion.img
              src="https://img.icons8.com/doodle/48/internet--v1.png"
              alt="Logo"
              className="h-10 rounded-lg"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.span
              className="ml-2 text-white font-bold text-2xl md:text-3xl"
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

          <div className="hidden md:flex space-x-4">
            {menuItems.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  to={item.href}
                  className="text-white px-4 py-2 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 ease-in-out flex items-center"
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.title}
                </Link>
              </motion.div>
            ))}
            <motion.button
              onClick={handleLogOut}
              className="text-white px-4 py-2 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 ease-in-out flex items-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </motion.button>
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
                    className="text-white py-2 px-4 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 ease-in-out flex items-center"
                    onClick={toggleMenu}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
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
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => {
                    handleLogOut();
                    toggleMenu();
                  }}
                  className="w-full text-left text-white py-2 px-4 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 ease-in-out flex items-center"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: menuItems.length * 0.1 }}
                  >
                    Logout
                  </motion.span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ToastContainer />
    </motion.nav>
  );
};

export default LoggedNavbar;
