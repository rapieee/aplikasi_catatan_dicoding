import { render, screen } from '@testing-library/react';
import App from './App';


test('renders header and input form for notes', () => {
  render(<App/>);
  
  // Memastikan header aplikasi catatan muncul
  expect(screen.getByText(/notes app/i)).toBeInTheDocument();
  
  // Memastikan input pencarian tersedia
  expect(screen.getByPlaceholderText(/cari catatan/i)).toBeInTheDocument();
  
  // Memastikan form input catatan baru tersedia
  expect(screen.getByPlaceholderText(/judul catatan/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/isi catatan/i)).toBeInTheDocument();
});
