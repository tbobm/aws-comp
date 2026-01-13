import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuroraComparison from './components/AuroraComparison';
import S3Comparison from './components/S3Comparison';
import LambdaComparison from './components/LambdaComparison';
import EcsComparison from './components/EcsComparison';
import LandingPage from './components/LandingPage';
import ServiceSelector from './components/ServiceSelector';
import { ServiceMetadata } from './types/comparison';

const services: ServiceMetadata[] = [
  {
    id: 's3',
    title: 'S3 Storage',
    description: 'Compare costs between different S3 storage tiers',
    path: '/s3',
  },
  {
    id: 'aurora',
    title: 'RDS Aurora',
    description: 'Compare Serverless v2 vs Provisioned Aurora deployments',
    path: '/aurora',
  },
  {
    id: 'lambda',
    title: 'AWS Lambda',
    description: 'Serverless compute with invocation-based pricing',
    path: '/lambda',
  },
  {
    id: 'ecs',
    title: 'ECS Fargate',
    description: 'Compare Fargate costs between x86 and ARM Graviton2 architectures',
    path: '/ecs',
  },
];

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/s3"
            element={
              <>
                <ServiceSelector services={services} />
                <div className="container mx-auto px-4 py-8">
                  <S3Comparison />
                </div>
              </>
            }
          />
          <Route
            path="/aurora"
            element={
              <>
                <ServiceSelector services={services} />
                <div className="container mx-auto px-4 py-8">
                  <AuroraComparison />
                </div>
              </>
            }
          />
          <Route
            path="/lambda"
            element={
              <>
                <ServiceSelector services={services} />
                <div className="container mx-auto px-4 py-8">
                  <LambdaComparison />
                </div>
              </>
            }
          />
          <Route
            path="/ecs"
            element={
              <>
                <ServiceSelector services={services} />
                <div className="container mx-auto px-4 py-8">
                  <EcsComparison />
                </div>
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
