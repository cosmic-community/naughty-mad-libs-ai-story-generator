import LoadingSpinner from '@/components/LoadingSpinner';

export default function StoryLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="large" className="mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Your Story...</h2>
        <p className="text-gray-600">Preparing your AI-generated masterpiece</p>
      </div>
    </div>
  );
}