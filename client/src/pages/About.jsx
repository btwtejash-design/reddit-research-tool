export default function About() {
  return (
    <div style={{
      background: 'linear-gradient(180deg, var(--emerald-50) 0%, var(--bg-main) 100%)',
      minHeight: '100vh',
      paddingTop: '3rem',
      paddingBottom: '4rem'
    }}>
      <div className="container">
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          animation: 'fadeIn 0.8s ease-out'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1.25rem',
            backgroundColor: 'var(--primary)',
            color: 'white',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            boxShadow: 'var(--shadow-emerald)'
          }}>
            ℹ️ About Us
          </div>

          <h1 style={{
            marginBottom: '1rem',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)'
          }}>
            About Reddit
            <br />
            <span style={{
              background: 'var(--gradient-text)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Research
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
            color: 'var(--text-secondary)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            A powerful tool designed for founders and marketers to discover, analyze, 
            and research Reddit communities with precision and ease.
          </p>
        </div>

        {/* What We Do Card */}
        <div className="card fade-in" style={{
          marginBottom: '2rem',
          background: 'white',
          boxShadow: 'var(--shadow-xl)',
          border: 'none'
        }}>
          <div style={{
            background: 'var(--gradient-primary)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0',
            margin: '-1.5rem -1.5rem 1.5rem -1.5rem',
            color: 'white'
          }}>
            <h2 style={{ margin: 0, color: 'white', fontSize: '2rem' }}>
              🎯 What We Do
            </h2>
          </div>

          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            fontSize: '1.125rem',
            lineHeight: '1.8'
          }}>
            Reddit Research helps you find the perfect subreddits for your audience, 
            analyze engagement trends, and discover niche communities that matter to your 
            business or research. Built specifically for founders and marketers who need 
            actionable insights.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                icon: '🔍',
                title: 'Advanced Search',
                desc: 'Search Reddit posts by keywords, audience, and engagement metrics with powerful filtering options.',
                color: 'var(--primary)'
              },
              {
                icon: '👥',
                title: 'Audience Discovery',
                desc: 'Find curated audiences and discover what communities your target users are active in.',
                color: 'var(--primary)'
              },
              {
                icon: '📊',
                title: 'Analytics Dashboard',
                desc: 'Analyze subreddit performance with detailed metrics on posts, comments, and engagement.',
                color: 'var(--primary)'
              }
            ].map((feature, i) => (
              <div key={i} className="card scale-in" style={{
                padding: '2rem',
                background: 'var(--gradient-card)',
                border: '2px solid var(--emerald-200)',
                animationDelay: `${i * 0.1}s`,
                animationFillMode: 'both'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  {feature.icon}
                </div>
                <h4 style={{
                  color: feature.color,
                  marginBottom: '0.75rem',
                  fontSize: '1.25rem'
                }}>
                  {feature.title}
                </h4>
                <p style={{
                  fontSize: '0.9375rem',
                  color: 'var(--text-secondary)',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Card */}
        <div className="card fade-in" style={{
          background: 'white',
          boxShadow: 'var(--shadow-xl)',
          border: 'none'
        }}>
          <div style={{
            background: 'var(--gradient-primary)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0',
            margin: '-1.5rem -1.5rem 1.5rem -1.5rem',
            color: 'white'
          }}>
            <h2 style={{ margin: 0, color: 'white', fontSize: '2rem' }}>
              🚀 Features
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              'Real-time Reddit data',
              'Advanced filtering options',
              'Engagement metrics',
              'Curated audience lists',
              'Responsive design',
              'Easy export options'
            ].map((feature, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'var(--emerald-50)',
                borderRadius: 'var(--radius-lg)',
                transition: 'all var(--transition-base)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.background = 'var(--emerald-100)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.background = 'var(--emerald-50)';
              }}
              >
                <span style={{
                  fontSize: '1.5rem',
                  color: 'var(--primary)',
                  fontWeight: 700
                }}>
                  ✓
                </span>
                <span style={{
                  color: 'var(--text-primary)',
                  fontWeight: 500
                }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div style={{
          textAlign: 'center',
          marginTop: '4rem',
          padding: '3rem',
          background: 'var(--gradient-card)',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: 'var(--shadow-xl)'
        }}>
          <h2 style={{
            marginBottom: '1rem',
            fontSize: '2rem'
          }}>
            Ready to Get Started?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Start discovering your perfect Reddit audience today. No credit card required.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a href="/audience" className="btn btn-primary btn-lg">
              🎯 Explore Collections
            </a>
            <a href="/advanced" className="btn btn-outline-secondary btn-lg">
              🔍 Try Advanced Search
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
