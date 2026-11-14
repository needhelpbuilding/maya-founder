import FounderSidebar from '@/components/FounderSidebar';

export default function FounderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#fcfaff]">
      <FounderSidebar />
      <main className="flex-1 transition-all duration-300 ml-72">
        {children}
      </main>
    </div>
  );
}
