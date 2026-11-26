import { useEffect, useState } from 'react'
import { articles, assessors, schemes, statistics } from './data'
import { apiRequest } from './api'

const Arrow = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const iconPaths = {
  camera: 'M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  clock: 'M12 6v6l4 2',
  grid: 'M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'M6 6l12 12M18 6L6 18',
  check: 'M20 6L9 17l-5-5',
  pin: 'M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z',
  mail: 'M4 4h16v16H4zM4 6l8 7 8-7',
}

function Icon({ name, className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === 'clock' ? <><circle cx="12" cy="12" r="9" /><path d={iconPaths.clock} /></> : name === 'pin' ? <><path d={iconPaths.pin} /><circle cx="12" cy="10" r="3" /></> : name === 'camera' ? <><path d={iconPaths.camera} /><circle cx="12" cy="13" r="3" /></> : name === 'shield' ? <><path d={iconPaths.shield} /><path d="M9 12l2 2 4-4" /></> : name === 'grid' ? <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></> : <path d={iconPaths[name]} />}
    </svg>
  )
}

const navItems = [
  ['/', 'Beranda'],
  ['/tentang', 'Profil'],
  ['/skema', 'Skema'],
  ['/alur', 'Alur'],
  ['/tuk', 'TUK'],
  ['/asesor', 'Asesor'],
  ['/jadwal', 'Jadwal'],
  ['/verifikasi', 'Verifikasi'],
]

function navigate(path) {
  window.location.hash = path
}

