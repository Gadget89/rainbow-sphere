// Wrapper component to push plasma sphere below header
import PlasmaSphere from "./PlasmaSphere";

export default function PlasmaSphereWrapper() {
  return (
    <div className="w-full" style={{ height: "calc(100vh - 5rem)" }}>
      <PlasmaSphere />
    </div>
  );
}
