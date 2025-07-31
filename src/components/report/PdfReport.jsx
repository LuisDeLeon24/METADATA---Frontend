import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import { Button } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

// Registrar fuentes (opcional, para mejor tipografía)
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
      fontWeight: 300,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 700,
    },
  ],
});

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: '#7C3AED',
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 10,
  },
  confidentialBadge: {
    backgroundColor: '#DC2626',
    color: '#ffffff',
    padding: 8,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  caseInfo: {
    backgroundColor: '#F7FAFC',
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  caseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 5,
  },
  caseId: {
    fontSize: 12,
    color: '#718096',
  },
  content: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#2D3748',
    textAlign: 'justify',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 9,
    color: '#A0AEC0',
    textAlign: 'center',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 9,
    bottom: 15,
    right: 40,
    color: '#A0AEC0',
  },
  metadata: {
    backgroundColor: '#EDF2F7',
    padding: 10,
    marginBottom: 20,
    fontSize: 10,
    color: '#4A5568',
  },
  analysisCount: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

// Componente del documento PDF
const ReportDocument = ({ caseData, generatedContent, analyses, caseId }) => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Función para dividir texto largo en párrafos
  const formatContent = (content) => {
    if (!content) return [];
    
    // Dividir por saltos de línea dobles (párrafos)
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map((paragraph, index) => (
      <Text key={index} style={[styles.content, { marginBottom: 12 }]}>
        {paragraph.trim()}
      </Text>
    ));
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>REPORTE FORENSE DIGITAL</Text>
          <Text style={styles.subtitle}>Unidad de Inteligencia Digital</Text>
        </View>

        {/* Confidential Badge */}
        <View style={styles.confidentialBadge}>
          <Text>CONFIDENCIAL</Text>
        </View>

        {/* Case Information */}
        <View style={styles.caseInfo}>
          <Text style={styles.caseTitle}>
            {caseData?.title || 'Caso Sin Título'}
          </Text>
          <Text style={styles.caseId}>ID del Caso: {caseId}</Text>
        </View>

        {/* Metadata */}
        <View style={styles.metadata}>
          <Text>Fecha de generación: {currentDate}</Text>
          <Text>Tipo de documento: Reporte de Análisis Forense</Text>
          <Text>Estado: Confidencial</Text>
        </View>

        {/* Analysis Count */}
        {analyses && analyses.length > 0 && (
          <Text style={styles.analysisCount}>
            Evidencias analizadas: {analyses.length}
          </Text>
        )}

        {/* Generated Content */}
        <View style={{ flex: 1 }}>
          {formatContent(generatedContent)}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Este documento contiene información confidencial generada por sistemas de IA especializados en análisis forense digital.
          </Text>
          <Text style={styles.footerText}>
            Distribución restringida - Solo personal autorizado
          </Text>
        </View>

        {/* Page Number */}
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );
};

// Componente principal que exporta el botón de descarga
const PdfReport = ({ caseData, generatedContent, analyses, caseId }) => {
  // Generar nombre del archivo
  const fileName = `reporte_forense_${caseId}_${new Date().toISOString().split('T')[0]}.pdf`;

  // Verificar que hay contenido para generar
  if (!generatedContent || !generatedContent.trim()) {
    return null;
  }

  return (
    <PDFDownloadLink
      document={
        <ReportDocument
          caseData={caseData}
          generatedContent={generatedContent}
          analyses={analyses}
          caseId={caseId}
        />
      }
      fileName={fileName}
    >
      {({ blob, url, loading, error }) => (
        <Button
          leftIcon={<DownloadIcon />}
          colorScheme="blue"
          size="sm"
          isLoading={loading}
          disabled={loading || error}
          variant="outline"
        >
          {loading ? 'Generando PDF...' : 'Descargar PDF'}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default PdfReport;