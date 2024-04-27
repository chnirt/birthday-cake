import { SetStateAction, useCallback, useEffect, useState } from "react";

export const Name = ({ playing, run }: { playing: boolean; run: boolean }) => {
  const [name, setName] = useState("yourname");

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
    if (nameParam !== null && name === "") {
      setName(nameParam);
    }
  }, [name]);

  return (
    <>
      <input
        id="name"
        {...{
          style: {
            fontFamily: "'Sedgwick Ave Display', cursive",
            fontWeight: "400",
            fontSize: 32,
            color: "#f0e4d0",
            lineHeight: "1.5em",
            ...(playing
              ? {
                  appearance: "none",
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
        }}
      />
    </>
  );
};
