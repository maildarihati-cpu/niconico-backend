import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useState, useEffect } from "react"
import NiconicoLogoWhite from "./logo-niconico-white.png" 
import NiconicoLogoBlack from "./logo-niconico-black.png" 

const NiconicoLogin = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark")
      setIsDarkMode(isDark)
    }

    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center mb-4 mt-[-120px] relative z-[99]">
      
      <style>{`
        h1:not(.niconico-title) { display: none !important; }
        p:not(.niconico-desc) { display: none !important; }
        form { margin-top: 1.5rem !important; }
      `}</style>

      {/* BOX SOLID TANPA ANIMASI (Supaya tidak bocor overlay-nya) */}
      <div className={`
        ${isDarkMode ? 'bg-[#18181b]' : 'bg-[#fafafa]'} 
        rounded-2xl mb-6 flex items-center justify-center w-full max-w-[320px] min-h-[200px] relative
      `}>
        <img 
          src={isDarkMode ? NiconicoLogoWhite : NiconicoLogoBlack} 
          alt="Niconico Logo" 
          className="w-48 object-contain" 
        />
      </div>

      <h1 className={`niconico-title text-2xl font-bold tracking-tight text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Welcome <br />
        Niconico Administrator
      </h1>
      <p className={`niconico-desc text-sm mt-2 mb-4 text-center max-w-[280px] ${isDarkMode ? 'text-[#8b8d91]' : 'text-gray-500'}`}>
        Please Login to Handle your E-Commerce.
      </p>

    </div>
  )
}

export const config = defineWidgetConfig({
  zone: "login.before",
})

export default NiconicoLogin