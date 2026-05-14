import React from 'react';
import { useShop } from '../context/ShopContext';

const Toast = () => {
  const { toast } = useShop();
  if (!toast) return null;
  return (
    <div className={`toast ${toast.type || ''}`}>
      {toast.msg}
    </div>
  );
};

export default Toast;