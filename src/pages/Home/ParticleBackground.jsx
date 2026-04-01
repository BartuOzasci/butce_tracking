import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="absolute inset-0 bg-black z-0 overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: { value: "transparent" },
          },
          fpsLimit: 120,
          particles: {
            number: {
              value: 300, // Yıldız sayısı
              density: {
                enable: true,
                area: 800,
              },
            },
            color: {
              value: ["#ffffff", "#ffd700", "#58a6ff", "#ff8c00", "#ff00ff", "#00ffff"], // Çeşitli yıldız renkleri artırıldı
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: { min: 0.3, max: 1 },
              animation: {
                enable: true,
                speed: 1.5,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: 3.5 },
              animation: {
                enable: true,
                speed: 3,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 1, // Biraz daha hızlandırıldı
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
            },
            links: {
              enable: false,
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "bubble",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 250,
                size: 6,
                duration: 2,
                opacity: 1,
              },
            },
          },
          detectRetina: true,
        }}
        className="w-full h-full"
      />
    </div>
  );
}