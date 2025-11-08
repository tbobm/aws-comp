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
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AWS Cost Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Compare costs between different AWS service configurations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service) => (
            <Link
              key={service.id}
              to={service.path}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {service.title}
              </h2>
              <p className="text-gray-600">{service.description}</p>
              <div className="mt-4 text-blue-600 font-medium">
                Get started →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
