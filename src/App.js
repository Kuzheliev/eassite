import React, { useState, useEffect } from "react";
import './App.css';
import { useTranslation } from "./trans.js";
import serviceWeb from './wwwroot/services-01.webp';
import serviceRedesign from './wwwroot/rolled.png';
import serviceDesign from './wwwroot/blueprints.jpg';

export default function ModernBusinessCard() {
  const { t, lang, setLang } = useTranslation("en");
  const [copied, setCopied] = useState(null);
  const [visibleSections, setVisibleSections] = useState({});
  const [activeSection, setActiveSection] = useState('top');
  const email = "hello@domain.com";
  const phone = "+421 900 000 000";

  const serviceCards = t("serviceCards").map((card, index) => {
    let image;
    if (index === 0) image = serviceWeb;
    else if (index === 1) image = serviceRedesign;
    else if (index === 2) image = serviceDesign;

    return { ...card, image };
  });

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    } catch {}
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('section').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const sectionClass = (id) => `section ${visibleSections[id] ? 'visible' : ''}`;
  const navItems = [
    { title: 'services', description: t("services") },
    { title: 'contact', description: t("contact") },
  ];

  return (
    <main>
      <div className="container">
        {/* Language Switch */}
        <header>
          <select id="langSelect"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="lang-select">
            <option value="sk">Slovenský (SK)</option>
            <option value="en">English (EN)</option>
          </select>

          <nav>
            {navItems.map(item => (
              <a key={item.title} href={`#${item.title}`} className={activeSection === item.title ? 'active' : ''}>{item.description}</a>
            ))}
          </nav>
        </header>

        {/* Hero */}
        <section id="top" className={sectionClass('top')}>
          <h1>{t("name")}</h1>
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
          <div className="buttons">
            <a href={`mailto:${email}`} className="button primary">{t("emailButton")}</a>
            <a href="#services" className="button secondary">{t("viewServicesButton")}</a>
          </div>
        </section>

        {/* Services */}
          <section id="services" className={sectionClass('services')}>
            <h2>{t("services")}</h2>
            <div className="grid">
              {serviceCards.map(card => (
                <div
                  key={card.title}
                  className="card"
                  style={{ backgroundImage: `url(${card.image})` }}
                >
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              ))}
            </div>
          </section>

        {/* Portfolio
        <section id="portfolio" className={sectionClass('portfolio')}>
          <h2>{t("portfolio")}</h2>
          <div className="grid">
            {t("portfolioItems").map(project => (
              <div key={project} className="card-portfolio">{project}</div>
            ))}
          </div>
        </section> */}

        {/* Contact */}
        <section id="contact" className={sectionClass('contact')}>
          <h2>{t("contact")}</h2>
          <div className="buttons">
            <button onClick={() => copy(email, 'email')} className="button primary">{copied === 'email' ? t("copyEmail") : email}</button>
            <button onClick={() => copy(phone, 'phone')} className="button primary">{copied === 'phone' ? t("copyPhone") : phone}</button>
          </div>
          </section>

        <footer>{t("footer", { year: new Date().getFullYear() })}</footer>
      </div>
    </main>
  );
}
