'use client';

import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Icon } from '@/components';
import { SidebarContextProvider, useSidebarContext } from './Sidebar.context';
import { SidebarTabs, SidebarTabsList, SidebarTabsTab, SidebarTabsPanel } from './SidebarTabs';

export function Sidebar({
  defaultOpened = true,
  wide = false,
  children,
}: {
  defaultOpened?: boolean;
  wide?: boolean;
  children?: React.ReactNode;
}) {
  const [isOpened, setIsOpened] = useState<boolean>(defaultOpened);

  useEffect(() => {
    setIsOpened(defaultOpened);
  }, [defaultOpened]);

  return (
    <SidebarContextProvider
      value={{
        isOpened,
        setIsOpened,
        wide,
      }}
    >
      <div className={classNames('sidebar', { type_shadow: !defaultOpened, is_hide: !isOpened, type_wide: wide })}>
        {children}
      </div>
    </SidebarContextProvider>
  );
}

function SidebarTop({ children }: { children?: React.ReactNode }) {
  const ctx = useSidebarContext();
  return (
    <div className="sidebar_top">
      {children}
      <button type="button" className="btn btn_toggle" onClick={() => ctx.setIsOpened((opened) => !opened)}>
        <Icon type="arrow" />
        <span className="blind">Close sidebar</span>
      </button>
    </div>
  );
}

function SidebarBottom({
  codeURL,
  shareButton = false,
  children,
}: {
  codeURL: string;
  shareButton?: boolean;
  children?: React.ReactNode;
}) {
  const ctx = useSidebarContext();
  return (
    <div className="sidebar_bottom">
      <div className={classNames('btn_box', { full_width: !ctx.wide })}>
        <a href={codeURL} className="btn gray600" target="_blank" rel="noreferrer">
          GitHub
        </a>
        {shareButton && (
          <a href="#" className="btn gray900 btn_share">
            Share to invite other
          </a>
        )}
      </div>
      {children}
    </div>
  );
}

function GuideTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="guide_title">{children}</h2>;
}

function GuideSubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="guide_sub_title">{children}</h3>;
}

function GuideDescription({ children }: { children: React.ReactNode }) {
  return <p className="guide_desc">{children}</p>;
}

Sidebar.Top = SidebarTop;
Sidebar.Bottom = SidebarBottom;
Sidebar.Tabs = SidebarTabs;
Sidebar.TabsList = SidebarTabsList;
Sidebar.TabsTab = SidebarTabsTab;
Sidebar.TabsPanel = SidebarTabsPanel;
Sidebar.GuideTitle = GuideTitle;
Sidebar.GuideSubTitle = GuideSubTitle;
Sidebar.GuideDescription = GuideDescription;
