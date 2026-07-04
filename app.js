// ========================================
// BirdWatcher Web App - Main Application
// Chunk 3: Core App Structure & Utilities
// ========================================

window OPENAI_API_KEY = "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";
const React = window.React;
const { useState, useEffect, useContext, useMemo, useCallback, useRef, createContext } = React;
const ReactDOM = window.ReactDOM;

// ========================================
// Theme Configuration
// ========================================

const THEME = {
  colors: {
    primary: '#8B5CF6',
    accent: '#F59E0B',
    background: '#F5F3FF',
    card: '#FFFFFF',
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E9D5FF',
    success: '#10B981',
    error: '#EF4444'
  }
};

// ========================================
// Theme Context
// ========================================

const ThemeContext = createContext({ theme: THEME });

const ThemeProvider = ({ children }) => {
  const value = useMemo(() => ({ theme: THEME }), []);
  return React.createElement(ThemeContext.Provider, { value }, children);
};

const useTheme = () => useContext(ThemeContext);

// ========================================
// Static Data
// ========================================

const BEHAVIOR_TYPES = [
  'Eating', 'Drinking', 'Singing', 'Chirping', 'Playing', 'Preening',
  'Bathing', 'Flying', 'Nesting', 'Foraging', 'Sleeping', 'Calling',
  'Courting', 'Fighting', 'Perching'
];

