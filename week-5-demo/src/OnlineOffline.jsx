import { useEffect, useState } from "react";

const useIsOnline = () => {
  // TODO: Implement online/offline hook
  return navigator.onLine;
};

const Online = () => {
  const isOnline = useIsOnline();
  if (!isOnline) {
    return null;
  }

  return <h2>Online: ☺️</h2>;
};

const Offline = () => {
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
