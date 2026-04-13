export const navLinks = [
  { label: 'Workshops', href: '#workshops' },
  { label: 'How it Works', href: '#how' },
  { label: 'Statistics', href: '#stats' },
  { label: 'Testimonials', href: '#testimonials' },
];

export const workshopTypes = [
  {
    id: 1, icon: '⚡', color: 'violet',
    name: 'Python for Scientific Computing',
    duration: '3 Days', level: 'Intermediate', category: 'Programming',
    description: 'Master NumPy, SciPy, Matplotlib & Pandas for data analysis and scientific computing.',
    upcoming: 4,
    terms_and_conditions: 'Participants must bring laptops with Python 3.8+ installed. Attendance for all 3 days is mandatory for certificate issuance. Basic math knowledge is expected.',
  },
  {
    id: 2, icon: '⚙️', color: 'teal',
    name: 'Introduction to SCILAB',
    duration: '2 Days', level: 'Beginner', category: 'Engineering',
    description: 'Numerical computation, matrix operations and data visualization for engineers.',
    upcoming: 2,
    terms_and_conditions: 'SCILAB must be pre-installed before the workshop begins. No prior programming experience required. Laptops are mandatory.',
  },
  {
    id: 3, icon: '🌊', color: 'rose',
    name: 'OpenFOAM for CFD',
    duration: '5 Days', level: 'Advanced', category: 'Simulation',
    description: 'Comprehensive Computational Fluid Dynamics — meshing, solvers, post-processing.',
    upcoming: 1,
    terms_and_conditions: 'Linux environment required. Participants must have completed a Fluid Mechanics course. OpenFOAM v10+ must be installed. All 5 days attendance is mandatory.',
  },
  {
    id: 4, icon: '🛠️', color: 'violet',
    name: 'LaTeX for Academic Writing',
    duration: '1 Day', level: 'Beginner', category: 'Tools',
    description: 'Create professional papers, theses and reports with proper bibliography management.',
    upcoming: 6,
    terms_and_conditions: 'A LaTeX distribution (TeX Live or MiKTeX) must be installed prior to the workshop. Bring a sample document you want to typeset for hands-on practice.',
  },
  {
    id: 5, icon: '🌐', color: 'teal',
    name: 'Django Web Development',
    duration: '4 Days', level: 'Intermediate', category: 'Programming',
    description: 'Build full-stack web apps with Django REST Framework and cloud deployment.',
    upcoming: 3,
    terms_and_conditions: 'Basic Python knowledge is mandatory. Participants must have a laptop with internet access. Django and VS Code should be pre-installed.',
  },
  {
    id: 6, icon: '📊', color: 'rose',
    name: 'Intro to Machine Learning',
    duration: '3 Days', level: 'Intermediate', category: 'Data Science',
    description: 'Practical ML with scikit-learn — regression, classification, clustering, evaluation.',
    upcoming: 5,
    terms_and_conditions: 'Python 3.8+ and Jupyter Notebook required. Basic statistics knowledge is recommended. scikit-learn will be installed during the workshop.',
  },
];

export const stats = [
  { value: 142, suffix: '+', label: 'Workshops Delivered', icon: '🏆' },
  { value: 8430, suffix: '+', label: 'Students Trained', icon: '🎓' },
  { value: 320, suffix: '+', label: 'Institutions', icon: '🏛️' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', icon: '⭐' },
];

export const steps = [
  {
    step: '01', title: 'Browse Workshops', icon: '🔍',
    description: 'Explore our catalog of free expert-led technical workshops across Python, SCILAB, CFD and more.',
  },
  {
    step: '02', title: 'Register & Propose', icon: '✍️',
    description: 'Create your coordinator account and propose a workshop at your institution in minutes.',
  },
  {
    step: '03', title: 'Get Confirmed', icon: '✅',
    description: 'Our FOSSEE team reviews your proposal and matches you with a vetted expert instructor.',
  },
  {
    step: '04', title: 'Run & Certify', icon: '🎓',
    description: 'Host the workshop. Participants receive verified digital certificates from IIT Bombay.',
  },
];

export const testimonials = [
  {
    name: 'Priya Sharma', role: 'CS Professor', institution: 'NIT Warangal',
    avatar: 'PS', color: 'violet',
    text: 'The Python for Scientific Computing workshop transformed how our students approach data problems. Exceptional quality, completely free.',
  },
  {
    name: 'Rahul Mehta', role: 'Workshop Coordinator', institution: 'BITS Pilani',
    avatar: 'RM', color: 'teal',
    text: 'Proposing a workshop was seamless — from registration to execution. The FOSSEE team was incredibly responsive and professional.',
  },
  {
    name: 'Ananya Iyer', role: 'Department Head', institution: 'VIT Vellore',
    avatar: 'AI', color: 'rose',
    text: 'We have hosted 4 FOSSEE workshops so far. Students love the hands-on approach and the IIT Bombay credentialing is a huge value-add.',
  },
];

export const features = [
  { icon: '🆓', title: 'Completely Free', description: 'All workshops are funded by MHRD. Zero cost to institutions or students.' },
  { icon: '🎓', title: 'IIT Bombay Certified', description: 'Certificates carry the credibility of IIT Bombay, recognised nationally.' },
  { icon: '🧑‍🏫', title: 'Expert Instructors', description: 'Led by FOSSEE team members and vetted domain experts.' },
  { icon: '🏛️', title: 'Pan-India Reach', description: 'Available to any registered institution across all 28 states.' },
  { icon: '💻', title: 'Hands-On Labs', description: 'Real coding sessions, not slides. Every participant writes code.' },
  { icon: '📜', title: 'Open Source Stack', description: 'Built on Python, SCILAB, GNU Octave — no proprietary software needed.' },
];

export const techBadges = [
  'Python', 'SCILAB', 'OpenFOAM', 'LaTeX', 'Django', 'GNU Octave',
  'Matplotlib', 'NumPy', 'SciPy', 'Pandas', 'Jupyter',
  'Python', 'SCILAB', 'OpenFOAM', 'LaTeX', 'Django', 'GNU Octave',
  'Matplotlib', 'NumPy', 'SciPy', 'Pandas', 'Jupyter',
];
