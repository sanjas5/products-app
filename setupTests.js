// src/setupTests.js
import "@testing-library/jest-dom"; // for extra matchers
import { jest } from "@jest/globals"; // if using jest globals

// Mock any other global APIs, if needed
global.fetch = jest.fn(); // Mock fetch for testing
