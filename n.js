#!/usr/bin/env node
const { execFileSync } = require("child_process");

const text = process.argv.slice(2).join(" ") || "Hello from popup!";
const title = "Popup Message";

function psQuote(value) {
  return "'" + value.replace(/'/g, "''") + "'";
}

const script = `Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show(${psQuote(text)}, ${psQuote(title)}, [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Information)`;

try {
  execFileSync("powershell.exe", ["-NoProfile", "-Command", script], { stdio: "ignore" });
} catch (error) {
  console.error("Unable to show popup message:", error.message);
  process.exit(1);
}
