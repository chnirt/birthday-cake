import { SetStateAction, useCallback, useEffect, useState } from "react";

export const Name = ({ playing, run }: { playing: boolean; run: boolean }) => {
  const [name, setName] = useState("Yourname");

  const onChange = useCallback(
    (e: { target: { value: SetStateAction<string> } }) => {
      setName(e.target.value);
      window.history.pushState({}, "", `?name=${e.target.value}`);
    },
    []
  );

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const nameParam = urlParams.get("name");
    if (nameParam !== null) {
      setName(nameParam);
    }
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "25%",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        justifyContent: "center",
        width: "100dvw",
        zIndex: 40,
      }}
    >
      <input
        id="name"
        {...{
          style: {
            fontFamily: "Montserrat",
            fontWeight: "bold",
            fontSize: "2rem",
            color: "#f0e4d0",
            opacity: 0.9,
            ...(playing
              ? {
                  // appearance: "none",
                  border: 0,
                  backgroundColor: "transparent",
                  textAlign: "center",
                }
              : {}),
          },
          value: name,
          onChange,
          disabled: playing || run,
          readOnly: playing || run,
          spellcheck: "false",
        }}
      />
    </div>
  );
};
