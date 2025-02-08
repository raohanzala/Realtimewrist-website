import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-700">
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
      
      <p className="mb-4">
        Welcome to <strong>Realtime Wrist (RTW)</strong>. Your privacy is important to us. This policy explains how we collect, use, and protect your information when you visit our store.
      </p>

      <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
      <p className="mb-4">We collect personal information such as name, email, phone number, and shipping address when you make a purchase or create an account.</p>

      <h2 className="text-xl font-semibold mt-6">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To process and fulfill your orders</li>
        <li>To communicate with you about your order status</li>
        <li>To improve our store and customer experience</li>
        <li>To send promotional offers (you can opt out anytime)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">3. Sharing Your Information</h2>
      <p className="mb-4">We do not sell your personal data. We may share your information with third-party services for payment processing, shipping, and analytics.</p>

      <h2 className="text-xl font-semibold mt-6">4. Data Security</h2>
      <p className="mb-4">We use industry-standard security measures to protect your information from unauthorized access, disclosure, or misuse.</p>

      <h2 className="text-xl font-semibold mt-6">5. Cookies & Tracking Technologies</h2>
      <p className="mb-4">We use cookies to enhance your browsing experience. You can manage your cookie preferences in your browser settings.</p>

      <h2 className="text-xl font-semibold mt-6">6. Your Rights</h2>
      <p className="mb-4">You have the right to request access, correction, or deletion of your personal data. Contact us at <strong>realtimewrist@gmail.com</strong> for any concerns.</p>

      <h2 className="text-xl font-semibold mt-6">7. Updates to This Policy</h2>
      <p className="mb-4">We may update this Privacy Policy from time to time. Please review it periodically for any changes.</p>

      <p className="text-center mt-6">If you have any questions, feel free to <Link to="/contact" className="text-blue-500 underline">contact us</Link>.</p>
    </div>
  );
};

export default PrivacyPolicy;
