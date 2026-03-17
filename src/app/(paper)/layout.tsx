export default function PaperLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="body-paper min-h-screen">
      {children}
    </div>
  );
}
