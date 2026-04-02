import { useMemo, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import SocialFlipButton from "@/components/ui/social-flip-button";

function CyberStyles() {
  return (
    <style>{`
      @keyframes cyberPulseGreen {
        0% { box-shadow: 0 0 10px rgba(70,210,130,0.28), 0 0 0 rgba(70,210,130,0.0); }
        50% { box-shadow: 0 0 18px rgba(70,210,130,0.48), 0 0 28px rgba(70,210,130,0.18); }
        100% { box-shadow: 0 0 10px rgba(70,210,130,0.28), 0 0 0 rgba(70,210,130,0.0); }
      }

      @keyframes cyberPulseOrange {
        0% { box-shadow: 0 0 10px rgba(255,180,70,0.22), 0 0 0 rgba(255,180,70,0.0); }
        50% { box-shadow: 0 0 18px rgba(255,180,70,0.42), 0 0 28px rgba(255,180,70,0.18); }
        100% { box-shadow: 0 0 10px rgba(255,180,70,0.22), 0 0 0 rgba(255,180,70,0.0); }
      }

      @keyframes cyberPulsePurple {
        0% { box-shadow: 0 0 10px rgba(180,120,255,0.24), 0 0 0 rgba(180,120,255,0.0); }
        50% { box-shadow: 0 0 20px rgba(180,120,255,0.44), 0 0 30px rgba(180,120,255,0.18); }
        100% { box-shadow: 0 0 10px rgba(180,120,255,0.24), 0 0 0 rgba(180,120,255,0.0); }
      }

      @keyframes cyberPulseRed {
        0% { box-shadow: 0 0 8px rgba(255,90,90,0.18); }
        50% { box-shadow: 0 0 16px rgba(255,90,90,0.34); }
        100% { box-shadow: 0 0 8px rgba(255,90,90,0.18); }
      }

      @keyframes pathFlow {
        0% { box-shadow: 0 0 8px rgba(90,150,255,0.12), inset 0 0 0 rgba(255,255,255,0.0); }
        50% { box-shadow: 0 0 18px rgba(90,150,255,0.34), inset 0 0 12px rgba(255,255,255,0.08); }
        100% { box-shadow: 0 0 8px rgba(90,150,255,0.12), inset 0 0 0 rgba(255,255,255,0.0); }
      }

      @keyframes scanSweep {
        0% { transform: translateX(-120%); opacity: 0; }
        20% { opacity: 0.32; }
        50% { opacity: 0.18; }
        100% { transform: translateX(180%); opacity: 0; }
      }

      @keyframes panelGlow {
        0% { box-shadow: 0 10px 40px rgba(0,0,0,0.25), inset 0 0 0 rgba(255,255,255,0.0); }
        50% { box-shadow: 0 12px 46px rgba(0,0,0,0.32), inset 0 0 12px rgba(255,255,255,0.02); }
        100% { box-shadow: 0 10px 40px rgba(0,0,0,0.25), inset 0 0 0 rgba(255,255,255,0.0); }
      }

      .hud-panel {
        position: relative;
        overflow: hidden;
        animation: panelGlow 5.5s ease-in-out infinite;
      }

      .hud-panel::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(to bottom, rgba(255,255,255,0.035), rgba(255,255,255,0.0) 20%),
          repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,0.02) 0px,
            rgba(255,255,255,0.02) 1px,
            transparent 2px,
            transparent 6px
          );
        opacity: 0.22;
      }

      .hud-panel::after {
        content: "";
        position: absolute;
        top: 0;
        left: -30%;
        width: 30%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255,255,255,0.05),
          transparent
        );
        pointer-events: none;
        animation: scanSweep 6.2s linear infinite;
      }

      .hud-title {
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .hud-subtle {
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .cyber-grid-shell {
        position: relative;
        padding: 14px;
        border-radius: 20px;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)),
          rgba(6,10,9,0.38);
        border: 1px solid rgba(255,255,255,0.06);
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.04),
          0 12px 28px rgba(0,0,0,0.22);
      }

      .cyber-grid-shell::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 20px;
        pointer-events: none;
        background:
          linear-gradient(to right, rgba(255,255,255,0.02), transparent 28%, transparent 72%, rgba(255,255,255,0.02)),
          linear-gradient(to bottom, rgba(255,255,255,0.02), transparent 28%, transparent 72%, rgba(255,255,255,0.02));
      }

      .cyber-cell {
        position: relative;
        overflow: hidden;
        transition: transform 0.18s ease, box-shadow 0.24s ease, border-color 0.24s ease, filter 0.24s ease;
      }

      .cyber-cell::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        background: linear-gradient(180deg, rgba(255,255,255,0.06), transparent 40%);
        opacity: 0.7;
      }

      .cyber-cell.clickable:hover {
        transform: translateY(-1px) scale(1.02);
        border-color: rgba(255,255,255,0.2) !important;
        box-shadow: 0 0 14px rgba(255,255,255,0.08);
      }

      .cell-crime {
        animation: cyberPulseRed 2.7s ease-in-out infinite;
      }

      .cell-obstacle {
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.03),
          inset 0 -10px 18px rgba(0,0,0,0.22),
          0 0 10px rgba(0,0,0,0.14);
      }

      .cell-path {
        animation: pathFlow 1.7s ease-in-out infinite;
      }

      .cell-predicted-green {
        animation: cyberPulseGreen 2.2s ease-in-out infinite;
      }

      .cell-predicted-orange {
        animation: cyberPulseOrange 2.2s ease-in-out infinite;
      }

      .cell-predicted-purple {
        animation: cyberPulsePurple 2.3s ease-in-out infinite;
      }

      .summary-chip {
        position: relative;
        overflow: hidden;
      }

      .summary-chip::after {
        content: "";
        position: absolute;
        top: 0;
        left: -35%;
        width: 24%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.045), transparent);
        animation: scanSweep 7s linear infinite;
        pointer-events: none;
      }
    `}</style>
  );
}

function HomePage() {
  const navigate = useNavigate();

  const [criminalName, setCriminalName] = useState("");
  const [gridSize, setGridSize] = useState("8x8");
  const [visualization, setVisualization] = useState("Heatmap Grid");
  const [predictedOutput, setPredictedOutput] = useState("Best Criminal Zone");
  const [selectedCrimeCells, setSelectedCrimeCells] = useState([]);
  const [selectedObstacleCells, setSelectedObstacleCells] = useState([]);
  const [placementMode, setPlacementMode] = useState("crime");

  const parseGridSize = (value) => {
    const cleaned = value.toLowerCase().replace(/\s/g, "");
    const match = cleaned.match(/^(\d+)x(\d+)$/);
    if (!match) return { rows: 8, cols: 8, valid: false };
    const rows = Math.max(1, Math.min(20, parseInt(match[1], 10)));
    const cols = Math.max(1, Math.min(20, parseInt(match[2], 10)));
    return { rows, cols, valid: true };
  };

  const { rows: gridRows, cols: gridCols, valid: isGridValid } = useMemo(
    () => parseGridSize(gridSize),
    [gridSize]
  );

  const cardStyle = {
    width: "320px",
    minHeight: "430px",
    padding: "28px",
    borderRadius: "24px",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    background: "rgba(14, 24, 20, 0.34)",
    border: "1px solid rgba(255,255,255,0.09)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const gridCardStyle = {
    width: "440px",
    minHeight: "430px",
    padding: "28px",
    borderRadius: "24px",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    background: "rgba(14, 24, 20, 0.34)",
    border: "1px solid rgba(255,255,255,0.09)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.05)",
    outline: "none",
    background: "rgba(7, 14, 11, 0.55)",
    color: "white",
    fontSize: "15px",
    boxSizing: "border-box",
  };

  const selectStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.05)",
    outline: "none",
    background: "rgba(7, 14, 11, 0.55)",
    color: "white",
    fontSize: "15px",
    boxSizing: "border-box",
    cursor: "pointer",
  };

  const labelStyle = {
    fontSize: "14px",
    opacity: 0.82,
    marginBottom: "7px",
    fontWeight: 500,
  };

  const fixedValueStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.05)",
    background: "rgba(7, 14, 11, 0.55)",
    color: "white",
    fontSize: "15px",
    boxSizing: "border-box",
    minHeight: "21px",
    display: "flex",
    alignItems: "center",
  };

  const visibleCrimeCells = useMemo(() => {
    return selectedCrimeCells.filter(
      (cell) => cell.row < gridRows && cell.col < gridCols
    );
  }, [selectedCrimeCells, gridRows, gridCols]);

  const visibleObstacleCells = useMemo(() => {
    return selectedObstacleCells.filter(
      (cell) => cell.row < gridRows && cell.col < gridCols
    );
  }, [selectedObstacleCells, gridRows, gridCols]);

  const crimeCoordinateText = useMemo(() => {
    if (visibleCrimeCells.length === 0) return "No crime points selected";
    return visibleCrimeCells.map((cell) => `(${cell.row},${cell.col})`).join(", ");
  }, [visibleCrimeCells]);

  const obstacleCoordinateText = useMemo(() => {
    if (visibleObstacleCells.length === 0) return "No obstacles selected";
    return visibleObstacleCells.map((cell) => `(${cell.row},${cell.col})`).join(", ");
  }, [visibleObstacleCells]);

  const toggleCrimeCell = (row, col) => {
    const key = `${row}-${col}`;
    setSelectedCrimeCells((prev) => {
      const exists = prev.some((cell) => cell.key === key);
      if (exists) {
        return prev.filter((cell) => cell.key !== key);
      }
      return [...prev, { key, row, col }];
    });
  };

  const toggleObstacleCell = (row, col) => {
    const key = `${row}-${col}`;
    setSelectedObstacleCells((prev) => {
      const exists = prev.some((cell) => cell.key === key);
      if (exists) {
        return prev.filter((cell) => cell.key !== key);
      }
      return [...prev, { key, row, col }];
    });
  };

  const handleGridCellClick = (row, col) => {
    const crimeExists = visibleCrimeCells.some(
      (cell) => cell.row === row && cell.col === col
    );
    const obstacleExists = visibleObstacleCells.some(
      (cell) => cell.row === row && cell.col === col
    );

    if (placementMode === "crime") {
      if (obstacleExists) {
        setSelectedObstacleCells((prev) =>
          prev.filter((cell) => !(cell.row === row && cell.col === col))
        );
      }
      toggleCrimeCell(row, col);
    } else {
      if (crimeExists) {
        setSelectedCrimeCells((prev) =>
          prev.filter((cell) => !(cell.row === row && cell.col === col))
        );
      }
      toggleObstacleCell(row, col);
    }
  };

  const handleResetGrid = () => {
    setSelectedCrimeCells([]);
    setSelectedObstacleCells([]);
  };

  const handleRunAnalysis = () => {
    navigate("/result", {
      state: {
        criminalName: criminalName || "Unknown Subject",
        gridSize,
        visualization,
        predictedOutput,
        selectedCrimeCells: visibleCrimeCells,
        selectedObstacleCells: visibleObstacleCells,
        gridRows,
        gridCols,
      },
    });
  };

  const getHomeCellType = (row, col) => {
    const isCrime = visibleCrimeCells.some(
      (cell) => cell.row === row && cell.col === col
    );
    const isObstacle = visibleObstacleCells.some(
      (cell) => cell.row === row && cell.col === col
    );
    if (isCrime) return "crime";
    if (isObstacle) return "obstacle";
    return "empty";
  };

  const getHomeCellStyle = (type) => {
    let background = "rgba(255,255,255,0.05)";
    let border = "1px solid rgba(255,255,255,0.08)";
    let content = "";
    let boxShadow = "inset 0 1px 0 rgba(255,255,255,0.03)";
    let classNames = "cyber-cell clickable";

    if (type === "crime") {
      background =
        "linear-gradient(180deg, rgba(255,120,120,0.95) 0%, rgba(255,70,70,0.92) 100%)";
      border = "1px solid rgba(255,180,180,0.22)";
      content = "C";
      classNames += " cell-crime";
      boxShadow =
        "0 0 14px rgba(255,90,90,0.18), inset 0 1px 0 rgba(255,255,255,0.08)";
    } else if (type === "obstacle") {
      background =
        "linear-gradient(180deg, rgba(44,44,44,0.98) 0%, rgba(18,18,18,0.98) 100%)";
      border = "1px solid rgba(255,255,255,0.06)";
      content = "X";
      classNames += " cell-obstacle";
      boxShadow =
        "inset 0 1px 0 rgba(255,255,255,0.03), inset 0 -8px 14px rgba(0,0,0,0.26)";
    }

    return {
      classNames,
      content,
      style: {
        width: "38px",
        height: "38px",
        borderRadius: "10px",
        background,
        border,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "11px",
        fontWeight: 700,
        cursor: "pointer",
        userSelect: "none",
        boxShadow,
      },
    };
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        color: "white",
        overflowX: "hidden",
      }}
    >
      <CyberStyles />

      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -3,
        }}
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
      </video>

      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.28) 38%, rgba(0,0,0,0.78) 100%)",
          zIndex: -2,
        }}
      />

      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.22)",
          zIndex: -1,
        }}
      />

      <section
        style={{
          minHeight: "100vh",
          position: "relative",
          paddingLeft: "80px",
          paddingRight: "80px",
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              maxWidth: "760px",
              textAlign: "right",
              marginTop: "-40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <h1
              className="got-title"
              style={{
                fontSize: "92px",
                margin: 0,
                fontWeight: 400,
                lineHeight: 1.05,
                textShadow:
                  "0 0 14px rgba(255,255,255,0.08), 0 0 38px rgba(255,255,255,0.04)",
              }}
            >
              DOOM HUNT
            </h1>

            <p
              style={{
                marginTop: "16px",
                fontSize: "24px",
                opacity: 0.85,
              }}
            >
              A* Powered Crime Analysis System
            </p>

            <p
              style={{
                marginTop: "8px",
                marginBottom: "18px",
                fontSize: "16px",
                opacity: 0.62,
                letterSpacing: "1.2px",
              }}
            >
              Powered by Aasha@5172
            </p>

            <div
              style={{
                transform: "scale(0.96)",
                transformOrigin: "right center",
              }}
            >
              <SocialFlipButton />
            </div>
          </div>
        </div>

        <p
          style={{
            position: "absolute",
            left: "80px",
            bottom: "90px",
            margin: 0,
            fontSize: "18px",
            opacity: 0.92,
          }}
        >
          Scroll Down to Begin Analysis ↓
        </p>
      </section>

      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "50px 40px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "28px",
            flexWrap: "wrap",
            alignItems: "stretch",
          }}
        >
          <div style={cardStyle} className="hud-panel">
            <h2 className="hud-title" style={{ margin: 0, fontSize: "22px", fontWeight: 600 }}>
              Criminal Information
            </h2>

            <div>
              <div style={labelStyle} className="hud-subtle">Criminal Name</div>
              <input
                type="text"
                placeholder="Enter criminal name"
                style={inputStyle}
                value={criminalName}
                onChange={(e) => setCriminalName(e.target.value)}
              />
            </div>

            <div>
              <div style={labelStyle} className="hud-subtle">Grid Size</div>
              <input
                type="text"
                placeholder="8x8"
                style={inputStyle}
                value={gridSize}
                onChange={(e) => setGridSize(e.target.value)}
              />
              {!isGridValid && (
                <div
                  style={{
                    marginTop: "6px",
                    fontSize: "12px",
                    color: "#ffb3b3",
                    opacity: 0.9,
                  }}
                >
                  Enter format like 8x8 or 10x10
                </div>
              )}
            </div>

            <div>
              <div style={labelStyle} className="hud-subtle">Obstacles</div>
              <div style={fixedValueStyle}>{visibleObstacleCells.length}</div>
            </div>

            <div>
              <div style={labelStyle} className="hud-subtle">Selected Crime Points</div>
              <div style={fixedValueStyle}>{crimeCoordinateText}</div>
            </div>

            <div>
              <div style={labelStyle} className="hud-subtle">Selected Obstacles</div>
              <div style={fixedValueStyle}>{obstacleCoordinateText}</div>
            </div>
          </div>

          <div style={gridCardStyle} className="hud-panel">
            <h2 className="hud-title" style={{ margin: 0, fontSize: "22px", fontWeight: 600 }}>
              Tactical Grid
            </h2>

            <p
              style={{
                margin: "0 0 6px 0",
                fontSize: "14px",
                opacity: 0.8,
                lineHeight: 1.6,
              }}
            >
              Choose a mode, then click grid cells to place crime points or obstacles.
            </p>

            <div
              style={{
                display: "flex",
                gap: "14px",
                marginBottom: "8px",
                flexWrap: "wrap",
              }}
            >
              <LiquidMetalButton
                onClick={() => setPlacementMode("crime")}
                size="sm"
                borderWidth={3}
                metalConfig={{
                  colorBack: placementMode === "crime" ? "#9a9a9a" : "#737373",
                  colorTint: "#ffffff",
                }}
              >
                Crime Point Mode
              </LiquidMetalButton>

              <LiquidMetalButton
                onClick={() => setPlacementMode("obstacle")}
                size="sm"
                borderWidth={3}
                metalConfig={{
                  colorBack: placementMode === "obstacle" ? "#9a9a9a" : "#737373",
                  colorTint: "#ffffff",
                }}
              >
                Obstacle Mode
              </LiquidMetalButton>
            </div>

            <div
              style={{
                fontSize: "13px",
                opacity: 0.86,
                marginBottom: "6px",
              }}
            >
              Current Mode: {placementMode === "crime" ? "Crime Point" : "Obstacle"}
            </div>

            <div className="cyber-grid-shell">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${gridCols}, 38px)`,
                  gap: "9px",
                  justifyContent: "center",
                }}
              >
                {Array.from({ length: gridRows * gridCols }).map((_, index) => {
                  const row = Math.floor(index / gridCols);
                  const col = index % gridCols;
                  const cell = getHomeCellStyle(getHomeCellType(row, col));

                  return (
                    <div
                      key={`${row}-${col}`}
                      className={cell.classNames}
                      style={cell.style}
                      onClick={() => handleGridCellClick(row, col)}
                      title={`(${row}, ${col})`}
                    >
                      {cell.content}
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                marginTop: "18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  flexWrap: "wrap",
                  fontSize: "13px",
                  opacity: 0.86,
                }}
              >
                <div>Red = Crime Point</div>
                <div>Dark = Obstacle</div>
              </div>

              <LiquidMetalButton
                onClick={handleResetGrid}
                size="sm"
                borderWidth={3}
                metalConfig={{
                  colorBack: "#737373",
                  colorTint: "#ffffff",
                }}
              >
                Reset Grid
              </LiquidMetalButton>
            </div>
          </div>

          <div style={cardStyle} className="hud-panel">
            <h2 className="hud-title" style={{ margin: 0, fontSize: "22px", fontWeight: 600 }}>
              Analysis
            </h2>

            <div>
              <div style={labelStyle} className="hud-subtle">Scoring Model</div>
              <div style={fixedValueStyle}>Rossmo Inspired</div>
            </div>

            <div>
              <div style={labelStyle} className="hud-subtle">Path Type</div>
              <div style={fixedValueStyle}>A* Search</div>
            </div>

            <div>
              <div style={labelStyle} className="hud-subtle">Visualization</div>
              <select
                style={selectStyle}
                value={visualization}
                onChange={(e) => setVisualization(e.target.value)}
              >
                <option>Heatmap Grid</option>
                <option>Probability Map</option>
                <option>Path Overlay (A*)</option>
                <option>Cluster View</option>
              </select>
            </div>

            <div>
              <div style={labelStyle} className="hud-subtle">Predicted Output</div>
              <select
                style={selectStyle}
                value={predictedOutput}
                onChange={(e) => setPredictedOutput(e.target.value)}
              >
                <option>Best Criminal Zone</option>
                <option>Top 3 Zones</option>
                <option>Hotspot Region</option>
                <option>Likely Base Area</option>
              </select>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "48px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "210px",
                height: "52px",
                borderRadius: "999px",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(180,180,180,0.14) 35%, rgba(120,120,120,0.08) 55%, rgba(0,0,0,0) 78%)",
                filter: "blur(18px)",
                transform: "translateY(14px)",
                pointerEvents: "none",
              }}
            />
            <LiquidMetalButton
              onClick={handleRunAnalysis}
              size="hero"
              borderWidth={4}
              metalConfig={{
                colorBack: "#8a8a8a",
                colorTint: "#ffffff",
              }}
            >
              Run Analysis
            </LiquidMetalButton>
          </div>
        </div>
      </section>
    </div>
  );
}

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    criminalName = "Unknown Subject",
    gridSize = "8x8",
    visualization = "Heatmap Grid",
    predictedOutput = "Best Criminal Zone",
    selectedCrimeCells = [],
    selectedObstacleCells = [],
    gridRows = 8,
    gridCols = 8,
  } = location.state || {};

  const panelStyle = {
    background: "rgba(14, 24, 20, 0.34)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "24px",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
  };

  const summaryBox = {
    padding: "18px 20px",
    borderRadius: "16px",
    background: "rgba(7, 14, 11, 0.55)",
    border: "1px solid rgba(255,255,255,0.05)",
    fontSize: "16px",
  };

  const resultStatementStyle = {
    marginTop: "24px",
    padding: "18px 20px",
    borderRadius: "18px",
    background: "rgba(7, 14, 11, 0.55)",
    border: "1px solid rgba(255,255,255,0.05)",
    fontSize: "18px",
    lineHeight: 1.6,
    opacity: 0.95,
  };

  const keyOf = (row, col) => `${row}-${col}`;

  const obstacleSet = useMemo(
    () => new Set(selectedObstacleCells.map((c) => keyOf(c.row, c.col))),
    [selectedObstacleCells]
  );

  const crimeSet = useMemo(
    () => new Set(selectedCrimeCells.map((c) => keyOf(c.row, c.col))),
    [selectedCrimeCells]
  );

  const occupiedSet = useMemo(
    () =>
      new Set([
        ...selectedCrimeCells.map((c) => keyOf(c.row, c.col)),
        ...selectedObstacleCells.map((c) => keyOf(c.row, c.col)),
      ]),
    [selectedCrimeCells, selectedObstacleCells]
  );

  const inBounds = (row, col) =>
    row >= 0 && row < gridRows && col >= 0 && col < gridCols;

  const manhattan = (a, b) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col);

  const euclidean = (a, b) => Math.hypot(a.row - b.row, a.col - b.col);

  const getNeighbors = (row, col) => {
    const candidates = [
      { row: row - 1, col },
      { row: row + 1, col },
      { row, col: col - 1 },
      { row, col: col + 1 },
    ];

    return candidates.filter(
      (cell) =>
        inBounds(cell.row, cell.col) &&
        !obstacleSet.has(keyOf(cell.row, cell.col))
    );
  };

  const reconstructPath = (cameFrom, currentKey) => {
    const path = [];
    let cursor = currentKey;

    while (cursor) {
      const [row, col] = cursor.split("-").map(Number);
      path.push({ row, col });
      cursor = cameFrom.get(cursor);
    }

    return path.reverse();
  };

  const runAStar = (start, goal) => {
    const startKey = keyOf(start.row, start.col);
    const goalKey = keyOf(goal.row, goal.col);

    if (obstacleSet.has(startKey) || obstacleSet.has(goalKey)) return null;

    const openSet = new Set([startKey]);
    const cameFrom = new Map();

    const gScore = new Map();
    gScore.set(startKey, 0);

    const fScore = new Map();
    fScore.set(startKey, manhattan(start, goal));

    while (openSet.size > 0) {
      let currentKey = null;
      let currentBest = Infinity;

      for (const key of openSet) {
        const score = fScore.get(key) ?? Infinity;
        if (score < currentBest) {
          currentBest = score;
          currentKey = key;
        }
      }

      if (!currentKey) return null;
      if (currentKey === goalKey) return reconstructPath(cameFrom, currentKey);

      openSet.delete(currentKey);

      const [currentRow, currentCol] = currentKey.split("-").map(Number);

      for (const neighbor of getNeighbors(currentRow, currentCol)) {
        const neighborKey = keyOf(neighbor.row, neighbor.col);
        const tentativeG = (gScore.get(currentKey) ?? Infinity) + 1;

        if (tentativeG < (gScore.get(neighborKey) ?? Infinity)) {
          cameFrom.set(neighborKey, currentKey);
          gScore.set(neighborKey, tentativeG);
          fScore.set(neighborKey, tentativeG + manhattan(neighbor, goal));
          openSet.add(neighborKey);
        }
      }
    }

    return null;
  };

  const candidateCells = useMemo(() => {
    const cells = [];

    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const key = keyOf(row, col);
        if (!occupiedSet.has(key)) {
          cells.push({ row, col });
        }
      }
    }

    return cells;
  }, [gridRows, gridCols, occupiedSet]);

  const crimeCentroid = useMemo(() => {
    if (selectedCrimeCells.length === 0) {
      return {
        row: (gridRows - 1) / 2,
        col: (gridCols - 1) / 2,
      };
    }

    const rowSum = selectedCrimeCells.reduce((sum, cell) => sum + cell.row, 0);
    const colSum = selectedCrimeCells.reduce((sum, cell) => sum + cell.col, 0);

    return {
      row: rowSum / selectedCrimeCells.length,
      col: colSum / selectedCrimeCells.length,
    };
  }, [selectedCrimeCells, gridRows, gridCols]);

  const candidateScores = useMemo(() => {
    if (candidateCells.length === 0) return [];

    if (selectedCrimeCells.length === 0) {
      return candidateCells.map((cell) => ({
        ...cell,
        score: 0,
        normalizedScore: 0,
        reachableCrimeCount: 0,
        reachabilityRatio: 0,
        averagePathDistance: Infinity,
        averageEuclideanDistance: Infinity,
      }));
    }

    const bufferZone = Math.max(2, Math.round(Math.min(gridRows, gridCols) / 5));
    const distanceDecayExponent = 1.2;
    const bufferExponent = 1.6;

    const scored = candidateCells.map((candidate) => {
      let rossmoScore = 0;
      let reachableCrimeCount = 0;
      let totalPathDistance = 0;
      let totalEuclideanDistance = 0;

      for (const crime of selectedCrimeCells) {
        const path = runAStar(candidate, crime);

        if (!path || path.length === 0) continue;

        const pathDistance = path.length - 1;
        const straightDistance = euclidean(candidate, crime);

        reachableCrimeCount += 1;
        totalPathDistance += pathDistance;
        totalEuclideanDistance += straightDistance;

        let contribution;

        if (pathDistance <= bufferZone) {
          contribution =
            0.35 / Math.pow(bufferZone - pathDistance + 1, bufferExponent);
        } else {
          contribution =
            1 / Math.pow(pathDistance + 1, distanceDecayExponent);
        }

        rossmoScore += contribution;
      }

      const centroidDistance = euclidean(candidate, crimeCentroid);
      const centroidBonus = 1 / (1 + centroidDistance);

      const accessibleNeighborRatio =
        getNeighbors(candidate.row, candidate.col).length / 4;
      const accessibilityBonus = 0.65 + accessibleNeighborRatio * 0.35;

      const reachabilityRatio =
        selectedCrimeCells.length > 0
          ? reachableCrimeCount / selectedCrimeCells.length
          : 0;

      const averagePathDistance =
        reachableCrimeCount > 0 ? totalPathDistance / reachableCrimeCount : Infinity;

      const averageEuclideanDistance =
        reachableCrimeCount > 0
          ? totalEuclideanDistance / reachableCrimeCount
          : Infinity;

      const score =
        rossmoScore *
        (0.8 + centroidBonus * 0.4) *
        accessibilityBonus *
        (0.35 + reachabilityRatio * 0.65);

      return {
        ...candidate,
        score,
        reachableCrimeCount,
        reachabilityRatio,
        averagePathDistance,
        averageEuclideanDistance,
      };
    });

    const maxScore = Math.max(...scored.map((cell) => cell.score), 0);
    const minScore = Math.min(...scored.map((cell) => cell.score), 0);

    return scored
      .map((cell) => ({
        ...cell,
        normalizedScore:
          maxScore === minScore
            ? 0
            : (cell.score - minScore) / (maxScore - minScore),
      }))
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (a.averagePathDistance !== b.averagePathDistance) {
          return a.averagePathDistance - b.averagePathDistance;
        }
        return manhattan(a, crimeCentroid) - manhattan(b, crimeCentroid);
      });
  }, [candidateCells, selectedCrimeCells, gridRows, gridCols, crimeCentroid]);

  const topPrediction = candidateScores[0] ?? null;

  const confidenceScore = useMemo(() => {
    if (!candidateScores.length) return 0;
    if (candidateScores.length === 1) return 10;

    const first = candidateScores[0].score;
    const second = candidateScores[1].score;
    const margin = first > 0 ? Math.max(0, (first - second) / first) : 0;
    const reachability = candidateScores[0].reachabilityRatio ?? 0;

    return Math.min(10, 10 * (margin * 0.65 + reachability * 0.35));
  }, [candidateScores]);

  const getCellsNearBest = (radius, limit, label) => {
    if (!topPrediction) return [];

    return candidateScores
      .filter(
        (cell) =>
          manhattan(cell, topPrediction) <= radius &&
          !(cell.row === topPrediction.row && cell.col === topPrediction.col)
      )
      .slice(0, limit - 1)
      .map((cell) => ({
        ...cell,
        label,
      }));
  };

  const predictedCells = useMemo(() => {
    if (!candidateScores.length) return [];

    if (predictedOutput === "Best Criminal Zone") {
      return [{ ...candidateScores[0], label: "P" }];
    }

    if (predictedOutput === "Top 3 Zones") {
      return candidateScores.slice(0, 3).map((cell, index) => ({
        ...cell,
        label: String(index + 1),
      }));
    }

    if (predictedOutput === "Hotspot Region") {
      const best = { ...candidateScores[0], label: "H" };
      return [best, ...getCellsNearBest(1, 4, "H")];
    }

    const best = { ...candidateScores[0], label: "A" };
    return [best, ...getCellsNearBest(2, 5, "A")];
  }, [candidateScores, predictedOutput]);

  const probabilityLookup = useMemo(() => {
    const map = new Map();
    candidateScores.forEach((cell) => {
      map.set(keyOf(cell.row, cell.col), cell.normalizedScore);
    });
    return map;
  }, [candidateScores]);

  const pathCells = useMemo(() => {
    if (visualization !== "Path Overlay (A*)") return [];
    if (!topPrediction) return [];

    const collected = [];

    selectedCrimeCells.forEach((crime) => {
      const path = runAStar(crime, topPrediction);

      if (!path || path.length === 0) return;

      path.forEach((cell, index) => {
        const key = keyOf(cell.row, cell.col);
        const isCrime = crimeSet.has(key);
        const isPredicted =
          cell.row === topPrediction.row && cell.col === topPrediction.col;

        if (!isCrime && !isPredicted && !obstacleSet.has(key) && index > 0) {
          collected.push(cell);
        }
      });
    });

    return collected.filter(
      (cell, index, self) =>
        self.findIndex((c) => c.row === cell.row && c.col === cell.col) === index
    );
  }, [visualization, selectedCrimeCells, topPrediction, crimeSet, obstacleSet]);

  const isPredictedOverlapAllowed =
    predictedOutput === "Hotspot Region" ||
    visualization === "Probability Map" ||
    visualization === "Cluster View" ||
    visualization === "Path Overlay (A*)";

  const cellType = (row, col) => {
    const isCrime = selectedCrimeCells.some((cell) => cell.row === row && cell.col === col);
    const isObstacle = selectedObstacleCells.some((cell) => cell.row === row && cell.col === col);
    const isPredicted = predictedCells.some((cell) => cell.row === row && cell.col === col);
    const isPath = pathCells.some((cell) => cell.row === row && cell.col === col);

    if (isObstacle) return "obstacle";

    if (isPredictedOverlapAllowed) {
      if (isPredicted) return "predicted";
      if (isCrime) return "crime";
      if (isPath) return "path";
    } else {
      if (isCrime) return "crime";
      if (isPredicted) return "predicted";
      if (isPath) return "path";
    }

    return "empty";
  };

  const getCellDisplay = (row, col, type) => {
    const predictedMatch = predictedCells.find(
      (cell) => cell.row === row && cell.col === col
    );

    if (type === "crime") return "C";
    if (type === "obstacle") return "X";
    if (type === "path") return "•";
    if (type === "predicted" && predictedMatch) return predictedMatch.label;
    return "";
  };

  const getCellStyle = (row, col, type) => {
    let background = "rgba(255,255,255,0.06)";
    let border = "1px solid rgba(255,255,255,0.06)";
    let boxShadow = "inset 0 1px 0 rgba(255,255,255,0.03)";
    let classNames = "cyber-cell";

    if (type === "crime") {
      background =
        "linear-gradient(180deg, rgba(255,120,120,0.95) 0%, rgba(255,70,70,0.92) 100%)";
      border = "1px solid rgba(255,180,180,0.22)";
      boxShadow =
        "0 0 14px rgba(255,90,90,0.18), inset 0 1px 0 rgba(255,255,255,0.08)";
      classNames += " cell-crime";
    } else if (type === "obstacle") {
      background =
        "linear-gradient(180deg, rgba(44,44,44,0.98) 0%, rgba(18,18,18,0.98) 100%)";
      border = "1px solid rgba(255,255,255,0.06)";
      boxShadow =
        "inset 0 1px 0 rgba(255,255,255,0.03), inset 0 -8px 14px rgba(0,0,0,0.26)";
      classNames += " cell-obstacle";
    } else if (type === "path") {
      background =
        "linear-gradient(180deg, rgba(115,172,255,0.88) 0%, rgba(68,124,255,0.76) 100%)";
      border = "1px solid rgba(170,205,255,0.20)";
      boxShadow =
        "0 0 16px rgba(90,150,255,0.22), inset 0 1px 0 rgba(255,255,255,0.08)";
      classNames += " cell-path";
    } else if (type === "predicted") {
      if (predictedOutput === "Top 3 Zones") {
        background =
          "linear-gradient(180deg, rgba(110,235,160,0.98) 0%, rgba(60,210,125,0.92) 100%)";
        classNames += " cell-predicted-green";
      } else if (predictedOutput === "Hotspot Region") {
        background =
          "linear-gradient(180deg, rgba(255,205,110,0.96) 0%, rgba(255,160,55,0.92) 100%)";
        classNames += " cell-predicted-orange";
      } else if (predictedOutput === "Likely Base Area") {
        background =
          "linear-gradient(180deg, rgba(205,155,255,0.96) 0%, rgba(164,96,255,0.90) 100%)";
        classNames += " cell-predicted-purple";
      } else {
        background =
          "linear-gradient(180deg, rgba(110,235,160,0.98) 0%, rgba(60,210,125,0.92) 100%)";
        classNames += " cell-predicted-green";
      }

      border = "1px solid rgba(255,255,255,0.18)";
      boxShadow =
        "0 0 18px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12)";
    } else {
      const probability = probabilityLookup.get(keyOf(row, col)) ?? 0;

      if (visualization === "Probability Map") {
        background = `linear-gradient(180deg, rgba(120,255,185,${0.08 + probability * 0.32}) 0%, rgba(70,210,130,${0.10 + probability * 0.34}) 100%)`;
        border = "1px solid rgba(150,255,210,0.06)";
        boxShadow = `0 0 ${8 + probability * 14}px rgba(70,210,130,${0.04 + probability * 0.14})`;
      } else if (visualization === "Heatmap Grid") {
        background = `linear-gradient(180deg, rgba(255,160,95,${0.06 + probability * 0.26}) 0%, rgba(255,105,68,${0.06 + probability * 0.30}) 100%)`;
        border = "1px solid rgba(255,180,120,0.05)";
        boxShadow = `0 0 ${6 + probability * 12}px rgba(255,120,80,${0.03 + probability * 0.12})`;
      } else if (visualization === "Cluster View" && topPrediction) {
        const cluster = manhattan({ row, col }, topPrediction) <= 1;
        if (cluster) {
          background =
            "linear-gradient(180deg, rgba(255,235,145,0.26) 0%, rgba(255,190,90,0.18) 100%)";
          border = "1px solid rgba(255,220,130,0.10)";
          boxShadow = "0 0 14px rgba(255,210,110,0.08)";
        }
      }
    }

    return {
      classNames,
      style: {
        width: "44px",
        height: "44px",
        borderRadius: "10px",
        background,
        border,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "12px",
        fontWeight: 700,
        boxShadow,
      },
    };
  };

  const resultStatement = (() => {
    const name = criminalName || "The criminal";

    if (predictedOutput === "Top 3 Zones") {
      const text = predictedCells.map((c) => `(${c.row},${c.col})`).join(", ");
      return `${name} is most likely distributed across the top three candidate zones at ${text} based on Rossmo-style spatial scoring and obstacle-aware A* route analysis.`;
    }

    if (predictedOutput === "Hotspot Region") {
      return `${name} is most likely concentrated within the highlighted hotspot region around the strongest scored zone, derived from reachable crime-site patterns and travel-aware path costs.`;
    }

    if (predictedOutput === "Likely Base Area") {
      return `${name} is most likely operating from the broader highlighted base area, representing a probable offender anchor region rather than one exact point.`;
    }

    if (topPrediction) {
      return `${name} is most likely located near the predicted zone at (${topPrediction.row},${topPrediction.col}) based on Rossmo-inspired geographic profiling, obstacle-aware A* path distance, and spatial clustering of the selected crime points.`;
    }

    return `${name} could not be assigned a distinct predicted zone because the remaining free cells are unreachable or the grid is fully occupied.`;
  })();

  const interpretationText = (() => {
    const baseIntro =
      "This system uses a Rossmo-inspired geographic profiling approach to estimate the most likely offender base region from the spatial pattern of selected crime locations. The red cells represent crime points placed by the user, while the dark cells represent blocked areas or travel constraints.";

    const aStarText =
      "A* search is used as the pathfinding method to account for realistic movement across the grid. Instead of assuming straight-line travel, A* evaluates efficient routes while avoiding obstacles, which makes the predicted result more practical.";

    if (visualization === "Path Overlay (A*)") {
      return `${baseIntro}

