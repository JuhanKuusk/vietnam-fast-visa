/**
 * Google Ads Templates
 *
 * Multi-language ad templates for responsive search ads.
 * Each service type has headlines and descriptions in all supported languages.
 *
 * Placeholders:
 * - {AIRPORT} - Airport code (e.g., JFK, LAX)
 * - {CITY} - City name (e.g., New York, London)
 * - {PRICE} - Service price (e.g., $149)
 * - {TIME} - Processing time (e.g., 1 hour, 2 days)
 *
 * Google Ads Limits:
 * - Headlines: 15 max, each 30 chars max
 * - Descriptions: 4 max, each 90 chars max
 */

import { ServiceType } from '@/lib/business-rules/service-availability';
import { SupportedLanguage } from '@/lib/translations';

export interface AdTemplate {
  headlines: string[];     // Max 15, each max 30 chars
  descriptions: string[];  // Max 4, each max 90 chars
  finalUrl: string;
  keywords: string[];      // Keywords for the ad group
}

// Base URL for all ads
const BASE_URL = 'https://vietnamvisahelp.com';

// Ad templates organized by language and service type
export const AD_TEMPLATES: Record<
  SupportedLanguage,
  Record<ServiceType, AdTemplate>
> = {
  // English Templates
  EN: {
    URGENT_1H: {
      headlines: [
        'Vietnam Visa in 1 Hour',
        'Urgent Visa - Get It Now',
        'Airport Emergency Visa',
        '{AIRPORT} Vietnam Visa',
        'Approval in 60 Minutes',
        'Emergency Visa Service',
        'Stuck at Airport? Help!',
        'Fast Vietnam Visa Today',
        'Visa Approved in 1 Hour',
        'Last Minute Vietnam Visa',
      ],
      descriptions: [
        'Stuck at {AIRPORT}? Get your Vietnam visa approved in just 1 hour. Manual processing by local experts.',
        'Emergency visa service available now. Vietnam office is OPEN. Apply online, board your flight.',
        'Need a Vietnam visa urgently? Our team processes applications in 60 minutes. Guaranteed approval.',
        'Fastest Vietnam visa service. From {PRICE}. Apply now and fly today.',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-1h`,
      keywords: [
        'urgent vietnam visa',
        'vietnam visa 1 hour',
        'emergency vietnam visa',
        'fast vietnam visa',
        'same day vietnam visa',
      ],
    },
    URGENT_2H: {
      headlines: [
        'Vietnam Visa in 2 Hours',
        'Quick Visa Processing',
        '2-Hour Visa Approval',
        '{AIRPORT} Fast Visa',
        'Express Vietnam Visa',
        'Rapid Visa Service',
        'Vietnam Visa Express',
        'Fast Track Visa',
        'Priority Processing',
        'Quick Vietnam Visa',
      ],
      descriptions: [
        'Vietnam visa approved in 2 hours. Perfect for tight schedules. Apply online now.',
        'Express visa processing for Vietnam. From {PRICE}. Fast, reliable, guaranteed.',
        'Need your visa quickly? 2-hour processing available. Vietnam office open now.',
        'Priority visa service from {AIRPORT}. Get approved in just 2 hours.',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-2h`,
      keywords: [
        'quick vietnam visa',
        '2 hour vietnam visa',
        'express vietnam visa',
        'fast visa vietnam',
      ],
    },
    URGENT_4H: {
      headlines: [
        'Vietnam Visa in 4 Hours',
        'Same Day Visa Service',
        '4-Hour Visa Approval',
        'Express Visa Today',
        'Quick Vietnam Visa',
        '{AIRPORT} Express Visa',
        'Visa Before You Fly',
        'Fast Visa Processing',
        'Same Day Processing',
        'Vietnam Visa Today',
      ],
      descriptions: [
        'Vietnam visa in 4 hours. Apply now and receive your approval same day.',
        'Same day visa service for Vietnam. Professional processing from {PRICE}.',
        'Flying to Vietnam today? Get your visa approved in 4 hours. Apply online.',
        'Fast visa processing. 4-hour turnaround. Trusted by thousands of travelers.',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-4h`,
      keywords: [
        'same day vietnam visa',
        '4 hour vietnam visa',
        'vietnam visa today',
        'express visa service',
      ],
    },
    '1DAY': {
      headlines: [
        '1-Day Vietnam Visa',
        'Next Day Visa Service',
        'Vietnam Visa Tomorrow',
        'Fast Visa Processing',
        '24-Hour Visa Service',
        'Quick Visa Approval',
        'Vietnam E-Visa Fast',
        'Visa in 1 Business Day',
        'Reliable Visa Service',
        'Trusted Visa Agency',
      ],
      descriptions: [
        'Vietnam visa in 1 business day. Professional service, guaranteed approval. From {PRICE}.',
        'Need your visa by tomorrow? Apply today, receive approval in 24 hours.',
        'Fast and reliable Vietnam visa service. 1-day processing, no hassle.',
        'Trusted by travelers worldwide. Vietnam visa in just 1 business day.',
      ],
      finalUrl: `${BASE_URL}/apply?service=1day`,
      keywords: [
        'vietnam visa next day',
        '1 day vietnam visa',
        '24 hour vietnam visa',
        'fast vietnam visa service',
      ],
    },
    '2DAY': {
      headlines: [
        '2-Day Vietnam Visa',
        'Vietnam Visa Service',
        'Quick Visa Processing',
        'Reliable Visa Agency',
        'Vietnam E-Visa Online',
        'Trusted Visa Service',
        'Easy Visa Application',
        'Vietnam Visa Experts',
        'Affordable Visa Help',
        'Vietnam Travel Visa',
      ],
      descriptions: [
        'Vietnam visa in 2 business days. Affordable rates, professional service.',
        'Apply for your Vietnam visa online. 2-day processing, guaranteed approval.',
        'Planning a trip to Vietnam? Get your visa in 2 days. Easy online application.',
        'Reliable Vietnam visa service. Fast processing, competitive rates from {PRICE}.',
      ],
      finalUrl: `${BASE_URL}/apply?service=2day`,
      keywords: [
        'vietnam visa 2 days',
        'vietnam visa online',
        'vietnam e-visa',
        'vietnam travel visa',
      ],
    },
    WEEKEND: {
      headlines: [
        'Weekend Visa Service',
        'Saturday/Sunday Visa',
        'Holiday Visa Help',
        'Weekend Processing',
        'Vietnam Visa Weekend',
        'After Hours Service',
        'Weekend Visa Experts',
        'Holiday Visa Service',
        'Open on Weekends',
        'Vietnam Visa 24/7',
      ],
      descriptions: [
        'Need a Vietnam visa this weekend? Our team works weekends and holidays.',
        'Weekend visa service available. Premium processing when offices are closed.',
        'Stuck on a Saturday? We process Vietnam visas on weekends. Apply now.',
        'Holiday visa emergency? Our weekend team is ready to help. From {PRICE}.',
      ],
      finalUrl: `${BASE_URL}/apply?service=weekend`,
      keywords: [
        'vietnam visa weekend',
        'saturday vietnam visa',
        'sunday vietnam visa',
        'holiday vietnam visa',
      ],
    },
    STANDARD: {
      headlines: [
        'Vietnam Visa Online',
        'Easy Visa Application',
        'Vietnam E-Visa Service',
        'Affordable Vietnam Visa',
        'Apply for Vietnam Visa',
        'Vietnam Travel Visa',
        'Online Visa Service',
        'Vietnam Visa Help',
        'Cheap Vietnam Visa',
        'Best Visa Service',
      ],
      descriptions: [
        'Vietnam visa made easy. Apply online in minutes. From just {PRICE}.',
        'Planning a trip to Vietnam? Get your visa online. Fast, easy, affordable.',
        'Professional Vietnam visa service. Thousands of happy travelers. Apply today.',
        'The easiest way to get your Vietnam visa. Online application, fast approval.',
      ],
      finalUrl: `${BASE_URL}/apply`,
      keywords: [
        'vietnam visa',
        'vietnam e-visa',
        'vietnam visa online',
        'apply vietnam visa',
        'vietnam tourist visa',
      ],
    },
  },

  // Spanish Templates
  ES: {
    URGENT_1H: {
      headlines: [
        'Visa Vietnam en 1 Hora',
        'Visa Urgente - Ya!',
        'Visa Emergencia Aeropuerto',
        '{AIRPORT} Visa Vietnam',
        'Aprobado en 60 Minutos',
        'Servicio Visa Urgente',
        'Ayuda Visa Rapida',
        'Visa Vietnam Hoy',
        'Visa Express Vietnam',
        'Visa Ultimo Minuto',
      ],
      descriptions: [
        'Atrapado en {AIRPORT}? Visa Vietnam aprobada en 1 hora. Procesamiento manual.',
        'Servicio de visa de emergencia disponible. Solicite en linea, vuele hoy.',
        'Necesita visa urgente? Procesamos en 60 minutos. Aprobacion garantizada.',
        'Servicio de visa mas rapido. Desde {PRICE}. Solicite ahora.',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-1h&lang=es`,
      keywords: [
        'visa vietnam urgente',
        'visa vietnam 1 hora',
        'visa emergencia vietnam',
        'visa rapida vietnam',
      ],
    },
    URGENT_2H: {
      headlines: [
        'Visa Vietnam en 2 Horas',
        'Procesamiento Rapido',
        'Aprobacion en 2 Horas',
        '{AIRPORT} Visa Rapida',
        'Visa Express Vietnam',
        'Servicio Visa Rapido',
        'Vietnam Visa Express',
        'Via Rapida Visa',
        'Prioridad Vietnam',
        'Visa Rapida Vietnam',
      ],
      descriptions: [
        'Visa Vietnam aprobada en 2 horas. Perfecto para horarios ajustados.',
        'Procesamiento express para Vietnam. Desde {PRICE}. Rapido y garantizado.',
        'Necesita su visa rapido? Procesamiento en 2 horas disponible ahora.',
        'Servicio prioritario desde {AIRPORT}. Aprobado en solo 2 horas.',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-2h&lang=es`,
      keywords: [
        'visa vietnam rapida',
        'visa vietnam 2 horas',
        'visa express vietnam',
      ],
    },
    URGENT_4H: {
      headlines: [
        'Visa Vietnam en 4 Horas',
        'Visa Mismo Dia',
        'Aprobacion en 4 Horas',
        'Visa Express Hoy',
        'Visa Rapida Vietnam',
        '{AIRPORT} Visa Express',
        'Visa Antes de Volar',
        'Procesamiento Rapido',
        'Mismo Dia Vietnam',
        'Visa Vietnam Hoy',
      ],
      descriptions: [
        'Visa Vietnam en 4 horas. Solicite ahora y reciba aprobacion hoy mismo.',
        'Servicio de visa mismo dia para Vietnam. Procesamiento profesional.',
        'Volando a Vietnam hoy? Visa aprobada en 4 horas. Solicite en linea.',
        'Procesamiento rapido. 4 horas. Confiado por miles de viajeros.',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-4h&lang=es`,
      keywords: [
        'visa vietnam mismo dia',
        'visa vietnam 4 horas',
        'visa vietnam hoy',
      ],
    },
    '1DAY': {
      headlines: [
        'Visa Vietnam 1 Dia',
        'Visa Dia Siguiente',
        'Visa Vietnam Manana',
        'Procesamiento Rapido',
        'Servicio 24 Horas',
        'Aprobacion Rapida',
        'E-Visa Vietnam',
        'Visa 1 Dia Habil',
        'Servicio Confiable',
        'Agencia de Confianza',
      ],
      descriptions: [
        'Visa Vietnam en 1 dia habil. Servicio profesional, aprobacion garantizada.',
        'Necesita visa manana? Solicite hoy, reciba aprobacion en 24 horas.',
        'Servicio de visa rapido y confiable. Procesamiento en 1 dia.',
        'Confiado por viajeros. Visa Vietnam en solo 1 dia habil.',
      ],
      finalUrl: `${BASE_URL}/apply?service=1day&lang=es`,
      keywords: [
        'visa vietnam 1 dia',
        'visa vietnam 24 horas',
        'visa vietnam rapida',
      ],
    },
    '2DAY': {
      headlines: [
        'Visa Vietnam 2 Dias',
        'Servicio Visa Vietnam',
        'Procesamiento Rapido',
        'Agencia Confiable',
        'E-Visa Vietnam',
        'Servicio Confiable',
        'Solicitud Facil',
        'Expertos en Visa',
        'Visa Asequible',
        'Visa Turista Vietnam',
      ],
      descriptions: [
        'Visa Vietnam en 2 dias habiles. Precios asequibles, servicio profesional.',
        'Solicite su visa Vietnam en linea. Procesamiento en 2 dias garantizado.',
        'Planificando viaje a Vietnam? Visa en 2 dias. Solicitud facil en linea.',
        'Servicio confiable. Procesamiento rapido, precios competitivos.',
      ],
      finalUrl: `${BASE_URL}/apply?service=2day&lang=es`,
      keywords: [
        'visa vietnam 2 dias',
        'visa vietnam en linea',
        'e-visa vietnam',
      ],
    },
    WEEKEND: {
      headlines: [
        'Visa Fin de Semana',
        'Sabado/Domingo Visa',
        'Ayuda Visa Festivo',
        'Procesamiento Finde',
        'Visa Vietnam Finde',
        'Servicio Fuera Horario',
        'Expertos Fin Semana',
        'Servicio Visa Festivo',
        'Abierto Fin Semana',
        'Visa Vietnam 24/7',
      ],
      descriptions: [
        'Necesita visa Vietnam este fin de semana? Trabajamos sabados y domingos.',
        'Servicio de visa fin de semana. Procesamiento premium cuando oficinas cerradas.',
        'Atrapado un sabado? Procesamos visas Vietnam los fines de semana.',
        'Emergencia visa festivo? Nuestro equipo esta listo. Desde {PRICE}.',
      ],
      finalUrl: `${BASE_URL}/apply?service=weekend&lang=es`,
      keywords: [
        'visa vietnam fin semana',
        'visa vietnam sabado',
        'visa vietnam domingo',
      ],
    },
    STANDARD: {
      headlines: [
        'Visa Vietnam Online',
        'Solicitud Facil Visa',
        'Servicio E-Visa',
        'Visa Vietnam Barata',
        'Solicitar Visa Vietnam',
        'Visa Turista Vietnam',
        'Servicio Visa Online',
        'Ayuda Visa Vietnam',
        'Visa Vietnam Economica',
        'Mejor Servicio Visa',
      ],
      descriptions: [
        'Visa Vietnam facil. Solicite en linea en minutos. Desde solo {PRICE}.',
        'Planificando viaje a Vietnam? Visa en linea. Rapido, facil, asequible.',
        'Servicio profesional de visa Vietnam. Miles de viajeros felices.',
        'La forma mas facil de obtener visa Vietnam. Solicitud en linea rapida.',
      ],
      finalUrl: `${BASE_URL}/apply?lang=es`,
      keywords: [
        'visa vietnam',
        'e-visa vietnam',
        'visa vietnam online',
        'solicitar visa vietnam',
      ],
    },
  },

  // Portuguese Templates
  PT: {
    URGENT_1H: {
      headlines: [
        'Visto Vietna em 1 Hora',
        'Visto Urgente - Agora!',
        'Emergencia Aeroporto',
        '{AIRPORT} Visto Vietna',
        'Aprovado em 60 Minutos',
        'Servico Visto Urgente',
        'Ajuda Visto Rapido',
        'Visto Vietna Hoje',
        'Visto Express Vietna',
        'Visto Ultima Hora',
      ],
      descriptions: [
        'Preso no {AIRPORT}? Visto Vietna aprovado em 1 hora. Processamento manual.',
        'Servico de visto emergencia disponivel. Solicite online, voe hoje.',
        'Precisa visto urgente? Processamos em 60 minutos. Aprovacao garantida.',
        'Servico de visto mais rapido. A partir de {PRICE}. Solicite agora.',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-1h&lang=pt`,
      keywords: [
        'visto vietna urgente',
        'visto vietna 1 hora',
        'visto emergencia vietna',
      ],
    },
    URGENT_2H: {
      headlines: [
        'Visto Vietna em 2 Horas',
        'Processamento Rapido',
        'Aprovacao em 2 Horas',
        '{AIRPORT} Visto Rapido',
        'Visto Express Vietna',
        'Servico Visto Rapido',
        'Vietna Visto Express',
        'Via Rapida Visto',
        'Prioridade Vietna',
        'Visto Rapido Vietna',
      ],
      descriptions: [
        'Visto Vietna aprovado em 2 horas. Perfeito para horarios apertados.',
        'Processamento express para Vietna. A partir de {PRICE}. Rapido e garantido.',
        'Precisa do visto rapido? Processamento em 2 horas disponivel agora.',
        'Servico prioritario de {AIRPORT}. Aprovado em apenas 2 horas.',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-2h&lang=pt`,
      keywords: [
        'visto vietna rapido',
        'visto vietna 2 horas',
        'visto express vietna',
      ],
    },
    URGENT_4H: {
      headlines: [
        'Visto Vietna em 4 Horas',
        'Visto Mesmo Dia',
        'Aprovacao em 4 Horas',
        'Visto Express Hoje',
        'Visto Rapido Vietna',
        '{AIRPORT} Visto Express',
        'Visto Antes de Voar',
        'Processamento Rapido',
        'Mesmo Dia Vietna',
        'Visto Vietna Hoje',
      ],
      descriptions: [
        'Visto Vietna em 4 horas. Solicite agora e receba aprovacao hoje.',
        'Servico de visto mesmo dia para Vietna. Processamento profissional.',
        'Voando para Vietna hoje? Visto aprovado em 4 horas. Solicite online.',
        'Processamento rapido. 4 horas. Confiado por milhares de viajantes.',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-4h&lang=pt`,
      keywords: [
        'visto vietna mesmo dia',
        'visto vietna 4 horas',
        'visto vietna hoje',
      ],
    },
    '1DAY': {
      headlines: [
        'Visto Vietna 1 Dia',
        'Visto Proximo Dia',
        'Visto Vietna Amanha',
        'Processamento Rapido',
        'Servico 24 Horas',
        'Aprovacao Rapida',
        'E-Visto Vietna',
        'Visto 1 Dia Util',
        'Servico Confiavel',
        'Agencia Confiavel',
      ],
      descriptions: [
        'Visto Vietna em 1 dia util. Servico profissional, aprovacao garantida.',
        'Precisa visto amanha? Solicite hoje, receba aprovacao em 24 horas.',
        'Servico de visto rapido e confiavel. Processamento em 1 dia.',
        'Confiado por viajantes. Visto Vietna em apenas 1 dia util.',
      ],
      finalUrl: `${BASE_URL}/apply?service=1day&lang=pt`,
      keywords: [
        'visto vietna 1 dia',
        'visto vietna 24 horas',
        'visto vietna rapido',
      ],
    },
    '2DAY': {
      headlines: [
        'Visto Vietna 2 Dias',
        'Servico Visto Vietna',
        'Processamento Rapido',
        'Agencia Confiavel',
        'E-Visto Vietna',
        'Servico Confiavel',
        'Solicitacao Facil',
        'Especialistas Visto',
        'Visto Acessivel',
        'Visto Turista Vietna',
      ],
      descriptions: [
        'Visto Vietna em 2 dias uteis. Precos acessiveis, servico profissional.',
        'Solicite seu visto Vietna online. Processamento em 2 dias garantido.',
        'Planejando viagem ao Vietna? Visto em 2 dias. Solicitacao facil.',
        'Servico confiavel. Processamento rapido, precos competitivos.',
      ],
      finalUrl: `${BASE_URL}/apply?service=2day&lang=pt`,
      keywords: [
        'visto vietna 2 dias',
        'visto vietna online',
        'e-visto vietna',
      ],
    },
    WEEKEND: {
      headlines: [
        'Visto Fim de Semana',
        'Sabado/Domingo Visto',
        'Ajuda Visto Feriado',
        'Processamento Finde',
        'Visto Vietna Finde',
        'Servico Fora Horario',
        'Especialistas Finde',
        'Servico Visto Feriado',
        'Aberto Fim Semana',
        'Visto Vietna 24/7',
      ],
      descriptions: [
        'Precisa visto Vietna este fim de semana? Trabalhamos sabados e domingos.',
        'Servico de visto fim de semana. Processamento premium quando fechado.',
        'Preso num sabado? Processamos vistos Vietna nos fins de semana.',
        'Emergencia visto feriado? Nossa equipe esta pronta. A partir de {PRICE}.',
      ],
      finalUrl: `${BASE_URL}/apply?service=weekend&lang=pt`,
      keywords: [
        'visto vietna fim semana',
        'visto vietna sabado',
        'visto vietna domingo',
      ],
    },
    STANDARD: {
      headlines: [
        'Visto Vietna Online',
        'Solicitacao Facil',
        'Servico E-Visto',
        'Visto Vietna Barato',
        'Solicitar Visto Vietna',
        'Visto Turista Vietna',
        'Servico Visto Online',
        'Ajuda Visto Vietna',
        'Visto Vietna Economico',
        'Melhor Servico Visto',
      ],
      descriptions: [
        'Visto Vietna facil. Solicite online em minutos. A partir de {PRICE}.',
        'Planejando viagem ao Vietna? Visto online. Rapido, facil, acessivel.',
        'Servico profissional de visto Vietna. Milhares de viajantes felizes.',
        'A forma mais facil de obter visto Vietna. Solicitacao online rapida.',
      ],
      finalUrl: `${BASE_URL}/apply?lang=pt`,
      keywords: [
        'visto vietna',
        'e-visto vietna',
        'visto vietna online',
        'solicitar visto vietna',
      ],
    },
  },

  // French Templates
  FR: {
    URGENT_1H: {
      headlines: [
        'Visa Vietnam en 1 Heure',
        'Visa Urgent - Maintenant!',
        'Urgence Aeroport Visa',
        '{AIRPORT} Visa Vietnam',
        'Approuve en 60 Minutes',
        'Service Visa Urgent',
        'Aide Visa Rapide',
        'Visa Vietnam Aujourdhui',
        'Visa Express Vietnam',
        'Visa Derniere Minute',
      ],
      descriptions: [
        'Bloque a {AIRPORT}? Visa Vietnam approuve en 1 heure. Traitement manuel.',
        'Service visa urgence disponible. Demandez en ligne, embarquez aujourdhui.',
        'Besoin visa urgent? Traitement en 60 minutes. Approbation garantie.',
        'Service visa le plus rapide. A partir de {PRICE}. Demandez maintenant.',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-1h&lang=fr`,
      keywords: [
        'visa vietnam urgent',
        'visa vietnam 1 heure',
        'visa urgence vietnam',
      ],
    },
    URGENT_2H: {
      headlines: [
        'Visa Vietnam en 2 Heures',
        'Traitement Rapide',
        'Approbation 2 Heures',
        '{AIRPORT} Visa Rapide',
        'Visa Express Vietnam',
        'Service Visa Rapide',
        'Vietnam Visa Express',
        'Voie Rapide Visa',
        'Priorite Vietnam',
        'Visa Rapide Vietnam',
      ],
      descriptions: [
        'Visa Vietnam approuve en 2 heures. Parfait pour emplois du temps serres.',
        'Traitement express pour Vietnam. A partir de {PRICE}. Rapide et garanti.',
        'Besoin visa rapidement? Traitement 2 heures disponible maintenant.',
        'Service prioritaire de {AIRPORT}. Approuve en seulement 2 heures.',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-2h&lang=fr`,
      keywords: [
        'visa vietnam rapide',
        'visa vietnam 2 heures',
        'visa express vietnam',
      ],
    },
    URGENT_4H: {
      headlines: [
        'Visa Vietnam en 4 Heures',
        'Visa Meme Jour',
        'Approbation 4 Heures',
        'Visa Express Aujourdhui',
        'Visa Rapide Vietnam',
        '{AIRPORT} Visa Express',
        'Visa Avant Vol',
        'Traitement Rapide',
        'Meme Jour Vietnam',
        'Visa Vietnam Aujourdhui',
      ],
      descriptions: [
        'Visa Vietnam en 4 heures. Demandez maintenant, approbation aujourdhui.',
        'Service visa meme jour pour Vietnam. Traitement professionnel.',
        'Vol vers Vietnam aujourdhui? Visa approuve en 4 heures. Demande en ligne.',
        'Traitement rapide. 4 heures. Fait confiance par des milliers.',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-4h&lang=fr`,
      keywords: [
        'visa vietnam meme jour',
        'visa vietnam 4 heures',
        'visa vietnam aujourdhui',
      ],
    },
    '1DAY': {
      headlines: [
        'Visa Vietnam 1 Jour',
        'Visa Jour Suivant',
        'Visa Vietnam Demain',
        'Traitement Rapide',
        'Service 24 Heures',
        'Approbation Rapide',
        'E-Visa Vietnam',
        'Visa 1 Jour Ouvre',
        'Service Fiable',
        'Agence de Confiance',
      ],
      descriptions: [
        'Visa Vietnam en 1 jour ouvre. Service professionnel, approbation garantie.',
        'Besoin visa demain? Demandez aujourdhui, approbation en 24 heures.',
        'Service visa rapide et fiable. Traitement en 1 jour.',
        'Confiance des voyageurs. Visa Vietnam en seulement 1 jour ouvre.',
      ],
      finalUrl: `${BASE_URL}/apply?service=1day&lang=fr`,
      keywords: [
        'visa vietnam 1 jour',
        'visa vietnam 24 heures',
        'visa vietnam rapide',
      ],
    },
    '2DAY': {
      headlines: [
        'Visa Vietnam 2 Jours',
        'Service Visa Vietnam',
        'Traitement Rapide',
        'Agence Fiable',
        'E-Visa Vietnam',
        'Service Fiable',
        'Demande Facile',
        'Experts Visa',
        'Visa Abordable',
        'Visa Touriste Vietnam',
      ],
      descriptions: [
        'Visa Vietnam en 2 jours ouvrables. Prix abordables, service professionnel.',
        'Demandez votre visa Vietnam en ligne. Traitement 2 jours garanti.',
        'Voyage au Vietnam? Visa en 2 jours. Demande facile en ligne.',
        'Service fiable. Traitement rapide, prix competitifs.',
      ],
      finalUrl: `${BASE_URL}/apply?service=2day&lang=fr`,
      keywords: [
        'visa vietnam 2 jours',
        'visa vietnam en ligne',
        'e-visa vietnam',
      ],
    },
    WEEKEND: {
      headlines: [
        'Visa Week-end',
        'Samedi/Dimanche Visa',
        'Aide Visa Ferie',
        'Traitement Week-end',
        'Visa Vietnam Week-end',
        'Service Hors Horaires',
        'Experts Week-end',
        'Service Visa Ferie',
        'Ouvert Week-end',
        'Visa Vietnam 24/7',
      ],
      descriptions: [
        'Besoin visa Vietnam ce week-end? On travaille samedis et dimanches.',
        'Service visa week-end. Traitement premium quand bureaux fermes.',
        'Bloque un samedi? On traite visas Vietnam les week-ends.',
        'Urgence visa ferie? Notre equipe est prete. A partir de {PRICE}.',
      ],
      finalUrl: `${BASE_URL}/apply?service=weekend&lang=fr`,
      keywords: [
        'visa vietnam week-end',
        'visa vietnam samedi',
        'visa vietnam dimanche',
      ],
    },
    STANDARD: {
      headlines: [
        'Visa Vietnam en Ligne',
        'Demande Facile Visa',
        'Service E-Visa',
        'Visa Vietnam Pas Cher',
        'Demander Visa Vietnam',
        'Visa Touriste Vietnam',
        'Service Visa en Ligne',
        'Aide Visa Vietnam',
        'Visa Vietnam Economique',
        'Meilleur Service Visa',
      ],
      descriptions: [
        'Visa Vietnam facile. Demandez en ligne en minutes. A partir de {PRICE}.',
        'Voyage au Vietnam? Visa en ligne. Rapide, facile, abordable.',
        'Service professionnel visa Vietnam. Des milliers de voyageurs satisfaits.',
        'Facon la plus facile dobtenir visa Vietnam. Demande en ligne rapide.',
      ],
      finalUrl: `${BASE_URL}/apply?lang=fr`,
      keywords: [
        'visa vietnam',
        'e-visa vietnam',
        'visa vietnam en ligne',
        'demander visa vietnam',
      ],
    },
  },

  // Russian Templates
  RU: {
    URGENT_1H: {
      headlines: [
        'Виза Вьетнам за 1 Час',
        'Срочная Виза - Сейчас!',
        'Экстренная Виза',
        '{AIRPORT} Виза Вьетнам',
        'Одобрение за 60 Минут',
        'Срочная Виза Сервис',
        'Быстрая Виза Помощь',
        'Виза Вьетнам Сегодня',
        'Экспресс Виза Вьетнам',
        'Виза в Последний Момент',
      ],
      descriptions: [
        'Застряли в {AIRPORT}? Виза Вьетнам одобрена за 1 час. Ручная обработка.',
        'Экстренная виза доступна сейчас. Подайте онлайн, летите сегодня.',
        'Нужна срочная виза? Обработка за 60 минут. Одобрение гарантировано.',
        'Самый быстрый сервис виз. От {PRICE}. Подайте заявку сейчас.',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-1h&lang=ru`,
      keywords: [
        'срочная виза вьетнам',
        'виза вьетнам 1 час',
        'экстренная виза вьетнам',
      ],
    },
    URGENT_2H: {
      headlines: [
        'Виза Вьетнам за 2 Часа',
        'Быстрая Обработка',
        'Одобрение за 2 Часа',
        '{AIRPORT} Быстрая Виза',
        'Экспресс Виза Вьетнам',
        'Быстрый Сервис Виз',
        'Вьетнам Виза Экспресс',
        'Быстрый Путь Виза',
        'Приоритет Вьетнам',
        'Быстрая Виза Вьетнам',
      ],
      descriptions: [
        'Виза Вьетнам одобрена за 2 часа. Идеально для плотного графика.',
        'Экспресс обработка для Вьетнама. От {PRICE}. Быстро и гарантировано.',
        'Нужна виза быстро? Обработка за 2 часа доступна сейчас.',
        'Приоритетный сервис из {AIRPORT}. Одобрение всего за 2 часа.',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-2h&lang=ru`,
      keywords: [
        'быстрая виза вьетнам',
        'виза вьетнам 2 часа',
        'экспресс виза вьетнам',
      ],
    },
    URGENT_4H: {
      headlines: [
        'Виза Вьетнам за 4 Часа',
        'Виза в Тот же День',
        'Одобрение за 4 Часа',
        'Экспресс Виза Сегодня',
        'Быстрая Виза Вьетнам',
        '{AIRPORT} Экспресс Виза',
        'Виза до Вылета',
        'Быстрая Обработка',
        'Тот же День Вьетнам',
        'Виза Вьетнам Сегодня',
      ],
      descriptions: [
        'Виза Вьетнам за 4 часа. Подайте сейчас, получите одобрение сегодня.',
        'Сервис виз в тот же день для Вьетнама. Профессиональная обработка.',
        'Летите во Вьетнам сегодня? Виза одобрена за 4 часа. Онлайн заявка.',
        'Быстрая обработка. 4 часа. Доверие тысяч путешественников.',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-4h&lang=ru`,
      keywords: [
        'виза вьетнам тот же день',
        'виза вьетнам 4 часа',
        'виза вьетнам сегодня',
      ],
    },
    '1DAY': {
      headlines: [
        'Виза Вьетнам 1 День',
        'Виза на Следующий День',
        'Виза Вьетнам Завтра',
        'Быстрая Обработка',
        'Сервис 24 Часа',
        'Быстрое Одобрение',
        'Э-Виза Вьетнам',
        'Виза 1 Рабочий День',
        'Надежный Сервис',
        'Проверенное Агентство',
      ],
      descriptions: [
        'Виза Вьетнам за 1 рабочий день. Профессионально, одобрение гарантировано.',
        'Нужна виза завтра? Подайте сегодня, одобрение за 24 часа.',
        'Быстрый и надежный визовый сервис. Обработка за 1 день.',
        'Доверие путешественников. Виза Вьетнам всего за 1 рабочий день.',
      ],
      finalUrl: `${BASE_URL}/apply?service=1day&lang=ru`,
      keywords: [
        'виза вьетнам 1 день',
        'виза вьетнам 24 часа',
        'быстрая виза вьетнам',
      ],
    },
    '2DAY': {
      headlines: [
        'Виза Вьетнам 2 Дня',
        'Сервис Виз Вьетнам',
        'Быстрая Обработка',
        'Надежное Агентство',
        'Э-Виза Вьетнам',
        'Надежный Сервис',
        'Простая Заявка',
        'Эксперты по Визам',
        'Доступная Виза',
        'Туристическая Виза',
      ],
      descriptions: [
        'Виза Вьетнам за 2 рабочих дня. Доступные цены, профессионально.',
        'Подайте на визу Вьетнам онлайн. Обработка за 2 дня гарантирована.',
        'Планируете поездку во Вьетнам? Виза за 2 дня. Простая онлайн заявка.',
        'Надежный сервис. Быстрая обработка, конкурентные цены.',
      ],
      finalUrl: `${BASE_URL}/apply?service=2day&lang=ru`,
      keywords: [
        'виза вьетнам 2 дня',
        'виза вьетнам онлайн',
        'э-виза вьетнам',
      ],
    },
    WEEKEND: {
      headlines: [
        'Виза на Выходных',
        'Суббота/Воскресенье',
        'Помощь в Праздники',
        'Обработка Выходные',
        'Виза Вьетнам Выходные',
        'Сервис Нерабочее Время',
        'Эксперты Выходные',
        'Сервис Виз Праздники',
        'Открыто на Выходных',
        'Виза Вьетнам 24/7',
      ],
      descriptions: [
        'Нужна виза Вьетнам в выходные? Работаем в субботу и воскресенье.',
        'Сервис виз на выходных. Премиум обработка когда офисы закрыты.',
        'Застряли в субботу? Обрабатываем визы Вьетнам по выходным.',
        'Срочная виза в праздник? Наша команда готова. От {PRICE}.',
      ],
      finalUrl: `${BASE_URL}/apply?service=weekend&lang=ru`,
      keywords: [
        'виза вьетнам выходные',
        'виза вьетнам суббота',
        'виза вьетнам воскресенье',
      ],
    },
    STANDARD: {
      headlines: [
        'Виза Вьетнам Онлайн',
        'Простая Заявка Виза',
        'Сервис Э-Виза',
        'Виза Вьетнам Дешево',
        'Подать на Визу Вьетнам',
        'Туристическая Виза',
        'Сервис Виз Онлайн',
        'Помощь Виза Вьетнам',
        'Виза Вьетнам Эконом',
        'Лучший Сервис Виз',
      ],
      descriptions: [
        'Виза Вьетнам просто. Подайте онлайн за минуты. Всего от {PRICE}.',
        'Планируете поездку во Вьетнам? Виза онлайн. Быстро, просто, доступно.',
        'Профессиональный сервис виз Вьетнам. Тысячи довольных путешественников.',
        'Самый простой способ получить визу Вьетнам. Быстрая онлайн заявка.',
      ],
      finalUrl: `${BASE_URL}/apply?lang=ru`,
      keywords: [
        'виза вьетнам',
        'э-виза вьетнам',
        'виза вьетнам онлайн',
        'подать виза вьетнам',
      ],
    },
  },

  // Hindi Templates
  HI: {
    URGENT_1H: {
      headlines: [
        '1 घंटे में वियतनाम वीजा',
        'अर्जेंट वीजा - अभी!',
        'इमरजेंसी एयरपोर्ट वीजा',
        '{AIRPORT} वियतनाम वीजा',
        '60 मिनट में अप्रूवल',
        'अर्जेंट वीजा सेवा',
        'फास्ट वीजा हेल्प',
        'आज वियतनाम वीजा',
        'एक्सप्रेस वीजा वियतनाम',
        'लास्ट मिनट वीजा',
      ],
      descriptions: [
        '{AIRPORT} पर फंसे? वियतनाम वीजा 1 घंटे में। मैनुअल प्रोसेसिंग।',
        'इमरजेंसी वीजा सेवा उपलब्ध। ऑनलाइन अप्लाई करें, आज उड़ें।',
        'अर्जेंट वीजा चाहिए? 60 मिनट में प्रोसेसिंग। गारंटीड अप्रूवल।',
        'सबसे तेज वीजा सेवा। {PRICE} से। अभी अप्लाई करें।',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-1h&lang=hi`,
      keywords: [
        'अर्जेंट वियतनाम वीजा',
        'वियतनाम वीजा 1 घंटा',
        'इमरजेंसी वियतनाम वीजा',
      ],
    },
    URGENT_2H: {
      headlines: [
        '2 घंटे में वियतनाम वीजा',
        'फास्ट प्रोसेसिंग',
        '2 घंटे में अप्रूवल',
        '{AIRPORT} फास्ट वीजा',
        'एक्सप्रेस वियतनाम वीजा',
        'फास्ट वीजा सेवा',
        'वियतनाम वीजा एक्सप्रेस',
        'प्रायोरिटी वीजा',
        'प्रायोरिटी वियतनाम',
        'फास्ट वीजा वियतनाम',
      ],
      descriptions: [
        'वियतनाम वीजा 2 घंटे में अप्रूव। टाइट शेड्यूल के लिए परफेक्ट।',
        'वियतनाम के लिए एक्सप्रेस प्रोसेसिंग। {PRICE} से। फास्ट और गारंटीड।',
        'वीजा जल्दी चाहिए? 2 घंटे की प्रोसेसिंग अभी उपलब्ध।',
        '{AIRPORT} से प्रायोरिटी सेवा। सिर्फ 2 घंटे में अप्रूव।',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-2h&lang=hi`,
      keywords: [
        'फास्ट वियतनाम वीजा',
        'वियतनाम वीजा 2 घंटे',
        'एक्सप्रेस वियतनाम वीजा',
      ],
    },
    URGENT_4H: {
      headlines: [
        '4 घंटे में वियतनाम वीजा',
        'सेम डे वीजा सेवा',
        '4 घंटे में अप्रूवल',
        'एक्सप्रेस वीजा आज',
        'फास्ट वियतनाम वीजा',
        '{AIRPORT} एक्सप्रेस वीजा',
        'उड़ान से पहले वीजा',
        'फास्ट प्रोसेसिंग',
        'सेम डे वियतनाम',
        'आज वियतनाम वीजा',
      ],
      descriptions: [
        'वियतनाम वीजा 4 घंटे में। अभी अप्लाई करें, आज ही अप्रूवल पाएं।',
        'वियतनाम के लिए सेम डे वीजा सेवा। प्रोफेशनल प्रोसेसिंग।',
        'आज वियतनाम जा रहे हैं? 4 घंटे में वीजा अप्रूव। ऑनलाइन अप्लाई।',
        'फास्ट प्रोसेसिंग। 4 घंटे। हजारों यात्रियों का भरोसा।',
      ],
      finalUrl: `${BASE_URL}/apply?service=urgent-4h&lang=hi`,
      keywords: [
        'सेम डे वियतनाम वीजा',
        'वियतनाम वीजा 4 घंटे',
        'आज वियतनाम वीजा',
      ],
    },
    '1DAY': {
      headlines: [
        '1 दिन वियतनाम वीजा',
        'नेक्स्ट डे वीजा सेवा',
        'कल वियतनाम वीजा',
        'फास्ट प्रोसेसिंग',
        '24 घंटे सेवा',
        'फास्ट अप्रूवल',
        'ई-वीजा वियतनाम',
        '1 बिजनेस डे वीजा',
        'भरोसेमंद सेवा',
        'ट्रस्टेड एजेंसी',
      ],
      descriptions: [
        'वियतनाम वीजा 1 बिजनेस डे में। प्रोफेशनल, गारंटीड अप्रूवल।',
        'कल वीजा चाहिए? आज अप्लाई करें, 24 घंटे में अप्रूवल।',
        'फास्ट और भरोसेमंद वीजा सेवा। 1 दिन में प्रोसेसिंग।',
        'यात्रियों का भरोसा। वियतनाम वीजा सिर्फ 1 बिजनेस डे में।',
      ],
      finalUrl: `${BASE_URL}/apply?service=1day&lang=hi`,
      keywords: [
        'वियतनाम वीजा 1 दिन',
        'वियतनाम वीजा 24 घंटे',
        'फास्ट वियतनाम वीजा',
      ],
    },
    '2DAY': {
      headlines: [
        '2 दिन वियतनाम वीजा',
        'वियतनाम वीजा सेवा',
        'फास्ट प्रोसेसिंग',
        'भरोसेमंद एजेंसी',
        'ई-वीजा वियतनाम',
        'भरोसेमंद सेवा',
        'आसान आवेदन',
        'वीजा एक्सपर्ट्स',
        'सस्ता वीजा',
        'टूरिस्ट वीजा वियतनाम',
      ],
      descriptions: [
        'वियतनाम वीजा 2 बिजनेस डे में। सस्ती कीमत, प्रोफेशनल सेवा।',
        'ऑनलाइन वियतनाम वीजा अप्लाई करें। 2 दिन प्रोसेसिंग गारंटीड।',
        'वियतनाम यात्रा की योजना? 2 दिन में वीजा। आसान ऑनलाइन आवेदन।',
        'भरोसेमंद सेवा। फास्ट प्रोसेसिंग, कॉम्पिटिटिव कीमतें।',
      ],
      finalUrl: `${BASE_URL}/apply?service=2day&lang=hi`,
      keywords: [
        'वियतनाम वीजा 2 दिन',
        'वियतनाम वीजा ऑनलाइन',
        'ई-वीजा वियतनाम',
      ],
    },
    WEEKEND: {
      headlines: [
        'वीकेंड वीजा सेवा',
        'शनिवार/रविवार वीजा',
        'छुट्टी में वीजा हेल्प',
        'वीकेंड प्रोसेसिंग',
        'वियतनाम वीजा वीकेंड',
        'ऑफ-आवर्स सेवा',
        'वीकेंड एक्सपर्ट्स',
        'छुट्टी वीजा सेवा',
        'वीकेंड पर खुला',
        'वियतनाम वीजा 24/7',
      ],
      descriptions: [
        'इस वीकेंड वियतनाम वीजा चाहिए? हम शनिवार-रविवार काम करते हैं।',
        'वीकेंड वीजा सेवा। ऑफिस बंद होने पर प्रीमियम प्रोसेसिंग।',
        'शनिवार को फंसे? वीकेंड पर वियतनाम वीजा प्रोसेस करते हैं।',
        'छुट्टी में वीजा इमरजेंसी? हमारी टीम तैयार है। {PRICE} से।',
      ],
      finalUrl: `${BASE_URL}/apply?service=weekend&lang=hi`,
      keywords: [
        'वियतनाम वीजा वीकेंड',
        'वियतनाम वीजा शनिवार',
        'वियतनाम वीजा रविवार',
      ],
    },
    STANDARD: {
      headlines: [
        'वियतनाम वीजा ऑनलाइन',
        'आसान वीजा आवेदन',
        'ई-वीजा सेवा',
        'सस्ता वियतनाम वीजा',
        'वियतनाम वीजा अप्लाई',
        'टूरिस्ट वीजा वियतनाम',
        'ऑनलाइन वीजा सेवा',
        'वियतनाम वीजा हेल्प',
        'बजट वियतनाम वीजा',
        'बेस्ट वीजा सेवा',
      ],
      descriptions: [
        'वियतनाम वीजा आसान। मिनटों में ऑनलाइन अप्लाई करें। सिर्फ {PRICE} से।',
        'वियतनाम यात्रा की योजना? ऑनलाइन वीजा। फास्ट, आसान, सस्ता।',
        'प्रोफेशनल वियतनाम वीजा सेवा। हजारों खुश यात्री। आज अप्लाई करें।',
        'वियतनाम वीजा पाने का सबसे आसान तरीका। फास्ट ऑनलाइन आवेदन।',
      ],
      finalUrl: `${BASE_URL}/apply?lang=hi`,
      keywords: [
        'वियतनाम वीजा',
        'ई-वीजा वियतनाम',
        'वियतनाम वीजा ऑनलाइन',
        'वियतनाम वीजा अप्लाई',
      ],
    },
  },
};

/**
 * Get ad template for a specific language and service
 */
export function getAdTemplate(
  language: SupportedLanguage,
  service: ServiceType
): AdTemplate {
  const languageTemplates = AD_TEMPLATES[language];
  if (!languageTemplates) {
    // Fall back to English
    return AD_TEMPLATES.EN[service];
  }

  return languageTemplates[service] || AD_TEMPLATES.EN[service];
}

/**
 * Replace placeholders in ad copy
 */
export function replacePlaceholders(
  text: string,
  replacements: {
    airport?: string;
    city?: string;
    price?: string;
    time?: string;
  }
): string {
  let result = text;

  if (replacements.airport) {
    result = result.replace(/{AIRPORT}/g, replacements.airport);
  }
  if (replacements.city) {
    result = result.replace(/{CITY}/g, replacements.city);
  }
  if (replacements.price) {
    result = result.replace(/{PRICE}/g, replacements.price);
  }
  if (replacements.time) {
    result = result.replace(/{TIME}/g, replacements.time);
  }

  return result;
}

/**
 * Generate ad copy for a specific campaign
 */
export function generateAdCopy(
  language: SupportedLanguage,
  service: ServiceType,
  airportCode?: string,
  city?: string,
  price?: number
): {
  headlines: string[];
  descriptions: string[];
  finalUrl: string;
  keywords: string[];
} {
  const template = getAdTemplate(language, service);

  const replacements = {
    airport: airportCode,
    city: city,
    price: price ? `$${price}` : undefined,
  };

  return {
    headlines: template.headlines.map((h) => replacePlaceholders(h, replacements)),
    descriptions: template.descriptions.map((d) =>
      replacePlaceholders(d, replacements)
    ),
    finalUrl: airportCode
      ? `${template.finalUrl}&airport=${airportCode}`
      : template.finalUrl,
    keywords: template.keywords,
  };
}

/**
 * Validate headline length (max 30 chars)
 */
export function validateHeadline(headline: string): {
  valid: boolean;
  length: number;
  error?: string;
} {
  const length = headline.length;
  if (length > 30) {
    return {
      valid: false,
      length,
      error: `Headline too long: ${length}/30 chars`,
    };
  }
  return { valid: true, length };
}

/**
 * Validate description length (max 90 chars)
 */
export function validateDescription(description: string): {
  valid: boolean;
  length: number;
  error?: string;
} {
  const length = description.length;
  if (length > 90) {
    return {
      valid: false,
      length,
      error: `Description too long: ${length}/90 chars`,
    };
  }
  return { valid: true, length };
}

/**
 * Validate an entire ad template
 */
export function validateAdTemplate(
  template: AdTemplate
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check headline count
  if (template.headlines.length > 15) {
    errors.push(`Too many headlines: ${template.headlines.length}/15`);
  }

  // Check description count
  if (template.descriptions.length > 4) {
    errors.push(`Too many descriptions: ${template.descriptions.length}/4`);
  }

  // Validate each headline
  template.headlines.forEach((h, i) => {
    const result = validateHeadline(h);
    if (!result.valid) {
      errors.push(`Headline ${i + 1}: ${result.error}`);
    }
  });

  // Validate each description
  template.descriptions.forEach((d, i) => {
    const result = validateDescription(d);
    if (!result.valid) {
      errors.push(`Description ${i + 1}: ${result.error}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
