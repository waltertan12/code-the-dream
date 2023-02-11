import { useEffect, useState } from "react";

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(true);

  // TODO: Implement online change

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
