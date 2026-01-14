import TenantHeader from '@/components/header/TenantHeader';

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;

  return (
    <div className="min-h-screen flex flex-col">
      <TenantHeader tenant={tenant} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
