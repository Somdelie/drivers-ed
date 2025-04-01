export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center w-full min-h-[100vh]">
      {children}
    </div>
  );
}
