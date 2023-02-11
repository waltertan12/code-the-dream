import { useEffect, useState } from "react";

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleIsOnline = () => {
      console.log("Setting status to online");
      setIsOnline(true);
    };
    const handleIsOffline = () => {
      console.log("Setting status to offline");
      setIsOnline(false);
    };
    window.addEventListener("online", handleIsOnline);
    window.addEventListener("offline", handleIsOffline);
    return () => {
      window.removeEventListener("online", handleIsOnline);
      window.removeEventListener("offline", handleIsOffline);
    };
  }, []);

  return isOnline;
};

const OnlineOffline = () => {
  const isOnline = useIsOnline();
  if (isOnline) {
    return <h2>Online: ☺️</h2>;
  }

  return <h2>Offline: 😱</h2>;
};

export default OnlineOffline;
