"use client";

import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
  MinusSmallIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import NextLink from "next/link";
import type { ReactNode } from "react";
import useActiveSegment from "../../../hooks/use-active-segment";
import type { ComponentType } from "react";

type iProps = {
  href: string;
  Icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
  to?: string;
};

type Props = {
  children: ReactNode;
};

const list = [
  {
    id: 1,
    href: "/search",
    Icon: MagnifyingGlassIcon,
  },
  {
    id: 2,
    href: "/",
    Icon: HomeIcon,
  },
  {
    id: 3,
    href: "/profile",
    Icon: UserIcon,
  },
];

const Link = ({ href, Icon, to }: iProps) => {
  const isActive = useActiveSegment(href);

  return (
    <motion.li whileTap={{ scale: 0.75 }}>
      <NextLink href={href} aria-label="This is a link" className={`${isActive ? "opacity-100" : "opacity-fade"}`}>
        {Icon ? (
          <Icon className={`${isActive ? "fill-typography-light opacity-100" : "opacity-fade"} h-6 w-6`} />
        ) : (
          to
        )}
      </NextLink>
    </motion.li>
  );
};

const Links = ({ children }: Props) => {
  return (
    <>
      <ul className="absolute -top-10 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-xs backdrop-blur">
        <Link href="/movies" to="Movies" />
        <MinusSmallIcon className="w-4 rotate-90" />
        <Link href="/series" to="Series" />
        <MinusSmallIcon className="w-4 rotate-90" />
        <Link href="/originals" to="Originals" />
      </ul>
      <ul className="flex items-center justify-evenly gap-4 bg-black/80 p-4 backdrop-blur">
        {children}
      </ul>
    </>
  );
};

const NavbarHorizontal = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 tablet:hidden">
      <Links>
        {list.map(({ id, href, Icon }) => (
          <Link key={id} href={href} Icon={Icon} />
        ))}
      </Links>
    </nav>
  );
};

export default NavbarHorizontal;