const PET_BIRD_SPECIES = [
  {
    id: 'budgie',
    name: 'Budgerigar (Budgie/Parakeet)',
    diet: 'Seeds (millet, canary), pellets (40-60% of diet), fresh vegetables (leafy greens, carrots, broccoli), fruits (apple, berries — no seeds), occasional egg food for protein. Avoid avocado, chocolate, onion, garlic, and caffeine. Fresh water daily.',
    entertainment: 'Provide foraging toys, mirrors (limited), bells, ladders, and swings. Rotate toys weekly. Allow supervised out-of-cage time 2+ hours daily. Play soft music. Teach simple words with repetition. Social interaction is crucial — consider a companion bird.',
    diet_schedule: '2 meals/day — morning fresh veggies, evening seed/pellet mix. Remove uneaten fresh food within 4 hours.'
  },
  {
    id: 'cockatiel',
    name: 'Cockatiel',
    diet: 'High-quality pellets (60-70%), fresh vegetables (leafy greens, corn, peas), seeds as treats (10%), fruits (berries, melon — no pits), occasional hard-boiled egg. Avoid fatty seeds like sunflower in excess. Provide cuttlebone for calcium.',
    entertainment: 'Cockatiels love to whistle and mimic. Provide large cages with horizontal bars for climbing. Offer foraging toys, puzzle feeders, wooden chews. Play music and talk to them daily. Allow 2-3 hours out-of-cage. They enjoy watching TV.',
    diet_schedule: '3× daily fresh food with constant pellet access. Remove perishables within 2-3 hours.'
  },
  {
    id: 'african-grey',
    name: 'African Grey Parrot',
    diet: 'High-quality pellets (60-70%), diverse fresh vegetables (peppers, leafy greens, sweet potato, squash), fruits (pomegranate, berries, mango), whole grains. Needs calcium (cooked beans, leafy greens). Seeds as rare treats. Avoid processed foods, salt, and sugar.',
    entertainment: 'Highly intelligent — needs mental stimulation. Puzzle toys, foraging boxes, shreddable toys. Teach complex vocabulary and tricks. Newspaper to shred, wood to chew. Rotate 10+ toys. Require 3-4 hours daily interaction. Introduce new textures and shapes regularly.',
    diet_schedule: 'Fresh meals twice daily. Pellets available constantly. Strict variety schedule recommended.'
  },
  {
    id: 'canary',
    name: 'Canary',
    diet: 'Canary seed mix, pellets, fresh greens (dandelion, spinach, kale), egg food weekly, fruit slices (apple, pear), sprouted seeds. Provide cuttlebone for minerals. Avoid avocado, iceberg lettuce, and artificial sweeteners.',
    entertainment: 'Canaries are primarily song birds. Place cage near a window for visual stimulation. Provide perches of varying sizes and textures. They prefer solo living. Play recordings of canary song. Ensure natural daylight cycles for singing behavior.',
    diet_schedule: 'Daily fresh seed, greens every other day, egg food weekly.'
  },
  {
    id: 'lovebird',
    name: 'Lovebird',
    diet: 'Pellets (50-60%), fresh vegetables (broccoli, carrots, leafy greens), fruits (apple, berries, grapes — seedless), seeds as treats. Avoid high-fat seeds. Sprouted seeds are excellent protein source. Fresh water twice daily.',
    entertainment: 'Very active — need large cages. Provide swings, ropes, ladders, and chewable wood. Pairs bond strongly; single birds need intensive human interaction. Foraging toys, hanging toys. Allow at least 2 hours free flight daily. Bathing dish is essential.',
    diet_schedule: 'Morning pellets/veggies, afternoon fruit treats, constant clean water.'
  },
  {
    id: 'conure',
    name: 'Conure',
    diet: 'High-quality pellets (60-70%), fresh vegetables (peppers, zucchini, sweet potato), fruits (mango, papaya, berries), whole grains, occasional seeds. Needs vitamin A-rich foods. Provide foraging opportunities with food.',
    entertainment: 'Extremely playful and social. Need large selection of toys. Love to cuddle in fabric huts and pockets. Teach tricks for mental enrichment. Allow 3+ hours out-of-cage. Foot toys, bells, rope perches. They enjoy showers — mist daily.',
    diet_schedule: '2-3 fresh meals daily. Morning veggie bowl, evening pellet mix.'
  },
  {
    id: 'macaw',
    name: 'Macaw',
    diet: 'High-quality pellets (60-70%), large variety of fresh vegetables and fruits, nuts (macadamia, walnuts — in moderation for fat content), cooked grains and legumes. Needs more fat than smaller parrots. Avoid chocolate, avocado, and caffeine absolutely.',
    entertainment: 'Large cages essential — minimum 36"×48". Very intelligent; need challenging puzzles. Large wooden toys, destructible toys. Foot toys. Require 4+ hours of interaction. Showers 2-3× weekly. Can learn extensive vocabulary and perform complex tricks.',
    diet_schedule: 'Three substantial meals daily. Fresh food with every meal.'
  },
  {
    id: 'cockatoo',
    name: 'Cockatoo',
    diet: 'Low-fat pellets (70-80%) — cockatoos prone to fatty liver disease. Fresh vegetables (all leafy greens, peppers, carrots), limited fruits, cooked grains. Avoid seeds as main diet. Minimal nuts. Frequent fresh water changes.',
    entertainment: 'Extremely social and demanding. Need constant attention — may develop behavioral issues if bored. Large foraging toys, shreddable items (palm fronds, paper). Music and dancing. Require 4-6 hours of interaction. Puzzle feeders. Supervised destructive play (wood, cardboard).',
    diet_schedule: 'Morning fresh meal, midday snack, evening pellets. Structure is key.'
  }
];

const WILD_BIRD_TIPS = [
  { icon: '🌸', title: 'Native Plants', tip: 'Plant native berry-producing shrubs to attract local species.' },
  { icon: '💧', title: 'Fresh Water', tip: 'A birdbath with clean water attracts 40% more species.' },
  { icon: '☀️', title: 'Best Times', tip: 'Dawn and dusk are peak birdwatching hours.' },
  { icon: '👁️', title: 'Stay Still', tip: 'Remain motionless for 5+ minutes for best sightings.' }
];

// ========================================
// LocalStorage Database Utilities
// ========================================

