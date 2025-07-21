import { useState, useRef } from "react";
import styles from "./Generate.module.css";

function Generate() {
  const [length, handleLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const generatePassword = () => {
    let charset = "";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_-+=<>?/{}[]|";

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomChar = charset.charAt(
        Math.floor(Math.random() * charset.length)
      );
      newPassword += randomChar;
    }

    setPassword(newPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      navigator.clipboard.writeText(password).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🔐 Password Generator</h1>

      <div className={styles.passwordBox}>
        <input
          ref={passwordRef}
          type="text"
          value={password}
          readOnly
          className={styles.output}
        />
        <button
          className={styles.copyBtn}
          onClick={copyToClipboard}
          title="Copy password"
        >
          📋
        </button>
      </div>
      {copied && <p className={styles.copiedMessage}>✅ Copied!</p>}

      <div className={styles.options}>
        <div className={styles.setting}>
          <label>Password length:</label>
          <input
            type="range"
            min={8}
            max={20}
            value={length}
            onChange={(e) => handleLength(Number(e.target.value))}
          />
          <span>{length}</span>
        </div>
        <div className={styles.setting}>
          <label>Uppercase (A-Z)</label>
          <input
            type="checkbox"
            checked={includeUpper}
            onChange={(e) => setIncludeUpper(e.target.checked)}
          />
        </div>
        <div className={styles.setting}>
          <label>Lowercase (a-z)</label>
          <input
            type="checkbox"
            checked={includeLower}
            onChange={(e) => setIncludeLower(e.target.checked)}
          />
        </div>
        <div className={styles.setting}>
          <label>Numbers (0-9)</label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
        </div>
        <div className={styles.setting}>
          <label>Symbols (!@#)</label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
        </div>
      </div>

      <button className={styles.generateBtn} onClick={generatePassword}>
        🔁 Generate Password
      </button>
    </div>
  );
}

export default Generate;
