# Build Scripts

## Windows

- `build-web.bat` - Build for web (requires Emscripten)
- `dev-server.bat` - Run local development server

## Linux/macOS

- `build-web.sh` - Build for web (requires Emscripten)
- `dev-server.sh` - Run local development server
- `setup.sh` - Setup development environment

## Usage

### First Time Setup

```bash
bash scripts/setup.sh
```

### Build Web Version

```bash
bash scripts/build-web.sh          # Linux/macOS
scripts\build-web.bat              # Windows
```

### Run Development Server

```bash
bash scripts/dev-server.sh         # Linux/macOS
scripts\dev-server.bat             # Windows
```

Then open http://localhost:8000 in your browser.
