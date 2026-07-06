// ========================================
// BirdWatcher Web App
// Chunk 4: Screen Components (Part A - Identify & Modals)
// ========================================

// ========================================
// SaveSightingModal Component
// ========================================

const SaveSightingModal = ({ visible, onClose, onSave, result, photoUri, theme }) => {
  const [notes, setNotes] = useState('');
  const [locationNotes, setLocationNotes] = useState('');

  if (!visible) return null;

  const handleSave = () => {
    if (onSave) {
      onSave({ notes, locationNotes });
    }
    setNotes('');
    setLocationNotes('');
  };

  return React.createElement('div', { className: 'modal-overlay', onClick: onClose },
    React.createElement('div', { className: 'modal-sheet', onClick: (e) => e.stopPropagation() },
      React.createElement('div', { className: 'modal-handle' }),
      React.createElement('h2', { style: { marginBottom: '16px', color: theme.colors.textPrimary } }, 'Save Sighting'),
      
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', marginBottom: '16px' } },
        result && React.createElement('div', { style: { backgroundColor: '#F5F3FF', borderRadius: '12px', padding: '14px', marginBottom: '16px' } },
          React.createElement('h3', { style: { fontSize: '16px', fontWeight: '700', color: theme.colors.primary } }, result.species_name || 'Unknown Species'),
          result.estimated_age && React.createElement('p', { style: { fontSize: '13px', color: theme.colors.textSecondary, marginTop: '2px' } }, 'Age: ' + result.estimated_age),
          result.gender && React.createElement('p', { style: { fontSize: '13px', color: theme.colors.textSecondary } }, 'Gender: ' + result.gender)
        ),

        React.createElement('label', { style: { fontSize: '14px', fontWeight: '600', color: theme.colors.textPrimary, display: 'block', marginBottom: '6px' } }, 'Location Notes'),
        React.createElement('input', {
          type: 'text',
          value: locationNotes,
          onChange: (e) => setLocationNotes(e.target.value),
          placeholder: 'Where did you see this bird?',
          style: { marginBottom: '12px' }
        }),

        React.createElement('label', { style: { fontSize: '14px', fontWeight: '600', color: theme.colors.textPrimary, display: 'block', marginBottom: '6px' } }, 'Notes'),
        React.createElement('textarea', {
          value: notes,
          onChange: (e) => setNotes(e.target.value),
          placeholder: 'Additional observations...',
          style: { marginBottom: '16px', minHeight: '80px' }
        })
      ),

      React.createElement('div', { style: { display: 'flex', gap: '10px', marginTop: '8px' } },
        React.createElement('button', { 
          onClick: onClose, 
          className: 'btn btn-secondary',
          style: { flex: 1 }
        }, 'Cancel'),
        React.createElement('button', { 
          onClick: handleSave, 
          className: 'btn btn-primary',
          style: { flex: 2 }
        }, 'Save Sighting')
      )
    )
  );
};

// ========================================
// EggIdentifyModal Component
// ========================================

