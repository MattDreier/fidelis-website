import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 bg-gradient-to-br from-surface-light to-background-light dark:from-surface-dark dark:to-background-dark transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12">

          {/* Column 1 */}
          <div>
            <h3 className="font-display font-medium text-text-primary-light dark:text-text-primary-dark mb-4 text-base">Services</h3>
            <ul className="space-y-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
              <li><a href="#services" className="hover:text-brand-teal transition-colors">Solar System Repair</a></li>
              <li><a href="#services" className="hover:text-brand-teal transition-colors">Battery Maintenance</a></li>
              <li><a href="#services" className="hover:text-brand-teal transition-colors">Performance Monitoring</a></li>
              <li><a href="#services" className="hover:text-brand-teal transition-colors">Inverter Troubleshooting</a></li>
              <li><a href="#services" className="hover:text-brand-teal transition-colors">Panel Replacement</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-display font-medium text-text-primary-light dark:text-text-primary-dark mb-4 text-base">Company</h3>
            <ul className="space-y-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
              <li><a href="#why-choose-us" className="hover:text-brand-teal transition-colors">About Fidelis Renewables</a></li>
              <li><a href="#why-choose-us" className="hover:text-brand-teal transition-colors">Why Choose Us</a></li>
              <li><a href="#services" className="hover:text-brand-teal transition-colors">Service Areas</a></li>
              <li><a href="mailto:contact@fidelisrenewables.com" className="hover:text-brand-teal transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-display font-medium text-text-primary-light dark:text-text-primary-dark mb-4 text-base">Contact</h3>
            <ul className="space-y-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
              <li><a href="mailto:contact@fidelisrenewables.com" className="hover:text-brand-teal transition-colors">contact@fidelisrenewables.com</a></li>
              <li><a href="tel:+19138320513" className="hover:text-brand-teal transition-colors">(913) 832-0513</a></li>
              <li className="text-text-secondary-light dark:text-text-secondary-dark">Kansas City Metro Area</li>
              <li className="text-text-secondary-light dark:text-text-secondary-dark">Licensed Master Electrician</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-display font-medium text-text-primary-light dark:text-text-primary-dark mb-4 text-base">Service Areas</h3>
            <ul className="space-y-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
              <li>Kansas City, MO</li>
              <li>Overland Park, KS</li>
              <li>Leawood, KS</li>
              <li>Olathe, KS</li>
              <li>Lee's Summit, MO</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs pt-8 border-t border-gray-100 dark:border-gray-800 text-text-secondary-light dark:text-text-secondary-dark">
          <p>&copy; 2025 Fidelis Renewables. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
