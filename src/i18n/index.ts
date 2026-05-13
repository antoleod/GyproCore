export type Language = "pt" | "en" | "es";

export interface Translations {
  // Navigation
  nav_dashboard: string;
  nav_workspace: string;
  nav_pricing: string;
  nav_report: string;
  nav_settings: string;
  sidebar_tagline: string;

  // Dashboard
  dashboard_hero_brand: string;
  dashboard_hero_title: string;
  dashboard_hero_subtitle: string;
  dashboard_hero_cta: string;
  dashboard_toggle_hideHero: string;
  dashboard_toggle_showHero: string;
  dashboard_toggle_hideStats: string;
  dashboard_toggle_showStats: string;
  dashboard_toggle_hideProject: string;
  dashboard_toggle_showProject: string;
  dashboard_stats_projects: string;
  dashboard_stats_projectsDetail: string;
  dashboard_stats_totalArea: string;
  dashboard_stats_totalAreaDetail: string;
  dashboard_stats_budget: string;
  dashboard_stats_budgetDetail: string;
  dashboard_stats_priceM2: string;
  dashboard_stats_priceM2Detail: string;
  dashboard_activeProject_heading: string;
  dashboard_activeProject_link: string;

  // Workspace
  workspace_heading: string;
  workspace_subtitle: string;
  workspace_summary_totalArea: string;
  workspace_summary_guides: string;
  workspace_summary_f47: string;
  workspace_summary_measurements: string;
  workspace_collapsible_singular: string;
  workspace_collapsible_plural: string;
  workspace_measurement_one: string;
  workspace_measurement_plural: string;

  // Measurement Card
  card_placeholder_name: string;
  card_btn_delete: string;
  card_label_side1: string;
  card_label_side2: string;
  card_label_subtract: string;
  card_result_perimeter: string;
  card_result_area: string;
  card_result_f47: string;
  card_result_units: string;

  // Zone Header
  zone_placeholder_name: string;
  zone_btn_add: string;
  zone_params_sectionTitle: string;
  zone_params_spacing: string;
  zone_params_coef: string;
  zone_params_floors: string;
  zone_params_units: string;

  // Project Form
  form_badge: string;
  form_heading: string;
  form_subtitle: string;
  form_step1_heading: string;
  form_step1_locationLabel: string;
  form_step1_locationPlaceholder: string;
  form_step1_duplicateHeading: string;
  form_step1_duplicateSuggest: string;
  form_step1_useBtn: string;
  form_step1_uniqueId: string;
  form_step2_heading: string;
  form_step2_clearBtn: string;
  form_step2_clearTitle: string;
  form_step2_description: string;
  form_step2_lastMeasure: string;
  form_step2_roomLabel: string;
  form_step2_roomPlaceholder: string;
  form_step2_side1Label: string;
  form_step2_side2Label: string;
  form_step3_sectionTitle: string;
  form_step3_hint: string;
  form_step3_spacing: string;
  form_step3_coef: string;
  form_step3_floors: string;
  form_step3_units: string;
  form_submitBtn: string;

  // Form Validation
  form_validation_locationName: string;
  form_validation_spacing: string;
  form_validation_coefficient: string;
  form_validation_floorQty: string;
  form_validation_unitQty: string;
  form_validation_localName: string;
  form_validation_side1: string;
  form_validation_side2: string;

  // Modal
  modal_heading: string;
  modal_subtitle: string;
  modal_btn_finish: string;
  modal_btn_add: string;
  modal_hint: string;

  // Pricing
  pricing_heading: string;
  pricing_subtitle: string;
  pricing_stats_grandTotal: string;
  pricing_stats_priceM2: string;
  pricing_editHint: string;
  pricing_btn_save: string;
  pricing_btn_cancel: string;
  pricing_btn_deleteMaterial: string;
  pricing_label_unitPrice: string;
  pricing_label_total: string;
  pricing_empty: string;

  // Materials
  materials_heading: string;
  materials_subtitle: string;
  materials_stat_area: string;
  materials_stat_guides: string;
  materials_stat_f47: string;
  materials_table_material: string;
  materials_table_unit: string;
  materials_table_techQty: string;
  materials_table_purchase: string;

