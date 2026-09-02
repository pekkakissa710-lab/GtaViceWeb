# Makefile for convenience

.PHONY: setup build dev clean help

help:
	@echo "GTA Vice City Web Port"
	@echo ""
	@echo "Available targets:"
	@echo "  make setup   - Setup development environment"
	@echo "  make build   - Build web version"
	@echo "  make dev     - Run development server"
	@echo "  make clean   - Clean build artifacts"

setup:
	bash scripts/setup.sh

build:
	bash scripts/build-web.sh

dev:
	bash scripts/dev-server.sh

clean:
	rm -rf build-web/
	@echo "Cleaned build artifacts"

.DEFAULT_GOAL := help
