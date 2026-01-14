declare namespace NodeJS {
  interface ProcessEnv {
    // 기존 설정
    ROOT_DOMAIN?: string;
    NODE_ENV: 'development' | 'production' | 'test';

    // Supabase 설정
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE_KEY?: string;
  }
}
