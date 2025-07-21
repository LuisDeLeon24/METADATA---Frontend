import { useState, useRef } from 'react';
import usePdfToText from './usePdfToText';
import { uploadToCloudinary } from '../../../servicesCloud/cloudinary';
import { uploadEvidence } from '../../../services/api.jsx';

export const usePdfEvidenceUpload = (caseId, userId) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [evidenceUrl, setEvidenceUrl] = useState('');
  
  const { text, loading: extractingText, error: extractError, extractTextFromPdf } = usePdfToText();
  const [uploadingToCloud, setUploadingToCloud] = useState(false);
  const [savingEvidence, setSavingEvidence] = useState(false);
  
  const hasProcessedFile = useRef(false);
  const hasUploadedToCloud = useRef(false);
  const hasSavedEvidence = useRef(false);

  // Estados derivados
  const isLoading = extractingText || uploadingToCloud || savingEvidence;
  const hasErrors = error || extractError;

  // Resetear estados
  const resetStates = () => {
    setFile(null);
    setUploadProgress(0);
    setCurrentStep(0);
    setError('');
    setSuccess(false);
    setEvidenceUrl('');
    setUploadingToCloud(false);
    setSavingEvidence(false);
    hasProcessedFile.current = false;
    hasUploadedToCloud.current = false;
    hasSavedEvidence.current = false;
  };

  // Validar archivo PDF
  const validatePdfFile = (file) => {
    if (!file) {
      throw new Error('No se ha seleccionado ningún archivo');
    }
    
    if (file.type !== 'application/pdf') {
      throw new Error('Solo se permiten archivos PDF para el análisis forense');
    }
    
    // Validar tamaño (máximo 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      throw new Error('El archivo es demasiado grande. Máximo 50MB permitido');
    }
  };

  // Procesar archivo PDF
  const processPdfFile = async (selectedFile) => {
    try {
      resetStates();
      
      if (!caseId) {
        throw new Error('Por favor, selecciona un caso antes de subir el documento PDF');
      }

      validatePdfFile(selectedFile);
      
      setFile(selectedFile);
      setCurrentStep(1);
      hasProcessedFile.current = true;
      
      // Extraer texto del PDF
      await extractTextFromPdf(selectedFile);
      
    } catch (err) {
      setError(err.message);
      setCurrentStep(0);
    }
  };

  // Efecto para subir a Cloudinary cuando se extrae el texto
  const uploadToCloudinaryEffect = async () => {
    if (!text || !file || hasUploadedToCloud.current || extractingText) return;
    
    try {
      hasUploadedToCloud.current = true;
      setCurrentStep(2);
      setUploadingToCloud(true);
      setUploadProgress(25);
      
      const cloudinaryResult = await uploadToCloudinary(file);
      
      setEvidenceUrl(cloudinaryResult.url);
      setUploadProgress(75);
      setUploadingToCloud(false);
      
    } catch (err) {
      setError('Error al subir el archivo a Cloudinary: ' + err.message);
      setUploadingToCloud(false);
      hasUploadedToCloud.current = false;
    }
  };

  // Efecto para guardar evidencia cuando se sube a Cloudinary
  const saveEvidenceEffect = async () => {
    if (!evidenceUrl || !text || hasSavedEvidence.current || uploadingToCloud) return;
    
    try {
      hasSavedEvidence.current = true;
      setCurrentStep(3);
      setSavingEvidence(true);
      setUploadProgress(90);
      
      const evidenceData = {
        type: 'DOCUMENT',
        description: `Análisis forense de documento PDF: ${file.name}`,
        archive: evidenceUrl,
        collectionDate: new Date().toISOString(),
        uploadedBy: userId,
        case: caseId,
        preliminaryAnalysis: `Documento PDF procesado exitosamente. Texto extraído: ${text.substring(0, 500)}${text.length > 500 ? '...' : ''}`,
        metadata: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          textLength: text.length,
          extractedAt: new Date().toISOString()
        }
      };

      const result = await uploadEvidence(evidenceData);
      
      if (result.error) {
        throw new Error(result.msg || 'Error al guardar la evidencia');
      }
      
      setUploadProgress(100);
      setCurrentStep(4);
      setSuccess(true);
      setSavingEvidence(false);
      
    } catch (err) {
      setError('Error al guardar la evidencia: ' + err.message);
      setSavingEvidence(false);
      hasSavedEvidence.current = false;
    }
  };

  // Pasos del proceso
  const steps = [
    { 
      label: 'Subida PDF', 
      status: file ? 'complete' : 'pending',
      icon: '📄'
    },
    { 
      label: 'Extracción de Texto', 
      status: text ? 'complete' : extractingText ? 'active' : 'pending',
      icon: '📖'
    },
    { 
      label: 'Subida a Nube', 
      status: evidenceUrl ? 'complete' : uploadingToCloud ? 'active' : 'pending',
      icon: '☁️'
    },
    { 
      label: 'Guardar Evidencia', 
      status: success ? 'complete' : savingEvidence ? 'active' : 'pending',
      icon: '💾'
    }
  ];

  return {
    // Estados
    file,
    text,
    uploadProgress,
    currentStep,
    error: hasErrors,
    success,
    evidenceUrl,
    isLoading,
    steps,
    
    // Acciones
    processPdfFile,
    resetStates,
    uploadToCloudinaryEffect,
    saveEvidenceEffect,
    
    // Estados específicos
    extractingText,
    uploadingToCloud,
    savingEvidence
  };
};