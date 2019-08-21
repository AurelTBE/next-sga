import Header from './Header';

const Layout = props => (
  <>
    <Header />
    {props.children}
  </>
);



export default Layout;