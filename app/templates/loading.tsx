import LoadingSpinner from '@/components/LoadingSpinner';

export default function TemplatesLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="large" className="mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Template...</h2>
        <p className="text-gray-600">Getting your story template ready</p>
      </div>
    </div>
  );
}