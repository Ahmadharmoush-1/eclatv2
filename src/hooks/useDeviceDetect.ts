import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isIOS: boolean;
  isIOSSafari: boolean;
  isLowMemoryDevice: boolean;
}

export function useDeviceDetect(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isIOS: false,
    isIOSSafari: false,
    isLowMemoryDevice: false,
  });

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || '';
    
    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    // Detect Safari on iOS (not Chrome, Firefox, etc. on iOS)
    const isIOSSafari = isIOS && /Safari/.test(userAgent) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(userAgent);
    
    // Detect mobile via screen width or touch
    const isMobile = window.innerWidth < 768 || 
      ('ontouchstart' in window) || 
      (navigator.maxTouchPoints > 0);
    
    // Consider iOS Safari and older Android devices as low memory
    const isLowMemoryDevice = isIOSSafari || 
      (isMobile && /Android [4-7]/.test(userAgent));

    setDeviceInfo({
      isMobile,
      isIOS,
      isIOSSafari,
      isLowMemoryDevice,
    });
  }, []);

  return deviceInfo;
}

// Static detection for initial render (SSR-safe)
export function getDeviceInfo(): DeviceInfo {
  if (typeof window === 'undefined') {
    return { isMobile: false, isIOS: false, isIOSSafari: false, isLowMemoryDevice: false };
  }
  
  const userAgent = navigator.userAgent || navigator.vendor || '';
  
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  const isIOSSafari = isIOS && /Safari/.test(userAgent) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(userAgent);
  
  const isMobile = window.innerWidth < 768 || 
    ('ontouchstart' in window) || 
    (navigator.maxTouchPoints > 0);
  
  const isLowMemoryDevice = isIOSSafari || 
    (isMobile && /Android [4-7]/.test(userAgent));

  return { isMobile, isIOS, isIOSSafari, isLowMemoryDevice };
}
