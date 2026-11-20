import React from 'react';
import { ArrowDown, ArrowRight, Cloud, Code2, Database, Fingerprint, LockKeyhole, PlugZap, Server, Workflow } from 'lucide-react';

const architectureSteps = [
  { label: 'Frontend', detail: 'Responsive UI', icon: Code2 },
  { label: 'Backend', detail: 'Business logic', icon: Server },
  { label: 'REST API', detail: 'Data exchange', icon: PlugZap },
  { label: 'Authentication', detail: 'Access control', icon: LockKeyhole },
  { label: 'Database', detail: 'Structured data', icon: Database },
  { label: 'Integrations', detail: 'External services', icon: Cloud }
];

const biometricSteps = [
  { label: 'Biometric device', icon: Fingerprint },
  { label: 'Python agent', icon: Code2 },
  { label: 'Data processing', icon: Workflow },
  { label: 'API communication', icon: PlugZap },
  { label: 'HRMS server', icon: Server },
  { label: 'Database', icon: Database }
];

function FlowNodes({ steps, className = '' }) {
  return (
    <ol className={`architecture-flow ${className}`}>
      {steps.map((step, index) => {
        const Icon = step.icon;
        const label = step.label;
        const detail = step.detail;
        return (
          <li className="architecture-node" key={label} style={{ '--node-index': index }}>
            <span className="architecture-icon"><Icon size={18}/></span>
            <strong>{label}</strong>
            {detail && <small>{detail}</small>}
            {index < steps.length - 1 && <span className="architecture-connector" aria-hidden="true"><ArrowRight size={15}/><ArrowDown size={15}/></span>}
          </li>
        );
      })}
    </ol>
  );
}

export default function ArchitectureShowcase() {
  return (
    <section className="architecture-section" id="architecture">
      <div className="section-wrap section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">HOW I BUILD SOFTWARE</span>
            <h2>Connected systems.<br/><span>Practical outcomes.</span></h2>
          </div>
          <p className="section-intro">I work across application layers, connecting interfaces, business logic, data and real-world integrations.</p>
        </div>
        <div className="architecture-panel">
          <h3>Application architecture</h3>
          <FlowNodes steps={architectureSteps}/>
          <div className="deployment-node"><Cloud size={17}/> Deployment & hosting</div>
        </div>
        <div className="biometric-panel">
          <div className="biometric-intro">
            <span className="section-kicker">DEVICE INTEGRATION</span>
            <h3>Attendance data flow</h3>
            <p>A high-level view of the biometric attendance synchronization workflow.</p>
          </div>
          <FlowNodes steps={biometricSteps} className="biometric-flow"/>
        </div>
      </div>
    </section>
  );
}
