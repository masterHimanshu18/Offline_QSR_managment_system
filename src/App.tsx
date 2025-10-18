import { useState } from 'react'
import { OrderProvider } from './context/OrderContext'
import { MenuBoard } from './components/MenuBoard'
import { OrderForm } from './components/OrderForm'
import { OrderProgress } from './components/OrderProgress'
import { Reports } from './components/Reports'
import { ChefHat, ClipboardList, BarChart3 } from 'lucide-react'
import ReactLogo from '/src/assets/react.svg';


type Tab = 'orders' | 'progress' | 'reports'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('orders')

  return (
    <OrderProvider>
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-black">
        <header className="bg-gradient-to-br from-black to-red-600 shadow-md sticky top-0 z-50 w-full">
          <div className="w-full flex flex-col items-center justify-center">
            {/* Title with Logo */}
            <div className="flex items-center justify-evenly w-full my-2">
              <img
                src={ReactLogo}
                alt="Logo"
                className="h-10 w-10 m-1 drop-shadow logo logo-spin"
                style={{ display: 'inline-block' }}
              />
              <h1 className="text-4xl md:text-4xl font-extrabold text-white text-center">
                HIMANSHU
              </h1>
              <img
                src={ReactLogo}
                alt="Logo"
                className="h-10 w-10 m-1 drop-shadow logo logo-spin"
                style={{ display: 'inline-block' }}
              />
            </div>
            {/* Navigation Buttons */}
            <nav className="flex md:gap-24 justify-center w-full h-12">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 px-2 py-2 rounded-t-sm text-base font-semibold transition 
                  ${activeTab === 'orders' ? 'text-white' : 'hover:bg-gray-200'}`}
                style={{ minWidth: 120 }}
              >
                <ClipboardList size={18} />
                New Order
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`flex items-center gap-2 px-2 py-2 rounded-t-sm text-base font-semibold transition 
                  ${activeTab === 'progress' ? 'text-white' : 'hover:bg-gray-200'}`}
                style={{ minWidth: 120 }}
              >
                <ChefHat size={18} />
                Orders
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`flex items-center gap-2 px-2 py-2 rounded-t-sm text-base font-semibold transition 
                  ${activeTab === 'reports' ? 'text-white' : 'hover:bg-gray-200'}`}
                style={{ minWidth: 120 }}
              >
                <BarChart3 size={18} />
                Reports
              </button>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-4 ">
          {activeTab === 'orders' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-7xl ">
              <div className="lg:col-span-2 p-1 rounded ">
                <h2 className="text-2xl text-white font-bold text-center pb-4">Menu</h2>
                <MenuBoard />
              </div>
              <div>
                <OrderForm />
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="w-full max-w-5xl mx-auto">
              <OrderProgress />
            </div>
          )}
          {activeTab === 'reports' && (
            <div className="w-full max-w-5xl mx-auto">
              <Reports />
            </div>
          )}
        </main>

      </div>
    </OrderProvider>
  )
}

export default App
