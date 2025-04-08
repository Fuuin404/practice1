"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import p5 from "p5";

export default function P5Background() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      const balls: {
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        label: string;
        href: string;
        selected: boolean;
      }[] = [];

      const numBalls = 10;
      const items = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Posts", href: "/posts" },
        { label: "Videos", href: "/videos" },
        { label: "P5.js", href: "/p5js" },
        { label: "High Spirits", href: "/high-spirits" },
        { label: "Japan", href: "/japan" },
        { label: "Design", href: "/design" },
        { label: "Next.js", href: "/nextjs" },
      ];

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(containerRef.current!);
        canvas.style("position", "absolute");
        canvas.style("top", "0");
        canvas.style("left", "0");
        canvas.style("z-index", "-10");

        for (let i = 0; i < numBalls; i++) {
          balls.push({
            x: p.random(50, p.width - 50),
            y: p.random(50, p.height - 50),
            size: 70,
            speedX: p.random(-2, 2),
            speedY: p.random(-2, 2),
            label: items[i].label,
            href: items[i].href,
            selected: false,
          });
        }
      };

      p.draw = () => {
        p.clear();
        p.background(240, 240, 245, 150);

        balls.forEach((ball) => {
          ball.x += ball.speedX;
          ball.y += ball.speedY;

          // Bounce logic
          if (ball.x < ball.size / 2 || ball.x > p.width - ball.size / 2) {
            ball.speedX *= -1;
          }
          if (ball.y < ball.size / 2 || ball.y > p.height - ball.size / 2) {
            ball.speedY *= -1;
          }

          // Check hover
          const isHovered =
            p.dist(p.mouseX, p.mouseY, ball.x, ball.y) < ball.size / 2;

          p.fill(isHovered ? 0 : 200);
          p.stroke(100);
          p.ellipse(ball.x, ball.y, ball.size);

          // Label
          p.fill(50);
          p.noStroke();
          p.textAlign(p.CENTER, p.CENTER);
          p.text(ball.label, ball.x, ball.y);

          // Cursor
          if (isHovered) {
            p.cursor(p.HAND);
          }
        });
      };

      p.mousePressed = () => {
        for (const ball of balls) {
          const isHovered =
            p.dist(p.mouseX, p.mouseY, ball.x, ball.y) < ball.size / 2;
          if (isHovered) {
            router.push(ball.href);
            break;
          }
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    const canvas = new p5(sketch);

    return () => {
      canvas.remove();
    };
  }, [router]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full fixed top-0 left-0 -z-10"
    />
  );
}
