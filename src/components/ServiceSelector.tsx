import { Link, useLocation } from 'react-router-dom';
import { ServiceMetadata } from '../types/comparison';

interface ServiceSelectorProps {
  services: ServiceMetadata[];
}

export default function ServiceSelector({ services }: ServiceSelectorProps) {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-soft border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-5">
          <Link
            to="/"
            className="text-2xl font-bold text-aws-blue hover:text-aws-blue-light transition-colors duration-200 flex items-center gap-2"
          >
            <span className="text-aws-orange">⚡</span>
            AWS Cost Calculator
          </Link>

          <div className="flex space-x-2">
            {services.map((service) => {
              const isActive = location.pathname === service.path;
              return (
                <Link
                  key={service.id}
                  to={service.path}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-medium scale-105'
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:shadow-soft'
                  }`}
                >
                  {service.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
