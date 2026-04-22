import Header from "~/components/Header";
import PlasmaSphere from "~/components/PlasmaSphere";

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <PlasmaSphere />
      <Header />
    </div>
  );
}