const DB = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(`birdwatcher_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('DB.get error:', e);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(`birdwatcher_${key}`, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('DB.set error:', e);
      return false;
    }
  },

  insert: (table, record) => {
    const records = DB.get(table, []);
    records.push({ ...record, id: record.id || `${Date.now()}-${Math.random()}` });
    DB.set(table, records);
    return record;
  },

  getAll: (table) => {
    return DB.get(table, []);
  },

  query: (table, filter = {}, sort = {}) => {
    let records = DB.get(table, []);
    
    // Apply filters
    Object.keys(filter).forEach(key => {
      records = records.filter(r => r[key] === filter[key]);
    });

    // Apply sorting
    if (sort.column) {
      records.sort((a, b) => {
        const aVal = a[sort.column];
        const bVal = b[sort.column];
        const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        return sort.ascending === false ? -comparison : comparison;
      });
    }

    return records;
  }
};

// ========================================
// Hooks for Data Management
// ========================================

const useQuery = (table, filter = {}, sort = {}) => {
  const [data, setData] = useState(() => DB.query(table, filter, sort));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = useCallback(() => {
    setLoading(true);
    try {
      const newData = DB.query(table, filter, sort);
      setData(newData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [table, filter, sort]);

  return { data, loading, error, refetch };
};

const useMutation = (table, operation) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback((record) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      try {
        if (operation === 'insert') {
          const result = DB.insert(table, record);
          setError(null);
          setLoading(false);
          resolve(result);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
        reject(err);
      }
    });
  }, [table, operation]);

  return { mutate, loading, error };
};

// ========================================
// Utility Functions
// ========================================

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'Unknown date';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatDateTime = (dateStr) => {
  if (!dateStr) return 'Unknown date';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const photoUriToDataUrl = async (photoUri) => {
  try {
    const response = await fetch(photoUri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error('Photo conversion error:', err);
    throw err;
  }
};

// ========================================
// Camera & Media Utilities
// ========================================

const useCamera = () => {
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const takePhoto = useCallback(() => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setPhoto({ uri: event.target.result });
            setError(null);
            resolve({ uri: event.target.result });
          };
          reader.onerror = () => {
            setError('Failed to read file');
            resolve({ error: 'Failed to read file' });
          };
          reader.readAsDataURL(file);
        } else {
          resolve({ error: 'No file selected' });
        }
      };
      input.click();
    });
  }, []);

  const pickImage = useCallback((options = {}) => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setPhoto({ uri: event.target.result });
            setError(null);
            resolve({ uri: event.target.result });
          };
          reader.onerror = () => {
            setError('Failed to read file');
            resolve({ error: 'Failed to read file' });
          };
          reader.readAsDataURL(file);
        } else {
          resolve({ error: 'No file selected' });
        }
      };
      input.click();
    });
  }, []);

  return { photo, takePhoto, pickImage, error, setPhoto };
};

const useAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = useCallback(() => {
    return new Promise((resolve) => {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        chunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          chunksRef.current.push(e.data);
        };

        mediaRecorder.start();
        setIsRecording(true);
        setError(null);
        resolve();
      }).catch((err) => {
        setError('Microphone access denied');
        resolve();
      });
    });
  }, []);

  const stopRecording = useCallback(() => {
    return new Promise((resolve) => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
          const url = URL.createObjectURL(blob);
          setIsRecording(false);
          resolve({ uri: url });
        };
        mediaRecorderRef.current.stop();
      }
    });
  }, []);

  return { startRecording, stopRecording, isRecording, error };
};

// ========================================
// Component: Icon
// ========================================

const Icon = ({ name, size = 24, color = 'currentColor' }) => {
  const iconMap = {
    'camera': '📷',
    'images': '🖼️',
    'mic': '🎤',
    'add': '➕',
    'close': '❌',
    'chevron-forward': '›',
    'chevron-up': '⬆️',
    'chevron-down': '⬇️',
    'bookmark': '🔖',
    'list': '📋',
    'heart': '❤️',
    'close-circle': '✕',
    'stop': '⏹️'
  };

  return React.createElement('span', {
    style: { fontSize: size, color, lineHeight: 1 }
  }, iconMap[name] || '•');
};

// ========================================
// Export for use in other chunks
// ========================================

const AppUtils = {
  THEME,
  ThemeContext,
  ThemeProvider,
  useTheme,
  BEHAVIOR_TYPES,
  PET_BIRD_SPECIES,
  WILD_BIRD_TIPS,
  DB,
  useQuery,
  useMutation,
  useCamera,
  useAudio,
  generateUUID,
  formatDate,
  formatDateTime,
  photoUriToDataUrl,
  Icon
};

// Make available globally
window.AppUtils = AppUtils;
