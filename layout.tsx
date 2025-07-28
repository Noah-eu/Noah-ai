
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Zelene.eco</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
