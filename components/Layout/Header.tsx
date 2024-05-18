import { ReactElement, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button, Box, Icon, Heading, Text, Flex, Link } from 'yorkie-ui';
import { isValidToken } from '@/utils/isValidToken';
import { MobileGnbDropdown } from './MobileGnbDropdown';
import LogoSVG from '@/public/assets/icons/logo_horizontal_xs.svg';
import LogoGnbSVG from '@/public/assets/icons/logo_gnb.svg';
import { StarIcon } from '@/components/Icons/Icons';

export function Header(): ReactElement {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const isLoggedIn = isValidToken(localStorage.getItem('token'));
    setIsLoggedIn(isLoggedIn);
  }, [setIsLoggedIn]);

  return (
    <Flex justifyContent="space-between" paddingLeft="6" alignItems="center" position="sticky" height="20">
      <Flex gap="12">
        <Heading as="h1">
          <span className="blind">Yorkie</span>
          <Box display={{ base: 'none', lg: 'block' }}>
            <Link href="/" fontSize="8xl">
              <LogoSVG />
            </Link>
          </Box>
          <Box display={{ base: 'block', md: 'none' }}>
            <Link fontSize="8xl">
              <LogoGnbSVG />
            </Link>
          </Box>
        </Heading>
        <Flex gap="10">
          <Button
            as="link"
            size="sm"
            variant="outline"
            border="none"
            href="/products"
            className={`gnb_item ${pathname == '/products' ? 'orange.default' : ''}`}
            fontSize="md"
          >
            Products
          </Button>
          <Button
            as="link"
            size="sm"
            variant="outline"
            border="none"
            href="/docs"
            className={`gnb_item ${pathname == '/docs/[[...slug]]' ? 'orange.default' : ''}`}
            fontSize="md"
          >
            Documentation
          </Button>
          <Button
            as="link"
            size="sm"
            variant="outline"
            border="none"
            href="/examples"
            className={`gnb_item ${pathname == '/examples' ? 'orange.default' : ''}`}
            fontSize="md"
          >
            Examples
          </Button>
          <Button
            as="link"
            size="sm"
            variant="outline"
            border="none"
            href="/community"
            className={`gnb_item ${pathname == '/community' ? 'orange.default' : ''}`}
            fontSize="md"
          >
            Community
          </Button>
        </Flex>
      </Flex>
      <Flex gap="3">
        {isLoggedIn ? (
          <Button variant="outline" as="link" href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}`}>
            Dashboard
          </Button>
        ) : isLoggedIn === false ? (
          <>
            <Button variant="outline" as="link" href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/login`}>
              Sign in
            </Button>
            <Button
              as="link"
              href={`${process.env.NEXT_PUBLIC_DASHBOARD_PATH}/signup`}
              icon={<StarIcon />}
              position="start"
            >
              Start for free
            </Button>
          </>
        ) : null}
        <MobileGnbDropdown isLoggedIn={!isLoggedIn} />
      </Flex>
    </Flex>
  );
}
