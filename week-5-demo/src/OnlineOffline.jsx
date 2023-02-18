import { useEffect, useState } from "react";

// Custom hook to share logic between components
const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleIsOnline = () => {
      console.log("Setting online status to true");
      setIsOnline(true);
    };
    const handleIsOffline = () => {
      console.log("Setting online status to false");
      setIsOnline(false);
    };

    // Listen to the "online" event
    window.addEventListener("online", handleIsOnline);
    // Listen to the "offline" event
    window.addEventListener("offline", handleIsOffline);

    // Remove event listener! otherwise, will cause memory leaks
    return () => {
      window.removeEventListener("online", handleIsOnline);
      window.removeEventListener("offline", handleIsOffline);
    };
  }, []);

  return isOnline;
};

const Online = () => {
  // Read from useIsOnline hook to synchronize to online status
  const isOnline = useIsOnline();
  if (!isOnline) {
    return null;
  }

  return <h2>Online: ☺️</h2>;
};

const Offline = () => {
  // Read from useIsOnline hook to synchronize to online status
  const isOnline = useIsOnline();
  if (isOnline) {
    return null;
  }
  return (
    <>
      <h2>Offline: 😱</h2>
      <p>You've lost interent connection</p>
    </>
  );
};

const OnlineOffline = () => {
  return (
    <>
      <Online />
      <Offline />
    </>
  );
};

export default OnlineOffline;
