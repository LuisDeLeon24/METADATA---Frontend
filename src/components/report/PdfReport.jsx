import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import { Button } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

// Registrar fuentes más simples y confiables
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

// Estilos profesionales inspirados en el primer diseño
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 0,
    fontFamily: 'Roboto',
  },
  
  // Header con diseño moderno
  header: {
    backgroundColor: '#1A202C',
    color: '#ffffff',
    padding: 30,
    position: 'relative',
  },
  
  headerAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#7C3AED',
  },
  
  headerTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 6,
  },
  
  headerSubtitle: {
    fontSize: 14,
    color: '#A78BFA',
    marginBottom: 15,
  },
  
  confidentialBadge: {
    backgroundColor: '#DC2626',
    color: '#ffffff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
    borderRadius: 15,
  },
  
  // Contenido principal
  content: {
    padding: 30,
    flex: 1,
  },
  
  // Información del caso
  caseInfo: {
    backgroundColor: '#F8FAFC',
    padding: 25,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#7C3AED',
    marginBottom: 30,
  },
  
  caseTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1A202C',
    marginBottom: 15,
  },
  
  metadataContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  
  metadataItem: {
    flex: 1,
    minWidth: '45%',
  },
  
  metadataLabel: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: 600,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  
  metadataValue: {
    fontSize: 11,
    color: '#1E293B',
    fontWeight: 500,
  },
  
  // Estadísticas de análisis
  analysisStats: {
    backgroundColor: '#7C3AED',
    color: '#ffffff',
    padding: 15,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  
  statsText: {
    fontSize: 12,
    color: '#ffffff',
  },
  
  statsNumber: {
    fontSize: 20,
    fontWeight: 700,
    color: '#ffffff',
  },
  
  // Títulos y contenido
  contentTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#1A202C',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  sectionHeader: {
    fontSize: 13,
    fontWeight: 700,
    color: '#7C3AED',
    marginTop: 20,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  
  paragraph: {
    fontSize: 11,
    lineHeight: 1.7,
    color: '#374151',
    textAlign: 'justify',
    marginBottom: 12,
  },
  
  // Footer
  footer: {
    backgroundColor: '#F1F5F9',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#CBD5E1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  footerText: {
    fontSize: 8,
    color: '#64748B',
    maxWidth: '70%',
    lineHeight: 1.4,
  },
  
  footerLogo: {
    fontSize: 8,
    fontWeight: 700,
    color: '#7C3AED',
  },
  
  pageNumber: {
    position: 'absolute',
    fontSize: 8,
    bottom: 8,
    right: 30,
    color: '#64748B',
  },
});

// Componente del documento PDF con el diseño profesional
const ReportDocument = ({ caseData, generatedContent, analyses, caseId }) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('es-ES');
  const formattedTime = currentDate.toLocaleTimeString('es-ES');

  // Función para procesar el contenido y crear párrafos estructurados
  const formatContent = (content) => {
    if (!content) return [];
    
    const lines = content.split('\n').filter(line => line.trim());
    const elements = [];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.includes('**')) {
        // Es un encabezado
        const headerText = trimmedLine.replace(/\*\*/g, '');
        elements.push(
          <Text key={`header-${index}`} style={styles.sectionHeader}>
            {headerText}
          </Text>
        );
      } else if (trimmedLine) {
        // Es un párrafo normal
        elements.push(
          <Text key={`paragraph-${index}`} style={styles.paragraph}>
            {trimmedLine}
          </Text>
        );
      }
    });
    
    return elements;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header con diseño moderno */}
        <View style={styles.header}>
          <View style={styles.headerAccent} />
          <Text style={styles.headerTitle}>REPORTE FORENSE DIGITAL</Text>
          <Text style={styles.headerSubtitle}>Unidad de Inteligencia Digital - Análisis Avanzado</Text>
          <View style={styles.confidentialBadge}>
            <Text>● CONFIDENCIAL</Text>
          </View>
        </View>

        {/* Contenido principal */}
        <View style={styles.content}>
          {/* Información del caso */}
          <View style={styles.caseInfo}>
            <Text style={styles.caseTitle}>
              {caseData?.title || 'Caso de Investigación Digital'}
            </Text>
            <View style={styles.metadataContainer}>
              <View style={styles.metadataItem}>
                <Text style={styles.metadataLabel}>ID del Caso</Text>
                <Text style={styles.metadataValue}>{caseId}</Text>
              </View>
              <View style={styles.metadataItem}>
                <Text style={styles.metadataLabel}>Fecha de Generación</Text>
                <Text style={styles.metadataValue}>{formattedDate}</Text>
              </View>
              <View style={styles.metadataItem}>
                <Text style={styles.metadataLabel}>Hora</Text>
                <Text style={styles.metadataValue}>{formattedTime}</Text>
              </View>
              <View style={styles.metadataItem}>
                <Text style={styles.metadataLabel}>Estado</Text>
                <Text style={styles.metadataValue}>Análisis Completado</Text>
              </View>
            </View>
          </View>

          {/* Estadísticas de análisis */}
          {analyses && analyses.length > 0 && (
            <View style={styles.analysisStats}>
              <Text style={styles.statsText}>Evidencias Digitales Analizadas</Text>
              <Text style={styles.statsNumber}>{analyses.length}</Text>
            </View>
          )}

          {/* Título del contenido */}
          <Text style={styles.contentTitle}>Informe de Análisis</Text>

          {/* Contenido generado */}
          <View style={{ flex: 1 }}>
            {formatContent(generatedContent)}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Este documento contiene información confidencial generada por sistemas de IA especializados
            en análisis forense digital. Distribución restringida - Solo personal autorizado.
          </Text>
          <Text style={styles.footerLogo}>FORENSIC AI</Text>
        </View>

        {/* Número de página */}
        <Text 
          style={styles.pageNumber} 
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} 
          fixed 
        />
      </Page>
    </Document>
  );
};

// Componente principal que exporta el botón de descarga
const PdfReport = ({ caseData, generatedContent, analyses, caseId }) => {
  // Verificar que hay contenido para generar
  if (!generatedContent || !generatedContent.trim()) {
    return null;
  }

  // Generar nombre del archivo
  const fileName = `reporte_forense_${caseData?.title?.replace(/[^a-zA-Z0-9]/g, '_') || 'caso'}_${caseId}_${new Date().toISOString().split('T')[0]}.pdf`;

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
      style={{ textDecoration: 'none' }}
    >
      {({ blob, url, loading, error }) => {
        console.log('PDF State:', { loading, error, hasBlob: !!blob, hasUrl: !!url });
        
        if (error) {
          console.error('PDF Error:', error);
        }

        return (
          <Button
            leftIcon={<DownloadIcon />}
            colorScheme="purple"
            size="md"
            isLoading={loading}
            disabled={loading || !!error}
            variant="solid"
            _hover={{
              transform: !loading ? 'scale(1.05)' : 'none',
              boxShadow: 'lg',
            }}
            _active={{
              transform: 'scale(0.98)',
            }}
            transition="all 0.2s"
            px={6}
            py={3}
            fontWeight="semibold"
            onClick={() => {
              if (error) {
                console.error('Error al generar PDF:', error);
              }
            }}
          >
            {loading ? 'Generando PDF...' : error ? 'Error en PDF' : 'Exportar PDF'}
          </Button>
        );
      }}
    </PDFDownloadLink>
  );
};

export default PdfReport;