import Script from "next/script";

export function ChatbotWidget() {
  return (
    <Script
      src="http://localhost:8000/widget.js"
      data-chatbot-id="ba8be9bc-88e"
      strategy="afterInteractive"
      defer
    />
  );
}
