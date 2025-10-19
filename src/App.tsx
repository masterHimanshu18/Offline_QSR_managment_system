import { useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import { OrderProvider } from './context/OrderContext'
import { MenuBoard } from './components/MenuBoard'
import { OrderForm } from './components/OrderForm'
import { OrderProgress } from './components/OrderProgress'
import { Reports } from './components/Reports'
import { ChefHat, ClipboardList, BarChart3 } from 'lucide-react'
import ReactLogo from '/src/assets/react.svg'

type Tab = 'orders' | 'progress' | 'reports'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('orders')
  const [spinSpeed, setSpinSpeed] = useState(1)

  // Swipe navigation
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (activeTab === 'orders') setActiveTab('progress')
      else if (activeTab === 'progress') setActiveTab('reports')
    },
    onSwipedRight: () => {
      if (activeTab === 'reports') setActiveTab('progress')
      else if (activeTab === 'progress') setActiveTab('orders')
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  // Dynamic spin speed on scroll
  useEffect(() => {
    let timeoutId: number
    const onScroll = () => {
      setSpinSpeed(5)
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => setSpinSpeed(1), 1000)
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  const logoStyle = {
    display: 'inline-block',
    animation: 'logo-spin linear infinite',
    animationDuration: `${90 / spinSpeed}s`,
  }

  return (
    <OrderProvider>
      <div {...handlers} className="min-h-screen bg-gradient-to-br from-red-600 to-black">
        <header className="bg-gradient-to-b from-black to-red-600 shadow-md sticky top-0 z-50 w-full">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="flex items-center justify-evenly w-full my-2">
              <img src={ReactLogo} alt="Logo" className="h-10 w-10 m-1 drop-shadow logo-spin" style={logoStyle} />
              <h1 className="text-4xl font-extrabold text-white">HIMANSHU</h1>
              <img src={ReactLogo} alt="Logo" className="h-10 w-10 m-1 drop-shadow logo-spin" style={logoStyle} />
            </div>
            <nav className="flex md:gap-24 justify-center w-full h-12">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 px-2 py-2 rounded-t-sm font-semibold transition ${
                  activeTab === 'orders' ? 'text-white' : 'hover:bg-gray-200'
                }`}
                style={{ minWidth: 120 }}
              >
                <ClipboardList size={18} /> New Order
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`flex items-center gap-2 px-2 py-2 rounded-t-sm font-semibold transition ${
                  activeTab === 'progress' ? 'text-white' : 'hover:bg-gray-200'
                }`}
                style={{ minWidth: 120 }}
              >
                <ChefHat size={18} /> Orders
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`flex items-center gap-2 px-2 py-2 rounded-t-sm font-semibold transition ${
                  activeTab === 'reports' ? 'text-white' : 'hover:bg-gray-200'
                }`}
                style={{ minWidth: 120 }}
              >
                <BarChart3 size={18} /> Reports
              </button>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-4">
          {activeTab === 'orders' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              <div className="lg:col-span-2 p-1 rounded">
                <h2 className="text-2xl text-white font-bold text-center pb-4">Menu</h2>
                <MenuBoard />
              </div>
              <OrderForm />
            </div>
          )}
          {activeTab === 'progress' && (
            <div className="max-w-5xl mx-auto">
              <OrderProgress />
            </div>
          )}
          {activeTab === 'reports' && (
            <div className="max-w-5xl mx-auto">
              <Reports />
            </div>
          )}
        </main>
      </div>
    </OrderProvider>
  )
}

export default App
