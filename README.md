# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

# 🚀 macOS Build, Code Signing & Notarization (Tauri 2.0)

This project uses **Tauri 2.0**, which fully automates:

- ✅ Code signing
- ✅ Notarization
- ✅ Stapling

You just need to export your Apple credentials before building.

---

## 🔑 Export Environment Variables

### ▶️ Option 1: Apple ID + App-Specific Password

```bash
export APPLE_ID=you@example.com
export APPLE_PASSWORD=abcd-efgh-ijkl-mnop
export APPLE_TEAM_ID=ABCDE12345

```

### Option 2: App Store Connect API Key

```
export APPLE_API_KEY=A1B2C3D4E5
export APPLE_API_ISSUER=123e4567-e89b-12d3-a456-426614174000
export APPLE_API_KEY_PATH=./AuthKey_A1B2C3D4E5.p8

```

### 🛠 Build & Package

```
npm run tauri build
```

- The signed & notarized .dmg will be available in the dist/ folder.
- Fully ready for distribution ✅.
