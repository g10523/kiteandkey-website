import DashboardDemo from './components/DashboardDemo';
import MindPrintBadge from './components/MindPrintBadge';
import './App.css';

function DemoApp() {
    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            pointerEvents: 'none',
            userSelect: 'none'
        }}>
            <MindPrintBadge />
            <main style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                overflow: 'auto'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '1400px',
                    padding: '2rem'
                }}>
                    <DashboardDemo />
                </div>
            </main>
        </div>
    );
}

export default DemoApp;
