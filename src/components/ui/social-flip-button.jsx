"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const contactItems = [
  {
    letter: "C",
    type: "github",
    href: "https://github.com/sreejithait725-c7",
    label: "Sreejit GitHub",
    icon: Github,
  },
  {
    letter: "O",
    type: "linkedin",
    href: "https://www.linkedin.com/in/sreejit-hait-91356b361/",
    label: "Sreejit LinkedIn",
    icon: Linkedin,
  },
  {
    letter: "N",
    type: "github",
    href: "https://github.com/SpinoRexLegend",
    label: "Aritra GitHub",
    icon: Github,
  },
  {
    letter: "T",
    type: "linkedin",
    href: "https://www.linkedin.com/in/aritra-maji-8262bb311/",
    label: "Aritra LinkedIn",
    icon: Linkedin,
  },
  {
    letter: "A",
    type: "github",
    href: "https://github.com/Code-syntaxvs",
    label: "Vaibhav GitHub",
    icon: Github,
  },
  {
    letter: "C",
    type: "linkedin",
    href: "https://www.linkedin.com/in/vaibhav-shrivastava-a7585b354/",
    label: "Vaibhav LinkedIn",
    icon: Linkedin,
  },
  {
    letter: "T",
    type: "email",
    href: "mailto:criminalai292@gmail.com",
    label: "Project Email",
    icon: Mail,
  },
];

export default function SocialFlipButton() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setEntered(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 10px",
        borderRadius: "16px",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow:
          "0 16px 40px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.06)",
        transform: entered ? "translateY(0)" : "translateY(10px)",
        opacity: entered ? 1 : 0,
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {contactItems.map((item, index) => {
        const Icon = item.icon;
        const isPending = item.pending;

        const commonStyle = {
          position: "relative",
          width: "40px",
          height: "40px",
          borderRadius: "11px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.09)",
          background: isPending
            ? "linear-gradient(180deg, rgba(95,95,95,0.34) 0%, rgba(62,62,62,0.24) 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          color: "white",
          transformStyle: "preserve-3d",
          transition:
            "transform 0.4s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
          cursor: isPending ? "not-allowed" : "pointer",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
        };

        const innerFace = {
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transition: "transform 0.4s ease",
        };

        if (isPending) {
          return (
            <div
              key={index}
              title={item.label}
              style={{
                ...commonStyle,
                opacity: 0.72,
              }}
            >
              <div style={innerFace}>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}
                >
                  {item.letter}
                </span>
              </div>

              <div
                style={{
                  ...innerFace,
                  transform: "rotateX(180deg)",
                  color: "rgba(255,255,255,0.62)",
                }}
              >
                <Icon size={16} />
              </div>
            </div>
          );
        }

        return (
          <a
            key={index}
            href={item.href}
            target={item.type === "email" ? "_self" : "_blank"}
            rel={item.type === "email" ? undefined : "noreferrer"}
            title={item.label}
            style={{
              ...commonStyle,
              transitionDelay: `${index * 35}ms`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
              e.currentTarget.style.boxShadow =
                "0 10px 24px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.08)";
              const letter = e.currentTarget.querySelector(".flip-front");
              const icon = e.currentTarget.querySelector(".flip-back");
              if (letter) letter.style.transform = "rotateX(180deg)";
              if (icon) icon.style.transform = "rotateX(0deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
              e.currentTarget.style.boxShadow =
                "inset 0 1px 0 rgba(255,255,255,0.05)";
              const letter = e.currentTarget.querySelector(".flip-front");
              const icon = e.currentTarget.querySelector(".flip-back");
              if (letter) letter.style.transform = "rotateX(0deg)";
              if (icon) icon.style.transform = "rotateX(-180deg)";
            }}
          >
            <div
              className="flip-front"
              style={{
                ...innerFace,
                transform: "rotateX(0deg)",
              }}
            >
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              >
                {item.letter}
              </span>
            </div>

            <div
              className="flip-back"
              style={{
                ...innerFace,
                transform: "rotateX(-180deg)",
              }}
            >
              <Icon size={16} />
            </div>
          </a>
        );
      })}
    </div>
  );
}