  // Report
  report_heading: string;
  report_subtitle: string;
  report_btn_excel: string;
  report_btn_pdf: string;
  report_companyName: string;
  report_stat_area: string;
  report_stat_total: string;
  report_stat_priceM2: string;
  report_table_material: string;
  report_table_qty: string;
  report_table_unit: string;
  report_table_total: string;

  // Settings
  settings_heading: string;
  settings_subtitle: string;
  settings_language_heading: string;
  settings_language_pt: string;
  settings_language_en: string;
  settings_language_es: string;
  settings_currency_heading: string;
  settings_currency_brl: string;
  settings_currency_eur: string;
  settings_currency_usd: string;
  settings_currency_selected: string;
  settings_export_heading: string;
  settings_export_excel: string;
  settings_export_json: string;
  settings_import_json: string;
  settings_backup_heading: string;
  settings_backup_placeholder: string;
  settings_backup_charCount: string;
  settings_backup_hint: string;

  // Inline Edit
  inline_btn_confirm: string;
  inline_btn_cancel: string;
}

export const translations: Record<Language, Translations> = {
  pt: {
    // Navigation
    nav_dashboard: "Dashboard",
    nav_workspace: "Cálculo",
    nav_pricing: "Preços",
    nav_report: "PDF",
    nav_settings: "Ajustes",
    sidebar_tagline: "Cálculos precisos para Gyproc.",

    // Dashboard
    dashboard_hero_brand: "JK Gyproc Art",
    dashboard_hero_title: "GyproCore",
    dashboard_hero_subtitle: "Plataforma de estimativa para forro, materiais e orcamentos com calculos em tempo real.",
    dashboard_hero_cta: "Novo calculo",
    dashboard_toggle_hideHero: "Ocultar hero",
    dashboard_toggle_showHero: "Mostrar hero",
    dashboard_toggle_hideStats: "Ocultar métricas",
    dashboard_toggle_showStats: "Mostrar métricas",
    dashboard_toggle_hideProject: "Ocultar projeto",
    dashboard_toggle_showProject: "Mostrar projeto",
    dashboard_stats_projects: "Projetos",
    dashboard_stats_projectsDetail: "Local-first MVP",
    dashboard_stats_totalArea: "Area total",
    dashboard_stats_totalAreaDetail: "{n} zonas",
    dashboard_stats_budget: "Orcamento",
    dashboard_stats_budgetDetail: "Materiais calculados",
    dashboard_stats_priceM2: "Preco / m2",
    dashboard_stats_priceM2Detail: "Baseado no total",
    dashboard_activeProject_heading: "Projeto ativo",
    dashboard_activeProject_link: "Ver resumo",

    // Workspace
    workspace_heading: "Estimativa de Forro",
    workspace_subtitle: "Edite as medidas de cada local. Perímetro, área, F47 e quantidades são calculadas em tempo real.",
    workspace_summary_totalArea: "Área Total",
    workspace_summary_guides: "Guias",
    workspace_summary_f47: "F47",
    workspace_summary_measurements: "Medidas",
    workspace_collapsible_singular: "Medida",
    workspace_collapsible_plural: "Medidas",
    workspace_measurement_one: "Medida",
    workspace_measurement_plural: "Medidas",

    // Measurement Card
    card_placeholder_name: "Nome do local",
    card_btn_delete: "Eliminar medida",
    card_label_side1: "Lado 1 (m)",
    card_label_side2: "Lado 2 (m)",
    card_label_subtract: "Subtrair (m)",
    card_result_perimeter: "Perímetro",
    card_result_area: "Área",
    card_result_f47: "F47",
    card_result_units: "Unidades",

    // Zone Header
    zone_placeholder_name: "Nome da localização",
    zone_btn_add: "Adicionar",
    zone_params_sectionTitle: "Parâmetros da Zona",
    zone_params_spacing: "Espaço (m)",
    zone_params_coef: "Coef. %",
    zone_params_floors: "Qtd. Pav.",
    zone_params_units: "Qtd. Und.",

    // Project Form
    form_badge: "Novo Cálculo",
    form_heading: "Bem-vindo ao GyproCore",
    form_subtitle: "Vamos começar definindo o local de trabalho. Você pode ajustar os parâmetros depois se necessário.",
    form_step1_heading: "Onde você está trabalhando?",
    form_step1_locationLabel: "Nome do local",
    form_step1_locationPlaceholder: "Ex: Corpo de bombeiros, Comfort Tag Flat...",
    form_step1_duplicateHeading: "Nome já existe",
    form_step1_duplicateSuggest: "Sugerimos: {name}",
    form_step1_useBtn: "Usar",
    form_step1_uniqueId: "Identificador único",
    form_step2_heading: "Primeira medida",
    form_step2_clearBtn: "Limpar",
    form_step2_clearTitle: "Limpar últimos valores",
    form_step2_description: "Adicione o nome do primeiro cômodo e suas dimensões (comprimento e largura).",
    form_step2_lastMeasure: "✓ Usando últimas medidas: {name} ({s1}m × {s2}m)",
    form_step2_roomLabel: "Nome do cômodo",
    form_step2_roomPlaceholder: "Ex: Sala, Corredor, Quarto...",
    form_step2_side1Label: "Comprimento (m)",
    form_step2_side2Label: "Largura (m)",
    form_step3_sectionTitle: "Parâmetros do Projeto",
    form_step3_hint: "Estes valores vêm do seu levantamento. Clique em qualquer número para editar.",
    form_step3_spacing: "Espaço (m)",
    form_step3_coef: "Coef. %",
    form_step3_floors: "Qtd. Pav.",
    form_step3_units: "Qtd. Und.",
    form_submitBtn: "Começar Cálculo",

    // Form Validation
    form_validation_locationName: "Informe o nome da localizacao",
    form_validation_spacing: "Espacamento deve ser maior que zero",
    form_validation_coefficient: "Coeficiente nao pode ser negativo",
    form_validation_floorQty: "Qtd. Pav. deve ser maior que zero",
    form_validation_unitQty: "Qtd. Und. deve ser maior que zero",
    form_validation_localName: "Informe o nome do local",
    form_validation_side1: "Lado 1 deve ser maior que zero",
    form_validation_side2: "Lado 2 deve ser maior que zero",

    // Modal
    modal_heading: "Deseja adicionar outra medida?",
    modal_subtitle: "Você pode continuar adicionando medidas agora ou terminar o levantamento.",
    modal_btn_finish: "Terminar",
    modal_btn_add: "Adicionar",
    modal_hint: "Pressione ESC para terminar",

    // Pricing
    pricing_heading: "Preços e Materiais",
    pricing_subtitle: "Ajuste nomes, preços e gerencie seus materiais. Edite clicando nos campos.",
    pricing_stats_grandTotal: "Total geral",
    pricing_stats_priceM2: "Preço por m²",
    pricing_editHint: "Clique nos campos para editar",
    pricing_btn_save: "Salvar",
    pricing_btn_cancel: "Cancelar",
    pricing_btn_deleteMaterial: "Eliminar material",
    pricing_label_unitPrice: "Preço unit. ({currency})",
    pricing_label_total: "Total",
    pricing_empty: "Nenhum material adicionado ainda",

    // Materials
    materials_heading: "Resumo de materiais",
    materials_subtitle: "Consolidado geral derivado das zonas e medidas validas.",
    materials_stat_area: "Area",
    materials_stat_guides: "Guias",
    materials_stat_f47: "F47",
    materials_table_material: "Material",
    materials_table_unit: "Unidade",
    materials_table_techQty: "Quantidade tecnica",
    materials_table_purchase: "Compra",

    // Report
    report_heading: "Resumo / Presupuesto",
    report_subtitle: "Preview pronto para evoluir para exportacao PDF.",
    report_btn_excel: "Exportar Excel",
    report_btn_pdf: "Exportar PDF",
    report_companyName: "JK Gyproc Art",
    report_stat_area: "Area",
    report_stat_total: "Total",
    report_stat_priceM2: "Preco/m2",
    report_table_material: "Material",
    report_table_qty: "Qtd.",
    report_table_unit: "Unit.",
    report_table_total: "Total",

    // Settings
    settings_heading: "Ajustes",
    settings_subtitle: "Configure sua moeda, idioma, faça backup e restaure dados.",
    settings_language_heading: "Idioma",
    settings_language_pt: "🇧🇷 Português",
    settings_language_en: "🇬🇧 Inglês",
    settings_language_es: "🇪🇸 Espanhol",
    settings_currency_heading: "Moeda Global",
    settings_currency_brl: "🇧🇷 Real (BRL)",
    settings_currency_eur: "🇪🇺 Euro (EUR)",
    settings_currency_usd: "🇺🇸 Dólar (USD)",
    settings_currency_selected: "Moeda selecionada: {currency}",
    settings_export_heading: "Exportar Dados",
    settings_export_excel: "Exportar Excel",
    settings_export_json: "Exportar JSON",
    settings_import_json: "Importar JSON",
    settings_backup_heading: "Backup/Restore JSON",
    settings_backup_placeholder: "Cole o JSON aqui para restaurar ou exporte acima",
    settings_backup_charCount: "{n} caracteres",
    settings_backup_hint: "Exporte acima para copiar, ou cole um backup anterior",

    // Inline Edit
    inline_btn_confirm: "Confirmar",
    inline_btn_cancel: "Cancelar",
  },

  en: {
    // Navigation
    nav_dashboard: "Dashboard",
    nav_workspace: "Calculation",
    nav_pricing: "Pricing",
    nav_report: "PDF",
    nav_settings: "Settings",
    sidebar_tagline: "Accurate calculations for Gyproc.",

    // Dashboard
    dashboard_hero_brand: "JK Gyproc Art",
    dashboard_hero_title: "GyproCore",
    dashboard_hero_subtitle: "Estimation platform for drywall, materials and budgets with real-time calculations.",
    dashboard_hero_cta: "New calculation",
    dashboard_toggle_hideHero: "Hide hero",
    dashboard_toggle_showHero: "Show hero",
    dashboard_toggle_hideStats: "Hide metrics",
    dashboard_toggle_showStats: "Show metrics",
    dashboard_toggle_hideProject: "Hide project",
    dashboard_toggle_showProject: "Show project",
    dashboard_stats_projects: "Projects",
    dashboard_stats_projectsDetail: "Local-first MVP",
    dashboard_stats_totalArea: "Total area",
    dashboard_stats_totalAreaDetail: "{n} zones",
    dashboard_stats_budget: "Budget",
    dashboard_stats_budgetDetail: "Calculated materials",
    dashboard_stats_priceM2: "Price / m2",
    dashboard_stats_priceM2Detail: "Based on total",
    dashboard_activeProject_heading: "Active project",
    dashboard_activeProject_link: "View summary",

    // Workspace
    workspace_heading: "Drywall Estimation",
    workspace_subtitle: "Edit measurements for each area. Perimeter, area, F47 and quantities are calculated in real-time.",
    workspace_summary_totalArea: "Total Area",
    workspace_summary_guides: "Guides",
    workspace_summary_f47: "F47",
    workspace_summary_measurements: "Measurements",
    workspace_collapsible_singular: "Measurement",
    workspace_collapsible_plural: "Measurements",
    workspace_measurement_one: "Measurement",
    workspace_measurement_plural: "Measurements",

    // Measurement Card
    card_placeholder_name: "Area name",
    card_btn_delete: "Delete measurement",
    card_label_side1: "Side 1 (m)",
    card_label_side2: "Side 2 (m)",
    card_label_subtract: "Subtract (m)",
    card_result_perimeter: "Perimeter",
    card_result_area: "Area",
    card_result_f47: "F47",
    card_result_units: "Units",

    // Zone Header
    zone_placeholder_name: "Location name",
    zone_btn_add: "Add",
    zone_params_sectionTitle: "Zone Parameters",
    zone_params_spacing: "Spacing (m)",
    zone_params_coef: "Coef. %",
    zone_params_floors: "Floor Qty.",
    zone_params_units: "Unit Qty.",

    // Project Form
    form_badge: "New Calculation",
    form_heading: "Welcome to GyproCore",
    form_subtitle: "Let's start by defining your work location. You can adjust parameters later if needed.",
    form_step1_heading: "Where are you working?",
    form_step1_locationLabel: "Location name",
    form_step1_locationPlaceholder: "Ex: Fire department, Comfort Tag Flat...",
    form_step1_duplicateHeading: "Name already exists",
    form_step1_duplicateSuggest: "We suggest: {name}",
    form_step1_useBtn: "Use",
    form_step1_uniqueId: "Unique identifier",
    form_step2_heading: "First measurement",
    form_step2_clearBtn: "Clear",
    form_step2_clearTitle: "Clear last values",
    form_step2_description: "Add the name of the first room and its dimensions (length and width).",
    form_step2_lastMeasure: "✓ Using last measurements: {name} ({s1}m × {s2}m)",
    form_step2_roomLabel: "Room name",
    form_step2_roomPlaceholder: "Ex: Living room, Hallway, Bedroom...",
    form_step2_side1Label: "Length (m)",
    form_step2_side2Label: "Width (m)",
    form_step3_sectionTitle: "Project Parameters",
    form_step3_hint: "These values come from your survey. Click any number to edit.",
    form_step3_spacing: "Spacing (m)",
    form_step3_coef: "Coef. %",
    form_step3_floors: "Floor Qty.",
    form_step3_units: "Unit Qty.",
    form_submitBtn: "Start Calculation",

    // Form Validation
    form_validation_locationName: "Please enter the location name",
    form_validation_spacing: "Spacing must be greater than zero",
    form_validation_coefficient: "Coefficient cannot be negative",
    form_validation_floorQty: "Floor quantity must be greater than zero",
    form_validation_unitQty: "Unit quantity must be greater than zero",
    form_validation_localName: "Please enter the room name",
    form_validation_side1: "Side 1 must be greater than zero",
    form_validation_side2: "Side 2 must be greater than zero",

    // Modal
    modal_heading: "Do you want to add another measurement?",
    modal_subtitle: "You can continue adding measurements now or finish the survey.",
    modal_btn_finish: "Finish",
    modal_btn_add: "Add",
    modal_hint: "Press ESC to finish",

    // Pricing
    pricing_heading: "Prices and Materials",
    pricing_subtitle: "Adjust names, prices and manage your materials. Edit by clicking the fields.",
    pricing_stats_grandTotal: "Total",
    pricing_stats_priceM2: "Price per m²",
    pricing_editHint: "Click the fields to edit",
    pricing_btn_save: "Save",
    pricing_btn_cancel: "Cancel",
    pricing_btn_deleteMaterial: "Delete material",
    pricing_label_unitPrice: "Unit price ({currency})",
    pricing_label_total: "Total",
    pricing_empty: "No materials added yet",

    // Materials
    materials_heading: "Materials Summary",
    materials_subtitle: "Overall summary derived from zones and valid measurements.",
    materials_stat_area: "Area",
    materials_stat_guides: "Guides",
    materials_stat_f47: "F47",
    materials_table_material: "Material",
    materials_table_unit: "Unit",
    materials_table_techQty: "Technical quantity",
    materials_table_purchase: "Purchase",

    // Report
    report_heading: "Summary / Budget",
    report_subtitle: "Preview ready to evolve to PDF export.",
    report_btn_excel: "Export Excel",
    report_btn_pdf: "Export PDF",
    report_companyName: "JK Gyproc Art",
    report_stat_area: "Area",
    report_stat_total: "Total",
    report_stat_priceM2: "Price/m2",
    report_table_material: "Material",
    report_table_qty: "Qty.",
    report_table_unit: "Unit",
    report_table_total: "Total",

    // Settings
    settings_heading: "Settings",
    settings_subtitle: "Configure your currency, language, backup and restore data.",
    settings_language_heading: "Language",
    settings_language_pt: "🇧🇷 Portuguese",
    settings_language_en: "🇬🇧 English",
    settings_language_es: "🇪🇸 Spanish",
    settings_currency_heading: "Global Currency",
    settings_currency_brl: "🇧🇷 Real (BRL)",
    settings_currency_eur: "🇪🇺 Euro (EUR)",
    settings_currency_usd: "🇺🇸 Dollar (USD)",
    settings_currency_selected: "Selected currency: {currency}",
    settings_export_heading: "Export Data",
    settings_export_excel: "Export Excel",
    settings_export_json: "Export JSON",
    settings_import_json: "Import JSON",
    settings_backup_heading: "Backup/Restore JSON",
    settings_backup_placeholder: "Paste JSON here to restore or export above",
    settings_backup_charCount: "{n} characters",
    settings_backup_hint: "Export above to copy, or paste a previous backup",

    // Inline Edit
    inline_btn_confirm: "Confirm",
    inline_btn_cancel: "Cancel",
  },

  es: {
    // Navigation
    nav_dashboard: "Panel",
    nav_workspace: "Cálculo",
    nav_pricing: "Precios",
    nav_report: "PDF",
    nav_settings: "Configuración",
    sidebar_tagline: "Cálculos precisos para Gyproc.",

    // Dashboard
    dashboard_hero_brand: "JK Gyproc Art",
    dashboard_hero_title: "GyproCore",
    dashboard_hero_subtitle: "Plataforma de estimación para drywall, materiales y presupuestos con cálculos en tiempo real.",
    dashboard_hero_cta: "Nuevo cálculo",
    dashboard_toggle_hideHero: "Ocultar héroe",
    dashboard_toggle_showHero: "Mostrar héroe",
    dashboard_toggle_hideStats: "Ocultar métricas",
    dashboard_toggle_showStats: "Mostrar métricas",
    dashboard_toggle_hideProject: "Ocultar proyecto",
    dashboard_toggle_showProject: "Mostrar proyecto",
    dashboard_stats_projects: "Proyectos",
    dashboard_stats_projectsDetail: "MVP local-first",
    dashboard_stats_totalArea: "Area total",
    dashboard_stats_totalAreaDetail: "{n} zonas",
    dashboard_stats_budget: "Presupuesto",
    dashboard_stats_budgetDetail: "Materiales calculados",
    dashboard_stats_priceM2: "Precio / m2",
    dashboard_stats_priceM2Detail: "Basado en el total",
    dashboard_activeProject_heading: "Proyecto activo",
    dashboard_activeProject_link: "Ver resumen",

    // Workspace
    workspace_heading: "Estimación de Drywall",
    workspace_subtitle: "Edite las medidas de cada área. Perímetro, área, F47 y cantidades se calculan en tiempo real.",
    workspace_summary_totalArea: "Área Total",
    workspace_summary_guides: "Guías",
    workspace_summary_f47: "F47",
    workspace_summary_measurements: "Medidas",
    workspace_collapsible_singular: "Medida",
    workspace_collapsible_plural: "Medidas",
    workspace_measurement_one: "Medida",
    workspace_measurement_plural: "Medidas",

    // Measurement Card
    card_placeholder_name: "Nombre del área",
    card_btn_delete: "Eliminar medida",
    card_label_side1: "Lado 1 (m)",
    card_label_side2: "Lado 2 (m)",
    card_label_subtract: "Restar (m)",
    card_result_perimeter: "Perímetro",
    card_result_area: "Área",
    card_result_f47: "F47",
    card_result_units: "Unidades",

    // Zone Header
    zone_placeholder_name: "Nombre de la ubicación",
    zone_btn_add: "Agregar",
    zone_params_sectionTitle: "Parámetros de la Zona",
    zone_params_spacing: "Espaciado (m)",
    zone_params_coef: "Coef. %",
    zone_params_floors: "Cant. Pisos",
    zone_params_units: "Cant. Unid.",

    // Project Form
    form_badge: "Nuevo Cálculo",
    form_heading: "Bienvenido a GyproCore",
    form_subtitle: "Comencemos definiendo tu ubicación de trabajo. Puedes ajustar los parámetros después si es necesario.",
    form_step1_heading: "¿Dónde estás trabajando?",
    form_step1_locationLabel: "Nombre de la ubicación",
    form_step1_locationPlaceholder: "Ej: Cuerpo de bomberos, Comfort Tag Flat...",
    form_step1_duplicateHeading: "El nombre ya existe",
    form_step1_duplicateSuggest: "Sugerimos: {name}",
    form_step1_useBtn: "Usar",
    form_step1_uniqueId: "Identificador único",
    form_step2_heading: "Primera medida",
    form_step2_clearBtn: "Limpiar",
    form_step2_clearTitle: "Limpiar últimos valores",
    form_step2_description: "Agrega el nombre de la primera habitación y sus dimensiones (largo y ancho).",
    form_step2_lastMeasure: "✓ Usando últimas medidas: {name} ({s1}m × {s2}m)",
    form_step2_roomLabel: "Nombre de la habitación",
    form_step2_roomPlaceholder: "Ej: Sala, Pasillo, Dormitorio...",
    form_step2_side1Label: "Largo (m)",
    form_step2_side2Label: "Ancho (m)",
    form_step3_sectionTitle: "Parámetros del Proyecto",
    form_step3_hint: "Estos valores provienen de tu levantamiento. Haz clic en cualquier número para editar.",
    form_step3_spacing: "Espaciado (m)",
    form_step3_coef: "Coef. %",
    form_step3_floors: "Cant. Pisos",
    form_step3_units: "Cant. Unid.",
    form_submitBtn: "Comenzar Cálculo",

    // Form Validation
    form_validation_locationName: "Por favor ingresa el nombre de la ubicación",
    form_validation_spacing: "El espaciado debe ser mayor que cero",
    form_validation_coefficient: "El coeficiente no puede ser negativo",
    form_validation_floorQty: "La cantidad de pisos debe ser mayor que cero",
    form_validation_unitQty: "La cantidad de unidades debe ser mayor que cero",
    form_validation_localName: "Por favor ingresa el nombre del local",
    form_validation_side1: "El lado 1 debe ser mayor que cero",
    form_validation_side2: "El lado 2 debe ser mayor que cero",

    // Modal
    modal_heading: "¿Deseas agregar otra medida?",
    modal_subtitle: "Puedes continuar agregando medidas ahora o terminar el levantamiento.",
    modal_btn_finish: "Terminar",
    modal_btn_add: "Agregar",
    modal_hint: "Presiona ESC para terminar",

    // Pricing
    pricing_heading: "Precios y Materiales",
    pricing_subtitle: "Ajusta nombres, precios y gestiona tus materiales. Edita haciendo clic en los campos.",
    pricing_stats_grandTotal: "Total general",
    pricing_stats_priceM2: "Precio por m²",
    pricing_editHint: "Haz clic en los campos para editar",
    pricing_btn_save: "Guardar",
    pricing_btn_cancel: "Cancelar",
    pricing_btn_deleteMaterial: "Eliminar material",
    pricing_label_unitPrice: "Precio unitario ({currency})",
    pricing_label_total: "Total",
    pricing_empty: "Aún no se han agregado materiales",

    // Materials
    materials_heading: "Resumen de Materiales",
    materials_subtitle: "Resumen general derivado de zonas y medidas válidas.",
    materials_stat_area: "Área",
    materials_stat_guides: "Guías",
    materials_stat_f47: "F47",
    materials_table_material: "Material",
    materials_table_unit: "Unidad",
    materials_table_techQty: "Cantidad técnica",
    materials_table_purchase: "Compra",

    // Report
    report_heading: "Resumen / Presupuesto",
    report_subtitle: "Vista previa lista para evolucionar a exportación PDF.",
    report_btn_excel: "Exportar Excel",
    report_btn_pdf: "Exportar PDF",
    report_companyName: "JK Gyproc Art",
    report_stat_area: "Área",
    report_stat_total: "Total",
    report_stat_priceM2: "Precio/m2",
    report_table_material: "Material",
    report_table_qty: "Cant.",
    report_table_unit: "Unid.",
    report_table_total: "Total",

    // Settings
    settings_heading: "Configuración",
    settings_subtitle: "Configura tu moneda, idioma, haz backup y restaura datos.",
    settings_language_heading: "Idioma",
    settings_language_pt: "🇧🇷 Portugués",
    settings_language_en: "🇬🇧 Inglés",
    settings_language_es: "🇪🇸 Español",
    settings_currency_heading: "Moneda Global",
    settings_currency_brl: "🇧🇷 Real (BRL)",
    settings_currency_eur: "🇪🇺 Euro (EUR)",
    settings_currency_usd: "🇺🇸 Dólar (USD)",
    settings_currency_selected: "Moneda seleccionada: {currency}",
    settings_export_heading: "Exportar Datos",
    settings_export_excel: "Exportar Excel",
    settings_export_json: "Exportar JSON",
    settings_import_json: "Importar JSON",
    settings_backup_heading: "Backup/Restaurar JSON",
    settings_backup_placeholder: "Pega JSON aquí para restaurar o exporta arriba",
    settings_backup_charCount: "{n} caracteres",
    settings_backup_hint: "Exporta arriba para copiar, o pega un backup anterior",

    // Inline Edit
    inline_btn_confirm: "Confirmar",
    inline_btn_cancel: "Cancelar",
  },
};
