
// Context/NotificationContext.js
import React, {createContext, useState, useEffect} from 'react';
import {getDatabase, ref, onValue, set} from 'firebase/database';
import {getAuth} from 'firebase/auth';

export const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [categoryLimits, setCategoryLimits] = useState({});
  
  const auth = getAuth();
  const db = getDatabase();
  
  // Load notification settings from Firebase
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const notificationSettingsRef = ref(db, `users/${user.uid}/notificationSettings`);
      onValue(notificationSettingsRef, (snapshot) => {
        const data = snapshot.val() || {};
        setIsNotificationEnabled(data.isEnabled !== false); // Default to true if not set
      });
      
      const categoryLimitsRef = ref(db, `users/${user.uid}/categoryLimits`);
      onValue(categoryLimitsRef, (snapshot) => {
        const data = snapshot.val() || {};
        setCategoryLimits(data);
      });
    }
  }, [auth.currentUser]);
  
  // Save notification toggle state to Firebase
  const updateNotificationSetting = (isEnabled) => {
    const user = auth.currentUser;
    if (user) {
      set(ref(db, `users/${user.uid}/notificationSettings`), {
        isEnabled: isEnabled
      });
      setIsNotificationEnabled(isEnabled);
    }
  };
  
  // Save category limit to Firebase
  const updateCategoryLimit = (amount) => {
    const user = auth.currentUser;
    if (user) {
      set(ref(db, `users/${user.uid}/categoryLimits/general`), {
        amount: parseInt(amount, 10)
      });
    }
  };
  
  return (
    <NotificationContext.Provider
      value={{
        isNotificationEnabled,
        updateNotificationSetting,
        updateCategoryLimit,
        categoryLimits,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};