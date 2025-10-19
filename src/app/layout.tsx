import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Ascent of Kaeso Dardanus',
  description: 'A five-stage Roman puzzle journey from chains to the Senate',
  keywords: ['puzzle', 'Roman', 'cipher', 'cryptography', 'interactive'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;800;900&family=Spectral:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet" />
        
        <script
          type="text/plain"
          id="scribe-cipher"
          dangerouslySetInnerHTML={{
            __html: `
Scribe Notes

const scribenotes = "U2VlayB0aGUgRm91bmRlcnMgaW4gdGhlICNyb2xlcyBjaGFubmVsIG9mIERpc2NvcmQuIFJlYWQgb2YgUmVtdXMgYW5kIFJvbXVsdXMsIGFuZCBsZWFybiBvZiB0aGVpciBHbG9yaWE=";
            `
          }}
        />
      </head>
      <body>
        <div className="min-h-screen bg-obsidian">
          {children}
        </div>
      </body>
    </html>
  );
}

