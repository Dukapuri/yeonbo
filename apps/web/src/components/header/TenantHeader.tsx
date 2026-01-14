import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

interface TenantHeaderProps {
  tenant: string;
}

export default function TenantHeader({ tenant }: TenantHeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고/브랜드 영역 */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{tenant}</h1>
            <span className="ml-3 text-sm opacity-75 text-gray-600 dark:text-gray-400">
              ({tenant})
            </span>
          </div>

          {/* 네비게이션 영역 */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href={`/s/${tenant}`}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              홈
            </Link>
            <Link
              href="#"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              대시보드
            </Link>
            <Link
              href="#"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              설정
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
