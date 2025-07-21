import React, { useEffect } from 'react';
import { usePdfEvidenceUpload } from '../../shared/hooks/pdf-analysis/usePdfEvidenceUpload';

// Keyframes para animaciones
const float = `
  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-10px) rotate(1deg); }
    66% { transform: translateY(5px) rotate(-1deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }
`;

const pulse = `
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(139, 92, 246, 0); }
    100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
  }
`;

const glow = `
  @keyframes glow {
    0% { box-shadow: 0 0 5px rgba(139, 92, 246, 0.5); }
    50% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 30px rgba(168, 85, 247, 0.4); }
    100% { box-shadow: 0 0 5px rgba(139, 92, 246, 0.5); }
  }
`;

const shimmer = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

// Inyectar estilos CSS
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = float + pulse + glow + shimmer;
document.head.appendChild(styleSheet);

const PdfEvidenceUploader = ({ caseId, userId }) => {
  const {
    file,
    text,
    uploadProgress,
    currentStep,
    error,
    success,
    pdfUrl,
    isLoading,
    steps,
    processPdfFile,
    resetStates,
    uploadToCloudinaryEffect,
    saveEvidenceEffect,
    extractingText,
    uploadingToCloud,
    savingEvidence,
    cases,
    loadingCases,
    selectedCaseId,
    setSelectedCaseId
  } = usePdfEvidenceUpload(caseId, userId);

  // Efectos para el flujo automático
  useEffect(() => {
    uploadToCloudinaryEffect();
  }, [text, extractingText]);

  useEffect(() => {
    saveEvidenceEffect();
  }, [pdfUrl, uploadingToCloud]);

  // Manejar selección de archivo
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      processPdfFile(selectedFile);
    }
  };

  // Manejar drag and drop
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      processPdfFile(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const [isDragOver, setIsDragOver] = React.useState(false);

  const onDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: '100px',
        paddingBottom: '70px',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0f0f23 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Elementos flotantes de fondo */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1))',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
          filter: 'blur(30px)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                margin: '0 auto',
                background: 'linear-gradient(135deg, #8B5CF6, #A855F7, #3B82F6)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
                animation: 'pulse 2s infinite'
              }}
            >
              🛡️
            </div>
            
            <h1
              style={{
                fontSize: '4rem',
                fontWeight: '900',
                letterSpacing: '-0.025em',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 25%, #3B82F6 50%, #8B5CF6 75%, #EC4899 100%)',
                backgroundSize: '400% 400%',
                animation: 'shimmer 3s ease-in-out infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(139, 92, 246, 0.5)'
              }}
            >
              DocuForense
            </h1>
            
            <p
              style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '500',
                maxWidth: '672px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}
            >
              Revoluciona la investigación criminal con IA avanzada.
              <br />
              <span style={{ color: '#a855f7', fontWeight: '700' }}>
                Análisis instantáneo de documentos PDF
              </span>{' '}
              y extracción de contenido con precisión forense.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginTop: '32px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', color: '#a855f7', fontWeight: 'bold' }}>99.9%</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>Precisión</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', color: '#3b82f6', fontWeight: 'bold' }}>&lt;10s</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>Análisis</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', color: '#ec4899', fontWeight: 'bold' }}>24/7</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>Disponible</div>
              </div>
            </div>
          </div>

          {/* Selección de Caso */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div
              style={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, #8B5CF6, #EC4899, #3B82F6)',
                backgroundSize: '200% 200%',
                animation: 'shimmer 2s linear infinite'
              }}
            />
            <div style={{ padding: '24px 24px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#8b5cf6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px'
                  }}
                >
                  🎯
                </div>
                <h2 style={{ fontSize: '1.125rem', color: 'white', fontWeight: '700', margin: 0 }}>
                  Selección de Caso
                </h2>
              </div>
            </div>
            <div style={{ padding: '0 24px 24px' }}>
              <label style={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: '600', marginBottom: '12px', display: 'block' }}>
                Caso Forense:
              </label>
              {loadingCases ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px' }}>
                  <div style={{ width: '16px', height: '16px', border: '2px solid #a855f7', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Cargando casos disponibles...</span>
                </div>
              ) : (
                <select
                  value={selectedCaseId}
                  onChange={(e) => setSelectedCaseId(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: '1px solid rgba(139, 92, 246, 0.5)',
                    borderRadius: '12px',
                    height: '60px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    padding: '0 16px'
                  }}
                >
                  <option value="" style={{ background: '#1a1a2e', color: 'white' }}>
                    -- Seleccione un caso para continuar --
                  </option>
                  {cases?.map((c) => (
                    <option key={c._id} value={c._id} style={{ background: '#1a1a2e', color: 'white' }}>
                      {c.title}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Upload Area */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div style={{ padding: 0 }}>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                style={{
                  border: '3px dashed',
                  borderColor: isDragOver ? '#a855f7' : 'rgba(139, 92, 246, 0.4)',
                  borderRadius: '16px',
                  margin: '24px',
                  padding: '80px',
                  textAlign: 'center',
                  background: isDragOver ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  animation: isDragOver ? 'glow 1.5s ease-in-out infinite' : 'none'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '120px',
                      height: '120px',
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.2))',
                      border: '2px solid #a855f7',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '64px',
                      animation: isDragOver ? 'pulse 1s infinite' : 'none'
                    }}
                  >
                    📄
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h3
                      style={{
                        fontSize: '1.125rem',
                        color: isDragOver ? '#c084fc' : 'white',
                        fontWeight: '700',
                        transition: 'all 0.3s',
                        margin: 0
                      }}
                    >
                      {isDragOver ? '¡Perfecto! Suelta aquí' : 'Zona de Análisis Forense PDF'}
                    </h3>
                    
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem', maxWidth: '448px', lineHeight: '1.6', margin: 0 }}>
                      Arrastra tu documento PDF aquí para iniciar el análisis
                      con inteligencia artificial avanzada
                    </p>
                    
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      style={{ display: 'none' }}
                      id="pdf-upload"
                      disabled={isLoading}
                    />
                    
                    <label
                      htmlFor="pdf-upload"
                      style={{
                        display: 'inline-block',
                        background: '#8b5cf6',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                        border: 'none',
                        fontSize: '1rem',
                        fontWeight: '500'
                      }}
                    >
                      {isLoading ? 'Procesando...' : 'Seleccionar PDF'}
                    </label>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
                      <span style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc', padding: '4px 12px', borderRadius: '8px', fontSize: '0.875rem' }}>
                        PDF
                      </span>
                      <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '4px 12px', borderRadius: '8px', fontSize: '0.875rem' }}>
                        Máx 50MB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Pipeline */}
          {isLoading && (
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '16px'
              }}
            >
              <div style={{ padding: '24px 24px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      background: '#3b82f6',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '20px'
                    }}
                  >
                    ⚡
                  </div>
                  <h2 style={{ fontSize: '1.125rem', color: 'white', fontWeight: '700', margin: 0 }}>
                    Pipeline de Análisis Forense PDF
                  </h2>
                </div>
              </div>
              <div style={{ padding: '0 24px 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <div
                    style={{
                      width: '100%',
                      height: '12px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '9999px',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #8B5CF6, #EC4899, #3B82F6)',
                        backgroundSize: '200% 200%',
                        animation: 'shimmer 2s linear infinite',
                        borderRadius: '9999px',
                        width: `${uploadProgress}%`,
                        transition: 'width 0.5s ease'
                      }}
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                    {steps.map((step, index) => (
                      <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '60px',
                            height: '60px',
                            background: step.status === 'complete'
                              ? 'linear-gradient(135deg, #10B981, #059669)'
                              : step.status === 'active'
                              ? 'linear-gradient(135deg, #8B5CF6, #A855F7)'
                              : 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            border: '2px solid',
                            borderColor: step.status === 'complete'
                              ? '#10b981'
                              : step.status === 'active'
                              ? '#a855f7'
                              : 'rgba(255, 255, 255, 0.3)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            animation: step.status === 'active' ? 'pulse 1.5s infinite' : 'none'
                          }}
                        >
                          {step.status === 'complete' ? '✅' : 
                           step.status === 'active' ? '⏳' : step.icon}
                        </div>
                        <p
                          style={{
                            color: step.status === 'complete'
                              ? '#6ee7b7'
                              : step.status === 'active'
                              ? '#c084fc'
                              : 'rgba(255, 255, 255, 0.6)',
                            fontWeight: '600',
                            fontSize: '0.875rem',
                            margin: 0
                          }}
                        >
                          {step.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid #ef4444',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                padding: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>⚠️</span>
                <div>
                  <h3 style={{ color: '#fca5a5', fontWeight: '600', margin: '0 0 4px 0' }}>Error en el Proceso</h3>
                  <p style={{ color: '#fecaca', margin: 0 }}>{error}</p>
                </div>
              </div>
              <button
                onClick={resetStates}
                style={{
                  marginTop: '16px',
                  background: '#dc2626',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                Intentar de Nuevo
              </button>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid #10b981',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                padding: '24px'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>✅</span>
                  <div>
                    <h3 style={{ color: '#6ee7b7', fontWeight: '600', margin: '0 0 4px 0' }}>¡Análisis Completado!</h3>
                    <p style={{ color: '#a7f3d0', margin: 0 }}>
                      El documento PDF ha sido procesado y guardado exitosamente como evidencia forense.
                    </p>
                  </div>
                </div>
                
                {file && (
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '16px' }}>
                    <h4 style={{ color: 'white', fontWeight: '500', margin: '0 0 8px 0' }}>📄 Documento Procesado:</h4>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0 0 4px 0' }}>{file.name}</p>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem', margin: 0 }}>
                      Tamaño: {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
                
                {text && (
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '16px' }}>
                    <h4 style={{ color: 'white', fontWeight: '500', margin: '0 0 8px 0' }}>📖 Texto Extraído:</h4>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem', maxHeight: '128px', overflowY: 'auto', margin: '0 0 8px 0' }}>
                      {text.substring(0, 300)}
                      {text.length > 300 && '...'}
                    </p>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem', margin: 0 }}>
                      Total de caracteres: {text.length}
                    </p>
                  </div>
                )}
                
                <button
                  onClick={resetStates}
                  style={{
                    background: '#8b5cf6',
                    color: 'white',
                    padding: '8px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                >
                  Procesar Otro Documento
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente principal App
function App() {
  // Ejemplo de uso con props
  const caseId = "683e97049055a045f01cddc7"; // ID del caso actual
  const userId = "user-456"; // ID del usuario actual

  return (
    <div className="App">
      <PdfEvidenceUploader caseId={caseId} userId={userId} />
    </div>
  );
}

export default App;