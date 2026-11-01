import { useState } from 'react'

const COUNTIES = ['Nairobi', 'Mombasa', 'Kisumu', 'Kiambu', 'Nakuru', 'Eldoret', 'Machakos', 'Kajiado']

const MOCK_USERS = [
  { id: 1, name: 'Amina', age: 26, county: 'Nairobi', bio: 'Coffee, hiking, Sheng vibes 😎 Looking for genuine connection.', interests: ['Music', 'Travel', 'Food'], tribe: 'Kikuyu', religion: 'Christian', distance: 2.4, photo: null },
  { id: 2, name: 'Brian', age: 29, county: 'Mombasa', bio: 'Beach days & business nights. Let\'s vibe.', interests: ['Fitness', 'Tech', 'Food'], tribe: 'Luo', religion: 'Christian', distance: 5.1, photo: null },
  { id: 3, name: 'Faith', age: 24, county: 'Kiambu', bio: 'Church girl who loves adventure and good food.', interests: ['Faith', 'Nature', 'Cooking'], tribe: 'Kikuyu', religion: 'Christian', distance: 8.7, photo: null },
  { id: 4, name: 'Jamal', age: 31, county: 'Nairobi', bio: 'Entrepreneur. Love music and late night drives.', interests: ['Business', 'Music', 'Cars'], tribe: 'Kamba', religion: 'Muslim', distance: 3.2, photo: null },
  { id: 5, name: 'Wanjiku', age: 27, county: 'Nakuru', bio: 'Nature lover. Always up for a hike or good conversation.', interests: ['Nature', 'Photography', 'Travel'], tribe: 'Kikuyu', religion: 'Christian', distance: 45, photo: null },
]

