import { useState } from "react";

export const Name = () => {
  const [name, setName] = useState("Chin");

  return (
    <div>
      <input
        {...{
          value: name,
          onChange: (e) => setName(e.target.value),
        }}
      />
    </div>
  );
};
