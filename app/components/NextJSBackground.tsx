"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import p5 from "p5";

export default function NextJSBackground() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      { label: "Routing", href: "/nextjs/routing", shape: "circle" },
      { label: "Components", href: "/nextjs/components", shape: "square" },
      { label: "Layouts", href: "/nextjs/layouts", shape: "triangle" },
    ];

    type Shape = {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      label: string;
      href: string;
      shape: "circle" | "square" | "triangle";
      selected: boolean;
    };

    const sketch = (p: p5) => {
      const shapes: Shape[] = [];
      const shapeSize = 70;

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(containerRef.current!);
        canvas.style("position", "absolute");
        canvas.style("top", "0");
        canvas.style("left", "0");
        canvas.style("z-index", "-10");
        p.frameRate(60);

        items.forEach((item) => {
          shapes.push({
            x: p.random(50, p.width - 50),
            y: p.random(50, p.height - 50),
            size: shapeSize,
            speedX: p.random(-2, 2),
            speedY: p.random(-2, 2),
            label: item.label,
            href: item.href,
            shape: item.shape as Shape["shape"],
            selected: false,
          });
        });
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };

      p.draw = () => {
        p.clear();
        p.background(240, 240, 245, 150);

        shapes.forEach((shape) => {
          // Move shape
          shape.x += shape.speedX;
          shape.y += shape.speedY;

          // Bounce
          if (shape.x < 25 || shape.x > p.width - 25) shape.speedX *= -1;
          if (shape.y < 25 || shape.y > p.height - 25) shape.speedY *= -1;

          // Hover
          const isHovered =
            p.dist(p.mouseX, p.mouseY, shape.x, shape.y) < shape.size / 2;

          // Fill
          p.fill(
            shape.selected
              ? [200, 0, 0, 200]
              : isHovered
              ? [255, 100, 100, 200]
              : [255, 0, 0, 180]
          );

          // Draw shape
          drawShape(p, shape);

          // Label
          p.fill(255);
          p.noStroke();
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(12);
          p.textStyle(p.BOLD);
          p.text(shape.label, shape.x, shape.y);
        });
      };

      p.mousePressed = () => {
        shapes.forEach((shape) => {
          if (isShapeClicked(p, shape)) {
            shapes.forEach((s) => (s.selected = false));
            shape.selected = true;
            router.push(shape.href);
          }
        });
      };

      function drawShape(p: p5, shape: Shape) {
        switch (shape.shape) {
          case "circle":
            p.ellipse(shape.x, shape.y, shape.size);
            break;
          case "square":
            p.rectMode(p.CENTER);
            p.rect(shape.x, shape.y, shape.size, shape.size);
            break;
          case "triangle":
            p.triangle(
              shape.x,
              shape.y - shape.size / 2,
              shape.x - shape.size / 2,
              shape.y + shape.size / 2,
              shape.x + shape.size / 2,
              shape.y + shape.size / 2
            );
            break;
        }
      }

      function isShapeClicked(p: p5, shape: Shape): boolean {
        if (shape.shape === "circle") {
          return p.dist(p.mouseX, p.mouseY, shape.x, shape.y) < shape.size / 2;
        }
        if (shape.shape === "square" || shape.shape === "triangle") {
          return (
            p.mouseX > shape.x - shape.size / 2 &&
            p.mouseX < shape.x + shape.size / 2 &&
            p.mouseY > shape.y - shape.size / 2 &&
            p.mouseY < shape.y + shape.size / 2
          );
        }
        return false;
      }
    };

    const p5Instance = new p5(sketch);

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
