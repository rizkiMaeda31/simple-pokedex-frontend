import Link from 'next/link';

const StyleNavBar = {
  margin: 10,
  backgroundColor: "lightcoral",
  border: "2px, dotted, #DDD"
}

const StyleLink = {
  marginRight: 10
}

const NavBar = () => {
  return (
    <div style={StyleNavBar}>
      <Link href="/" style={StyleLink}>
        Home
      </Link>
      <Link href="/list/pokemon" style={StyleLink}>
        Pokemon
      </Link>
    </div>
  );
}

export default NavBar