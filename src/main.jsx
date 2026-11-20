import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight, Download, Github, Linkedin, Mail, Phone,
  MapPin, Menu, X, Code2, Database, Cpu, Users, GraduationCap,
  BriefcaseBusiness, Layers3, Workflow, ExternalLink, CheckCircle2, HeartPulse
} from 'lucide-react';
import {
  siPython, siDjango, siMysql, siJavascript, siReact, siHtml5, siCss,
  siGit, siGithub, siBootstrap
} from 'simple-icons';
import ArchitectureShowcase from './components/ArchitectureShowcase';
import { education, experience, profile, skillGroups } from './data/portfolio';
import { projects } from './data/projects';
import './styles.css';

const technologyIcons = {
  Python: siPython,
  Django: siDjango,
  'Django REST Framework': siDjango,
  MySQL: siMysql,
  JavaScript: siJavascript,
  React: siReact,
  HTML5: siHtml5,
  CSS3: siCss,
  CSS: siCss,
  Git: siGit,
  GitHub: siGithub,
  Bootstrap: siBootstrap
};

function TechnologyIcon({ name }) {
  const icon = technologyIcons[name];
  if (!icon) return null;

  return (
    <svg
      className="technology-icon"
      role="img"
      aria-label={`${icon.title} logo`}
      viewBox="0 0 24 24"
      focusable="false"
    >
      <path fill={`#${icon.hex}`} d={icon.path}/>
    </svg>
  );
}

