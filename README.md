# Offline QSR Management System

-> A modern, offline-first Progressive Web App (PWA) for Quick Service Restaurant order management with WhatsApp invoicing, built with Vite, React, and Tailwind CSS.

![PWA Badge](https://img.shields.io/badge/PWA-enabled-blue)
![React](https://img.shields.io/badge/React-18+-blue)
![Vite](https://img.shields.io/badge/Vite-7+-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-4+-cyan)

---

## ✨ Features

- **📱 Progressive Web App (PWA)**: Installable on any device, works offline with service workers
- **🍔 Order Management**: Create, track, and manage orders with real-time status updates
- **💰 Payment Tracking**: Mark orders as paid/unpaid with detailed reporting
- **📊 Analytics & Reports**: Daily sales reports, revenue tracking, and order history
- **⏱️ Preparation Time Tracking**: Monitor how long each order takes to prepare
- **📲 WhatsApp Integration**: Send professional invoices directly to customers via WhatsApp
- **💾 Offline-First**: All data persists locally with localStorage—works without internet
- **🎨 Beautiful UI**: Modern, responsive design with Tailwind CSS and custom fonts
- **⚡ Lightning Fast**: Built with Vite for instant hot module replacement and optimized builds

---

## 🚀 Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite 7+
- **Styling**: Tailwind CSS 4+ with custom Quicksand font
- **PWA**: vite-plugin-pwa with Workbox
- **State Management**: React Context API
- **Storage**: LocalStorage with date-based organization
- **Deployment**: Optimized for Vercel, Netlify, or any static host

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Steps

1. **Clone the repository**

git clone https://github.com/masterHimanshu18/Offline_QSR_managment_system.git
cd Offline_QSR_managment_system

2. **Install dependencies**

npm install

3. **Run development server**

npm run dev
Open [http://localhost:5173](http://localhost:5173)

4. **Build for production**

npm run build

5. **Preview production build**

npm run preview

---

## 🎯 Usage

### Creating an Order
1. Browse the menu and click items to add to cart
2. Add optional add-ons (extra cheese, toppings, etc.)
3. Enter customer phone number or name
4. Click "Create Order" to generate the order
5. If a valid phone number is provided, a WhatsApp invoice is automatically sent

### Managing Orders
- **Preparing**: Timer starts automatically when order is created
- **Mark Served**: Stops timer and saves preparation time
- **Mark Paid/Unpaid**: Track payment status with optional reason for non-payment

### Reports & Analytics
- View daily statistics (total orders, revenue, paid/unpaid counts)
- Filter orders by payment status
- Export data as JSON or CSV
- Track preparation times for efficiency analysis

---

## 📱 PWA Features

- **Install Prompt**: Users can install the app on their device
- **Offline Mode**: Full functionality without internet connection
- **App Icons**: Custom 192x192 and 512x512 icons
- **Service Worker**: Automatic caching and updates

---

## 🔧 Configuration

### Customization

#### Change Business Name
Edit `src/components/OrderForm.tsx` and update the WhatsApp message template:

message += ' YOUR BUSINESS NAME\n'

text

#### Change Theme Color
Edit `vite.config.ts`:

theme_color: '#DC2626', // Your brand color

text

#### Add Menu Items
Edit `src/data/menuData.ts` to add your restaurant's menu items and add-ons.

---

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Deploy automatically

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Other Hosts
Upload the `dist` folder to any static hosting service.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Himanshu Singh**  
Full-Stack Developer  
[GitHub](https://github.com/masterHimanshu18) | [LinkedIn](https://www.linkedin.com/in/himanshu-singh-uko2)

---

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI powered by [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- PWA capabilities via [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)

---

**⭐ If you find this project useful, please give it a star!**