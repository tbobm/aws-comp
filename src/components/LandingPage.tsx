import { Link } from 'react-router-dom';

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
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-neutral-900 mb-4 tracking-tight">
            AWS Cost Calculator
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Compare costs between different AWS service configurations with real-time pricing data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Link
              key={service.id}
              to={service.path}
              className="group bg-white rounded-xl shadow-soft hover:shadow-strong p-8 transition-all duration-300 transform hover:-translate-y-1 animate-slide-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                {service.title}
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                Get started
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-neutral-500 text-sm">
            Pricing data sourced from AWS Price List API
          </p>
        </div>
      </div>
    </div>
  );
}