function useHashPath() {
  const [path, setPath] = useState(window.location.hash.slice(1) || '/')
  useEffect(() => {
    const onChange = () => setPath(window.location.hash.slice(1) || '/')
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [path])
  return path
}

function Brand({ light = false }) {
  return (
    <button type="button" onClick={() => navigate('/')} className="flex items-center gap-3 text-left" aria-label="Kembali ke beranda">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-lsp text-sm font-extrabold text-navy">NX</span>
      <span className={`text-lg font-extrabold tracking-tight ${light ? 'text-white' : 'text-navy'}`}>NusaXNine LSP</span>
    </button>
  )
}

function Header({ path }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-border-lsp/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1180px] items-center justify-between px-5 lg:px-6">
        <Brand />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigasi utama">
          {navItems.map(([itemPath, label]) => (
            <button key={itemPath} type="button" onClick={() => navigate(itemPath)} className={`relative py-2 text-sm font-bold ${path === itemPath ? 'text-navy after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-amber-lsp' : 'text-muted-lsp transition-colors hover:text-navy'}`}>
              {label}
            </button>
          ))}
        </nav>
        <div className="hidden items-center gap-2 sm:flex">
          <button type="button" onClick={() => navigate('/login')} className="rounded-full border border-border-lsp px-4 py-2.5 text-sm font-bold text-navy transition hover:border-blue-lsp hover:bg-ice-lsp">Masuk</button>
          <button type="button" onClick={() => navigate('/register')} className="rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-navy-deep">Daftar Uji</button>
        </div>
        <button type="button" onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-xl border border-border-lsp text-navy lg:hidden" aria-expanded={open} aria-label={open ? 'Tutup menu' : 'Buka menu'}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
      {open && (
        <nav className="border-t border-border-lsp bg-white px-5 py-4 lg:hidden" aria-label="Menu seluler">
          {navItems.map(([itemPath, label]) => (
            <button key={itemPath} type="button" onClick={() => { navigate(itemPath); setOpen(false) }} className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-bold ${path === itemPath ? 'bg-ice-lsp text-blue-lsp' : 'text-navy'}`}>{label}</button>
          ))}
        </nav>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border-lsp bg-white">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <Brand />
          <p className="mt-5 max-w-xs text-sm leading-7 text-muted-lsp">Lembaga Sertifikasi Profesi Pihak Ketiga untuk kompetensi fotografi studio, pencahayaan, dan olah digital.</p>
        </div>
        <div>
          <h2 className="text-sm font-extrabold text-navy">Layanan</h2>
          <div className="mt-4 grid gap-3 text-sm text-muted-lsp">
            {navItems.slice(1, 6).map(([itemPath, label]) => <button key={itemPath} type="button" onClick={() => navigate(itemPath)} className="text-left hover:text-blue-lsp">{label}</button>)}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-extrabold text-navy">Sekretariat</h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-muted-lsp">
            <span>Gedung NusaXNine Hub, Jakarta Pusat</span>
            <span>Senin–Jumat · 08.00–17.00 WIB</span>
            <span>sekretariat@nusaxninelsp.id</span>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-extrabold text-navy">Informasi jadwal</h2>
          <form className="mt-4 flex rounded-full border border-border-lsp bg-surface-lsp p-1.5" onSubmit={(event) => { event.preventDefault(); event.currentTarget.reset() }}>
            <input type="email" required placeholder="Alamat email" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" aria-label="Alamat email" />
            <button type="submit" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-white" aria-label="Kirim email"><Arrow /></button>
          </form>
        </div>
      </div>
      <div className="border-t border-border-lsp">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-2 px-5 py-5 text-xs text-muted-lsp sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <span>© 2026 NusaXNine LSP Fotografi Studio</span>
          <button type="button" onClick={() => navigate('/kontak')} className="text-left hover:text-navy">Pengaduan & Banding</button>
        </div>
      </div>
    </footer>
  )
}

function PageHero({ kicker, title, description }) {
  return (
    <section className="relative overflow-hidden bg-navy py-16 md:py-20">
      <div className="absolute inset-0 opacity-[0.14]" style={{ backgroundImage: 'radial-gradient(#c5defe 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="relative mx-auto max-w-[1180px] px-5 lg:px-6">
        <p className="mb-5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-sky-lsp"><span className="h-2 w-2 rounded-full bg-amber-lsp" />{kicker}</p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-sky-lsp/80">{description}</p>
      </div>
    </section>
  )
}

function SectionHeading({ kicker, title, center = false }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : ''}>
      <p className={`mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-blue-lsp ${center ? 'justify-center' : 'justify-start'}`}><span className="h-2 w-2 rounded-full bg-blue-lsp" /><span className="h-2 w-2 -ml-3.5 rounded-full bg-amber-lsp" />{kicker}</p>
      <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-navy md:text-[42px]">{title}</h2>
    </div>
  )
}

function HomePage() {
  // DUMMY DATA: copy, status, testimonial, and all dashboard values are placeholders.
  const [testimonial, setTestimonial] = useState(0)
  const quotes = [
    ['Rama Prakoso', 'Fotografer Produk', 'Alur pengajuan dan jadwal uji berjalan terstruktur, dengan proses verifikasi yang jelas.'],
    ['Alya Maharani', 'Fotografer Editorial', 'Fasilitas uji dan arahan asesor membantu saya memahami standar kompetensi secara praktis.'],
  ]
  return (
    <>
      <main>
        <section className="overflow-hidden bg-white">
          <div className="mx-auto grid min-h-[620px] max-w-[1180px] items-center gap-12 px-5 py-16 lg:grid-cols-[1fr_0.92fr] lg:px-6 lg:py-20">
            <div className="hero-enter">
              <p className="mb-5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-blue-lsp"><span className="h-2 w-2 rounded-full bg-blue-lsp" /><span className="h-2 w-2 -ml-3.5 rounded-full bg-amber-lsp" />Lembaga Sertifikasi Profesi BNSP</p>
              <h1 className="max-w-xl text-[42px] font-extrabold leading-[1.06] tracking-tight text-navy md:text-[58px]">Sertifikasi Fotografi Studio Standar Nasional</h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-lsp">Validasi kompetensi pencahayaan studio, pemotretan produk komersial, dan post-production melalui asesmen objektif berbasis bukti praktik.</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button type="button" onClick={() => navigate('/register')} className="group flex items-center gap-3 rounded-full bg-navy px-6 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-navy-deep">Daftar Sertifikasi <Arrow /></button>
                <button type="button" onClick={() => navigate('/skema')} className="border-b border-navy pb-1 text-sm font-extrabold text-navy">Lihat semua skema</button>
              </div>
            </div>
            <div className="hero-enter-delay relative grid grid-cols-[0.82fr_1fr] items-end gap-4">
              <div className="grid gap-4">
                <div className="aspect-square overflow-hidden rounded-[22px] border border-border-lsp bg-surface-lsp"><img src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=700&q=82" alt="Fotografer sedang melakukan uji studio" className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]" /></div>
                <div className="aspect-[4/3] overflow-hidden rounded-[22px] border border-border-lsp"><img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=82" alt="Peralatan fotografi studio" className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]" /></div>
              </div>
              <div className="aspect-[3/4.2] overflow-hidden rounded-[22px] border border-border-lsp"><img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=82" alt="Fotografer studio" className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]" /></div>
              <div className="absolute -left-5 bottom-8 grid h-24 w-24 place-items-center rounded-full border-4 border-white bg-navy text-amber-lsp shadow-xl md:h-28 md:w-28"><Icon name="shield" className="h-9 w-9" /></div>
            </div>
          </div>
        </section>

        <div className="overflow-hidden bg-navy py-4 text-white">
          <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
            {[0, 1].map((set) => ['Fotografi Studio BNSP', 'Uji Kompetensi Praktik', 'Asesor Berlisensi MET', 'TUK Terverifikasi', 'E-Sertifikat Resmi'].map((item) => <span key={`${set}-${item}`} className="flex items-center gap-8 text-sm font-extrabold"><span>{item}</span><span className="text-amber-lsp">◆</span></span>))}
          </div>
        </div>

        <section className="mx-auto max-w-[1180px] px-5 py-20 lg:px-6">
          <SectionHeading kicker="Profil LSP" title="Standar kompetensi untuk fotografer studio yang diakui industri" />
          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="aspect-[16/10] overflow-hidden rounded-[26px] border border-border-lsp bg-surface-lsp"><img src="https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=1000&q=82" alt="Suasana kegiatan uji kompetensi" className="h-full w-full object-cover" /></div>
            <div>
              <p className="text-base leading-8 text-muted-lsp">NusaXNine LSP menyelenggarakan asesmen kompetensi secara objektif, imparsial, dan berbasis bukti praktik sesuai kebutuhan tenaga kerja fotografi studio.</p>
              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border-lsp bg-border-lsp">
                {statistics.map(([value, label]) => <div key={label} className="bg-white px-5 py-6"><strong className="block text-2xl font-extrabold text-navy md:text-3xl">{value}</strong><span className="mt-1 block text-xs font-bold text-muted-lsp">{label}</span></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-navy py-20 text-white">
          <div className="mx-auto max-w-[1180px] px-5 lg:px-6">
            <div className="flex items-end justify-between gap-6">
              <div><p className="mb-3 text-xs font-extrabold uppercase tracking-[0.12em] text-sky-lsp">Skema Sertifikasi</p><h2 className="max-w-2xl text-3xl font-extrabold leading-tight md:text-[42px]">Pilih skema sesuai tingkat kompetensi</h2></div>
              <button type="button" onClick={() => navigate('/skema')} className="hidden shrink-0 items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-navy sm:flex">Semua skema <Arrow /></button>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {schemes.map((scheme, index) => (
                <article key={scheme.id} className={`flex min-h-72 flex-col justify-between rounded-[22px] border p-6 transition hover:-translate-y-1 ${index === 1 ? 'border-sky-lsp bg-ice-lsp text-navy' : 'border-white/15 bg-white/[0.045]'}`}>
                  <div><span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold ${index === 1 ? 'bg-navy text-white' : 'bg-white/10 text-sky-lsp'}`}>{scheme.code}</span><h3 className="mt-5 text-xl font-extrabold">{scheme.name}</h3><p className={`mt-3 text-sm leading-7 ${index === 1 ? 'text-muted-lsp' : 'text-sky-lsp/80'}`}>{scheme.summary}</p></div>
                  <button type="button" onClick={() => navigate('/skema')} className="mt-6 flex items-center gap-2 text-sm font-extrabold text-amber-lsp">Pelajari skema <Arrow /></button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-5 py-20 lg:px-6">
          <SectionHeading kicker="Alur Sertifikasi" title="Empat tahap menuju sertifikat kompetensi" center />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ['01', 'Pengajuan FR-APL-01', 'Registrasi akun, pilih skema, dan unggah bukti persyaratan dasar.'],
              ['02', 'Verifikasi dan penjadwalan', 'Tim LSP memverifikasi berkas dan menetapkan jadwal uji kompetensi.'],
              ['03', 'Uji MUK dan keputusan', 'Ikuti asesmen praktik, terima keputusan, lalu terbitkan sertifikat.'],
            ].map(([number, title, copy]) => (
              <article key={number} className="overflow-hidden rounded-[22px] border border-border-lsp bg-surface-lsp"><div className="p-7"><span className="text-sm font-extrabold text-blue-lsp">{number}</span><h3 className="mt-3 text-xl font-extrabold text-navy">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-lsp">{copy}</p></div><button type="button" onClick={() => navigate('/alur')} className="flex w-full items-center justify-between bg-navy px-7 py-4 text-sm font-extrabold text-white">Pelajari alur <Arrow /></button></article>
            ))}
          </div>
        </section>

        <section className="border-y border-border-lsp bg-surface-lsp py-20">
          <div className="mx-auto max-w-[1180px] px-5 lg:px-6">
            <SectionHeading kicker="Asesor Kompetensi" title="Dinilai oleh praktisi berlisensi" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {assessors.map((assessor) => (
                <article key={assessor.name} className="overflow-hidden rounded-[22px] border border-border-lsp bg-white"><div className="aspect-[4/3] overflow-hidden"><img src={assessor.image} alt={assessor.name} className="h-full w-full object-cover object-top transition duration-500 hover:scale-[1.03]" /></div><div className="p-5"><h3 className="font-extrabold text-navy">{assessor.name}</h3><p className="mt-1 text-sm text-muted-lsp">{assessor.role}</p></div></article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-5 py-20 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="rounded-[22px] bg-navy p-8 text-white"><p className="text-4xl font-extrabold">4.9</p><p className="mt-2 text-sm text-sky-lsp">★★★★★</p><p className="mt-8 text-sm leading-7 text-sky-lsp/80">Kepuasan layanan dan transparansi proses sertifikasi.</p></div>
            <div className="flex min-h-64 flex-col justify-between rounded-[22px] border border-border-lsp p-8"><p className="text-xl leading-8 text-muted-lsp">“{quotes[testimonial][2]}”</p><div className="mt-8 flex items-end justify-between"><div><strong className="block text-navy">{quotes[testimonial][0]}</strong><span className="text-sm text-muted-lsp">{quotes[testimonial][1]}</span></div><div className="flex gap-2"><button type="button" onClick={() => setTestimonial((testimonial - 1 + quotes.length) % quotes.length)} className="grid h-11 w-11 place-items-center rounded-full border border-border-lsp text-navy" aria-label="Testimoni sebelumnya">←</button><button type="button" onClick={() => setTestimonial((testimonial + 1) % quotes.length)} className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white" aria-label="Testimoni berikutnya">→</button></div></div></div>
          </div>
        </section>

        <section className="bg-navy py-20 text-white">
          <div className="mx-auto max-w-[1180px] px-5 lg:px-6">
            <div className="flex items-end justify-between"><SectionHeading kicker="Berita & Pengumuman" title="Informasi terbaru LSP" /><button type="button" onClick={() => navigate('/berita')} className="hidden rounded-full bg-white px-5 py-3 text-sm font-extrabold text-navy sm:block">Lihat semua</button></div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">{articles.map((article) => <article key={article.title}><div className="aspect-[16/10] overflow-hidden rounded-[18px]"><img src={article.image} alt={article.title} className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]" /></div><p className="mt-4 text-xs font-extrabold text-amber-lsp">{article.category}</p><h3 className="mt-2 font-extrabold leading-7">{article.title}</h3></article>)}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function InnerPage({ path }) {
  const pages = {
    '/tentang': ['Profil Lembaga', 'Tentang NusaXNine LSP', 'Lembaga sertifikasi profesi independen yang berfokus pada mutu kompetensi fotografer studio di Indonesia.'],
    '/skema': ['Katalog Sertifikasi', 'Skema Sertifikasi Fotografi Studio', 'Pilih skema kompetensi sesuai jenjang dan bidang pekerjaan Anda.'],
    '/alur': ['Standar Operasional', 'Alur Sertifikasi Kompetensi', 'Tahapan pengajuan, verifikasi, asesmen, keputusan, dan penerbitan sertifikat.'],
    '/tuk': ['Tempat Uji Kompetensi', 'Daftar TUK Terverifikasi', 'Temukan lokasi uji kompetensi dengan fasilitas pencahayaan dan peralatan studio.'],
    '/asesor': ['Asesor Kompetensi', 'Daftar Asesor Aktif', 'Asesor berlisensi yang menilai bukti kompetensi secara objektif.'],
    '/jadwal': ['Kalender Asesmen', 'Jadwal Uji Terbuka', 'Daftar jadwal asesmen yang dapat dipilih pemohon.'],
    '/verifikasi': ['Verifikasi Resmi', 'Cek Status dan Sertifikat', 'Masukkan nomor izin atau nomor sertifikat untuk memeriksa registri.'],
    '/berita': ['Berita dan Galeri', 'Informasi Terbaru LSP', 'Pengumuman jadwal, kegiatan asesmen, dan pembaruan fasilitas.'],
    '/kontak': ['Kontak dan Pengaduan', 'Hubungi Sekretariat LSP', 'Sampaikan pertanyaan layanan atau pengajuan banding hasil asesmen.'],
  }
  const [kicker, title, description] = pages[path] || pages['/tentang']
  return (
    <>
      <PageHero kicker={kicker} title={title} description={description} />
      {path === '/skema' ? (
        <section className="mx-auto max-w-[1180px] px-5 py-16 lg:px-6"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{schemes.map((scheme) => <article key={scheme.id} className="rounded-[22px] border border-border-lsp p-6"><span className="rounded-full bg-sky-lsp/40 px-3 py-1 text-xs font-extrabold text-navy">{scheme.code}</span><h2 className="mt-5 text-xl font-extrabold text-navy">{scheme.name}</h2><p className="mt-3 text-sm leading-7 text-muted-lsp">{scheme.summary}</p><div className="mt-6 flex items-center justify-between"><span className="text-sm font-extrabold text-navy">{scheme.fee}</span><button type="button" onClick={() => navigate('/register')} className="rounded-full bg-navy px-4 py-2 text-xs font-extrabold text-white">Ajukan skema</button></div></article>)}</div></section>
      ) : path === '/asesor' ? (
        <section className="mx-auto max-w-[1180px] px-5 py-16 lg:px-6"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{assessors.map((a) => <article key={a.name} className="overflow-hidden rounded-[22px] border border-border-lsp"><img src={a.image} alt={a.name} className="aspect-[4/3] w-full object-cover object-top" /><div className="p-5"><h2 className="font-extrabold text-navy">{a.name}</h2><p className="mt-1 text-sm text-muted-lsp">{a.role}</p></div></article>)}</div></section>
      ) : path === '/verifikasi' ? (
        <section className="mx-auto max-w-[700px] px-5 py-16 lg:px-6"><form className="rounded-[22px] border border-border-lsp p-6" onSubmit={(event) => event.preventDefault()}><label className="text-sm font-extrabold text-navy" htmlFor="verify-id">ID Izin atau Nomor Sertifikat</label><div className="mt-3 flex rounded-full border border-border-lsp p-1.5 focus-within:border-blue-lsp"><input id="verify-id" required className="min-w-0 flex-1 rounded-full px-4 text-sm outline-none" placeholder="Contoh: IZN-2026-0101" /><button type="submit" className="rounded-full bg-navy px-5 py-3 text-sm font-extrabold text-white">Cek data</button></div></form></section>
      ) : (
        <section className="mx-auto max-w-[1180px] px-5 py-16 lg:px-6"><div className="grid gap-5 md:grid-cols-3">{['01', '02', '03'].map((number) => <article key={number} className="rounded-[22px] border border-border-lsp p-7"><span className="text-xs font-extrabold text-blue-lsp">TAHAP {number}</span><h2 className="mt-4 text-xl font-extrabold text-navy">Informasi {title}</h2><p className="mt-3 text-sm leading-7 text-muted-lsp">Konten dummy ini akan diganti dengan respons API Laravel.</p></article>)}</div></section>
      )}
      <Footer />
    </>
  )
}

function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const [loading, setLoading] = useState(false)
  async function submit(event) {
    event.preventDefault()
    setLoading(true)
    try {
      await apiRequest(isRegister ? '/register' : '/login', { method: 'POST', body: { mode } })
      navigate(isRegister ? '/dashboard' : '/dashboard')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="grid min-h-screen bg-surface-lsp lg:grid-cols-2">
      <aside className="hidden flex-col justify-between bg-navy p-12 text-white lg:flex"><Brand light /><div><p className="mb-4 text-xs font-extrabold uppercase tracking-[0.14em] text-amber-lsp">{isRegister ? 'Registrasi Pemohon' : 'Portal LSP'}</p><h1 className="max-w-lg text-4xl font-extrabold leading-tight">{isRegister ? 'Mulai sertifikasi kompetensi Anda.' : 'Satu portal untuk proses sertifikasi.'}</h1></div><p className="text-xs text-sky-lsp/70">Lisensi BNSP · NusaXNine LSP</p></aside>
      <main className="grid place-items-center px-5 py-12"><form onSubmit={submit} className="w-full max-w-md rounded-[26px] border border-border-lsp bg-white p-7 shadow-[0_24px_60px_rgba(21,18,75,.10)]"><Brand /><h1 className="mt-8 text-2xl font-extrabold text-navy">{isRegister ? 'Daftar Akun Pemohon' : 'Masuk ke Portal LSP'}</h1><p className="mt-2 text-sm text-muted-lsp">{isRegister ? 'Buat akun untuk mengajukan sertifikasi.' : 'Gunakan akun terdaftar untuk melanjutkan.'}</p><div className="mt-7 grid gap-4">{isRegister && <label className="grid gap-2 text-sm font-bold text-navy">Nama lengkap<input required className="h-12 rounded-xl border border-border-lsp bg-surface-lsp px-4 font-normal outline-none focus:border-blue-lsp" /></label>}<label className="grid gap-2 text-sm font-bold text-navy">Email<input type="email" required className="h-12 rounded-xl border border-border-lsp bg-surface-lsp px-4 font-normal outline-none focus:border-blue-lsp" /></label><label className="grid gap-2 text-sm font-bold text-navy">Kata sandi<input type="password" required minLength={6} className="h-12 rounded-xl border border-border-lsp bg-surface-lsp px-4 font-normal outline-none focus:border-blue-lsp" /></label></div><button type="submit" disabled={loading} className="mt-6 w-full rounded-full bg-navy py-3.5 text-sm font-extrabold text-white disabled:opacity-60">{loading ? 'Memproses...' : isRegister ? 'Buat akun pemohon' : 'Masuk sekarang'}</button><button type="button" onClick={() => navigate(isRegister ? '/login' : '/register')} className="mt-5 w-full text-center text-sm font-bold text-blue-lsp">{isRegister ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar'}</button></form></main>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="min-h-screen bg-surface-lsp lg:grid lg:grid-cols-[270px_1fr]">
      <aside className="bg-navy px-5 py-6 text-white"><Brand light /><nav className="mt-8 grid gap-2"><button type="button" className="flex items-center gap-3 rounded-xl bg-amber-lsp px-4 py-3 text-sm font-extrabold text-navy"><Icon name="grid" /> Dashboard Pemohon</button><button type="button" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-sky-lsp"><Icon name="shield" /> Pengajuan FR-APL-01</button><button type="button" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-sky-lsp"><Icon name="clock" /> Jadwal dan Ujian</button></nav></aside>
      <main className="min-w-0 p-5 md:p-8"><header className="flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-border-lsp bg-white px-5 py-4"><div><p className="text-xs font-bold text-muted-lsp">Dashboard Pemohon</p><h1 className="mt-1 text-xl font-extrabold text-navy">Pantau progres sertifikasi</h1></div><button type="button" onClick={() => navigate('/')} className="text-sm font-bold text-navy">Kembali ke website</button></header><section className="mt-6 grid gap-5 md:grid-cols-3"><div className="rounded-[18px] border border-border-lsp bg-white p-5"><span className="text-xs font-extrabold text-blue-lsp">STATUS AKTIF</span><strong className="mt-3 block text-2xl text-navy">Tagih</strong></div><div className="rounded-[18px] border border-border-lsp bg-white p-5"><span className="text-xs font-extrabold text-blue-lsp">ID IZIN</span><strong className="mt-3 block text-lg text-navy">IZN-2026-0102</strong></div><div className="rounded-[18px] border border-border-lsp bg-white p-5"><span className="text-xs font-extrabold text-blue-lsp">SKEMA</span><strong className="mt-3 block text-base text-navy">Fotografer Studio Junior</strong></div></section><section className="mt-6 rounded-[18px] border border-border-lsp bg-white p-6"><h2 className="font-extrabold text-navy">Alur permohonan</h2><div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">{['Cek', 'Pemohon', 'Apl_01', 'Tagih', 'Lunas'].map((step, index) => <div key={step} className={`rounded-xl px-3 py-4 text-center text-xs font-extrabold ${index <= 3 ? 'bg-navy text-white' : 'bg-surface-lsp text-muted-lsp'}`}>{step}</div>)}</div></section></main>
    </div>
  )
}

export default function App() {
  const path = useHashPath()
  if (path === '/login') return <AuthPage mode="login" />
  if (path === '/register') return <AuthPage mode="register" />
  if (path === '/dashboard') return <Dashboard />
  if (path === '/') return <><Header path={path} /><HomePage /></>
  return <><Header path={path} /><InnerPage path={path} /></>
}
