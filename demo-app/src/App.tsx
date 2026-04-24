import 'normalize.css'
import { VolumeRenderer } from '@brainminds-dataportal/vol-renderer'
import './App.css'

const demoVolumeUrl = `${import.meta.env.BASE_URL}resources/sp2_avg_mri_exvivo_t2wi_downsampl.nii.gz`

function App() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>vol-renderer Demo App</h1>
        <p>
          Displaying a low-resolution version of the{' '}
          <a href="https://brainminds.jp/en/" target="_blank" rel="noreferrer">
            Brain/MINDS
          </a>{' '}
          Marmoset Brain Atlas (
          <a
            href="https://dataportal.brainminds.jp/atlas-package-download-main-page/bma-2019-ex-vivo"
            target="_blank"
            rel="noreferrer"
          >
            source data
          </a>
          ).
        </p>
      </header>

      <main className="viewer-section">
        <div className="viewer-frame">
          <VolumeRenderer url={demoVolumeUrl} inlineControls />
        </div>
      </main>
    </div>
  )
}

export default App
