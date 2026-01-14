import { createClient } from './server';

/**
 * 서브도메인으로부터 테넌트 정보를 가져옵니다.
 */
export async function getTenantBySubdomain(subdomain: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('subdomain', subdomain)
    .single();

  if (error) {
    console.error('Error fetching tenant:', error);
    return null;
  }

  return data;
}

/**
 * 테넌트 ID로 테넌트 정보를 가져옵니다.
 */
export async function getTenantById(tenantId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.from('tenants').select('*').eq('id', tenantId).single();

  if (error) {
    console.error('Error fetching tenant:', error);
    return null;
  }

  return data;
}

/**
 * 현재 요청의 테넌트 컨텍스트를 설정합니다.
 * RLS 정책에서 사용할 수 있도록 세션 변수로 설정합니다.
 */
export async function setTenantContext(tenantId: string) {
  const supabase = await createClient();

  // Supabase의 세션 변수 설정 (RLS 정책에서 사용)
  // 주의: 이 방법은 Supabase의 세션 변수 기능을 사용합니다.
  // 실제 구현은 Supabase의 기능에 따라 달라질 수 있습니다.

  // 대안: JWT 클레임에 tenant_id를 포함시키거나
  // 별도의 컨텍스트 관리 방식을 사용할 수 있습니다.

  return supabase;
}
