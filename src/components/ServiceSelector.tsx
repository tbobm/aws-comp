import { Link, useLocation } from 'react-router-dom';
import { ServiceMetadata } from '../types/comparison';

interface ServiceSelectorProps {
  services: ServiceMetadata[];
}

export default function ServiceSelector({ services }: ServiceSelectorProps) {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-xl font-bold text-gray-900">
            AWS Cost Calculator
          </Link>

          <div className="flex space-x-1">
            {services.map((service) => {
              const isActive = location.pathname === service.path;
              return (
                <Link
                  key={service.id}
                  to={service.path}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
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
