import { useRoutes, Navigate } from 'react-router-dom';
import adminRoutes from './routes/adminRoutes';
// import customerRoutes from './routes/customerRoutes'; // Vẫn giữ comment, sẽ dùng sau

// BƯỚC 2: Chỉ có MỘT function App duy nhất
function App() {
  const allRoutes = useRoutes([
    // Khi truy cập trang gốc, tự động chuyển hướng đến admin dashboard
    { path: '/', element: <Navigate to="/admin/dashboard" /> },
    
    // Dòng này tự động lấy tất cả các route admin đã được cập nhật
    ...adminRoutes, 
    
    // ...customerRoutes,
  ]);
  
  // Trả về kết quả của useRoutes
  return <>{allRoutes}</>;
}

export default App;