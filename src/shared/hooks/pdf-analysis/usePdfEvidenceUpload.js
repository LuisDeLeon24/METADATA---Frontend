import React, { useState, useRef } from 'react';
import usePdfToText from './usePdfToText';
import { uploadToCloudinary } from '../../../servicesCloud/cloudinary';
import { uploadEvidence, uploadAnalysis } from '../../../services/api.jsx'; // Asegúrate de exportar uploadAnalysis

export const usePdfEvidenceUpload = (caseId, userId, setEvidenceId) => {
  const evidenceIdRef = useRef(null);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const { text, loading: extractingText, error: extractError, extractTextFromPdf } = usePdfToText();
  const [uploadingToCloud, setUploadingToCloud] = useState(false);
  const [savingEvidence, setSavingEvidence] = useState(false);
  const [savingAnalysis, setSavingAnalysis] = useState(false);

  const hasProcessedFile = useRef(false);
  const hasUploadedToCloud = useRef(false);
  const hasSavedEvidence = useRef(false);

  const isLoading = extractingText || uploadingToCloud || savingEvidence;
  const hasErrors = error || extractError;

  const resetStates = () => {
    setFile(null);
    setUploadProgress(0);
    setCurrentStep(0);
    setError('');
    setSuccess(false);
    setEvidenceUrl('');
    setUploadingToCloud(false);
    setSavingEvidence(false);
    evidenceIdRef.current = null;
    hasProcessedFile.current = false;
    hasUploadedToCloud.current = false;
    hasSavedEvidence.current = false;
  };

  const validatePdfFile = (file) => {
    if (!file) throw new Error('No se ha seleccionado ningún archivo');
    if (file.type !== 'application/pdf') throw new Error('Solo PDF permitido');
    if (file.size > 50 * 1024 * 1024) throw new Error('Máximo 50MB');
  };

  const processPdfFile = async (selectedFile) => {
    try {
      if (!caseId) throw new Error('Selecciona un caso antes de subir');
      validatePdfFile(selectedFile);
      setFile(selectedFile);
      setCurrentStep(1);
      hasProcessedFile.current = true;
      await extractTextFromPdf(selectedFile);
    } catch (err) {
      setError(err.message);
      setCurrentStep(0);
    }
  };

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
      setError('Error subiendo a Cloudinary: ' + err.message);
      setUploadingToCloud(false);
      hasUploadedToCloud.current = false;
    }
  };

  const saveEvidenceEffect = async () => {
    if (!evidenceUrl || !text || hasSavedEvidence.current || uploadingToCloud) return;
    try {
      hasSavedEvidence.current = true;
      setCurrentStep(3);
      setSavingEvidence(true);
      setUploadProgress(90);

      const evidenceData = {
        type: 'DOCUMENT',
        description: `Análisis forense de PDF: ${file.name}`,
        archive: evidenceUrl,
        collectionDate: new Date().toISOString(),
        uploadedBy: userId,
        case: caseId,
        preliminaryAnalysis: `Texto extraído: ${text.substring(0, 500)}${text.length > 500 ? '...' : ''}`,
        metadata: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          textLength: text.length,
          extractedAt: new Date().toISOString()
        }
      };

      const result = await uploadEvidence(evidenceData);
      if (result.error) throw new Error(result.msg || 'Error guardando evidencia');

      const evidenceId = result.evidence._id; 
      evidenceIdRef.current = evidenceId;
      if (setEvidenceId) setEvidenceId(evidenceId);

      setUploadProgress(100);
      setCurrentStep(4);
      setSuccess(true);
      setSavingEvidence(false);
    } catch (err) {
      setError('Error guardando evidencia: ' + err.message);
      setSavingEvidence(false);
      hasSavedEvidence.current = false;
    }
  };

  const steps = [
    { label: 'Subida PDF', status: file ? 'complete' : 'pending', icon: '📄' },
    { label: 'Extracción Texto', status: text ? 'complete' : extractingText ? 'active' : 'pending', icon: '📖' },
    { label: 'Subida Nube', status: evidenceUrl ? 'complete' : uploadingToCloud ? 'active' : 'pending', icon: '☁️' },
    { label: 'Guardar Evidencia', status: success ? 'complete' : savingEvidence ? 'active' : 'pending', icon: '💾' },
  ];

  return {
    file,
    text,
    uploadProgress,
    currentStep,
    error: hasErrors,
    success,
    evidenceUrl,
    isLoading,
    steps,
    savingAnalysis,
    processPdfFile,
    resetStates,
    uploadToCloudinaryEffect,
    saveEvidenceEffect,
    extractingText,
    uploadingToCloud,
    savingEvidence,
    evidenceIdRef 
  };
};
