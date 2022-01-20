import React, { useState, useEffect, useRef } from "react";

const ops = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, 1],
    [-1, -1],
    [1, -1],
];

function App() {
    const columnnum = 30;
    const numrows = 70;
    const [grid, setgrid] = useState([]);
    useEffect(() => {
        const rows = [];
        for (let i = 0; i < numrows; i++) {
            rows.push([]);
            for (let k = 0; k < columnnum; k++) {
                rows[i].push(0);
            }
        }

        setgrid(rows);
    }, [columnnum, numrows]);
    const style = {
        display: "grid",
        gridTemplateColumns: `repeat(${numrows}, 20px)`,
    };
    const handlethisshit = (i, k) => {
        const newgrid = [...grid];
        if (newgrid[i][k] === 0) {
            newgrid[i][k] = 1;
            setgrid(newgrid);
        } else {
            newgrid[i][k] = 0;
            setgrid(newgrid);
        }
    };
    const [start, setStart] = useState(false);

    const runningRef = useRef(start);
    runningRef.current = start;

    const startSimulation = () => {
        if (!runningRef.current) {
            return;
        }
        const hey = (g, newgrid) => {
            for (let i = 0; i < numrows; i++) {
                for (let k = 0; k < columnnum; k++) {
                    let neighbors = 0;
                    ops.forEach(([x, y]) => {
                        const newI = i + x;
                        const newK = k + y;
                        if (
                            newI >= 0 &&
                            newI < numrows &&
                            newK >= 0 &&
                            newK < columnnum
                        ) {
                            neighbors += g[newI][newK];
                        }
                    });
                    if (neighbors < 2 || neighbors > 3) {
                        newgrid[i][k] = 0;
                    } else if (g[i][k] === 0 && neighbors === 3) {
                        newgrid[i][k] = 1;
                    }
                }
            }
            setgrid(newgrid);
        };
        const newgrid = [...grid];
        hey(grid, newgrid);

        setTimeout(startSimulation, 1000);
    };
    const clear = () => {
        const rows = [];
        for (let i = 0; i < numrows; i++) {
            rows.push([]);
            for (let k = 0; k < columnnum; k++) {
                rows[i].push(0);
            }
        }

        setgrid(rows);
    };

    return (
        <>
            <button
                onClick={() => {
                    setStart(!start);
                    if (!start) {
                        runningRef.current = true;
                        startSimulation();
                    }
                }}
            >
                {start ? "stop" : "star"}
            </button>
            <button onClick={() => clear()}>clear</button>
            <div style={style}>
                {grid.map((row, i) =>
                    row.map((item, k) => (
                        <div
                            style={{
                                padding: 10,
                                backgroundColor: grid[i][k] ? "#000" : "#fff",
                                border: "black solid 1px",
                            }}
                            onClick={() => {
                                handlethisshit(i, k);
                            }}
                            key={`${i}-${k}-${item}`}
                        >
                            {null}
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default App;
