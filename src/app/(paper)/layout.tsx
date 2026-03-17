export default function PaperLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="body-paper min-h-screen pt-14 lg:pt-20">
      {children}
    </div>
  );
}
