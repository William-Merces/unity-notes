export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>
        <div id="app-root">
          {children}
        </div>
      </body>
    </html>
  );
}