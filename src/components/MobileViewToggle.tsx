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
        <svg className="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16" fill="currentColor" />
        </svg>
        <span>Video</span>
      </button>
      <button
        className={`toggle-button ${activeView === 'map' ? 'active' : ''}`}
        onClick={() => onToggle('map')}
      >
        <svg className="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>Map</span>
      </button>
    </div>
  )
}