function App() {
  const [view, setView] = useState('home') // home | profiles | profile | chat | setup
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [filters, setFilters] = useState({ county: '', maxAge: 40, minAge: 18 })
  const [liked, setLiked] = useState([])
  const [myProfile, setMyProfile] = useState(null)

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy
        })
        setError(null)
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  const filteredUsers = MOCK_USERS.filter(u => {
    if (filters.county && u.county !== filters.county) return false
    if (u.age < filters.minAge || u.age > filters.maxAge) return false
    return true
  })

  const handleLike = (user) => {
    if (!liked.includes(user.id)) {
      setLiked([...liked, user.id])
      alert(`You liked ${user.name}! In a full app this would create a match if mutual.`)
    }
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '1.25rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2.4rem', margin: 0, background: 'linear-gradient(135deg, #7c3aed, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Kenya LocaMatch
        </h1>
        <p style={{ color: '#64748b', margin: '0.25rem 0 0' }}>Connect with people near you — Nairobi, Mombasa, Kisumu & beyond</p>
      </header>

      <nav style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button className="btn-secondary" onClick={() => setView('home')}>Home</button>
        <button className="btn-secondary" onClick={() => setView('profiles')}>Nearby</button>
        <button className="btn-secondary" onClick={() => setView('setup')}>My Profile</button>
        {liked.length > 0 && <span className="tag">{liked.length} likes</span>}
      </nav>

      {view === 'home' && (
        <div style={{ textAlign: 'center' }}>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h2>Find matches by location</h2>
            <p>Allow location access to see people nearby in your county or town.</p>
            {!location ? (
              <button className="btn-primary" onClick={requestLocation}>Enable GPS Location</button>
            ) : (
              <div>
                <p>✅ Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)} (±{Math.round(location.accuracy)}m)</p>
                <button className="btn-primary" onClick={() => setView('profiles')}>See Nearby Profiles</button>
              </div>
            )}
            {error && <p style={{ color: '#dc2626' }}>{error}</p>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="card"><h3>Profiles</h3><p>Photos, age, bio, interests, tribe, religion, lifestyle</p></div>
            <div className="card"><h3>Location Matching</h3><p>County, distance (Haversine), GPS-based</p></div>
            <div className="card"><h3>Chat & Safety</h3><p>Match, real-time chat, report & block system</p></div>
            <div className="card"><h3>Kenya Local</h3><p>Sheng vibes, M-Pesa ready, student/professional/church modes</p></div>
          </div>
        </div>
      )}

      {view === 'profiles' && (
        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3 style={{ marginTop: 0 }}>Filters</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <label>
                County:{' '}
                <select value={filters.county} onChange={e => setFilters({...filters, county: e.target.value})}>
                  <option value="">All</option>
                  {COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
              <label>
                Age: {filters.minAge} – {filters.maxAge}
                <input type="range" min="18" max="50" value={filters.maxAge} onChange={e => setFilters({...filters, maxAge: +e.target.value})} />
              </label>
            </div>
          </div>

          <h2>People near you ({filteredUsers.length})</h2>
          {filteredUsers.map(user => (
            <div key={user.id} className="card" style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.8rem', flexShrink: 0 }}>
                {user.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.25rem' }}>{user.name}, {user.age}</h3>
                <p style={{ margin: '0 0 0.25rem', color: '#64748b' }}>{user.county} • {user.distance} km • {user.tribe}</p>
                <p style={{ margin: '0.25rem 0' }}>{user.bio}</p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', margin: '0.5rem 0' }}>
                  {user.interests.map(i => <span key={i} className="tag">{i}</span>)}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-primary" onClick={() => handleLike(user)}>Like</button>
                  <button className="btn-secondary" onClick={() => { setSelectedUser(user); setView('profile') }}>View</button>
                </div>
              </div>
            </div>
          ))}
          {filteredUsers.length === 0 && <p>No profiles match your filters. Try widening the age or county.</p>}
        </div>
      )}

      {view === 'profile' && selectedUser && (
        <div>
          <button className="btn-secondary" onClick={() => setView('profiles')}>Back to list</button>
          <div className="card" style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem' }}>
                {selectedUser.name[0]}
              </div>
              <div>
                <h2 style={{ margin: 0 }}>{selectedUser.name}, {selectedUser.age}</h2>
                <p style={{ margin: '0.25rem 0', color: '#64748b' }}>{selectedUser.county} • {selectedUser.distance} km away</p>
                <p>{selectedUser.tribe} • {selectedUser.religion}</p>
              </div>
            </div>
            <p style={{ marginTop: '1rem' }}>{selectedUser.bio}</p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {selectedUser.interests.map(i => <span key={i} className="tag">{i}</span>)}
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button className="btn-primary" onClick={() => handleLike(selectedUser)}>Like</button>
              <button className="btn-secondary" onClick={() => alert('Chat feature coming soon — real-time with Supabase or Socket.io')}>Message</button>
              <button className="btn-secondary" onClick={() => alert('Report submitted (demo). In production this would flag the user for review.')}>Report</button>
            </div>
          </div>
        </div>
      )}

      {view === 'setup' && (
        <div className="card">
          <h2>Set up your profile</h2>
          <p>In the full app this would save to a database (Supabase / Firebase) and allow photo uploads.</p>
          <form onSubmit={(e) => {
            e.preventDefault()
            const form = new FormData(e.target)
            setMyProfile({
              name: form.get('name'),
              age: form.get('age'),
              county: form.get('county'),
              bio: form.get('bio')
            })
            alert('Profile saved locally (demo)!')
          }} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input name="name" placeholder="Your name" required style={{ padding: '0.5rem', borderRadius: 8, border: '1px solid #cbd5e1' }} />
            <input name="age" type="number" placeholder="Age" min="18" required style={{ padding: '0.5rem', borderRadius: 8, border: '1px solid #cbd5e1' }} />
            <select name="county" required style={{ padding: '0.5rem', borderRadius: 8, border: '1px solid #cbd5e1' }}>
              <option value="">Select county</option>
              {COUNTIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <textarea name="bio" placeholder="Short bio (Sheng welcome!)" rows={3} style={{ padding: '0.5rem', borderRadius: 8, border: '1px solid #cbd5e1' }} />
            <button type="submit" className="btn-primary">Save Profile</button>
          </form>
          {myProfile && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f1f5f9', borderRadius: 8 }}>
              <strong>Your profile:</strong> {myProfile.name}, {myProfile.age} — {myProfile.county}<br />
              {myProfile.bio}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App