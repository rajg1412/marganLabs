export interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: "video" | "article" | "quiz";
}

export interface Course {
  id: number;
  title: string;
  progress: number;
  description: string;
  instructor: string;
  category: string;
  totalLessons: number;
  lessons: Lesson[];
}

export const COURSES: Course[] = [
  {
    id: 1,
    title: "AI Fundamentals",
    progress: 60,
    description:
      "Master the core principles of Artificial Intelligence, from Turing machines to modern neural architectures.",
    instructor: "Dr. Sarah Chen",
    category: "Artificial Intelligence",
    totalLessons: 8,
    lessons: [
      { id: 1, title: "What is Artificial Intelligence?", duration: "12 min", type: "video" },
      { id: 2, title: "History of AI", duration: "8 min", type: "article" },
      { id: 3, title: "Types of AI Systems", duration: "15 min", type: "video" },
      { id: 4, title: "Knowledge Representation", duration: "10 min", type: "video" },
      { id: 5, title: "Search Algorithms", duration: "18 min", type: "video" },
      { id: 6, title: "Planning & Reasoning", duration: "14 min", type: "article" },
      { id: 7, title: "Quiz: AI Basics", duration: "5 min", type: "quiz" },
      { id: 8, title: "Future of AI", duration: "10 min", type: "video" },
    ],
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    progress: 20,
    description:
      "Build a solid foundation in ML — supervised, unsupervised, and reinforcement learning with hands-on examples.",
    instructor: "Prof. James Liu",
    category: "Machine Learning",
    totalLessons: 10,
    lessons: [
      { id: 1, title: "Introduction to Machine Learning", duration: "14 min", type: "video" },
      { id: 2, title: "Supervised vs Unsupervised Learning", duration: "10 min", type: "article" },
      { id: 3, title: "Linear Regression Deep Dive", duration: "20 min", type: "video" },
      { id: 4, title: "Classification Algorithms", duration: "18 min", type: "video" },
      { id: 5, title: "Decision Trees & Random Forests", duration: "22 min", type: "video" },
      { id: 6, title: "Model Evaluation & Metrics", duration: "12 min", type: "article" },
      { id: 7, title: "Overfitting & Regularization", duration: "15 min", type: "video" },
      { id: 8, title: "Neural Network Basics", duration: "25 min", type: "video" },
      { id: 9, title: "Quiz: ML Fundamentals", duration: "8 min", type: "quiz" },
      { id: 10, title: "Building Your First ML Pipeline", duration: "30 min", type: "video" },
    ],
  },
  {
    id: 3,
    title: "React for Beginners",
    progress: 90,
    description:
      "Go from zero to production with React 18 — hooks, context, routing, and modern patterns used by top companies.",
    instructor: "Emily Rodriguez",
    category: "Web Development",
    totalLessons: 9,
    lessons: [
      { id: 1, title: "Why React? The Component Model", duration: "10 min", type: "video" },
      { id: 2, title: "JSX & Virtual DOM", duration: "8 min", type: "article" },
      { id: 3, title: "useState & useEffect Hooks", duration: "20 min", type: "video" },
      { id: 4, title: "Props & Component Composition", duration: "15 min", type: "video" },
      { id: 5, title: "Context API & Global State", duration: "18 min", type: "video" },
      { id: 6, title: "React Router v6", duration: "16 min", type: "video" },
      { id: 7, title: "Performance Optimization", duration: "14 min", type: "article" },
      { id: 8, title: "Quiz: React Essentials", duration: "6 min", type: "quiz" },
      { id: 9, title: "Build a Real Project", duration: "45 min", type: "video" },
    ],
  },
  {
    id: 4,
    title: "Deep Learning with PyTorch",
    progress: 45,
    description:
      "Implement CNNs, RNNs, and Transformers from scratch using PyTorch with GPU acceleration.",
    instructor: "Dr. Michael Patel",
    category: "Deep Learning",
    totalLessons: 12,
    lessons: [
      { id: 1, title: "PyTorch Tensors & Autograd", duration: "18 min", type: "video" },
      { id: 2, title: "Building Neural Networks", duration: "22 min", type: "video" },
      { id: 3, title: "Convolutional Neural Networks", duration: "30 min", type: "video" },
      { id: 4, title: "Image Classification Project", duration: "35 min", type: "video" },
      { id: 5, title: "Recurrent Neural Networks", duration: "25 min", type: "video" },
      { id: 6, title: "LSTM & GRU Architectures", duration: "20 min", type: "article" },
      { id: 7, title: "Attention Mechanism", duration: "28 min", type: "video" },
      { id: 8, title: "Transformer Architecture", duration: "32 min", type: "video" },
      { id: 9, title: "Transfer Learning", duration: "18 min", type: "video" },
      { id: 10, title: "Model Deployment", duration: "22 min", type: "article" },
      { id: 11, title: "Quiz: Deep Learning Concepts", duration: "10 min", type: "quiz" },
      { id: 12, title: "Capstone: Build a Chatbot", duration: "60 min", type: "video" },
    ],
  },
  {
    id: 5,
    title: "Natural Language Processing",
    progress: 10,
    description:
      "From tokenization to large language models — learn how machines understand and generate human language.",
    instructor: "Dr. Aisha Nakamura",
    category: "NLP",
    totalLessons: 8,
    lessons: [
      { id: 1, title: "Text Preprocessing & Tokenization", duration: "15 min", type: "video" },
      { id: 2, title: "Word Embeddings (Word2Vec, GloVe)", duration: "20 min", type: "video" },
      { id: 3, title: "Sentiment Analysis", duration: "18 min", type: "video" },
      { id: 4, title: "Named Entity Recognition", duration: "16 min", type: "article" },
      { id: 5, title: "Text Classification", duration: "22 min", type: "video" },
      { id: 6, title: "Introduction to LLMs", duration: "25 min", type: "video" },
      { id: 7, title: "Prompt Engineering", duration: "14 min", type: "article" },
      { id: 8, title: "Quiz: NLP Basics", duration: "7 min", type: "quiz" },
    ],
  },
  {
    id: 6,
    title: "Data Science & Analytics",
    progress: 75,
    description:
      "Master data wrangling, EDA, and statistical analysis with Python, Pandas, and visualization libraries.",
    instructor: "Carlos Mendes",
    category: "Data Science",
    totalLessons: 10,
    lessons: [
      { id: 1, title: "Python for Data Science", duration: "20 min", type: "video" },
      { id: 2, title: "NumPy Essentials", duration: "16 min", type: "video" },
      { id: 3, title: "Pandas DataFrames", duration: "24 min", type: "video" },
      { id: 4, title: "Exploratory Data Analysis", duration: "28 min", type: "video" },
      { id: 5, title: "Data Visualization with Matplotlib", duration: "18 min", type: "video" },
      { id: 6, title: "Statistical Testing", duration: "22 min", type: "article" },
      { id: 7, title: "Feature Engineering", duration: "20 min", type: "video" },
      { id: 8, title: "Building Dashboards", duration: "25 min", type: "video" },
      { id: 9, title: "Quiz: Data Science Workflow", duration: "8 min", type: "quiz" },
      { id: 10, title: "Capstone: End-to-End Analysis", duration: "50 min", type: "video" },
    ],
  },
];

export function getCourseById(id: number): Course | undefined {
  return COURSES.find((c) => c.id === id);
}
