import Header from './Header';
import AppBar from './AppBar';

const layoutStyle = {
  margin: 0,
};

const Layout = props => (
  <div style={layoutStyle}>
    <AppBar />
    {props.children}
  </div>
);

<style global jsx>{`
        body {
          margin: 0;
        }
      `}</style>

export default Layout;