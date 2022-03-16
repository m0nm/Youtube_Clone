// the purpose of this hook is to wait for "theme" from useTheme
// to be mounted so ui components render correctly

import { useEffect, useState } from "react";

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  // wait for theme to be mounted on client

  useEffect(() => setMounted(true), []);

  return mounted;
};
