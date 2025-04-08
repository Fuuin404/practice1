"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import p5 from "p5";

export default function P5Background() {
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let balls = [];
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
        canvas.style("position", "absolute");
        canvas.style("top", "0");
        canvas.style("left", "0");
        canvas.style("z-index", "-10");
        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };

        for (let i = 0; i < numBalls; i++) {
          balls.push({
            x: p.random(50, p.width - 50),
            y: p.random(50, p.height - 50),
            size: 70,
            speedX: p.random(-2, 2), // Random horizontal speed
            speedY: p.random(-2, 2), // Random vertical speed
            label: items[i].label,
            href: items[i].href,
            selected: false,
          });
        }
      };

      p.draw = () => {
        p.background(240, 240, 245, 150);
        for (let ball of balls) {
          // Update position
          ball.x += ball.speedX;
          ball.y += ball.speedY;

          // Bounce off walls
          if (ball.x < ball.size / 2 || ball.x > p.width - ball.size / 2) {
            ball.speedX *= -1;
          }
          if (ball.y < ball.size / 2 || ball.y > p.height - ball.size / 2) {
            ball.speedY *= -1;
          }

          if (ball.selected) {
            p.fill(200, 0, 0, 200); // Darker red when selected
          } else {
            p.fill(255, 0, 0, 200); // Bright red when unselected
          }
          p.ellipse(ball.x, ball.y, ball.size);

          p.fill(255, 255, 255); // White text
          p.textAlign(p.CENTER, p.CENTER);
          p.text(ball.label, ball.x, ball.y);
        }
      };

      p.mousePressed = () => {
        for (let ball of balls) {
          let d = p.dist(p.mouseX, p.mouseY, ball.x, ball.y);
          if (d < ball.size / 2) {
            balls.forEach((b) => (b.selected = false));
            ball.selected = true;
            router.push(ball.href);
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
