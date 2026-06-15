// Root layout is a pass-through. Each route group renders its own <html>/<body>:
//  - (frontend) → the public site
//  - (payload)  → the CMS admin
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
