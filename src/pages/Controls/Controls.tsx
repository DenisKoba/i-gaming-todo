import { MODULE } from '../../core/constants';

const { ipcRenderer } = window?.require('electron');

export function Controls() {
    const handleNext = (): void => ipcRenderer.send('message', { module: MODULE.gallery, event: 'nextSlide' });

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <button onClick={handleNext}>Next</button>
        </div>
    );
}
