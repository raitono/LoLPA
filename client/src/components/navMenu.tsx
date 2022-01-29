import React from 'react';

interface NavMenuProps {
  toggleMenu: () => void
}

const NavMenu: React.FC<NavMenuProps> = ({ toggleMenu }: NavMenuProps) => (
  <section className="text-on-background-default">
    <header className="flex bg-foreground-default p-4">
      <h1 className="text-attention-primary text-3xl">LoLPA</h1>
      <span className="text-on-background-default bg-on-background-muted ml-3 rounded-full" />
    </header>
    <hr />
  </section>
);

export default NavMenu;
