import { ToastProvider } from "./components/Toast";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <ToastProvider>
      <HomePage />
    </ToastProvider>
  );
}