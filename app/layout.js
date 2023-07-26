import { Inter } from 'next/font/google'
import "@/styles/globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'propmtopia',
  description: 'Discover & Share AI Prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className='app'>{children}</main>
      </body>
    </html>
  )
}
