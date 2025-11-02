export default function About() {
  return (
    <div className="container">
      <div className="text-center" style={{ marginBottom: '3rem' }}>
        <h1>About Reddit Research</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
          A powerful tool to discover, analyze, and research Reddit communities
        </p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>🎯 What We Do</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Reddit Research helps you find the perfect subreddits for your audience, analyze engagement trends, 
          and discover niche communities that matter to your business or research.
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          <div>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>🔍 Advanced Search</h4>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              Search Reddit posts by keywords, audience, and engagement metrics with powerful filtering options.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>👥 Audience Discovery</h4>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              Find curated audiences and discover what communities your target users are active in.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>📊 Analytics Dashboard</h4>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              Analyze subreddit performance with detailed metrics on posts, comments, and engagement.
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1rem' }}>🚀 Features</h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <li style={{ paddingLeft: '1.5rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0 }}>✓</span>
            Real-time Reddit data
          </li>
          <li style={{ paddingLeft: '1.5rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0 }}>✓</span>
            Advanced filtering options
          </li>
          <li style={{ paddingLeft: '1.5rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0 }}>✓</span>
            Engagement metrics
          </li>
          <li style={{ paddingLeft: '1.5rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0 }}>✓</span>
            Curated audience lists
          </li>
          <li style={{ paddingLeft: '1.5rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0 }}>✓</span>
            Responsive design
          </li>
          <li style={{ paddingLeft: '1.5rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0 }}>✓</span>
            Easy export options
          </li>
        </ul>
      </div>
    </div>
  );
}