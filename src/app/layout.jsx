import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  weight: ['400', '500', '600', '700']
})

export const metadata = {
  title: "Minecraft server list",
  description: "Manage minecraft docker container servers with ease.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-zinc-950">
      <body className={`${inter.className} antialiased bg-zinc-950 text-white`}>
        {children}
      </body>
    </html>
  )
}
