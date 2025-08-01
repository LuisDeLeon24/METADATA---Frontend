import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font, Image } from '@react-pdf/renderer';
import { Button, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

// Motion components
const MotionButton = motion(Button);

// Registrar fuentes mejoradas
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZs.ttf',
      fontWeight: 300,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZs.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZs.ttf',
      fontWeight: 600,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZs.ttf',
      fontWeight: 700,
    },
  ],
});

// Estilos sofisticados para el PDF con tema negro y morado
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 0,
    fontFamily: 'Inter',
    position: 'relative',
  },
  // Header con gradiente visual
  headerContainer: {
    backgroundColor: '#1A202C',
    padding: 40,
    paddingBottom: 30,
    position: 'relative',
  },
  purpleAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#7C3AED',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#A78BFA',
    fontWeight: 400,
    marginBottom: 20,
  },
  confidentialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  confidentialBadge: {
    backgroundColor: '#DC2626',
    color: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  classificationLevel: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: 600,
  },
  // Información del caso con diseño moderno
  caseInfoContainer: {
    backgroundColor: '#F8FAFC',
    margin: 40,
    marginBottom: 0,
    padding: 30,
    borderRadius: 12,
    borderLeft: 6,
    borderLeftColor: '#7C3AED',
    position: 'relative',
  },
  caseInfoPattern: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    opacity: 0.05,
    backgroundColor: '#7C3AED',
  },
  caseTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: '#1A202C',
    marginBottom: 12,
    lineHeight: 1.3,
  },
  caseMetadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 15,
  },
  metadataItem: {
    flexDirection: 'column',
  },
  metadataLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metadataValue: {
    fontSize: 13,
    color: '#1E293B',
    fontWeight: 500,
  },
  // Sección de análisis con diseño elegante
  analysisSection: {
    margin: 40,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1A202C',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: 2,
    borderBottomColor: '#E5E7EB',
  },
  analysisStats: {
    backgroundColor: '#7C3AED',
    color: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 14,
    fontWeight: 600,
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: 700,
  },
  // Contenido principal con tipografía mejorada
  contentContainer: {
    margin: 40,
    marginTop: 0,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1A202C',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 1.8,
    color: '#374151',
    textAlign: 'justify',
    marginBottom: 16,
    fontWeight: 400,
  },
  // Secciones con encabezados estilizados
  sectionHeader: {
    fontSize: 14,
    fontWeight: 700,
    color: '#7C3AED',
    marginTop: 25,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Footer sofisticado
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F1F5F9',
    padding: 25,
    borderTop: 1,
    borderTopColor: '#CBD5E1',
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 9,
    color: '#64748B',
    maxWidth: '60%',
    lineHeight: 1.4,
  },
  footerLogo: {
    fontSize: 11,
    fontWeight: 700,
    color: '#7C3AED',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 8,
    right: 25,
    color: '#94A3B8',
    fontWeight: 500,
  },
  // Elementos decorativos
  decorativeElement: {
    position: 'absolute',
    top: 25,
    right: 25,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7C3AED',
    opacity: 0.1,
  },
});

