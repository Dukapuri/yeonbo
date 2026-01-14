# 멀티테넌트 애플리케이션 Supabase 설정 가이드

## 1. Supabase 클라이언트 라이브러리 설치

```bash
cd apps/web
npm install @supabase/supabase-js
# 또는
pnpm add @supabase/supabase-js
```

## 2. 환경 변수 설정 (.env.local)

`.env.local` 파일에 다음 환경 변수들을 추가하세요:

```env
# 기존 설정
ROOT_DOMAIN=yeonbolocal.me

# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# 예시:
# NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**참고:**

- `NEXT_PUBLIC_` 접두사가 붙은 변수는 클라이언트에서 접근 가능합니다.
- `SUPABASE_SERVICE_ROLE_KEY`는 서버 사이드에서만 사용하고 절대 클라이언트에 노출하지 마세요.

## 3. Supabase 클라이언트 유틸리티 생성

`src/lib/supabase/client.ts` - 클라이언트 사이드용
`src/lib/supabase/server.ts` - 서버 사이드용
`src/lib/supabase/middleware.ts` - 미들웨어용

## 4. 데이터베이스 스키마 설계

멀티테넌트를 위한 필수 테이블:

### tenants 테이블

```sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subdomain TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_tenants_subdomain ON tenants(subdomain);

-- RLS 활성화
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

-- 정책: 모든 사용자가 읽기 가능
-- 주의: 정책이 이미 존재하면 DROP 후 생성하거나 CREATE OR REPLACE 사용
DROP POLICY IF EXISTS "Tenants are viewable by everyone" ON tenants;

CREATE POLICY "Tenants are viewable by everyone"
  ON tenants
  FOR SELECT
  USING (true);
```

### 테넌트별 데이터 분리 전략

**옵션 1: tenant_id 컬럼 추가 (권장)**
모든 테이블에 `tenant_id` 컬럼을 추가하여 데이터를 분리합니다.

```sql
-- 예시: users 테이블
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tenant_id, email)
);

CREATE INDEX idx_users_tenant_id ON users(tenant_id);
```

**옵션 2: 스키마 분리**
각 테넌트마다 별도의 스키마를 생성합니다. (복잡하지만 완전한 분리)

## 5. Row Level Security (RLS) 정책 설정

각 테이블에 RLS를 활성화하고 테넌트별 접근 제어를 설정합니다.

```sql
-- RLS 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 정책: 테넌트별로만 자신의 데이터 접근 가능
```

## 6. 테넌트 컨텍스트 설정

미들웨어나 서버 컴포넌트에서 현재 테넌트 ID를 설정하는 헬퍼 함수가 필요합니다.

## 7. 인증 설정 (선택사항)

Supabase Auth를 사용한다면:

- 테넌트별 사용자 인증
- JWT에 tenant_id 포함
- 테넌트별 세션 관리

## 8. 추가 고려사항

- **테넌트 검증**: 서브도메인으로 접근한 테넌트가 실제로 존재하는지 확인
- **테넌트별 설정**: 각 테넌트의 커스텀 설정 저장
- **데이터 마이그레이션**: 테넌트 생성/삭제 시 데이터 처리
- **백업 및 복구**: 테넌트별 데이터 백업 전략
- **모니터링**: 테넌트별 사용량 및 성능 모니터링
