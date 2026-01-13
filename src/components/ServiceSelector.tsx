import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ServiceMetadata } from '../types/comparison';
import {
  fadeInUpVariants,
  interactiveControlVariants,
  layoutTransitionConfig
} from '../utils/animations';
import ThemeToggle from './ThemeToggle';

interface ServiceSelectorProps {
  services: ServiceMetadata[];
}

export default function ServiceSelector({ services }: ServiceSelectorProps) {
  const location = useLocation();

  return (
    <>
      <ThemeToggle />
      <motion.nav
        className="bg-white dark:bg-neutral-800 shadow-subtle sticky top-0 z-40 border-b border-neutral-200 dark:border-neutral-700"
        variants={fadeInUpVariants}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="flex items-center justify-between py-4"
            layout
            transition={layoutTransitionConfig}
          >
            <Link to="/" className="flex items-center group">
              <motion.svg
                className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </motion.svg>
              <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-quick">
                AWS Cost Calculator
              </span>
            </Link>

            <div className="flex space-x-2">
              {services.map((service) => {
                const isActive = location.pathname === service.path;
                return (
                  <motion.div
                    key={service.id}
                    variants={interactiveControlVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      to={service.path}
                      className={`block px-5 py-2.5 rounded-lg font-semibold transition-quick ${
                        isActive
                          ? 'bg-primary-600 dark:bg-primary-700 text-white shadow-hover'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-primary-600 dark:hover:text-primary-400 hover:shadow-subtle'
                      }`}
                    >
                      {service.title}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.nav>
    </>
  );
}