// Componente del documento PDF mejorado
const ReportDocument = ({ caseData, generatedContent, analyses, caseId }) => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Función mejorada para formatear contenido
  const formatContent = (content) => {
    if (!content) return [];

    // Detectar secciones principales
    const sections = content.split(/(?=\*\*[A-ZÁÉÍÓÚ][^*]+\*\*)/g).filter(s => s.trim());

    return sections.map((section, index) => {
      const lines = section.split('\n').filter(line => line.trim());

      return lines.map((line, lineIndex) => {
        const key = `${index}-${lineIndex}`;

        // Detectar encabezados (texto entre **)
        if (line.includes('**')) {
          const headerText = line.replace(/\*\*/g, '').trim();
          return (
            <Text key={key} style={styles.sectionHeader}>
              {headerText}
            </Text>
          );
        }

        // Párrafos normales
        if (line.trim()) {
          return (
            <Text key={key} style={styles.paragraph}>
              {line.trim()}
            </Text>
          );
        }

        return null;
      }).filter(Boolean);
    }).flat();
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Elemento decorativo */}
        <View style={styles.decorativeElement} />

        {/* Header sofisticado */}
        <View style={styles.headerContainer}>
          <View style={styles.purpleAccent} />
          <Text style={styles.headerTitle}>REPORTE FORENSE DIGITAL</Text>
          <Text style={styles.headerSubtitle}>Unidad de Inteligencia Digital - Análisis Avanzado</Text>

          <View style={styles.confidentialContainer}>
            <View style={styles.confidentialBadge}>
              <Text>● CONFIDENCIAL</Text>
            </View>
            <Text style={styles.classificationLevel}>NIVEL DE CLASIFICACIÓN: ALTO</Text>
          </View>
        </View>

        {/* Información del caso */}
        <View style={styles.caseInfoContainer}>
          <View style={styles.caseInfoPattern} />
          <Text style={styles.caseTitle}>
            {caseData?.title || 'Caso de Investigación Digital'}
          </Text>

          <View style={styles.caseMetadata}>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>ID del Caso</Text>
              <Text style={styles.metadataValue}>{caseId}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Fecha de Generación</Text>
              <Text style={styles.metadataValue}>{currentDate}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Hora</Text>
              <Text style={styles.metadataValue}>{currentTime}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Estado</Text>
              <Text style={styles.metadataValue}>Análisis Completado</Text>
            </View>
          </View>
        </View>

        {/* Estadísticas de análisis */}
        {analyses && analyses.length > 0 && (
          <View style={styles.analysisSection}>
            <View style={styles.analysisStats}>
              <Text style={styles.statsText}>Evidencias Digitales Analizadas</Text>
              <Text style={styles.statsNumber}>{analyses.length}</Text>
            </View>
          </View>
        )}

        {/* Contenido principal */}
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>Informe de Análisis</Text>
          {formatContent(generatedContent)}
        </View>

        {/* Footer profesional */}
        <View style={styles.footerContainer}>
          <View style={styles.footerContent}>
            <Text style={styles.footerText}>
              Este documento contiene información confidencial generada por sistemas de IA especializados
              en análisis forense digital. Distribución restringida - Solo personal autorizado.
            </Text>
            <Text style={styles.footerLogo}>FORENSIC AI</Text>
          </View>
        </View>

        {/* Número de página */}
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Página ${pageNumber} de ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );
};

// Componente principal mejorado con animaciones
const PdfReport = ({ caseData, generatedContent, analyses, caseId }) => {
  // Colores del tema
  const buttonBg = useColorModeValue('purple.600', 'purple.500');
  const buttonHoverBg = useColorModeValue('purple.700', 'purple.600');
  const buttonColor = useColorModeValue('white', 'white');

  // Generar nombre del archivo más descriptivo
  const fileName = `reporte_forense_${caseData?.title?.replace(/[^a-zA-Z0-9]/g, '_') || 'caso'}_${caseId}_${new Date().toISOString().split('T')[0]}.pdf`;

  // Verificar que hay contenido para generar
  if (!generatedContent || !generatedContent.trim()) {
    return null;
  }

  // Variantes de animación
  const buttonVariants = {
    initial: { scale: 1, boxShadow: "0 4px 6px -1px rgba(139, 92, 246, 0.1)" },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(139, 92, 246, 0.2), 0 4px 6px -2px rgba(139, 92, 246, 0.1)",
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    },
    loading: {
      scale: 1,
      opacity: 0.8,
      transition: { duration: 0.2 }
    }
  };

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
        <Tooltip
          label={
            loading
              ? "Generando documento PDF..."
              : error
                ? "Error al generar PDF"
                : "Descargar reporte en formato PDF"
          }
          hasArrow
          placement="top"
          bg="purple.600"
          color="white"
        >
          <MotionButton
            leftIcon={<DownloadIcon />}
            bg={buttonBg}
            color={buttonColor}
            size="md"
            isLoading={loading}
            disabled={loading || error}
            loadingText="Generando..."
            _hover={{ bg: buttonHoverBg }}
            _active={{ bg: buttonHoverBg }}
            _focus={{
              boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.3)",
              bg: buttonHoverBg
            }}
            borderRadius="lg"
            fontWeight="semibold"
            px={6}
            py={3}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate={loading ? "loading" : "initial"}
            // Gradiente sutil en el borde
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
              transform: loading ? 'translateX(-100%)' : 'translateX(200%)',
              transition: 'transform 0.6s ease-in-out',
              zIndex: 1
            }}
          >
            {loading ? (
              'Procesando...'
            ) : error ? (
              'Error PDF'
            ) : (
              'Exportar PDF'
            )}
          </MotionButton>
        </Tooltip>
      )}
    </PDFDownloadLink>
  );
};

export default PdfReport;