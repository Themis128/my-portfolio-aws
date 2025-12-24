import { Authenticator } from '@aws-amplify/ui-react';
import { AuthUser } from 'aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <Authenticator>
      {({ signOut, user }: { signOut?: () => void; user?: AuthUser }) => (
        <div>
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">My App</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user?.username}</span>
                <button
                  onClick={() => signOut?.()}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      )}
    </Authenticator>
  );
}
