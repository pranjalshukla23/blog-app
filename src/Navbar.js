import { Link } from "react-router-dom";

//Link component will take the path inside to property to go to , this path is defined inside Route component which is inside Switch component
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>This is Dojo Blog</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">New Blog</Link>
      </div>
    </nav>
  );
};

export default Navbar;
