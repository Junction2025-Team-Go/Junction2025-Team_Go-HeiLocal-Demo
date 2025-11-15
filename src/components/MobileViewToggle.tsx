/**
 * MobileViewToggle Component
 * Toggle button for switching between Video and Map views on mobile
 */

import './MobileViewToggle.css'

interface MobileViewToggleProps {
  activeView: 'video' | 'map'
  onToggle: (view: 'video' | 'map') => void
}

export default function MobileViewToggle({ activeView, onToggle }: MobileViewToggleProps) {
  return (
    <div className="mobile-view-toggle">
      <button
        className={`toggle-button ${activeView === 'video' ? 'active' : ''}`}
        onClick={() => onToggle('video')}
      >
        <svg className="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <polygon points="10 8 16 12 10 16" fill="currentColor" />
        </svg>
        <span>Video</span>
      </button>
      <button
        className={`toggle-button ${activeView === 'map' ? 'active' : ''}`}
        onClick={() => onToggle('map')}
      >
        <svg className="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 2v16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 6v16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Map</span>
      </button>
    </div>
  )
}
