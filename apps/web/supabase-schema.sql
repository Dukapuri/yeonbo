-- tenants 테이블 생성
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subdomain TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_tenants_subdomain ON tenants(subdomain);

-- RLS 활성화
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (있다면)
DROP POLICY IF EXISTS "Tenants are viewable by everyone" ON tenants;

-- 정책: 모든 사용자가 읽기 가능
CREATE POLICY "Tenants are viewable by everyone"
  ON tenants
  FOR SELECT
  USING (true);

-- 테스트 데이터 추가
INSERT INTO tenants (subdomain, name) 
VALUES 
  ('user1', 'User 1'),
  ('user2', 'User 2'),
  ('admin', 'Admin')
ON CONFLICT (subdomain) DO NOTHING;
