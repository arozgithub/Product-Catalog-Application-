export default function DemoNotice() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">
            Demo Mode
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>
              You're viewing sample products. To connect your own Sanity CMS:
            </p>
            <ol className="mt-2 list-decimal list-inside space-y-1">
              <li>Create a Sanity project at <a href="https://sanity.io" className="underline" target="_blank" rel="noopener noreferrer">sanity.io</a></li>
              <li>Update <code className="bg-blue-100 px-1 rounded">.env.local</code> with your project credentials</li>
              <li>Import the schema from <code className="bg-blue-100 px-1 rounded">sanity-schema.js</code></li>
              <li>Add your products in Sanity Studio</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}