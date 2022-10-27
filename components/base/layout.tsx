import Header from './header';

type Props = {
  children?: React.ReactElement | undefined;
  className?: string | undefined;
};

const Layout: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={className}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
