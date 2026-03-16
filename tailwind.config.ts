import type { Config } from "tailwindcss";
import { Z_INDEX } from "./lib/constants/zIndex";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 세상모든휴대폰 브랜드 컬러 (카카오톡 스타일 황색)
        brand: {
          50: "#FFFEF5",      // 매우 연한 황색 (배경)
          100: "#FFFBE6",     // 연한 황색
          200: "#FFF7CC",     // 중간 황색
          DEFAULT: "#FEE500", // 메인 브랜드 황색 (카카오톡)
          600: "#FDD835",     // 호버 황색
          700: "#E5C100",     // 진한 황색
          800: "#C7A500",     // 매우 진한 황색
        },
        dark: {
          DEFAULT: "#1A1A1A", // 메인 다크
          surface: "#222222", // 다크 배경
          hover: "#2A2A2A",   // 다크 호버
        },
        warm: {
          DEFAULT: "#FAF7F0", // 따뜻한 베이지
          light: "#FFFFFF",   // 화이트
          dark: "#F5F2EA",    // 진한 베이지
        },
        // 레거시 호환성 (기존 코드 지원)
        primary: {
          DEFAULT: "#FEE500",
          hover: "#FDD835",
          dark: "#1A1A1A",
        },
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "Helvetica Neue",
          "Segoe UI",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Malgun Gothic",
          "sans-serif",
        ],
      },
      // 타이포그래피 시스템 (8px 기준)
      fontSize: {
        // Display (Hero)
        "display-2xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }], // 72px
        "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }], // 60px
        "display-lg": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }], // 48px

        // Heading
        "heading-xl": ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }], // 36px
        "heading-lg": ["1.875rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "700" }], // 30px
        "heading-md": ["1.5rem", { lineHeight: "1.35", letterSpacing: "0", fontWeight: "600" }], // 24px
        "heading-sm": ["1.25rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "600" }], // 20px

        // Body
        "body-xl": ["1.125rem", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }], // 18px
        "body-lg": ["1rem", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }], // 16px
        "body-md": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }], // 14px
        "body-sm": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }], // 12px
      },
      // 8의 배수 Spacing 시스템
      spacing: {
        "4.5": "1.125rem", // 18px
        "13": "3.25rem", // 52px
        "15": "3.75rem", // 60px
        "18": "4.5rem", // 72px
        "22": "5.5rem", // 88px
        "26": "6.5rem", // 104px
        "30": "7.5rem", // 120px
        "34": "8.5rem", // 136px
      },
      // Container 최대 너비 시스템
      maxWidth: {
        "container-sm": "480px",
        "container-md": "720px",
        "container-lg": "960px",
        "container-xl": "1200px",
      },
      // Safe Area Insets (iOS 노치/홈 인디케이터 대응)
      padding: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.08)",
        medium: "0 4px 12px rgba(0, 0, 0, 0.12)",
        strong: "0 8px 24px rgba(0, 0, 0, 0.16)",
        // 브랜드 컬러 그림자 (카카오톡 스타일)
        brand: "0 6px 24px rgba(254, 229, 0, 0.4)",
        "brand-hover": "0 16px 40px rgba(254, 229, 0, 0.6)",
        "brand-card": "0 12px 32px rgba(254, 229, 0, 0.20), 0 8px 24px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        DEFAULT: "8px",
        sm: "4px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
      },
      // Z-Index 계층 (lib/constants/zIndex.ts에서 중앙 관리)
      zIndex: {
        base: String(Z_INDEX.BASE),
        nav: String(Z_INDEX.NAV),
        'bottom-nav': String(Z_INDEX.BOTTOM_NAV),
        'sticky-cta': String(Z_INDEX.STICKY_CTA),
        header: String(Z_INDEX.HEADER),
        'menu-overlay': String(Z_INDEX.MENU_OVERLAY),
        'menu-panel': String(Z_INDEX.MENU_PANEL),
        'modal-backdrop': String(Z_INDEX.MODAL_BACKDROP),
        modal: String(Z_INDEX.MODAL),
        splash: String(Z_INDEX.LOADING_SPLASH),
        critical: String(Z_INDEX.CRITICAL),
      },
      // 애니메이션
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
