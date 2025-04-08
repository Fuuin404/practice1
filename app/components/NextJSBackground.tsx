"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import p5 from "p5";

export default function NextJSBackground() {
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let shapes = [];
      const numShapes = 3;
      const items = [
        { label: "Routing", href: "/nextjs/routing", shape: "circle" },
        { label: "Components", href: "/nextjs/components", shape: "square" },
        { label: "Layouts", href: "/nextjs/layouts", shape: "triangle" },
      ];

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.style("position", "absolute");
        canvas.style("top", "0");
        canvas.style("left", "0");
        canvas.style("z-index", "-10");
        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
        for (let i = 0; i < numShapes; i++) {
          shapes.push({
            x: p.random(50, p.width - 50),
            y: p.random(50, p.height - 50),
            size: 70,
            speedX: p.random(-2, 2),
            speedY: p.random(-2, 2),
            label: items[i].label,
            href: items[i].href,
            shape: items[i].shape,
            selected: false,
          });
        }
      };

      p.draw = () => {
        p.background(240, 240, 245, 150);
        for (let shape of shapes) {
          shape.x += shape.speedX;
          shape.y += shape.speedY;

          if (shape.x < 25 || shape.x > p.width - 25) shape.speedX *= -1;
          if (shape.y < 25 || shape.y > p.height - 25) shape.speedY *= -1;

          if (shape.selected) {
            p.fill(200, 0, 0, 200);
          } else {
            p.fill(255, 0, 0, 200);
          }

          if (shape.shape === "circle") {
            p.ellipse(shape.x, shape.y, shape.size);
          } else if (shape.shape === "square") {
            p.rectMode(p.CENTER);
            p.rect(shape.x, shape.y, shape.size, shape.size);
          } else if (shape.shape === "triangle") {
            p.triangle(
              shape.x,
              shape.y - shape.size / 2,
              shape.x - shape.size / 2,
              shape.y + shape.size / 2,
              shape.x + shape.size / 2,
              shape.y + shape.size / 2
            );
          }

          p.fill(255, 255, 255);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(shape.label, shape.x, shape.y);
        }
      };

      p.mousePressed = () => {
        for (let shape of shapes) {
          let d = p.dist(p.mouseX, p.mouseY, shape.x, shape.y);
          if (d < shape.size / 2) {
            shapes.forEach((s) => (s.selected = false));
            shape.selected = true;
            router.push(shape.href);
          }
        }
      };
    };

    const p5Instance = new p5(sketch, containerRef.current);

    return () => {
      p5Instance.remove();
    };
  }, [router]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-auto"
    />
  );
}
