import { headers } from 'next/headers';

// 테넌트별 색상 매핑 (테스트용)
const tenantColors: Record<string, { bg: string; text: string; name: string }> = {
  user1: {
    bg: 'bg-blue-500',
    text: 'text-blue-50',
    name: 'User 1',
  },
  user2: {
    bg: 'bg-green-500',
    text: 'text-green-50',
    name: 'User 2',
  },
  admin: {
    bg: 'bg-purple-500',
    text: 'text-purple-50',
    name: 'Admin',
  },
};

export default async function TenantPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const hostname = host.split(':')[0];

  const tenantInfo = tenantColors[tenant] || {
    bg: 'bg-gray-500',
    text: 'text-gray-50',
    name: tenant,
  };

  return (
    <div className={`min-h-screen ${tenantInfo.bg} ${tenantInfo.text} p-8`}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-xl">
          <h1 className="text-4xl font-bold mb-4">테넌트 테스트 페이지</h1>

          <div className="space-y-4 mt-8">
            <div className="bg-white/20 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">테넌트 정보</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">테넌트 ID:</span>{' '}
                  <code className="bg-white/20 px-2 py-1 rounded">{tenant}</code>
                </p>
                <p>
                  <span className="font-medium">테넌트 이름:</span> {tenantInfo.name}
                </p>
                <p>
                  <span className="font-medium">호스트:</span>{' '}
                  <code className="bg-white/20 px-2 py-1 rounded">{hostname}</code>
                </p>
                <p>
                  <span className="font-medium">전체 Host 헤더:</span>{' '}
                  <code className="bg-white/20 px-2 py-1 rounded text-sm break-all">{host}</code>
                </p>
              </div>
            </div>

            <div className="bg-white/20 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">테스트 안내</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>현재 서브도메인에서 올바른 테넌트가 표시되는지 확인하세요.</li>
                <li>다른 서브도메인으로 접속하면 다른 테넌트가 표시되어야 합니다.</li>
                <li>메인 도메인(yeonbolocal.me)으로 접속하면 이 페이지가 보이지 않아야 합니다.</li>
              </ul>
            </div>

            <div className="bg-white/20 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">테스트 도메인</h2>
              <div className="space-y-2">
                <p>다음 도메인들로 테스트해보세요:</p>
                <ul className="list-disc list-inside space-y-1 font-mono text-sm">
                  <li>http://yeonbolocal.me:3000 (메인 도메인)</li>
                  <li>http://user1.yeonbolocal.me:3000 (User 1 테넌트)</li>
                  <li>http://user2.yeonbolocal.me:3000 (User 2 테넌트)</li>
                  <li>http://admin.yeonbolocal.me:3000 (Admin 테넌트)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
