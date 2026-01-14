import Image from 'next/image';
import { headers } from 'next/headers';

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const hostname = host.split(':')[0];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            메인 도메인 페이지
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            현재 메인 도메인에 접속하셨습니다. 서브도메인으로 접속하면 테넌트별 페이지가 표시됩니다.
          </p>

          <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg w-full">
            <h2 className="text-lg font-semibold mb-2 text-black dark:text-zinc-50">
              현재 도메인 정보
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">호스트:</span>{' '}
                <code className="bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded text-black dark:text-zinc-50">
                  {hostname}
                </code>
              </p>
              <p>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  전체 Host 헤더:
                </span>{' '}
                <code className="bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded text-black dark:text-zinc-50 break-all">
                  {host}
                </code>
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg w-full">
            <h2 className="text-lg font-semibold mb-2 text-black dark:text-zinc-50">테스트 안내</h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>서브도메인으로 접속하면 테넌트별 페이지가 표시됩니다.</li>
              <li>예: user1.yeonbolocal.me:3000, user2.yeonbolocal.me:3000</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
