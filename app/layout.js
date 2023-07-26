import { Inter } from 'next/font/google'
import "@/styles/globals.css";
import { Nav } from '@components/Nav';
import { Provider } from '@components/Provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'propmtopia',
  description: 'Discover & Share AI Prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className='app'>
            <Nav />
            {children}
            </main>
      </body>
      </Provider>
    </html>
  )
}
