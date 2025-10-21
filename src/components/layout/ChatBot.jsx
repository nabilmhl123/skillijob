import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Bulle de chat flottante - affichée seulement quand le popup est fermé */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="chatbot-bubble"
            onClick={toggleChat}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20
            }}
          >
            {/* Logo dans la bulle */}
            <div className="bubble-icon">
              <img
                src="/logo-skillijob.png"
                alt="Chat Skillijob"
                className="chatbot-logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = '<span style="font-size: 32px;">💬</span>';
                }}
              />
            </div>

            {/* Tooltip "Besoin d'aide ?" */}
            {showTooltip && (
              <motion.div
                className="chatbot-tooltip"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="tooltip-content">
                  <span className="tooltip-text">Besoin d'aide ?</span>
                </div>
                <div className="tooltip-arrow"></div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup du chatbot - affiché seulement quand ouvert */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-popup"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300
            }}
          >
            {/* Header du popup */}
            <div className="chatbot-popup-header">
              <div className="chatbot-popup-title">
                <span className="chatbot-popup-icon"></span>
                <span>Assistance Skillijob</span>
              </div>
              <button
                className="chatbot-popup-close"
                onClick={handleClose}
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            {/* Body du popup */}
            <div className="chatbot-popup-body">
              <iframe
                src="https://eu.jotform.com/agent/0199ec4163ab79a9bd33b9051da28fb25505"
                title="Formulaire de contact Skillijob"
                frameBorder="0"
                className="chatbot-iframe"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