const capabilities = [
  { icon: Users, title: 'HRMS & Payroll', text: 'Employee lifecycle, attendance, leave, payroll and access control.' },
  { icon: Cpu, title: 'IoT Integration', text: 'Connecting local biometric devices with cloud-based business systems.' },
  { icon: Workflow, title: 'Business Automation', text: 'Replacing repetitive manual work with reliable application workflows.' },
  { icon: Layers3, title: 'ERP & SaaS Platforms', text: 'Role-aware business applications and structured operational modules.' }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [introState, setIntroState] = useState('playing');
  const introSkipRef = useRef(null);
  const filtered = activeFilter === 'ALL' ? projects : projects.filter(p => p.category.includes(activeFilter));

  const closeMenu = () => setMenuOpen(false);
  const nav = [['Home', '#home'], ['About', '#about'], ['Projects', '#projects'], ['Skills', '#skills'], ['Experience', '#experience'], ['Contact', '#contact']];
  const introName = ['DURGA', 'PRASAD GADI'];

  useEffect(() => {
    if (introState === 'done') return undefined;

    document.body.classList.add('intro-lock');
    if (introState === 'playing') introSkipRef.current?.focus();

    if (introState === 'closing') {
      const exitTimer = window.setTimeout(() => setIntroState('done'), 720);
      return () => {
        window.clearTimeout(exitTimer);
        document.body.classList.remove('intro-lock');
      };
    }

    const handleIntroKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIntroState('closing');
      } else if (event.key === 'Tab') {
        event.preventDefault();
        introSkipRef.current?.focus();
      }
    };

    const introDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1400 : 3200;
    const introTimer = window.setTimeout(() => setIntroState('closing'), introDuration);
    window.addEventListener('keydown', handleIntroKeyDown);
    return () => {
      window.clearTimeout(introTimer);
      window.removeEventListener('keydown', handleIntroKeyDown);
      document.body.classList.remove('intro-lock');
    };
  }, [introState]);

  const handleProjectPointerMove = event => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty('--tilt-x', `${(0.5 - y) * 9}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${(x - 0.5) * 9}deg`);
    event.currentTarget.style.setProperty('--pointer-x', `${x * 100}%`);
    event.currentTarget.style.setProperty('--pointer-y', `${y * 100}%`);
  };

  const resetProjectPointer = event => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
    event.currentTarget.style.setProperty('--pointer-x', '50%');
    event.currentTarget.style.setProperty('--pointer-y', '50%');
  };

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      document.documentElement.style.setProperty('--page-progress', String(progress));
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      document.documentElement.style.removeProperty('--page-progress');
    };
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(
      '.section-heading, .about-copy, .stat-card, .capability-card, .skills-area, .project-card, .timeline-item, .contact-panel, .tech-word'
    );
    revealElements.forEach(element => element.classList.add('reveal-item'));
    document.documentElement.classList.add('motion-ready');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      revealElements.forEach(element => element.classList.add('is-visible'));
      return () => document.documentElement.classList.remove('motion-ready');
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(element => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, [activeFilter]);

  return (
    <>
      {introState !== 'done' && (
        <div className={`intro-screen${introState === 'closing' ? ' is-closing' : ''}`} role="dialog" aria-modal="true" aria-label="Portfolio introduction">
          <div className="intro-grain" aria-hidden="true"/>
          <div className="intro-orbit intro-orbit-one" aria-hidden="true"><span/></div>
          <div className="intro-orbit intro-orbit-two" aria-hidden="true"><span/></div>
          <div className="intro-orbit intro-orbit-three" aria-hidden="true"><span/></div>
          <div className="intro-lockup">
            <p className="intro-eyebrow"><span/> INDEPENDENT THINKER <i/> CREATIVE DEVELOPER</p>
            <h1 className="intro-name" aria-label={profile.name}>
              {introName.map((word, lineIndex) => (
                <span className="intro-name-line" key={word}>
                  {Array.from(word).map((letter, index) => letter === ' '
                    ? <span className="intro-name-space" key={`space-${index}`}/>
                    : <span className="intro-letter" key={`${letter}-${index}`} style={{ '--letter-index': index + (lineIndex ? 6 : 0) }}>{letter}</span>)}
                </span>
              ))}
            </h1>
            <div className="intro-rule" aria-hidden="true"><span/></div>
            <p className="intro-subtitle">BUILDING DIGITAL EXPERIENCES <span>·</span> FULL-STACK DEVELOPER</p>
          </div>
          <div className="intro-corner intro-corner-top">DP <span>PORTFOLIO / 2026</span></div>
          <div className="intro-corner intro-corner-bottom">PYTHON <span>REACT</span> DJANGO</div>
          <button ref={introSkipRef} className="intro-skip" type="button" onClick={() => setIntroState('closing')}>Skip intro <span aria-hidden="true">↗</span></button>
        </div>
      )}
      <div className="site-shell" aria-hidden={introState !== 'done'}>
      <div className="scroll-progress" aria-hidden="true"/>
      <header className="topbar">
        <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark">DP</span><span>Durga Prasad Gadi<span className="brand-dot">.</span></span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {nav.map(([label, href], index) => <a key={label} href={href} onClick={closeMenu}><span className="nav-index">0{index + 1}</span><span className="nav-slashes" aria-hidden="true">//</span>{label}</a>)}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={15}/></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse"/> HELLO, I'M A DEVELOPER</div>
            <h1 className="hero-title">Durga<br/><span>Prasad Gadi</span></h1>
            <p className="hero-role">{profile.title}</p>
            <p className="hero-lead">{profile.summary}</p>
            <div className="hero-tech-list" aria-label="Core technologies">
              {['Python', 'Django', 'MySQL', 'JavaScript', 'React'].map(technology => <span key={technology}><TechnologyIcon name={technology}/>{technology}</span>)}
            </div>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#projects">Explore my work <ArrowUpRight size={17}/></a>
              <a className="btn btn-ghost" href={`mailto:${profile.email}?subject=Portfolio%20Enquiry`}><Mail size={16}/> Contact me</a>
              <a className="btn btn-ghost" href="/Durga-Prasad-Gadi-Resume.pdf" target="_blank" rel="noreferrer"><Download size={16}/> Resume PDF</a>
            </div>
            <div className="hero-meta">
              <span><MapPin size={15}/> {profile.location}</span>
              <span><BriefcaseBusiness size={15}/> Software Developer</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-object" aria-hidden="true"><span/><i/><b/></div>
            <div className="hero-code-window" aria-hidden="true"><span>portfolio.py</span><code><i>def</i> build_solution():<br/>&nbsp;&nbsp;<em>return</em> {'{'}<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b>"impact"</b>: <strong>"real world"</strong><br/>&nbsp;&nbsp;{'}'}</code></div>
            <div className="portrait-orbit orbit-one"/>
            <div className="portrait-orbit orbit-two"/>
            <div className="portrait-card">
              <div className="portrait-topline"><span>HELLO, I’M</span><span className="portrait-spark">✳</span></div>
              <img src="/durga-prasad-portrait.png" alt="Durga Prasad Gadi, software developer" className="portrait-image"/>
              <div className="portrait-caption"><span className="portrait-status"/> Available for opportunities</div>
            </div>
            <div className="float-chip chip-python"><span>Py</span> Python</div>
            <div className="float-chip chip-db"><Database size={17}/> MySQL</div>
            <div className="float-chip chip-api"><Code2 size={17}/> React</div>
            <div className="hero-glow"/>
          </div>
          <a href="#about" className="scroll-cue"><span/> Scroll to explore</a>
        </section>

        <section className="tech-strip">
          <div className="section-wrap tech-inner">
            <span className="strip-label">TECHNOLOGIES I WORK WITH</span>
            {['Python', 'Django', 'MySQL', 'JavaScript', 'React', 'HTML5', 'CSS3'].map(t => <span className="tech-word" key={t}><TechnologyIcon name={t}/>{t}</span>)}
          </div>
        </section>

        <section className="section-wrap section" id="about">
          <div className="section-heading"><div><span className="section-kicker">01 / ABOUT ME</span><h2>Building software<br/><span>that solves real problems.</span></h2></div><p className="section-intro">I enjoy turning operational challenges into practical software that people can use every day.</p></div>
          <div className="about-grid">
            <div className="about-copy">
              <p>I am a Python Full-Stack Developer focused on developing business-oriented web applications, SaaS products and automation systems.</p>
              <p>My development experience includes HRMS applications, biometric attendance integrations, institute ERP platforms and aquaculture management software.</p>
              <p>I enjoy working on backend architecture, database design, API integrations and practical software solutions.</p>
              <a className="text-link" href="#contact">Have a project in mind? <ArrowUpRight size={16}/></a>
            </div>
            <div className="about-stats">
              <div className="stat-card"><span className="stat-icon"><Code2/></span><strong>Full-stack</strong><small>Backend to frontend</small></div>
              <div className="stat-card"><span className="stat-icon"><Layers3/></span><strong>SaaS & ERP</strong><small>Business applications</small></div>
              <div className="stat-card"><span className="stat-icon"><Cpu/></span><strong>IoT</strong><small>Hardware integration</small></div>
              <div className="stat-card"><span className="stat-icon"><Database/></span><strong>Data-driven</strong><small>Database workflows</small></div>
            </div>
          </div>
        </section>

        <section className="section section-alt" id="expertise">
          <div className="section-wrap section">
            <div className="section-heading"><div><span className="section-kicker">02 / WHAT I DO</span><h2>Practical skills for<br/><span>real-world systems.</span></h2></div><p className="section-intro">I work on the core building blocks behind business software: workflows, integrations, data and usable interfaces.</p></div>
            <div className="capability-grid">
              {capabilities.map(({icon: Icon, title, text}, i) => <article className="capability-card" key={title}><div className="cap-top"><span className="cap-icon"><Icon/></span><span className="cap-index">0{i+1}</span></div><h3>{title}</h3><p>{text}</p></article>)}
            </div>
            <div className="skills-area" id="skills">
              <div className="skills-title"><span className="section-kicker">TECHNICAL TOOLKIT</span><h3>Technologies & tools</h3></div>
              <div className="skill-groups">{skillGroups.map(group => <div className="skill-group" key={group.title}><h4>{group.title}</h4><div className="skill-pills">{group.skills.map(s => <span className="tech-pill" key={s}>{technologyIcons[s] && <TechnologyIcon name={s}/>}<span className="tech-label">{s}</span></span>)}</div></div>)}</div>
            </div>
          </div>
        </section>

        <ArchitectureShowcase/>

        <section className="section-wrap section" id="projects">
          <div className="section-heading"><div><span className="section-kicker">03 / SELECTED WORK</span><h2>Projects built around<br/><span>useful outcomes.</span></h2></div><p className="section-intro">A selection of business applications and automation work. Some implementations are client or team projects; the descriptions focus on the work and capabilities represented.</p></div>
          <div className="project-filters">{['ALL', 'HRMS', 'IOT', 'EDTECH', 'AQUACULTURE', 'HEALTHCARE'].map(f => <button key={f} className={activeFilter===f?'filter active':'filter'} onClick={() => setActiveFilter(f)}>{f}</button>)}</div>
          <div className="projects-grid">
            {filtered.map((p, index) => <article className="project-card" key={p.id} style={{ '--card-index': index }} onPointerMove={handleProjectPointerMove} onPointerLeave={resetProjectPointer}>
              <div className={`project-visual ${p.visual}`}>
                <img className="project-image" src={p.image} alt={p.imageAlt} loading="lazy" decoding="async"/>
                <div className="project-image-shade"/>
                <div className="visual-top"><span>{p.category}</span><span>{p.number}</span></div>
                <div className="project-art">
                  {p.visual === 'hrms' && <div className="mini-dashboard"><div className="mini-side"><i/><i/><i/><i/></div><div className="mini-main"><div className="mini-title"/><div className="mini-metrics"><i/><i/><i/></div><div className="mini-chart"><span/><span/><span/><span/><span/><span/><span/></div><div className="mini-rows"><i/><i/><i/></div></div></div>}
                  {p.visual === 'biometric' && <div className="device-graphic"><div className="fingerprint"><span/><span/><span/></div><div className="sync-line"><i/><i/><i/></div><div className="cloud-node"><Database/></div></div>}
                  {p.visual === 'education' && <div className="edu-graphic"><GraduationCap/><div className="edu-lines"><i/><i/><i/></div><div className="edu-orbit"/></div>}
                  {p.visual === 'aqua' && <div className="aqua-graphic"><div className="water-ring"/><div className="aqua-wave">≈ ≈ ≈</div><span>ManaAqua</span></div>}
                  {p.visual === 'health' && <div className="health-graphic"><div className="health-orbit"><HeartPulse/></div><div className="health-id"><span>ABHA</span><i/><i/><i/></div><span className="health-pulse-line"/></div>}
                  {p.visual === 'tests' && <div className="test-graphic"><div className="test-sheet"><b>WEEKLY TEST</b><i/><i/><i/><i/></div><div className="test-score">A+</div></div>}
                </div>
                <div className="project-image-caption"><span className="caption-orb"/>{p.imageCaption}</div>
              </div>
              <div className="project-content"><div className="project-title-row"><span className="project-number">{p.number}</span><h3>{p.title}</h3></div>{p.ownership ? <div className="project-ownership"><span/> {p.ownership}</div> : <div className="project-contribution">{p.contribution}</div>}<p>{p.description}</p><ul>{p.features.map(f => <li key={f}><CheckCircle2 size={14}/>{f}</li>)}</ul><div className="project-stack">{p.stack.map(s => <span className="stack-item" key={s}>{technologyIcons[s] && <TechnologyIcon name={s}/>}<span className="stack-label">{s}</span></span>)}</div><div className="project-links">{p.link ? <a href={p.link} target="_blank" rel="noreferrer">{p.linkLabel}<ExternalLink size={14}/></a> : <span className="private-label">{p.linkLabel}</span>}{p.appLink && <a href={p.appLink} target="_blank" rel="noreferrer">Open app <ExternalLink size={14}/></a>}</div></div>
            </article>)}
          </div>
          <p className="project-note"><span>*</span> Project photos are illustrative stock images, not screenshots of the platforms. Approved product screenshots and detailed case studies can be added later. Do not publish client-confidential screens, credentials or data.</p>
        </section>

        <section className="section section-alt" id="experience">
          <div className="section-wrap section">
            <div className="section-heading"><div><span className="section-kicker">04 / EXPERIENCE & EDUCATION</span><h2>The journey so far.</h2></div><p className="section-intro">Professional experience grounded in full-stack development and business application delivery.</p></div>
            <div className="timeline">
              {experience.map(item => <div className="timeline-item" key={item.role}><span className="timeline-dot"/>{item.period && <div className="timeline-date">{item.period}</div>}<div className="timeline-body"><h3>{item.role} <span>@ {item.company}</span></h3>{item.location && <p className="timeline-location">{item.location}</p>}<ul>{item.responsibilities.map(responsibility => <li key={responsibility}>{responsibility}</li>)}</ul><div className="project-stack">{item.technologies.map(skill => <span className="stack-item" key={skill}>{technologyIcons[skill] && <TechnologyIcon name={skill}/>}<span className="stack-label">{skill}</span></span>)}</div></div></div>)}
              <div className="timeline-item"><span className="timeline-dot"/><div className="timeline-date">{education.period}</div><div className="timeline-body"><h3>{education.degree}</h3><p className="timeline-location">{education.institution}</p><p>CGPA: {education.cgpa}</p></div></div>
            </div>
          </div>
        </section>

        <section className="section-wrap section" id="contact">
          <div className="contact-panel">
            <div className="contact-copy"><span className="section-kicker">05 / GET IN TOUCH</span><h2>Let's build<br/><span>something great.</span></h2><p>Have a software project, business automation requirement or development opportunity? Let's connect.</p><div className="contact-actions"><a className="btn btn-primary" href={`mailto:${profile.email}?subject=Freelance%20Enquiry`}>Freelance enquiry <ArrowUpRight size={17}/></a><a className="btn btn-ghost" href={`mailto:${profile.email}?subject=Job%20Opportunity`}>Job opportunity <ArrowUpRight size={17}/></a></div></div>
            <div className="contact-details">
              <a href={`mailto:${profile.email}`}><span><Mail/></span><div><small>EMAIL</small><strong>{profile.email}</strong></div><ArrowUpRight/></a>
              <a href={`tel:${profile.phoneLink}`}><span><Phone/></span><div><small>PHONE</small><strong>{profile.phone}</strong></div><ArrowUpRight/></a>
              <div className="contact-static"><span><MapPin/></span><div><small>LOCATION</small><strong>{profile.location}</strong></div></div>
              <div className="social-links"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a>{profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a>}</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="section-wrap footer-inner"><a className="brand" href="#home"><span className="brand-mark">DP</span><span>Durga Prasad Gadi<span className="brand-dot">.</span></span></a><span>Designed & built with purpose.</span><a href="#home" className="back-top">Back to top ↑</a><small>© {new Date().getFullYear()} Durga Prasad Gadi. All rights reserved.</small></div></footer>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);