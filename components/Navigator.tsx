'use client';

import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { type DocsOrderList } from '@/utils/mdxUtils';
import ArrowSVG from '@/public/assets/icons/icon_arrow.svg';

export function Navigator({ navList }: { navList: DocsOrderList }) {
  return (
    <nav className="navigator">
      <NavList navList={navList} />
    </nav>
  );
}

function NavList({ navList }: { navList: DocsOrderList }) {
  const pathname = usePathname();

  return (
    <ul className="navigator_list">
      {navList.map(({ title, href, subMenu }) => {
        const isActive = href === '/docs' ? pathname === href : pathname?.startsWith(href) ?? false;
        return (
          <NavGroup key={href} isActive={isActive}>
            {subMenu.length === 0 ? (
              <NavItem title={title} href={href} isActive={pathname?.split('#')[0] === href} />
            ) : (
              <>
                <NavMenu title={title} href={href} isActive={isActive} />
                {isActive && <NavList navList={subMenu} />}
              </>
            )}
          </NavGroup>
        );
      })}
    </ul>
  );
}

function NavGroup({ isActive, children }: { isActive: boolean; children: React.ReactNode }) {
  return <li className={classNames('navigator_group', { is_active: isActive })}>{children}</li>;
}

function NavMenu({ title, href, isActive }: { title: string; href: string; isActive: boolean }) {
  return (
    <Link href={href} className={classNames('navigator_menu', { is_active: isActive })}>
      <span className="icon">
        <ArrowSVG />
      </span>
      {title}
    </Link>
  );
}

function NavItem({ title, href, isActive }: { title: string; href: string; isActive: boolean }) {
  return (
    <Link href={href} className={classNames('navigator_item', { is_active: isActive })}>
      {title}
    </Link>
  );
}
