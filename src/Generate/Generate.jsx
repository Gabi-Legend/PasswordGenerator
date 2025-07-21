import styles from "./Generate.module.css";
import { useState } from "react";

function Generate() {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let charSet = "";
    if (includeUpper) charSet += upper;
    if (includeLower) charSet += lower;
    if (includeNumbers) charSet += numbers;
    if (includeSymbols) charSet += symbols;

    if (charSet.length === 0) {
      alert("Please select at least one option!");
      return;
    }

    let generated = "";
    for (let i = 0; i < length; i++) {
      const randIndex = Math.floor(Math.random() * charSet.length);
      generated += charSet[randIndex];
    }

    setPassword(generated);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🔐 Password Generator</h1>

      <input
        type="text"
        readOnly
        className={styles.output}
        value={password}
        placeholder="Your password will appear here"
      />

      <div className={styles.setting}>
        <label>Password length: </label>
        <span>{length}</span>
      </div>
      <input
        type="range"
        min={6}
        max={32}
        value={length}
        onChange={(e) => setLength(parseInt(e.target.value))}
      />

      <div className={styles.options}>
        <label>
          <input
            type="checkbox"
            checked={includeUpper}
            onChange={(e) => setIncludeUpper(e.target.checked)}
          />
          Uppercase (A–Z)
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeLower}
            onChange={(e) => setIncludeLower(e.target.checked)}
          />
          Lowercase (a–z)
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Numbers (0–9)
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Symbols (!@#)
        </label>
      </div>

      <button className={styles.generateBtn} onClick={generatePassword}>
        Generate Password
      </button>
    </div>
  );
}

export default Generate;
