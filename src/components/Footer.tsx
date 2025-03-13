
import { Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-8 mt-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-muted pt-6">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 B-Moonie Raffle Tracker. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-bmoonie-blue transition-colors"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-bmoonie-blue transition-colors"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