const EggIdentifyModal = ({ visible, onClose, theme }) => {
  const cameraHook = window.AppUtils.useCamera();
  const [isLoading, setIsLoading] = useState(false);
  const [eggResult, setEggResult] = useState(null);
  const [eggError, setEggError] = useState(null);

  if (!visible) return null;

  const analyzeEgg = (uri) => {
    setIsLoading(true);
    setEggError(null);
    setEggResult(null);
    // Mock analysis - in production would call AI API
    setTimeout(() => {
      setEggResult({
        species_name: 'European Robin',
        confidence: 'high',
        egg_features: 'Pale blue-green color, speckled with reddish-brown',
        habitat_notes: 'Common in gardens and woodlands',
        additional_species: ['Great Tit', 'Blackbird']
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleTakeEggPhoto = () => {
    cameraHook.takePhoto().then((result) => {
      if (result.error) {
        setEggError(result.error);
      } else if (result.uri) {
        analyzeEgg(result.uri);
      }
    });
  };

  const handlePickEggImage = () => {
    cameraHook.pickImage().then((result) => {
      if (result.error) {
        setEggError(result.error);
      } else if (result.uri) {
        analyzeEgg(result.uri);
      }
    });
  };

  return React.createElement('div', { className: 'modal-overlay', onClick: onClose },
    React.createElement('div', { className: 'modal-sheet', onClick: (e) => e.stopPropagation(), style: { maxHeight: '90vh' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid ' + theme.colors.border } },
        React.createElement('div', { style: { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' } }, '🥚'),
        React.createElement('h2', { style: { flex: 1, color: theme.colors.textPrimary } }, 'Egg Identification'),
        React.createElement('button', { 
          onClick: onClose,
          style: { background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: theme.colors.textSecondary }
        }, '✕')
      ),

      React.createElement('div', { style: { flex: 1, overflowY: 'auto', marginBottom: '16px' } },
        cameraHook.photo
          ? React.createElement('img', {
              src: cameraHook.photo.uri,
              style: { width: '100%', height: '200px', borderRadius: '16px', objectFit: 'cover', marginBottom: '16px' }
            })
          : React.createElement('div', { style: { width: '100%', height: '180px', backgroundColor: '#FEF3C7', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '2px dashed ' + theme.colors.accent } },
              React.createElement('div', { style: { fontSize: '48px', marginBottom: '8px' } }, '🥚'),
              React.createElement('p', { style: { fontSize: '14px', color: theme.colors.textSecondary, textAlign: 'center' } }, 'Take or upload a photo\nof the egg')
            ),

        React.createElement('div', { style: { display: 'flex', gap: '10px', marginBottom: '20px' } },
          React.createElement('button', { 
            onClick: handleTakeEggPhoto,
            className: 'btn btn-primary',
            style: { flex: 1 }
          }, '📷 Take Photo'),
          React.createElement('button', { 
            onClick: handlePickEggImage,
            className: 'btn btn-secondary',
            style: { flex: 1 }
          }, '🖼️ Gallery')
        ),

        isLoading && React.createElement('div', { className: 'loading-container' },
          React.createElement('div', { className: 'spinner', style: { marginBottom: '12px' } }),
          React.createElement('p', { style: { color: theme.colors.textSecondary } }, 'Analyzing egg characteristics...')
        ),

        eggError && React.createElement('div', { className: 'info-box info-box-error' }, eggError),

        eggResult && React.createElement('div', { style: { backgroundColor: '#F5F3FF', borderRadius: '16px', padding: '16px' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', marginBottom: '12px' } },
            React.createElement('div', { style: { fontSize: '22px', marginRight: '12px' } }, '🥚'),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('h3', { style: { fontSize: '17px', fontWeight: '700', color: theme.colors.textPrimary } }, eggResult.species_name || 'Unknown'),
              eggResult.confidence && React.createElement('span', { className: 'badge badge-' + (eggResult.confidence === 'high' ? 'success' : 'warning'), style: { marginTop: '4px', display: 'inline-block' } }, eggResult.confidence.toUpperCase() + ' CONFIDENCE')
            )
          ),
          eggResult.egg_features && React.createElement('div', { style: { marginBottom: '10px' } },
            React.createElement('h4', { style: { fontSize: '13px', fontWeight: '600', color: theme.colors.primary, marginBottom: '4px' } }, '🔍 Egg Features'),
            React.createElement('p', { style: { fontSize: '13px', color: theme.colors.textSecondary } }, eggResult.egg_features)
          ),
          eggResult.habitat_notes && React.createElement('div', { style: { marginBottom: '10px' } },
            React.createElement('h4', { style: { fontSize: '13px', fontWeight: '600', color: theme.colors.primary, marginBottom: '4px' } }, '🏠 Habitat'),
            React.createElement('p', { style: { fontSize: '13px', color: theme.colors.textSecondary } }, eggResult.habitat_notes)
          )
        )
      )
    )
  );
};

// ========================================
// IdentifyScreen Component
// ========================================

const IdentifyScreen = () => {
  const theme = {
  colors: {
    textPrimary: getComputedStyle(document.documentElement)
      .getPropertyValue('--text-primary'),
    textSecondary: getComputedStyle(document.documentElement)
      .getPropertyValue('--text-secondary'),
    primary: getComputedStyle(document.documentElement)
      .getPropertyValue('--primary-color'),
    accent: getComputedStyle(document.documentElement)
      .getPropertyValue('--accent-color'),
    card: getComputedStyle(document.documentElement)
      .getPropertyValue('--card-color'),
    border: getComputedStyle(document.documentElement)
      .getPropertyValue('--border-color'),
    success: getComputedStyle(document.documentElement)
      .getPropertyValue('--success-color'),
    error: getComputedStyle(document.documentElement)
      .getPropertyValue('--error-color')
  }
  };
  
  const cameraHook = window.AppUtils.useCamera();
  const audioHook = window.AppUtils.useAudio();
  
  const [identifyMode, setIdentifyMode] = useState('photo');
  const [identifyResult, setIdentifyResult] = useState(null);
  const [identifyError, setIdentifyError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showEggModal, setShowEggModal] = useState(false);
  const [audioRecorded, setAudioRecorded] = useState(false);

  const sightingsMutation = window.AppUtils.useMutation('bird_sightings', 'insert');

  const handleTakePhoto = () => {
    setIdentifyResult(null);
    setIdentifyError(null);
    cameraHook.takePhoto().then((result) => {
      if (result.error) {
        setIdentifyError(result.error);
      } else if (result.uri) {
        // Replace with real API call
        (async () => {
        try {
          setIsLoading(true);
          const bird =
              await window.AI.identifyBird(result.uri);
          setIdentifyResult(bird);
        }
        catch(err){
           console.error(err);
          setIdentifyError(err.message);
        }
        finally{
          setIsLoading(false);
        }
      })();        
      }
    });
  };

  const handlePickImage = () => {
    setIdentifyResult(null);
    setIdentifyError(null);
    cameraHook.pickImage().then((result) => {
      if (result.error) {
        setIdentifyError(result.error);
      } else if (result.uri) {
       // Replace with real API call
        (async () => {
        try {
          setIsLoading(true);
          const bird =
              await window.AI.identifyBird(result.uri);
          setIdentifyResult(bird);
        }
        catch(err){
           console.error(err);
          setIdentifyError(err.message);
        }
        finally{
          setIsLoading(false);
        }
      })();        
      }
    });
  };

  const handleStartRecording = () => {
    setIdentifyResult(null);
    setIdentifyError(null);
    setAudioRecorded(false);
    audioHook.startRecording().catch((err) => {
      setIdentifyError('Microphone error: ' + err.message);
    });
  };

  const handleStopRecording = () => {
    audioHook.stopRecording().then(() => {
      setAudioRecorded(true);
      setIsLoading(true);
      setTimeout(() => {
        setIdentifyResult({
          species_name: 'Song Thrush',
          common_name: 'Song Thrush',
          estimated_age: null,
          gender: 'unknown',
          confidence: 'medium',
          identifying_features: 'Known for its distinctive repeated song phrases',
          call_description: 'Clear, melodious song with repeated phrases'
        });
        setIsLoading(false);
      }, 2000);
    });
  };

  const handleSaveSighting = (extraData) => {
    if (!identifyResult) return;
    const now = new Date().toISOString();
    const photoUri = cameraHook.photo ? cameraHook.photo.uri : null;
    
    sightingsMutation.mutate({
      id: window.AppUtils.generateUUID(),
      species_name: identifyResult.species_name || 'Unknown',
      estimated_age: identifyResult.estimated_age || null,
      gender: identifyResult.gender || null,
      photo_url: photoUri,
      sighting_date: now,
      location_notes: extraData.locationNotes || null,
      user_notes: extraData.notes || null
    }).then(() => {
      setShowSaveModal(false);
      alert('Sighting saved!');
    }).catch((err) => {
      alert('Error: ' + err.message);
    });
  };

  const confidenceColor = (conf) => {
    if (conf === 'high') return 'badge-success';
    if (conf === 'medium') return 'badge-warning';
    return 'badge-error';
  };

  return React.createElement('div', { className: 'screen' },
    React.createElement('div', { className: 'screen-header' },
      React.createElement('h1', null, '🐦 BirdWatcher'),
      React.createElement('p', null, 'Identify birds by photo or sound')
    ),

    React.createElement('div', { className: 'screen-scrollable', style: { paddingBottom: 'calc(var(--tab-height) + 16px)' } },
      // Mode tabs
      React.createElement('div', { className: 'tab-bar', style: { marginBottom: '20px' } },
        React.createElement('button', {
          className: 'tab ' + (identifyMode === 'photo' ? 'active' : ''),
          onClick: () => { setIdentifyMode('photo'); setIdentifyResult(null); setIdentifyError(null); }
        }, '📷 Photo ID'),
        React.createElement('button', {
          className: 'tab ' + (identifyMode === 'audio' ? 'active' : ''),
          onClick: () => { setIdentifyMode('audio'); setIdentifyResult(null); setIdentifyError(null); }
        }, '🎤 Sound ID'),
        React.createElement('button', {
          className: 'tab',
          onClick: () => { setShowEggModal(true); }
        }, '🥚 Egg ID')
      ),

      // Photo Mode
      identifyMode === 'photo' && React.createElement('div', null,
        cameraHook.photo
          ? React.createElement('img', {
              src: cameraHook.photo.uri,
              style: { width: '100%', height: '240px', borderRadius: '20px', objectFit: 'cover', marginBottom: '16px' }
            })
          : React.createElement('div', { style: { width: '100%', height: '220px', backgroundColor: '#F0EDF9', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '2px dashed #C4B5FD' } },
              React.createElement('div', { style: { fontSize: '56px', marginBottom: '12px' } }, '🐦'),
              React.createElement('p', { style: { fontSize: '15px', color: theme.colors.textSecondary, fontWeight: '600' } }, 'Capture or upload a bird photo'),
              React.createElement('p', { style: { fontSize: '12px', color: '#A78BFA', marginTop: '4px' } }, 'Clear, close-up photos work best')
            ),
        
        React.createElement('div', { style: { display: 'flex', gap: '10px', marginBottom: '20px' } },
          React.createElement('button', { 
            onClick: handleTakePhoto, 
            className: 'btn btn-primary',
            style: { flex: 1 }
          }, '📷 Camera'),
          React.createElement('button', { 
            onClick: handlePickImage, 
            className: 'btn btn-secondary',
            style: { flex: 1 }
          }, '🖼️ Gallery')
        )
      ),

      // Audio Mode
      identifyMode === 'audio' && React.createElement('div', null,
        React.createElement('div', { style: { backgroundColor: audioHook.isRecording ? '#FEE2E2' : (audioRecorded ? '#D1FAE5' : '#F0EDF9'), borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', marginBottom: '20px', border: '2px solid ' + (audioHook.isRecording ? theme.colors.error : (audioRecorded ? theme.colors.success : '#C4B5FD')) } },
          React.createElement('button', {
            onClick: audioHook.isRecording ? handleStopRecording : handleStartRecording,
            style: { width: '90px', height: '90px', borderRadius: '50%', backgroundColor: audioHook.isRecording ? theme.colors.error : theme.colors.primary, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', cursor: 'pointer', color: 'white', fontSize: '40px' }
          }, audioHook.isRecording ? '⏹️' : '🎤'),
          React.createElement('p', { style: { fontSize: '16px', fontWeight: '700', color: audioHook.isRecording ? theme.colors.error : theme.colors.textPrimary } }, audioHook.isRecording ? '🔴 Recording...' : (audioRecorded ? '✅ Sound Captured!' : 'Tap to Record Bird Sound')),
          React.createElement('p', { style: { fontSize: '13px', color: theme.colors.textSecondary, textAlign: 'center', marginTop: '6px' } }, audioHook.isRecording ? 'Tap stop when done' : 'Record chirping, singing, or calls')
        )
      ),

      // Loading state
      isLoading && React.createElement('div', { style: { backgroundColor: theme.colors.card, borderRadius: '16px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px', boxShadow: 'var(--shadow-md)' } },
        React.createElement('div', { className: 'spinner' }),
        React.createElement('p', { style: { color: theme.colors.textSecondary, marginTop: '12px', fontSize: '14px', fontWeight: '600' } }, 'Analyzing with AI...')
      ),

      // Error state
      identifyError && React.createElement('div', { className: 'info-box info-box-error', style: { marginBottom: '16px' } }, identifyError),

      // Result state
      identifyResult && !isLoading && React.createElement('div', { className: 'card', style: { marginBottom: '16px' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', marginBottom: '16px' } },
          React.createElement('div', { style: { width: '56px', height: '56px', borderRadius: '28px', backgroundColor: '#F0EDF9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '14px' } }, '🐦'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('h3', { style: { fontSize: '20px', fontWeight: '800', color: theme.colors.textPrimary } }, identifyResult.species_name || 'Unknown Species'),
            identifyResult.common_name && React.createElement('p', { style: { fontSize: '13px', color: theme.colors.textSecondary, marginTop: '2px' } }, identifyResult.common_name),
            identifyResult.confidence && React.createElement('span', { className: 'badge ' + confidenceColor(identifyResult.confidence), style: { marginTop: '6px', display: 'inline-block' } }, identifyResult.confidence.toUpperCase() + ' CONFIDENCE')
          )
        ),

        React.createElement('div', { style: { display: 'flex', gap: '10px', marginBottom: '14px' } },
          identifyResult.estimated_age && React.createElement('div', { style: { flex: 1, backgroundColor: '#F0EDF9', borderRadius: '12px', padding: '12px', textAlign: 'center' } },
            React.createElement('p', { style: { fontSize: '11px', color: theme.colors.textSecondary, fontWeight: '600', marginBottom: '4px' } }, 'AGE ESTIMATE'),
            React.createElement('p', { style: { fontSize: '14px', fontWeight: '700', color: theme.colors.primary } }, identifyResult.estimated_age)
          ),
          identifyResult.gender && React.createElement('div', { style: { flex: 1, backgroundColor: '#F0EDF9', borderRadius: '12px', padding: '12px', textAlign: 'center' } },
            React.createElement('p', { style: { fontSize: '11px', color: theme.colors.textSecondary, fontWeight: '600', marginBottom: '4px' } }, 'GENDER'),
            React.createElement('p', { style: { fontSize: '14px', fontWeight: '700', color: theme.colors.primary } }, identifyResult.gender)
          )
        ),

        identifyResult.identifying_features && React.createElement('div', { className: 'info-box info-box-primary', style: { marginBottom: '10px' } },
          React.createElement('h4', { style: { fontSize: '12px', fontWeight: '700', marginBottom: '4px' } }, '🔍 IDENTIFYING FEATURES'),
          React.createElement('p', { style: { fontSize: '13px', color: theme.colors.textSecondary } }, identifyResult.identifying_features)
        ),

        identifyResult.fun_fact && React.createElement('div', { className: 'info-box info-box-warning', style: { marginBottom: '14px' } },
          React.createElement('h4', { style: { fontSize: '12px', fontWeight: '700', marginBottom: '4px' } }, '✨ FUN FACT'),
          React.createElement('p', { style: { fontSize: '13px', color: theme.colors.textSecondary } }, identifyResult.fun_fact)
        ),

        identifyResult.raw && React.createElement('div', { className: 'info-box info-box-primary', style: { marginBottom: '14px' } },
          React.createElement('p', { style: { fontSize: '13px', color: theme.colors.textSecondary } }, identifyResult.raw)
        ),

        React.createElement('button', { 
          onClick: () => { setShowSaveModal(true); }, 
          className: 'btn btn-primary',
          style: { width: '100%' }
        }, '🔖 Save Sighting')
      ),

      // Pro Tips
      React.createElement('div', { className: 'card' },
        React.createElement('h3', { style: { fontSize: '14px', fontWeight: '700', color: theme.colors.textPrimary, marginBottom: '12px' } }, '💡 Pro Tips'),
        window.AppUtils.WILD_BIRD_TIPS.map((tip, i) => 
          React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'flex-start', marginBottom: '10px' } },
            React.createElement('div', { style: { width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#F0EDF9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', marginTop: '2px', fontSize: '16px' } }, tip.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('h4', { style: { fontSize: '13px', fontWeight: '700', color: theme.colors.textPrimary } }, tip.title),
              React.createElement('p', { style: { fontSize: '12px', color: theme.colors.textSecondary, lineHeight: '16px', marginTop: '2px' } }, tip.tip)
            )
          )
        )
      )
    ),

    React.createElement(SaveSightingModal, {
      visible: showSaveModal,
      onClose: () => { setShowSaveModal(false); },
      onSave: handleSaveSighting,
      result: identifyResult,
      photoUri: cameraHook.photo ? cameraHook.photo.uri : null,
      theme: theme
    }),

    React.createElement(EggIdentifyModal, {
      visible: showEggModal,
      onClose: () => { setShowEggModal(false); },
      theme: theme
    })
  );
};

// Export for use
window.AppComponents = window.AppComponents || {};
window.AppComponents.IdentifyScreen = IdentifyScreen;
window.AppComponents.SaveSightingModal = SaveSightingModal;
window.AppComponents.EggIdentifyModal = EggIdentifyModal;
