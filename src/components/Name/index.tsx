import { SetStateAction, forwardRef, useCallback, useEffect } from "react";

export const Name = forwardRef(
  (
    {
      name,
      setName,
      playing,
      run,
    }: {
      name: string;
      setName: React.Dispatch<React.SetStateAction<string>>;
      playing: boolean;
      run: boolean;
    },
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const onChange = useCallback(
      (e: { target: { value: SetStateAction<string> } }) => {
        setName(e.target.value);
        window.history.pushState({}, "", `?name=${e.target.value}`);
      },
      [setName]
    );

    useEffect(() => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const nameParam = urlParams.get("name");
      if (nameParam !== null) {
        setName(nameParam);
      }
    }, [setName]);

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
            ref,
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
            spellCheck: false,
            autoFocus: true,
          }}
        />
      </div>
    );
  }
);
