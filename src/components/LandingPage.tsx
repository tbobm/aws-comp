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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-6xl">⚡</span>
            <h1 className="text-5xl font-bold text-aws-blue">
              AWS Cost Calculator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare costs between different AWS service configurations and optimize your cloud spending
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Link
              key={service.id}
              to={service.path}
              className="group bg-white rounded-xl shadow-soft p-10 hover:shadow-strong transition-all duration-300 transform hover:-translate-y-1 animate-slide-in border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h2 className="text-3xl font-bold text-aws-blue mb-3 group-hover:text-primary-600 transition-colors">
                {service.title}
              </h2>
              <p className="text-gray-600 text-lg mb-6">{service.description}</p>
              <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 group-hover:gap-3 gap-2 transition-all">
                Get started
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
