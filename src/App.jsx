import { useState, useEffect, useRef } from 'react'
import './App.css'

const masters = [
  {
    id: 1,
    name: 'Иван Сергеев',
    rating: 4.9,
    jobs: 142,
    specialty: 'Плиточник-универсал',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    description: 'Опыт более 10 лет. Специализируюсь на широкоформатном керамограните и мозаике. Гарантия на работы 3 года.',
    skills: ['Широкоформат', 'Мозаика', 'Эпоксидная затирка', 'Гидроизоляция'],
    portfolio: [
      { id: 101, title: 'Ванная в ЖК "Океан"', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800' },
      { id: 102, title: 'Фартук на кухне', img: 'https://images.unsplash.com/photo-1556911220-e15595ffc80d?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 2,
    name: 'Мария Волкова',
    rating: 5.0,
    jobs: 89,
    specialty: 'Дизайнер интерьера',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    description: 'Создаю функциональные интерьеры. Сопровождаю проект от идеи до реализации (авторский надзор).',
    skills: ['3D Визуализация', 'Подбор материалов', 'Авторский надзор'],
    portfolio: [
      { id: 201, title: 'Коттедж в Лесу', img: 'https://images.unsplash.com/photo-1513584684374-8bdb7483fe8f?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 3,
    name: 'Алексей Петров',
    rating: 4.7,
    jobs: 215,
    specialty: 'Электрик',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    description: 'Инженерное образование. Сборка щитов, монтаж умного дома, полная замена проводки.',
    skills: ['Сборка щитов', 'Умный дом', 'Трассировка'],
    portfolio: [
      { id: 301, title: 'Щит на 48 модулей', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 4,
    name: 'Дмитрий Соколов',
    rating: 4.8,
    jobs: 176,
    specialty: 'Маляр-штукатур',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    description: 'Идеально ровные стены. Малярные работы любой сложности, декоративная штукатурка.',
    skills: ['Выравнивание', 'Покраска', 'Декор'],
    portfolio: [
      { id: 401, title: 'Стены под покраску', img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800' }
    ]
  }
]

const companies = [
  {
    id: 1,
    name: 'Ремонт-Люкс',
    rating: 4.8,
    jobs: 520,
    specialty: 'Капитальный ремонт',
    logo: '🛡️',
    description: 'Крупнейшая компания в регионе. Работаем по договору, соблюдаем сроки. Свой штат дизайнеров и инженеров.',
    portfolio: [
      { id: 501, title: 'Пентхаус 200м²', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800' }
    ],
    skills: ['Смета', 'Договор', 'Гарантия', 'Дизайн']
  },
  {
    id: 2,
    name: 'ДомМастер',
    rating: 4.5,
    jobs: 340,
    specialty: 'Косметический ремонт',
    logo: '🏠',
    description: 'Быстрый и качественный ремонт квартир под ключ. Прозрачные сметы и еженедельные фотоотчеты.',
    portfolio: [
      { id: 601, title: 'Студия в стиле Ар-деко', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800' }
    ],
    skills: ['Быстрый старт', 'Фотоотчеты', 'Закуп материалов']
  }
]


const workCategories = [
  { id: 'electro', title: 'Электрика', price: 1200, icon: '⚡' },
  { id: 'water', title: 'Сантехника', price: 1500, icon: '🚰' },
  { id: 'floor', title: 'Полы', price: 800, icon: '🪵' },
  { id: 'wall', title: 'Стены/Потолки', price: 600, icon: '🎨' },
  { id: 'tile', title: 'Плитка', price: 1800, icon: '🔳' },
  { id: 'demo', title: 'Демонтаж', price: 400, icon: '🔨' }
]

const BeforeAfterSlider = ({ before, after }) => {
  const [sliderPos, setSliderPos] = useState(50)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
    const handleResize = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const xPos = e.clientX || (e.touches && e.touches[0].clientX)
    if (!xPos) return
    const x = ((xPos - rect.left) / rect.width) * 100
    setSliderPos(Math.max(0, Math.min(100, x)))
  }

  return (
    <div
      ref={containerRef}
      className="ba-slider"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      style={{ cursor: 'col-resize' }}
    >
      <div className="ba-after">
        <img src={after} alt="После" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="ba-before" style={{ width: `${sliderPos}%`, borderRight: '3px solid var(--accent-gold)' }}>
        <img
          src={before}
          alt="До"
          style={{
            width: containerWidth ? `${containerWidth}px` : '100%',
            height: '400px',
            objectFit: 'cover',
            maxWidth: 'none'
          }}
        />
      </div>
      <div className="ba-handle" style={{ left: `${sliderPos}%` }}></div>
    </div>
  )
}

function App() {
  const [area, setArea] = useState(50)
  const [type, setType] = useState('standard')
  const [selectedWorks, setSelectedWorks] = useState(['wall', 'floor'])
  const [total, setTotal] = useState(0)
  const [activeTab, setActiveTab] = useState('masters')
  const [selectedMaster, setSelectedMaster] = useState(null)
  const [formStatus, setFormStatus] = useState('idle')
  const [formData, setFormData] = useState({ name: '', phone: '', task: '' })

  // NEW STATES
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('Все')
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [showRegModal, setShowRegModal] = useState(false)

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active')
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Theme Toggle Effect
  useEffect(() => {
    document.body.className = isDarkTheme ? '' : 'light-theme'
  }, [isDarkTheme])
  const handleContactSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sending')
    setTimeout(() => {
      setFormStatus('success')
      setFormData({ name: '', phone: '', task: '' }) // Clear form after success
    }, 1500)
    setTimeout(() => setFormStatus('idle'), 5000)
  }

  useEffect(() => {
    const baseMult = type === 'luxury' ? 2 : type === 'standard' ? 1.5 : 1
    const worksPrice = selectedWorks.reduce((acc, catId) => {
      const cat = workCategories.find(c => c.id === catId)
      return acc + (cat ? cat.price : 0)
    }, 0)

    setTotal(area * worksPrice * baseMult)
  }, [area, type, selectedWorks])

  const toggleWork = (id) => {
    setSelectedWorks(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <div className="portal-app">
      {/* Profile Modal */}
      {selectedMaster && (
        <div className="modal-overlay" onClick={() => setSelectedMaster(null)}>
          <div className="modal-content glass-effect" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedMaster(null)}>&times;</button>
            <div className="profile-header">
              <img src={selectedMaster.img} alt={selectedMaster.name} className="profile-img" />
              <div className="profile-info">
                <h2>{selectedMaster.name}</h2>
                <p className="specialty">{selectedMaster.specialty}</p>
                <div className="stats">
                  <span>⭐ {selectedMaster.rating}</span>
                  <span>🔧 {selectedMaster.jobs} работ</span>
                </div>
              </div>
            </div>
            <div className="profile-body">
              <h3>О мастере</h3>
              <p>{selectedMaster.description}</p>
              <h3>Навыки</h3>
              <div className="skills-tags">
                {selectedMaster.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
              </div>
              <h3 style={{ marginTop: '2rem' }}>Портфолио</h3>
              <div className="profile-portfolio">
                {selectedMaster.portfolio.map(p => (
                  <div key={p.id} className="portfolio-shot">
                    <img src={p.img} alt={p.title} />
                    <span>{p.title}</span>
                  </div>
                ))}
              </div>
              <a href="#contact" className="btn-primary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: '2rem' }} onClick={() => setSelectedMaster(null)}>Нанять мастера</a>
            </div>
          </div>
        </div>
      )}

      {/* Theme Toggle */}
      <button className="theme-toggle floating" onClick={() => setIsDarkTheme(!isDarkTheme)}>
        {isDarkTheme ? '☀️' : '🌙'}
      </button>

      {/* Registration Modal */}
      {showRegModal && (
        <div className="modal-overlay" onClick={() => setShowRegModal(false)}>
          <div className="modal-content glass-effect" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowRegModal(false)}>&times;</button>
            <h2 className="section-title text-center">Стать мастером портала</h2>
            <p className="text-center" style={{ marginBottom: '2rem' }}>Заполните анкету, и мы свяжемся с вами для верификации профиля.</p>
            <form className="contact-form-side" style={{ background: 'transparent', padding: 0 }} onSubmit={(e) => { e.preventDefault(); setShowRegModal(false); alert('Заявка принята! Мы свяжемся с вами.'); }}>
              <div className="form-group"><input type="text" placeholder="ФИО или Название компании" required /></div>
              <div className="form-group"><input type="text" placeholder="Специализация" required /></div>
              <div className="form-group"><input type="tel" placeholder="Телефон" required /></div>
              <div className="form-group"><textarea placeholder="Расскажите о своем опыте"></textarea></div>
              <button type="submit" className="btn-primary full-width">Отправить анкету</button>
            </form>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="navbar glass-effect sticky">
        <div className="container nav-content">
          <div className="logo-brand gradient-text">MASTERPORTAL</div>
          <div className="nav-links">
            <a href="#ratings">Мастера</a>
            <a href="#advantages">Преимущества</a>
            <a href="#calc">Калькулятор</a>
            <a href="#portfolio">Идеи</a>
            <button className="btn-outline" style={{ width: 'auto', border: 'none', color: 'var(--accent-gold)' }} onClick={() => setShowRegModal(true)}>Вход для мастеров</button>
            <a href="#contact" className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>Связаться</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section reveal">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title">Мастера твоего <br /><span className="gradient-text">нового дома</span></h1>
          <p className="hero-subtitle">Найди профессионалов от демонтажа до финального декора. Проверенные отзывы и честные цены.</p>
          <div className="hero-btns">
            <a href="#calc" className="btn-primary">Начать расчет</a>
          </div>
        </div>
      </section>
      {/* Stats Bar */}
      <section className="stats-bar glass-effect reveal">
        <div className="container stats-flex">
          <div className="stat-item">
            <span className="stat-num">150+</span>
            <span className="stat-desc">Проверенных мастеров</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">1200+</span>
            <span className="stat-desc">Выполненных проектов</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">3 года</span>
            <span className="stat-desc">Средняя гарантия</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">4.9/5</span>
            <span className="stat-desc">Средний рейтинг</span>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="section-padding advantages-section reveal">
        <div className="container">
          <h2 className="section-title text-center">Почему MASTERPORTAL?</h2>
          <div className="advantages-grid">
            <div className="adv-card glass-effect">
              <div className="adv-icon">📜</div>
              <h4>Официальный договор</h4>
              <p>Все работы фиксируются юридически. Сроки и стоимость не меняются в процессе.</p>
            </div>
            <div className="adv-card glass-effect">
              <div className="adv-icon">🛠️</div>
              <h4>Тройной контроль качества</h4>
              <p>Наши инженеры проверяют каждый этап работ на соответствие СНиП и ГОСТ.</p>
            </div>
            <div className="adv-card glass-effect">
              <div className="adv-icon">💰</div>
              <h4>Прозрачная смета</h4>
              <p>Вы точно знаете, за что платите. Детализация до каждого гвоздя и мешка смеси.</p>
            </div>
            <div className="adv-card glass-effect">
              <div className="adv-icon">⏱️</div>
              <h4>Соблюдение сроков</h4>
              <p>За каждый день просрочки выплачиваем компенсацию, прописанную в договоре.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ratings */}
      <section id="ratings" className="section-padding ratings-section reveal">
        <div className="container">
          <h2 className="section-title text-center">Профи в твоем районе</h2>

          <div className="search-filter-container">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Поиск по имени или специализации..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-bar">
              {['Все', 'Плиточник', 'Дизайнер', 'Электрик', 'Маляр', 'Ремонт'].map(cat => (
                <button
                  key={cat}
                  className={`filter-chip ${categoryFilter === cat ? 'active' : ''}`}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="tabs text-center">
            <button className={activeTab === 'masters' ? 'tab-btn active' : 'tab-btn'} onClick={() => setActiveTab('masters')}>Мастера</button>
            <button className={activeTab === 'companies' ? 'tab-btn active' : 'tab-btn'} onClick={() => setActiveTab('companies')}>Компании</button>
          </div>

          <div className="rating-grid">
            {(activeTab === 'masters' ? masters : companies)
              .filter(item => {
                const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.specialty.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory = categoryFilter === 'Все' || item.specialty.includes(categoryFilter);
                return matchesSearch && matchesCategory;
              })
              .map(item => (
                <div key={item.id} className="rating-card glass-effect hover-trigger">
                  {item.img ? (
                    <img src={item.img} alt={item.name} className="card-img" />
                  ) : (
                    <div className="logo-placeholder">{item.logo}</div>
                  )}
                  <h3>{item.name}</h3>
                  <p className="specialty">{item.specialty}</p>
                  <div className="stats">
                    <span>⭐ {item.rating}</span>
                    <span>{item.img ? '🔧' : '🏗️'} {item.jobs} {item.img ? 'работ' : 'объектов'}</span>
                  </div>
                  <button className="btn-outline" onClick={() => setSelectedMaster(item)}>
                    {item.img ? 'Открыть профиль' : 'О компании'}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Brands & Partners */}
      <section className="brands-bar glass-effect">
        <div className="container brands-flex">
          <span className="brand-label">Доверяем качеству:</span>
          <div className="brands-logos">
            <span className="brand-logo">KNAUF</span>
            <span className="brand-logo">LEGRAND</span>
            <span className="brand-logo">CERESIT</span>
            <span className="brand-logo">TECE</span>
            <span className="brand-logo">REHAU</span>
          </div>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section id="services" className="section-padding services-grid-section">
        <div className="container">
          <h2 className="section-title text-center">Все виды услуг</h2>
          <div className="services-detailed-grid">
            <div className="service-card glass-effect">
              <div className="s-header">
                <span className="s-icon">🏠</span>
                <h4>Ремонт "под ключ"</h4>
              </div>
              <ul>
                <li>Разработка дизайн-проекта</li>
                <li>Черновые и чистовые работы</li>
                <li>Закупка и доставка материалов</li>
                <li>Клининг после ремонта</li>
              </ul>
              <a href="#contact" className="btn-outline" style={{ marginTop: '1.5rem', display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>Узнать подробнее</a>
            </div>
            <div className="service-card glass-effect">
              <div className="s-header">
                <span className="s-icon">🏗️</span>
                <h4>Перепланировка</h4>
              </div>
              <ul>
                <li>Демонтаж перегородок</li>
                <li>Возведение новых стен</li>
                <li>Усиление проемов</li>
                <li>Согласование документов</li>
              </ul>
              <a href="#contact" className="btn-outline" style={{ marginTop: '1.5rem', display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>Узнать подробнее</a>
            </div>
            <div className="service-card glass-effect">
              <div className="s-header">
                <span className="s-icon">🔌</span>
                <h4>Инженерные сети</h4>
              </div>
              <ul>
                <li>Электромонтаж по проекту</li>
                <li>Водоснабжение и отопление</li>
                <li>Вентиляция и кондиционирование</li>
                <li>Монтаж систем "Умный дом"</li>
              </ul>
              <a href="#contact" className="btn-outline" style={{ marginTop: '1.5rem', display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>Узнать подробнее</a>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Calculator */}
      <section id="calc" className="section-padding calc-section reveal">
        <div className="container">
          <h2 className="section-title text-center">Детальный расчет проекта</h2>
          <div className="calc-flex glass-effect">
            <div className="calc-inputs">
              <div className="input-group">
                <label>Общая площадь: {area} м²</label>
                <input type="range" min="5" max="300" value={area} onChange={(e) => setArea(e.target.value)} className="slider" />
              </div>

              <div className="work-types-grid">
                {workCategories.map(cat => (
                  <div
                    key={cat.id}
                    className={`work-chip ${selectedWorks.includes(cat.id) ? 'active' : ''}`}
                    onClick={() => toggleWork(cat.id)}
                  >
                    <span className="chip-icon">{cat.icon}</span>
                    <span className="chip-title">{cat.title}</span>
                  </div>
                ))}
              </div>

              <div className="input-group" style={{ marginTop: '2rem' }}>
                <label>Класс отделки</label>
                <div className="type-selector">
                  <button className={type === 'basic' ? 'active' : ''} onClick={() => setType('basic')}>Эконом</button>
                  <button className={type === 'standard' ? 'active' : ''} onClick={() => setType('standard')}>Стандарт</button>
                  <button className={type === 'luxury' ? 'active' : ''} onClick={() => setType('luxury')}>Люкс</button>
                </div>
              </div>
            </div>

            <div className="calc-result">
              <div className="result-label">Предварительная смета</div>
              <div className="result-value">{total.toLocaleString()} ₽</div>

              <div className="calc-metrics">
                <div className="metric-box">
                  <span className="metric-label">Работа</span>
                  <span className="metric-val">{Math.round(total * 0.6).toLocaleString()} ₽</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Материалы</span>
                  <span className="metric-val">{Math.round(total * 0.4).toLocaleString()} ₽</span>
                </div>
              </div>

              <div className="calc-summary">
                <p>Выбрано работ: {selectedWorks.length}</p>
                <p>Средняя цена: ~{Math.round(total / area).toLocaleString()} ₽/м²</p>
                <p>Примерный срок: {Math.max(14, Math.round(area / 2))} дней</p>
              </div>
              <button className="btn-primary full-width" onClick={() => window.print()}>Скачать PDF смету</button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section id="portfolio" className="section-padding portfolio-section reveal">
        <div className="container">
          <h2 className="section-title">Вдохновение для ремонта</h2>

          <div style={{ marginBottom: '4rem' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>Пример нашего качества: До и После</h3>
            <BeforeAfterSlider
              before="https://images.unsplash.com/photo-1541123437809-9fd12bd0813d?auto=format&fit=crop&q=80&w=1200"
              after="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200"
            />
          </div>

          <div className="portfolio-grid-masonry">
            <div className="p-item glass-effect tall">
              <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" alt="Living Room Gallery" />
              <div className="p-overlay"><h4>Светлый арт-лаунж</h4><p>Гостиная • Декор стен • 120к ₽</p></div>
            </div>
            <div className="p-item glass-effect">
              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800" alt="Minimalist Living Room" />
              <div className="p-overlay"><h4>Эстетика Mid-century Modern</h4><p>Гостиная • Минимализм • 450к ₽</p></div>
            </div>
            <div className="p-item glass-effect wide">
              <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" alt="Modern Bathroom" />
              <div className="p-overlay"><h4>Современная ванная в скандинавском стиле</h4><p>Ванная комната • 210к ₽</p></div>
            </div>
            <div className="p-item glass-effect tall">
              <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Open Plan" />
              <div className="p-overlay"><h4>Уют в стиле Loft-Modern</h4><p>Планировка Open-space • 680к ₽</p></div>
            </div>
            <div className="p-item glass-effect">
              <img src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=800" alt="Dining Area" />
              <div className="p-overlay"><h4>Современный американский стиль</h4><p>Обеденная зона • 185к ₽</p></div>
            </div>
            <div className="p-item glass-effect wide">
              <img src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=800" alt="Entryway" />
              <div className="p-overlay"><h4>натуральный минимализм</h4><p>Прихожая • Паркет елочкой • 95к ₽</p></div>
            </div>
            <div className="p-item glass-effect">
              <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800" alt="Boho Living Room" />
              <div className="p-overlay"><h4>Скандинавский стиль</h4><p>Гостиная • Эклектика • 140к ₽</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="process" className="section-padding bg-darker reveal">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Как мы работаем</h2>
            <p className="section-subtitle">Простая схема вашего идеального ремонта</p>
          </div>
          <div className="steps-grid">
            <div className="step-card glass-effect">
              <div className="step-num">01</div>
              <h4>Заявка и Расчет</h4>
              <p>Оставьте заявку или воспользуйтесь нашим калькулятором для предварительной оценки.</p>
            </div>
            <div className="step-card glass-effect">
              <div className="step-num">02</div>
              <h4>Выбор Мастера</h4>
              <p>Изучите портфолио, рейтинги и отзывы. Выберите лучшего специалиста для вашей задачи.</p>
            </div>
            <div className="step-card glass-effect">
              <div className="step-num">03</div>
              <h4>Договор и Работа</h4>
              <p>Фиксируем сроки и стоимость. Контролируйте процесс через фотоотчеты в личном кабинете.</p>
            </div>
            <div className="step-card glass-effect">
              <div className="step-num">04</div>
              <h4>Приемка и Гарантия</h4>
              <p>Принимайте работу и наслаждайтесь комфортом. Мы даем официальную гарантию до 3 лет.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding reveal">
        <div className="container">
          <h2 className="section-title text-center">Отзывы клиентов</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card glass-effect">
              <div className="t-rating">⭐⭐⭐⭐⭐</div>
              <p>"Ремонт-Люкс сделал невозможное — закончили кап.ремонт трешки за 2 месяца. Качество швов на плитке идеальное!"</p>
              <div className="t-author">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="User" />
                <div>
                  <strong>Артем С.</strong>
                  <span>ЖК "Символ"</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card glass-effect">
              <div className="t-rating">⭐⭐⭐⭐⭐</div>
              <p>"Иван Сергеев — настоящий профи. Всё четко по закупкам, никаких скрытых доплат. Рекомендую!"</p>
              <div className="t-author">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User" />
                <div>
                  <strong>Елена К.</strong>
                  <span>Квартира на Мира</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner reveal" style={{ marginBottom: '4rem' }}>
        <div className="container cta-flex glass-effect" style={{ padding: '4rem', borderRadius: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div className="cta-text">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Готовы начать ремонт мечты?</h2>
            <p style={{ opacity: 0.8, fontSize: '1.2rem' }}>Закажите бесплатный выезд замерщика и получите точную смету уже завтра!</p>
          </div>
          <a href="#contact" className="btn-primary" style={{ padding: '1.2rem 3.5rem', fontSize: '1.1rem', textDecoration: 'none' }}>Записаться на замер</a>
        </div>
      </section>

      {/* FAQ & Contact */}
      <section id="contact" className="section-padding bg-darker reveal">
        <div className="container">
          <div className="faq-contact-grid">
            <div className="faq-side">
              <h2 className="section-title">Часто задаваемые вопросы</h2>
              <div className="faq-item">
                <h5>Даете ли вы гарантию?</h5>
                <p>Да, все мастера и компании работают по официальному договору с гарантией от 12 до 36 месяцев.</p>
              </div>
              <div className="faq-item">
                <h5>Как происходит оплата?</h5>
                <p>Оплата производится поэтапно. Вы платите только за фактически выполненные и принятые объемы работ.</p>
              </div>
              <div className="faq-item">
                <h5>Помогаете ли вы с закупкой материалов?</h5>
                <p>Большинство наших специалистов предоставляют услугу снабжения со скидками до 20% в строительных сетях-партнерах.</p>
              </div>
            </div>

            <div className="contact-form-side glass-effect">
              <h3>Нужна консультация?</h3>
              <p>Оставьте контакты, и эксперт свяжется с вами в течение 15 минут.</p>
              <form onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    placeholder="Номер телефона"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Опишите вашу задачу"
                    value={formData.task}
                    onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary full-width" disabled={formStatus !== 'idle'}>
                  {formStatus === 'idle' ? 'Получить консультацию' :
                    formStatus === 'sending' ? 'Отправка...' : 'Заявка отправлена! ✅'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer section-padding reveal">
        <div className="container">
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            <div className="footer-info">
              <h3 className="gradient-text">MASTERPORTAL</h3>
              <p style={{ marginTop: '1rem', opacity: 0.7 }}>Ваш надежный партнер в мире качественного ремонта.</p>
            </div>
            <div className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <h4>Навигация</h4>
              <a href="#ratings" style={{ color: 'var(--text-muted)' }}>Рейтинг мастеров</a>
              <a href="#calc" style={{ color: 'var(--text-muted)' }}>Калькулятор</a>
              <a href="#process" style={{ color: 'var(--text-muted)' }}>Процесс работы</a>
            </div>
            <div className="footer-contact" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <h4>Контакты</h4>
              <p style={{ opacity: 0.7 }}>Москва, ул. Арбат, 10</p>
              <p style={{ opacity: 0.7 }}>+7 (999) 000-00-00</p>
            </div>
          </div>
          <div className="footer-bottom text-center" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
            <p>© 2026 MasterPortal. Профессиональный ремонт без стресса.</p>
          </div>
        </div>
      </footer>

      <button
        className="back-to-top glass-effect"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </div>
  )
}

export default App
