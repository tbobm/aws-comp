import AuroraComparison from './components/AuroraComparison'
import S3Comparison from './components/S3Comparison'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <AuroraComparison />
        <S3Comparison />
      </div>
    </div>
  )
}

export default App
