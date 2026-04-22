// Header component with logo on the left
export default function Header() {
  return (
    <header style={{ position: 'absolute', top: 0, left: 0, height: '5rem', width: '100%', backgroundColor: 'transparent', zIndex: 1000, display: 'flex', alignItems: 'center' }}>
      <img 
        src="/logo_light.png" 
        alt="Logo" 
        style={{ height: '2.5rem', marginLeft: '1rem', width: 'auto' }}
      />
    </header>
  );
}
