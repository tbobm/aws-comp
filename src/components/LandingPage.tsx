import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  fadeInUpVariants,
  cardVariants,
  interactiveControlVariants,
  layoutTransitionConfig
} from '../utils/animations';

export default function LandingPage() {
  const services = [
    {
      id: 's3',
      title: 'S3 Storage',
      description: 'Compare costs between different S3 storage tiers',
      path: '/s3',
      icon: '🪣',
    },
    {
      id: 'aurora',
      title: 'RDS Aurora',
      description: 'Compare Serverless v2 vs Provisioned Aurora deployments',
      path: '/aurora',
      icon: '🗄️',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-neutral-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto pb-8 border-b-2 border-primary-500/20"
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
        >
          <h1 className="text-5xl font-bold text-neutral-900 mb-4 tracking-tight">
            AWS Cost Calculator
          </h1>
          <p className="text-xl text-neutral-600">
            Compare costs between different AWS service configurations with real-time pricing data
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
          layout
          transition={layoutTransitionConfig}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              custom={index}
            >
              <Link
                to={service.path}
                className="group block bg-white rounded-xl shadow-subtle p-8 h-full transition-normal"
              >
                <div className="text-6xl mb-6">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-normal">
                  {service.title}
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <motion.div
                  className="flex items-center text-primary-600 font-semibold"
                  variants={interactiveControlVariants}
                  whileHover="hover"
                >
                  Get started
                  <motion.svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <p className="text-neutral-500 text-sm">
            Pricing data sourced from AWS Price List API
          </p>
        </div>
      </div>
    </div>
  );
}
