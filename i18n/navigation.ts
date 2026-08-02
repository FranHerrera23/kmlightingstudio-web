import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Wrappers de <Link>, useRouter, usePathname, redirect que respetan el prefijo de idioma.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
