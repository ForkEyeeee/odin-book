import { cookies, headers } from 'next/headers';
import { getServerSession } from 'next-auth';

export const getServerActionSession = () => {
  const req = {
    headers: Object.fromEntries(headers()),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map(c => [c.name, c.value])
    ),
  } as any;
  const res = {
    getHeader() {
      /* empty */
    },
    setCookie() {
      /* empty */
    },
    setHeader() {
      /* empty */
    },
  } as any;
  return getServerSession(req, res, authConfig); // authConfig is your [...nextAuth] route config
};