${aStarText}

In this view, the blue overlay represents approximate route connections between the crime points and the strongest predicted zone, helping visualize how A* pathfinding influences the decision. For hotspot-style output, overlap with crime regions is allowed because the goal is to emphasize concentrated activity rather than hide it.`;
    }

    if (visualization === "Probability Map") {
      return `${baseIntro}

${aStarText}

In this view, the grid is shown as a probability surface. Cells with stronger shading represent zones that are more likely to be associated with the offender's operating base when compared with the surrounding cells. Overlap with crime activity is acceptable here because the purpose is to show concentration across the surface.`;
    }

    if (visualization === "Cluster View") {
      return `${baseIntro}

${aStarText}

In this view, the system emphasizes clustered activity. The highlighted region shows where the concentration of crime events and travel feasibility overlap most strongly, making it useful for spotting a broader likely operating area.`;
    }

    return `${baseIntro}

${aStarText}

In this heatmap-style view, the system highlights zones that receive stronger Rossmo-inspired scores. For outputs such as Best Criminal Zone or Top 3 Zones, the predicted cells are shown separately from the crime points so the offender-zone estimate is not confused with the observed crime locations.`;
  })();

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        color: "white",
        overflowX: "hidden",
      }}
    >
      <CyberStyles />

      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -3,
        }}
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
      </video>

      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.82) 100%)",
          zIndex: -2,
        }}
      />

      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.28)",
          zIndex: -1,
        }}
      />

      <div style={{ padding: "48px 56px 70px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}
        >
          <div>
            <h1
              className="got-title"
              style={{
                margin: 0,
                fontSize: "40px",
                fontWeight: 400,
                lineHeight: 1.05,
                textShadow:
                  "0 0 10px rgba(255,255,255,0.05), 0 0 28px rgba(255,255,255,0.02)",
              }}
            >
              DOOM HUNT Result
            </h1>
            <p
              style={{
                marginTop: "10px",
                fontSize: "18px",
                opacity: 0.82,
              }}
            >
              Powered by Aasha@5172
            </p>
          </div>

          <LiquidMetalButton
            onClick={() => navigate("/")}
            size="sm"
            borderWidth={3}
            metalConfig={{
              colorBack: "#7a7a7a",
              colorTint: "#ffffff",
            }}
          >
            Back
          </LiquidMetalButton>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "28px",
          }}
        >
          <div style={{ ...panelStyle, padding: "28px" }} className="hud-panel">
            <h2 className="hud-title" style={{ marginTop: 0, fontSize: "28px" }}>
              Tactical Grid
            </h2>
            <p style={{ opacity: 0.8, marginTop: "8px", marginBottom: "18px" }}>
              Crime points, blocked cells, and predicted offender zone
            </p>

            <div className="cyber-grid-shell">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${gridCols}, 44px)`,
                  gap: "10px",
                  justifyContent: "start",
                }}
              >
                {Array.from({ length: gridRows * gridCols }).map((_, index) => {
                  const row = Math.floor(index / gridCols);
                  const col = index % gridCols;
                  const type = cellType(row, col);
                  const cell = getCellStyle(row, col, type);
                  const content = getCellDisplay(row, col, type);

                  return (
                    <div key={`${row}-${col}`} className={cell.classNames} style={cell.style}>
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "18px",
                flexWrap: "wrap",
                marginTop: "22px",
                fontSize: "14px",
                opacity: 0.85,
              }}
            >
              <div>Red = Crime Point</div>
              <div>Dark = Obstacle</div>
              {visualization === "Path Overlay (A*)" && <div>Blue = A* Path</div>}
              {predictedOutput === "Best Criminal Zone" && <div>Green = Best Zone</div>}
              {predictedOutput === "Top 3 Zones" && <div>1,2,3 = Ranked Zones</div>}
              {predictedOutput === "Hotspot Region" && <div>Orange = Hotspot</div>}
              {predictedOutput === "Likely Base Area" && <div>Purple = Base Area</div>}
            </div>

            <div style={resultStatementStyle} className="summary-chip">
              <strong>Predicted Result:</strong> {resultStatement}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div style={{ ...panelStyle, padding: "24px" }} className="hud-panel">
              <h2 className="hud-title" style={{ marginTop: 0, fontSize: "26px" }}>
                Summary
              </h2>
              <div style={{ display: "grid", gap: "14px" }}>
                <div style={summaryBox} className="summary-chip">
                  Criminal Name: <strong>{criminalName || "Unknown Subject"}</strong>
                </div>
                <div style={summaryBox} className="summary-chip">
                  Grid Size: <strong>{gridSize}</strong>
                </div>
                <div style={summaryBox} className="summary-chip">
                  Obstacles: <strong>{selectedObstacleCells.length}</strong>
                </div>
                <div style={summaryBox} className="summary-chip">
                  Scoring Model: <strong>Rossmo Inspired</strong>
                </div>
                <div style={summaryBox} className="summary-chip">
                  Path Method: <strong>A* Search</strong>
                </div>
                <div style={summaryBox} className="summary-chip">
                  Visualization: <strong>{visualization}</strong>
                </div>
                <div style={summaryBox} className="summary-chip">
                  Predicted Output: <strong>{predictedOutput}</strong>
                </div>
                <div style={summaryBox} className="summary-chip">
                  Selected Crime Points:{" "}
                  <strong>
                    {selectedCrimeCells.length > 0
                      ? selectedCrimeCells.map((cell) => `(${cell.row},${cell.col})`).join(", ")
                      : "None"}
                  </strong>
                </div>
                <div style={summaryBox} className="summary-chip">
                  Selected Obstacles:{" "}
                  <strong>
                    {selectedObstacleCells.length > 0
                      ? selectedObstacleCells.map((cell) => `(${cell.row},${cell.col})`).join(", ")
                      : "None"}
                  </strong>
                </div>
                <div style={summaryBox} className="summary-chip">
                  Top Zone Coordinates:{" "}
                  <strong>
                    {predictedCells.length > 0
                      ? predictedCells.map((cell) => `(${cell.row},${cell.col})`).join(", ")
                      : "None"}
                  </strong>
                </div>
                <div style={summaryBox} className="summary-chip">
                  Confidence Score: <strong>{confidenceScore.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            <div style={{ ...panelStyle, padding: "24px" }} className="hud-panel">
              <h2 className="hud-title" style={{ marginTop: 0, fontSize: "26px" }}>
                Interpretation
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  lineHeight: 1.8,
                  opacity: 0.88,
                  whiteSpace: "pre-line",
                }}
              >
                {interpretationText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;