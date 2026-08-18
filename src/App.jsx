import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { UserProvider } from './context/UserContext';
import { NotificationProvider } from './context/NotificationContext';

// Customer Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Menu from './pages/menu/Menu';
import MenuDetail from './pages/menu/MenuDetail';
import Checkout from './pages/cart/Checkout';
import OrderSuccess from './pages/cart/OrderSuccess';
import MyOrders from './pages/orders/MyOrders';
import Reservations from './pages/reservation/Reservations';
import BookTable from './pages/reservation/BookTable';
import MyReservations from './pages/reservation/MyReservations';
import ReservationSuccess from './pages/reservation/ReservationSuccess';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Wishlist from './pages/Wishlist';
import Offers from './pages/Offers';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ManageMenu from './pages/admin/ManageMenu';
import ManageOrders from './pages/admin/ManageOrders';
import ManageTables from './pages/admin/ManageTables';
import ManageReservations from './pages/admin/ManageReservations';
import Inventory from './pages/admin/Inventory';
import Customers from './pages/admin/Customers';
import Employees from './pages/admin/Employees';
import Analytics from './pages/admin/Analytics';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';
import AdminOffers from './pages/admin/Offers';
import ChefSpecials from './pages/admin/ChefSpecials';

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <NotificationProvider>
              <Router>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: '#111827',
                      color: '#fff',
                      borderRadius: '12px',
                      fontSize: '14px',
                    },
                  }}
                />
                <Routes>
                  {/* Public Customer Routes */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/menu/:id" element={<MenuDetail />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/orders" element={<MyOrders />} />
                  <Route path="/reservations" element={<Reservations />} />
                  <Route path="/reservations/book" element={<BookTable />} />
                  <Route path="/reservations/my" element={<MyReservations />} />
                  <Route path="/reservations/success" element={<ReservationSuccess />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/offers" element={<Offers />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Admin Dashboard Routes */}
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/admin/menu" element={<ManageMenu />} />
                  <Route path="/admin/orders" element={<ManageOrders />} />
                  <Route path="/admin/tables" element={<ManageTables />} />
                  <Route path="/admin/reservations" element={<ManageReservations />} />
                  <Route path="/admin/inventory" element={<Inventory />} />
                  <Route path="/admin/customers" element={<Customers />} />
                  <Route path="/admin/employees" element={<Employees />} />
                  <Route path="/admin/offers" element={<AdminOffers />} />
                  <Route path="/admin/chef-specials" element={<ChefSpecials />} />
                  <Route path="/admin/analytics" element={<Analytics />} />
                  <Route path="/admin/reports" element={<Reports />} />
                  <Route path="/admin/settings" element={<Settings />} />

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
            </NotificationProvider>
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
