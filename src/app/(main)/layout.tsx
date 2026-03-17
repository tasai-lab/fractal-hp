import PageBackground from "@/components/PageBackground";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageBackground />
      {children}
    </>
  );
}
