import { Link, useLocation } from 'react-router-dom';
import { ServiceMetadata } from '../types/comparison';

interface ServiceSelectorProps {
  services: ServiceMetadata[];
}

export default function ServiceSelector({ services }: ServiceSelectorProps) {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-50 border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center group">
            <svg className="w-8 h-8 text-primary-600 mr-3 group-hover:text-primary-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
              AWS Cost Calculator
            </span>
          </Link>

          <div className="flex space-x-2">
            {services.map((service) => {
              const isActive = location.pathname === service.path;
              return (
                <Link
                  key={service.id}
                  to={service.path}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-soft'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary-600'
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
